import { NavLink, Link } from 'react-router-dom'
import { X, Layers, LogOut, LogIn } from 'lucide-react'
import { workspaceNav, accountNav } from '../../config/navigation'
import { filterNavItems } from '../../config/navigationFilter.js'
import { useAuth } from '../../auth/AuthContext'
import { getInitials } from '../../data/mockUsers'

function NavItem({ item, onClose }) {
  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === '/'}
        onClick={onClose}
        className={({ isActive }) =>
          `group relative flex h-9 items-center gap-3 rounded-md px-3 text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-accent-600 focus-visible:outline-offset-1 ${
            isActive
              ? 'bg-accent-50 font-medium text-accent-700 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:rounded-r before:bg-accent-600'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <item.icon
              className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                isActive ? 'text-accent-600' : 'text-text-tertiary group-hover:text-text-secondary'
              }`}
            />
            <span>{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  const { user, isAuthenticated, logout } = useAuth()
  const initials = user ? getInitials(user.name) : '?'

  const filteredWorkspaceNav = filterNavItems(workspaceNav, user)
  const filteredAccountNav = filterNavItems(accountNav, user)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-full w-[240px] flex-col bg-surface
          border-r border-border
          transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand Header */}
        <div className="flex h-[56px] shrink-0 items-center justify-between px-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-accent-50 text-accent-600">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-[14px] font-semibold tracking-tight text-text-primary">
              Workspace
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary lg:hidden transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {filteredWorkspaceNav.length > 0 && (
            <div>
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Workspace
              </p>
              <ul className="flex flex-col gap-0.5">
                {filteredWorkspaceNav.map((item) => (
                  <NavItem key={item.id} item={item} onClose={onClose} />
                ))}
              </ul>
            </div>
          )}

          {filteredAccountNav.length > 0 && (
            <div className="pt-3 border-t border-border/70">
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
                Account
              </p>
              <ul className="flex flex-col gap-0.5">
                {filteredAccountNav.map((item) => (
                  <NavItem key={item.id} item={item} onClose={onClose} />
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* User Profile Footer */}
        <div className="border-t border-border bg-surface px-4 py-3.5">
          {isAuthenticated && user ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-[11px] font-semibold text-accent-700 border border-accent-100">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium leading-tight text-text-primary">
                    {user.name}
                  </p>
                  <p className="truncate text-[12px] leading-tight text-text-tertiary mt-0.5">
                    {user.role}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="rounded-md p-1.5 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-primary hover:bg-surface-hover transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign in
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}
