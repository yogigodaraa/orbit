'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    href: '/analyze',
    label: 'Analyze',
    isCta: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .963L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
      </svg>
    ),
  },
]

const GITHUB_URL = 'https://github.com/yogiduzit/trackfights'

export default function Sidebar() {
  const pathname = usePathname()

  // Hide entirely on the landing page — let the marketing layout breathe.
  if (pathname === '/') return null

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed top-0 left-0 z-40 h-screen w-60 flex-col py-6 px-3 overflow-y-auto"
        style={{ backgroundColor: '#0d0e14' }}
      >
        {/* Brand */}
        <Link href="/" className="px-3 mb-8 block group">
          <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            TrackFights
          </h1>
          <p className="text-xs text-muted mt-0.5">AI chat analysis</p>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col flex-1 gap-1">
          {items.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            if (item.isCta) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-white
                    ${isActive ? 'shadow-lg shadow-blue-500/25 brightness-110' : 'hover:shadow-lg hover:shadow-blue-500/20 hover:brightness-110'}
                  `}
                  style={{ background: 'linear-gradient(135deg, #2d6bc4, #c4406e)' }}
                >
                  <span className="text-white">{item.icon}</span>
                  {item.label}
                </Link>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? 'text-white border-l-[3px] border-blue-500'
                      : 'text-[#9ca3af] hover:text-white hover:bg-[#15171f] border-l-[3px] border-transparent'
                  }
                `}
                style={isActive ? { backgroundColor: '#1a1d27' } : undefined}
              >
                <span className={isActive ? 'text-blue-400' : 'text-[#9ca3af]'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer — GitHub link */}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#9ca3af] hover:text-white hover:bg-[#15171f] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1 .1 2.6.5 3.3.2.1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
          </svg>
          GitHub
        </a>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex flex-row items-center justify-around py-2 border-t border-[#1e2130]"
        style={{ backgroundColor: '#0d0e14' }}
      >
        {items.map((item) => {
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          const isCta = 'isCta' in item && item.isCta

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors
                ${isCta ? 'text-white' : isActive ? 'text-blue-400' : 'text-[#9ca3af]'}
              `}
              style={
                isCta
                  ? {
                      background: 'linear-gradient(135deg, #2d6bc4, #c4406e)',
                      borderRadius: '8px',
                      padding: '4px 10px',
                    }
                  : undefined
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
