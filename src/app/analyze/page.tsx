'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import DynamicDashboard from '@/components/DynamicDashboard'
import RelationshipSelector from '@/components/RelationshipSelector'
import { allConfigs } from '@/data/relationships/registry'
import type { RelationshipTypeId } from '@/data/relationships/types'

/* ───────────────────── Types ───────────────────── */

type AppState = 'select' | 'upload' | 'loading' | 'results' | 'error'
type Provider = 'anthropic' | 'google'

interface AnalysisError {
  message: string
  type: 'api' | 'validation'
}

const LOADING_STEPS = [
  'Reading messages...',
  'Identifying participants...',
  'Analyzing sentiment & patterns...',
  'Detecting fight cycles...',
  'Building predictions...',
  'Generating your dashboard...',
]

const MIN_MESSAGE_COUNT = 10
const LS_PROVIDER_KEY = 'trackfights.provider'
const LS_API_KEY = 'trackfights.apiKey'
const LS_RELATIONSHIP_KEY = 'orbit.relationshipType'

const PROVIDER_INFO: Record<Provider, { label: string; link: string; keyHint: string }> = {
  anthropic: {
    label: 'Claude (Anthropic)',
    link: 'https://console.anthropic.com/settings/keys',
    keyHint: 'sk-ant-…',
  },
  google: {
    label: 'Gemini (Google, free tier)',
    link: 'https://aistudio.google.com/app/apikey',
    keyHint: 'AIza…',
  },
}

/* ───────────────────── Helpers ───────────────────── */

function countMessages(text: string): number {
  // WhatsApp format: lines starting with a date like "1/1/24, 12:00" or "[1/1/24, 12:00]"
  // Instagram format: various, but each message is typically on its own line
  // Simple heuristic: count non-empty lines that look like messages
  const lines = text.split('\n').filter((l) => l.trim().length > 0)
  return lines.length
}

/* ───────────────────── Component ───────────────────── */

