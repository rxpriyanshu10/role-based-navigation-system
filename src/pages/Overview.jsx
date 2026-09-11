import { Link } from 'react-router-dom'
import { ShoppingCart, CreditCard, ArrowRight, Check } from 'lucide-react'

const modules = [
  {
    id: 'orders',
    label: 'Orders',
    description: 'Manage and review orders',
    path: '/orders',
    icon: ShoppingCart,
    capabilities: ['VIEW', 'CREATE'],
    permissionsCount: '2 permissions',
  },
  {
    id: 'billing',
    label: 'Billing',
    description: 'Review billing information',
    path: '/billing',
    icon: CreditCard,
    capabilities: ['VIEW'],
    permissionsCount: '1 permission',
  },
]

const activity = [
  { id: 1, label: 'Order #1042 created', time: '12 min ago' },
  { id: 2, label: 'Invoice #882 reviewed', time: '34 min ago' },
  { id: 3, label: 'Order #1041 updated', time: '1 hr ago' },
]

export default function Overview() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-text-primary leading-tight">
          Overview
        </h1>
        <p className="mt-1 text-[14px] text-text-secondary">
          Your workspace and available modules.
        </p>
        <div className="mt-2.5 inline-flex items-center gap-2 rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-text-secondary border border-border shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-600" />
          <span>2 modules available</span>
          <span className="text-text-tertiary">·</span>
          <span>3 permissions</span>
        </div>
      </div>

      {/* Workspace Modules */}
      <section aria-label="Workspace modules" className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            Workspace
          </h2>
          <span className="text-xs text-text-secondary font-medium">Available modules</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              to={mod.path}
              className="group flex min-h-[190px] flex-col justify-between rounded-lg border border-border bg-surface p-6 shadow-2xs transition-all duration-150 hover:border-border-strong hover:shadow-xs focus-visible:outline-2 focus-visible:outline-accent-600 focus-visible:outline-offset-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-100">
                    <mod.icon className="h-4 w-4 stroke-[2]" />
                  </div>
                  {/* Capability tags */}
                  <div className="flex items-center gap-1.5">
                    {mod.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded border border-border bg-surface-active px-2 py-0.5 text-[10px] font-semibold tracking-wider text-text-secondary"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="mt-4 text-[16px] font-semibold text-text-primary">
                  {mod.label}
                </h3>
                <p className="mt-1 text-[14px] text-text-secondary leading-normal">
                  {mod.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-3.5">
                <span className="text-[12px] font-medium text-text-tertiary">
                  {mod.permissionsCount}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-600 transition-colors group-hover:text-accent-700">
                  Open
                  <ArrowRight className="h-4 w-4 stroke-[2] transition-transform duration-150 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Access Matrix Section */}
      <section aria-label="Access section" className="space-y-3">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            Access
          </h2>
          <p className="mt-0.5 text-[13px] text-text-secondary">
            Permissions available in your current workspace.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-surface shadow-2xs overflow-hidden">
          {/* Matrix Header */}
          <div className="grid grid-cols-12 px-6 py-3 border-b border-border bg-page/50 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            <div className="col-span-6 sm:col-span-6">Module</div>
            <div className="col-span-3 sm:col-span-3 text-center">View</div>
            <div className="col-span-3 sm:col-span-3 text-center">Create</div>
          </div>

          {/* Matrix Rows */}
          <div className="divide-y divide-border/60">
            {/* Orders Row */}
            <div className="grid grid-cols-12 items-center px-6 py-3.5 text-[14px]">
              <div className="col-span-6 sm:col-span-6 font-medium text-text-primary">Orders</div>
              <div className="col-span-3 sm:col-span-3 flex justify-center items-center text-positive font-semibold">
                <Check className="h-4 w-4 stroke-[2.5]" />
              </div>
              <div className="col-span-3 sm:col-span-3 flex justify-center items-center text-positive font-semibold">
                <Check className="h-4 w-4 stroke-[2.5]" />
              </div>
            </div>

            {/* Billing Row */}
            <div className="grid grid-cols-12 items-center px-6 py-3.5 text-[14px]">
              <div className="col-span-6 sm:col-span-6 font-medium text-text-primary">Billing</div>
              <div className="col-span-3 sm:col-span-3 flex justify-center items-center text-positive font-semibold">
                <Check className="h-4 w-4 stroke-[2.5]" />
              </div>
              <div className="col-span-3 sm:col-span-3 flex justify-center items-center text-text-tertiary font-medium">
                —
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section aria-label="Recent activity" className="space-y-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
          Recent activity
        </h2>

        <div className="rounded-lg border border-border bg-surface shadow-2xs px-6 divide-y divide-border/60">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3.5 text-[14px]"
            >
              <span className="text-text-primary">{item.label}</span>
              <span className="text-[12px] text-text-tertiary pl-4">{item.time}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
