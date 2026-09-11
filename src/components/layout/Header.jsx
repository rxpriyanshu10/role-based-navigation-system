import { Menu, Bell, LogIn } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'
import { allNavItems } from '../../config/navigation'
import { useAuth } from '../../auth/AuthContext'
import { getInitials } from '../../data/mockUsers'

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation()
  const { user, isAuthenticated } = useAuth()

  const currentItem = allNavItems.find((item) => item.path === pathname)
  const pageTitle = currentItem?.label ?? 'Workspace'
  const initials = user ? getInitials(user.name) : '?'

  return (
    <header className="flex h-[56px] shrink-0 items-center justify-between border-b border-border bg-surface px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary lg:hidden transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
          aria-label="Open navigation"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
        <div className="flex items-baseline gap-2 text-sm">
          <span className="font-semibold text-text-primary">{pageTitle}</span>
          <span className="text-text-tertiary">/ Workspace</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
        </button>
        <div className="h-4 w-px bg-border/80" />
        {isAuthenticated && user ? (
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-50 text-[11px] font-semibold text-accent-700 border border-accent-100"
            title={`${user.name} (${user.role})`}
          >
            {initials}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-700 transition-colors focus-visible:outline-2 focus-visible:outline-accent-600 rounded"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </header>
  )
}
