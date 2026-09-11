import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { mockUsers, getInitials } from '../data/mockUsers'
import { Layers, ArrowRight, ShieldCheck, UserCheck, Eye } from 'lucide-react'

const roleIcons = {
  Admin: ShieldCheck,
  Operations: UserCheck,
  Viewer: Eye,
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSelectUser = (userId) => {
    login(userId)
    navigate('/', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600 border border-accent-100 shadow-2xs">
            <Layers className="h-5 w-5 stroke-[2]" />
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-text-primary">
            Sign in to Workspace
          </h1>
          <p className="text-[14px] text-text-secondary">
            Choose a mock user profile to continue.
          </p>
        </div>

        {/* User Selection Cards */}
        <div className="space-y-3">
          {mockUsers.map((user) => {
            const RoleIcon = roleIcons[user.role] || UserCheck
            const initials = getInitials(user.name)

            return (
              <button
                key={user.id}
                onClick={() => handleSelectUser(user.id)}
                className="group flex w-full items-center justify-between rounded-xl border border-border bg-surface p-4 shadow-2xs transition-all duration-150 hover:border-border-strong hover:shadow-xs focus-visible:outline-2 focus-visible:outline-accent-600 focus-visible:outline-offset-1 text-left"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-[12px] font-semibold text-accent-700 border border-accent-100">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[14px] font-semibold text-text-primary">
                        {user.name}
                      </p>
                      <span className="inline-flex items-center gap-1 rounded border border-border bg-page px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                        <RoleIcon className="h-3 w-3" />
                        {user.role}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[12px] text-text-secondary">
                      <span>Orders: {user.permissions.Orders.join(', ') || 'None'}</span>
                      <span className="text-text-tertiary">·</span>
                      <span>Billing: {user.permissions.Billing.join(', ') || 'None'}</span>
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-accent-600" />
              </button>
            )
          })}
        </div>

        {/* Footer info */}
        <p className="text-center text-[12px] text-text-tertiary">
          Frontend assignment mock authentication. Persistence via localStorage.
        </p>
      </div>
    </div>
  )
}