export default function AnalyzePage() {
  const [state, setState] = useState<AppState>('select')
  const [relationshipType, setRelationshipType] = useState<RelationshipTypeId | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<AnalysisError | null>(null)
  const [provider, setProvider] = useState<Provider>('anthropic')
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  /* ── Load saved provider + key from localStorage on mount ── */
  useEffect(() => {
    try {
      const savedProvider = localStorage.getItem(LS_PROVIDER_KEY)
      if (savedProvider === 'anthropic' || savedProvider === 'google') {
        setProvider(savedProvider)
      }
      const savedKey = localStorage.getItem(LS_API_KEY)
      if (savedKey) setApiKey(savedKey)
      const savedRel = localStorage.getItem(LS_RELATIONSHIP_KEY)
      if (savedRel && savedRel in allConfigs) {
        setRelationshipType(savedRel as RelationshipTypeId)
      }
    } catch {
      // localStorage unavailable (SSR / privacy mode) — ignore
    }
  }, [])

  /* ── Persist provider + key ── */
  useEffect(() => {
    try {
      localStorage.setItem(LS_PROVIDER_KEY, provider)
    } catch {}
  }, [provider])

  useEffect(() => {
    try {
      if (apiKey) localStorage.setItem(LS_API_KEY, apiKey)
      else localStorage.removeItem(LS_API_KEY)
    } catch {}
  }, [apiKey])

  useEffect(() => {
    try {
      if (relationshipType) localStorage.setItem(LS_RELATIONSHIP_KEY, relationshipType)
    } catch {}
  }, [relationshipType])

  /* ── Loading step progression ── */
  useEffect(() => {
    if (state !== 'loading') return

    const timers: NodeJS.Timeout[] = []
    LOADING_STEPS.forEach((_, i) => {
      if (i === 0) return // Step 0 is shown immediately
      timers.push(
        setTimeout(() => {
          setCurrentStep(i)
        }, i * 1500)
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [state])

  /* ── File processing ── */
  const processFile = useCallback(async (file: File) => {
    setFileName(file.name)

    // Require an API key up front (or let the user try the demo instead)
    if (!apiKey.trim()) {
      setError({
        message:
          `Add your ${PROVIDER_INFO[provider].label} API key above, or click "Try Demo" to see a sample analysis without a key.`,
        type: 'validation',
      })
      setState('error')
      return
    }

    // Validate extension
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext !== 'txt' && ext !== 'zip') {
      setError({
        message: 'Unsupported file format. Please upload a .txt or .zip file.',
        type: 'validation',
      })
      setState('error')
      return
    }

    // Read file contents
    let chatText: string

    if (ext === 'zip') {
      // ZIP support placeholder — JSZip will be added later
      setError({
        message: 'ZIP support coming soon. Please upload a .txt export for now.',
        type: 'validation',
      })
      setState('error')
      return
    } else {
      chatText = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsText(file)
      })
    }

    // Validate message count
    const messageCount = countMessages(chatText)
    if (messageCount < MIN_MESSAGE_COUNT) {
      setError({
        message: `Not enough data. Found roughly ${messageCount} messages — we need at least ${MIN_MESSAGE_COUNT} to build a meaningful analysis.`,
        type: 'validation',
      })
      setState('error')
      return
    }

    // Start analysis
    setState('loading')
    setCurrentStep(0)

    try {
      abortRef.current = new AbortController()

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatText, apiKey: apiKey.trim(), provider, relationshipType }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server error (${res.status})`)
      }

      const data = await res.json()
      setResult(data)
      setState('results')
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError({
        message: (err as Error).message || 'Something went wrong. Please try again.',
        type: 'api',
      })
      setState('error')
    }
  }, [apiKey, provider, relationshipType])

  /* ── Try Demo ── */
  const loadDemo = useCallback(() => {
    setState('loading')
    setCurrentStep(0)
    setFileName('demo-export.txt')

    // Simulate loading steps then show results
    setTimeout(() => {
      const data = relationshipType ? allConfigs[relationshipType].demoData : null
      setResult(data)
      setState('results')
    }, LOADING_STEPS.length * 1500)
  }, [relationshipType])

  /* ── Drag & drop handlers ── */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragOver(false)

      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  /* ── Reset ── */
  const reset = useCallback(() => {
    abortRef.current?.abort()
    setState('select')
    setResult(null)
    setError(null)
    setFileName(null)
    setCurrentStep(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  /* ═══════════════════ RENDER ═══════════════════ */

  /* ── Results ── */
  if (state === 'results' && result) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0a0b0f' }}>
        <div className="px-4 py-6 md:px-8">
          <button
            onClick={reset}
            className="mb-6 inline-flex items-center gap-2 text-sm text-[#9ca3af] hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Analyze another chat
          </button>
          <DynamicDashboard data={result} relationshipType={relationshipType ?? undefined} />
        </div>
      </div>
    )
  }

  /* ── Loading overlay ── */
  if (state === 'loading') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(10, 11, 15, 0.97)' }}>
        <div className="flex flex-col items-center gap-8 px-6 text-center max-w-md">
          {/* Pulsing orb */}
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(99,102,241,0) 70%)',
                animation: 'pulse-orb 2s ease-in-out infinite',
              }}
            />
            <div
              className="absolute inset-0 w-20 h-20 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0) 60%)',
                animation: 'pulse-orb 2s ease-in-out infinite 0.5s',
              }}
            />
          </div>

          {/* File name */}
          {fileName && (
            <p className="text-xs text-[#9ca3af] font-mono tracking-wide">
              {fileName}
            </p>
          )}

          {/* Steps */}
          <div className="space-y-3 w-full">
            {LOADING_STEPS.map((step, i) => {
              const isComplete = i < currentStep
              const isCurrent = i === currentStep
              return (
                <div
                  key={step}
                  className="flex items-center gap-3 transition-all duration-500"
                  style={{
                    opacity: i <= currentStep ? 1 : 0.25,
                    transform: isCurrent ? 'translateX(0)' : i < currentStep ? 'translateX(0)' : 'translateX(8px)',
                  }}
                >
                  {/* Status icon */}
                  <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    {isComplete ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : isCurrent ? (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: '#818cf8',
                          animation: 'pulse-dot 1.2s ease-in-out infinite',
                        }}
                      />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-[#2a2d42]" />
                    )}
                  </div>
                  <span
                    className="text-sm font-medium transition-colors duration-500"
                    style={{
                      color: isComplete ? '#4ade80' : isCurrent ? '#e4e4e7' : '#4a4d5a',
                    }}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Keyframe animations */}
        <style jsx>{`
          @keyframes pulse-orb {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 1; }
          }
          @keyframes pulse-dot {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.4); opacity: 1; }
          }
        `}</style>
      </div>
    )
  }

  /* ── Error ── */
  if (state === 'error' && error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0a0b0f' }}>
        <div
          className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{ backgroundColor: '#12141c', border: '1px solid #1e2130' }}
        >
          {/* Error icon */}
          <div
            className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full"
            style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-white mb-2">
            {error.type === 'validation' ? 'Cannot Analyze' : 'Analysis Failed'}
          </h2>
          <p className="text-sm text-[#9ca3af] mb-6 leading-relaxed">
            {error.message}
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={reset}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {error.type === 'api' ? 'Try Again' : 'Upload Different File'}
            </button>
            <button
              onClick={() => {
                reset()
                loadDemo()
              }}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-medium text-[#9ca3af] hover:text-white transition-colors"
              style={{ backgroundColor: '#1a1d27' }}
            >
              Try Demo Instead
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Select relationship type ── */
  if (state === 'select') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: '#0a0b0f' }}>
        <div className="w-full max-w-4xl flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              What kind of relationship?
            </h1>
            <p className="mt-2 text-sm text-[#9ca3af] max-w-md mx-auto leading-relaxed">
              Pick the type that best describes this chat. We&rsquo;ll tailor the analysis.
            </p>
          </div>

          <RelationshipSelector
            value={relationshipType}
            onSelect={(id) => setRelationshipType(id)}
          />

          <button
            onClick={() => setState('upload')}
            disabled={!relationshipType}
            className="py-3 px-8 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  /* ── Upload (default) ── */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: '#0a0b0f' }}>
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        {/* Back link */}
        <div className="w-full flex justify-start">
          <button
            onClick={() => {
              setFileName(null)
              if (fileInputRef.current) fileInputRef.current.value = ''
              setState('select')
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#6b7280] hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
        </div>

        {/* Relationship badge */}
        {relationshipType && (
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: '#12141c', border: '1px solid #1e2130', color: '#9ca3af' }}
          >
            <span className="text-[#6b7280]">Analyzing as:</span>
            <span className="text-white">{allConfigs[relationshipType].label}</span>
            <span>{allConfigs[relationshipType].emoji}</span>
          </div>
        )}

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Analyze Your Chat
          </h1>
          <p className="mt-2 text-sm text-[#9ca3af] max-w-sm mx-auto leading-relaxed">
            Upload your chat export and get a deep relationship analysis powered by AI.
          </p>
        </div>

        {/* API key panel (bring-your-own-key) */}
        <div
          className="w-full rounded-xl px-5 py-4"
          style={{ backgroundColor: '#12141c', border: '1px solid #1e2130' }}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#818cf8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
              <p className="text-xs font-semibold text-[#e4e4e7] uppercase tracking-wider">
                Your API Key
              </p>
            </div>
            <a
              href={PROVIDER_INFO[provider].link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#818cf8] hover:text-white transition-colors"
            >
              Get a key &rarr;
            </a>
          </div>

          {/* Provider selector */}
          <div className="flex gap-2 mb-3">
            {(['anthropic', 'google'] as Provider[]).map((p) => {
              const active = provider === p
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProvider(p)}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: active ? '#1a1d27' : 'transparent',
                    color: active ? '#e4e4e7' : '#6b7280',
                    border: active ? '1px solid #2d3150' : '1px solid #1e2130',
                  }}
                >
                  {PROVIDER_INFO[p].label}
                </button>
              )
            })}
          </div>

          {/* Key input */}
          <div className="flex gap-2 items-stretch">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={PROVIDER_INFO[provider].keyHint}
              spellCheck={false}
              autoComplete="off"
              className="flex-1 min-w-0 px-3 py-2 rounded-lg text-xs font-mono text-white placeholder:text-[#4a4d5a] focus:outline-none focus:ring-1 focus:ring-[#6366f1]"
              style={{ backgroundColor: '#0a0b0f', border: '1px solid #1e2130' }}
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="px-3 rounded-lg text-[11px] font-medium text-[#9ca3af] hover:text-white transition-colors"
              style={{ backgroundColor: '#0a0b0f', border: '1px solid #1e2130' }}
              aria-label={showKey ? 'Hide API key' : 'Show API key'}
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-[#6b7280]">
            Stored only in your browser&rsquo;s localStorage. Sent once per analysis to{' '}
            {provider === 'google' ? 'Google' : 'Anthropic'}, never to us. No key? Use{' '}
            <button
              type="button"
              onClick={loadDemo}
              className="underline decoration-dotted underline-offset-2 text-[#818cf8] hover:text-white transition-colors"
            >
              Try Demo
            </button>{' '}
            below.
          </p>
        </div>

        {/* Dropzone */}
        <div
          className="relative w-full group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Animated gradient border */}
          <div
            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)',
              backgroundSize: '300% 300%',
              animation: 'gradient-shift 4s ease infinite',
            }}
          />

          {/* Inner dropzone */}
          <div
            className="relative rounded-2xl p-12 flex flex-col items-center gap-5 transition-all duration-300"
            style={{
              backgroundColor: dragOver ? '#1a1d27' : '#12141c',
              border: dragOver ? '2px dashed #6366f1' : '2px dashed #1e2130',
              transform: dragOver ? 'scale(1.01)' : 'scale(1)',
            }}
          >
            {/* Upload cloud icon */}
            <div
              className="flex items-center justify-center w-16 h-16 rounded-2xl transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: 'rgba(99,102,241,0.1)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 16 12 12 8 16" />
                <line x1="12" y1="12" x2="12" y2="21" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                <polyline points="16 16 12 12 8 16" />
              </svg>
            </div>

            <div className="text-center">
              <p className="text-base font-medium text-white">
                Drop your chat export here
              </p>
              <p className="mt-1 text-sm text-[#9ca3af]">
                or click to browse
              </p>
            </div>

            {/* Format badges */}
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-medium"
                style={{ backgroundColor: '#1a1d27', color: '#818cf8' }}
              >
                .txt
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-medium"
                style={{ backgroundColor: '#1a1d27', color: '#818cf8' }}
              >
                .zip
              </span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.zip"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Helper text */}
        <div
          className="w-full rounded-xl px-5 py-4 text-xs text-[#9ca3af] leading-relaxed"
          style={{ backgroundColor: '#12141c', border: '1px solid #1e2130' }}
        >
          <p className="font-medium text-[#e4e4e7] mb-2">How to export your chat:</p>
          <ul className="space-y-1.5">
            <li>
              <span className="text-[#818cf8] font-medium">WhatsApp:</span>{' '}
              Open chat &rarr; Tap &lsquo;...&rsquo; &rarr; More &rarr; Export chat &rarr; Without media
            </li>
            <li>
              <span className="text-[#818cf8] font-medium">Instagram:</span>{' '}
              Settings &rarr; Privacy &rarr; Download your data &rarr; Select Messages
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px" style={{ backgroundColor: '#1e2130' }} />
          <span className="text-xs text-[#4a4d5a] uppercase tracking-widest font-medium">or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#1e2130' }} />
        </div>

        {/* Try Demo button */}
        <button
          onClick={loadDemo}
          className="w-full py-3 px-6 rounded-xl text-sm font-medium text-[#e4e4e7] transition-all duration-300 hover:text-white group"
          style={{
            backgroundColor: '#12141c',
            border: '1px solid #1e2130',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#6366f1'
            e.currentTarget.style.backgroundColor = '#1a1d27'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1e2130'
            e.currentTarget.style.backgroundColor = '#12141c'
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Try Demo
            <span className="text-xs text-[#6366f1] ml-1">sample data included</span>
          </span>
        </button>
      </div>

      {/* Keyframe for gradient border animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
