import { CreditCard, ShieldCheck, CheckCircle2, User, Sliders, Bell } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

const mockInvoices = [
  { id: 'INV-2026-003', date: 'Sep 01, 2026', amount: '$4,200.00', status: 'Paid' },
  { id: 'INV-2026-002', date: 'Aug 01, 2026', amount: '$4,200.00', status: 'Paid' },
  { id: 'INV-2026-001', date: 'Jul 01, 2026', amount: '$4,200.00', status: 'Paid' },
]

export function Billing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-text-primary leading-tight">
          Billing
        </h1>
        <p className="mt-1 text-[14px] text-text-secondary">
          Review workspace subscription details and invoice history.
        </p>
      </div>

      {/* Plan Card */}
      <div className="rounded-lg border border-border bg-surface p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600 border border-accent-100">
              <CreditCard className="h-5 w-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-text-primary">Enterprise Workspace</h2>
              <p className="text-[13px] text-text-secondary">Billed annually · Next cycle Oct 01, 2026</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-border bg-page px-3 py-1 text-xs font-semibold text-positive">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Active</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Billing Contact</span>
            <span className="font-medium text-text-primary">billing@workspace.internal</span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Payment Method</span>
            <span className="font-medium text-text-primary">Visa ending in •••• 4242</span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Required Permission</span>
            <span className="font-semibold text-accent-600">Billing VIEW</span>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
          Invoice History
        </h2>

        <div className="rounded-lg border border-border bg-surface shadow-2xs overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 border-b border-border bg-page/50 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
            <div className="col-span-4 sm:col-span-4">Invoice ID</div>
            <div className="col-span-4 sm:col-span-4">Date</div>
            <div className="col-span-2 sm:col-span-2">Amount</div>
            <div className="col-span-2 sm:col-span-2 text-right">Status</div>
          </div>

          <div className="divide-y divide-border/60">
            {mockInvoices.map((inv) => (
              <div key={inv.id} className="grid grid-cols-12 items-center px-6 py-3.5 text-[14px]">
                <div className="col-span-4 sm:col-span-4 font-semibold text-text-primary">
                  {inv.id}
                </div>
                <div className="col-span-4 sm:col-span-4 text-text-secondary font-medium">
                  {inv.date}
                </div>
                <div className="col-span-2 sm:col-span-2 text-text-primary font-medium">
                  {inv.amount}
                </div>
                <div className="col-span-2 sm:col-span-2 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full border border-border bg-page px-2.5 py-0.5 text-[11px] font-semibold text-text-secondary">
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold tracking-tight text-text-primary leading-tight">
          Settings
        </h1>
        <p className="mt-1 text-[14px] text-text-secondary">
          Manage workspace preferences and view authenticated profile details.
        </p>
      </div>

      {/* User Account Profile */}
      <div className="rounded-lg border border-border bg-surface p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 border-b border-border/80 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600 border border-accent-100">
            <User className="h-5 w-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-text-primary">User Profile</h2>
            <p className="text-[13px] text-text-secondary">Authenticated session details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Full Name</span>
            <span className="font-semibold text-text-primary">{user?.name ?? 'Guest User'}</span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Role</span>
            <span className="font-semibold text-text-primary">{user?.role ?? 'None'}</span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">User ID</span>
            <span className="font-medium text-text-secondary font-mono text-xs">{user?.id ?? 'N/A'}</span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Access Model</span>
            <span className="font-medium text-text-secondary">Permission-Driven RBAC</span>
          </div>
        </div>
      </div>

      {/* Workspace Preferences */}
      <div className="rounded-lg border border-border bg-surface p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-3 border-b border-border/80 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-active text-text-secondary border border-border">
            <Sliders className="h-5 w-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-text-primary">Workspace Preferences</h2>
            <p className="text-[13px] text-text-secondary">System-wide display and notification settings</p>
          </div>
        </div>

        <div className="divide-y divide-border/60 text-[14px]">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-text-primary">Color Theme</p>
              <p className="text-[12px] text-text-tertiary">Operations visual system (Canvas #F5F6F8)</p>
            </div>
            <span className="rounded border border-border bg-page px-2.5 py-1 text-xs font-medium text-text-secondary">
              Default Light
            </span>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-text-primary">Permission Alerts</p>
              <p className="text-[12px] text-text-tertiary">Notify when workspace access rules change</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-2.5 py-0.5 text-xs font-semibold text-accent-700">
              <Bell className="h-3 w-3" />
              <span>Enabled</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
