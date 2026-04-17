'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const publicItems = [
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
  {
    href: '/launch',
    label: 'Launch',
    isCta: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
]

const dashboardItems = [
  {
    href: '/',
    label: 'Overview',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/love',
    label: 'Love & Affection',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    href: '/conflict',
    label: 'Conflict & Psychology',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    href: '/health',
    label: 'Health & Activity',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    href: '/predictions',
    label: 'Predictions',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    href: '/summary',
    label: 'Full Summary',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
]

// Mobile: Analyze + all 6 dashboard pages (Launch excluded)
const mobileItems = [
  publicItems[0], // Analyze
  ...dashboardItems,
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 z-40 h-screen w-60 flex-col py-6 px-3 overflow-y-auto"
        style={{ backgroundColor: '#0d0e14' }}
      >
        {/* Brand */}
        <div className="px-3 mb-8">
          <h1 className="text-lg font-bold tracking-tight text-white">
            TrackFights
          </h1>
          <p className="text-xs text-muted mt-0.5">AI chat analysis</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-1">
          {/* Public section */}
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
            Public
          </p>
          <div className="flex flex-col gap-1">
            {publicItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

              if (item.isCta) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all
                      text-white
                      ${isActive ? 'shadow-lg shadow-blue-500/25 brightness-110' : 'hover:shadow-lg hover:shadow-blue-500/20 hover:brightness-110'}
                    `}
                    style={{
                      background: 'linear-gradient(135deg, #2d6bc4, #c4406e)',
                    }}
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
          </div>

          {/* Divider */}
          <div className="my-4 mx-3 border-t border-[#1e2130]" />

          {/* Dashboard section */}
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
            Sample Dashboard
          </p>
          <div className="flex flex-col gap-1">
            {dashboardItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)

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
          </div>
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex flex-row items-center justify-around py-2 border-t border-[#1e2130]"
        style={{ backgroundColor: '#0d0e14' }}
      >
        {mobileItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)

          const isCta = 'isCta' in item && item.isCta

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors
                ${isCta
                  ? 'text-white'
                  : isActive ? 'text-blue-400' : 'text-[#9ca3af]'
                }
              `}
              style={isCta ? {
                background: 'linear-gradient(135deg, #2d6bc4, #c4406e)',
                borderRadius: '8px',
                padding: '4px 10px',
              } : undefined}
            >
              {item.icon}
              <span>{item.label.split(' ')[0]}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
