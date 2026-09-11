import { useState, useEffect } from 'react'
import { Plus, ShoppingCart, X, CheckCircle2 } from 'lucide-react'
import { usePermissions } from '../permissions/usePermissions.js'
import { MODULES } from '../permissions/modules.js'
import { PERMISSIONS } from '../permissions/permissions.js'

const initialOrders = [
  { id: '1042', customer: 'Acme Corp', amount: '$1,250.00', status: 'Completed', date: 'Today, 10:42 AM' },
  { id: '1041', customer: 'Globex Inc', amount: '$840.00', status: 'Processing', date: 'Today, 09:15 AM' },
  { id: '1040', customer: 'Stark Ind', amount: '$3,100.00', status: 'Shipped', date: 'Yesterday' },
]

export default function Orders() {
  const { can } = usePermissions()
  const [orders, setOrders] = useState(initialOrders)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState('')
  const [newAmount, setNewAmount] = useState('')

  // Permission check: Can current authenticated user create orders?
  const canCreateOrder = can(MODULES.ORDERS, PERMISSIONS.CREATE)

  // ESC key handler to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  const handleCreateOrder = (e) => {
    e.preventDefault()
    if (!newCustomer || !newAmount) return

    const newOrder = {
      id: String(1043 + orders.length),
      customer: newCustomer,
      amount: newAmount.startsWith('$') ? newAmount : `$${newAmount}`,
      status: 'Processing',
      date: 'Just now',
    }

    setOrders([newOrder, ...orders])
    setNewCustomer('')
    setNewAmount('')
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Page Header with Permission-Controlled Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-text-primary leading-tight">
            Orders
          </h1>
          <p className="mt-1 text-[14px] text-text-secondary">
            Manage and review operational orders across your workspace.
          </p>
        </div>

        {/* Permission-Controlled Create Order Action */}
        {canCreateOrder && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-accent-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-accent-700 focus-visible:outline-2 focus-visible:outline-accent-600 focus-visible:outline-offset-1"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>Create Order</span>
          </button>
        )}
      </div>

      {/* Orders Data Surface */}
      <div className="rounded-lg border border-border bg-surface shadow-2xs overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3 border-b border-border bg-page/50 text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">
          <div className="col-span-3 sm:col-span-3">Order ID</div>
          <div className="col-span-4 sm:col-span-4">Customer</div>
          <div className="col-span-3 sm:col-span-3">Amount</div>
          <div className="col-span-2 sm:col-span-2 text-right">Status</div>
        </div>

        {/* Orders Rows */}
        <div className="divide-y divide-border/60">
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-12 items-center px-6 py-3.5 text-[14px]">
              <div className="col-span-3 sm:col-span-3 font-semibold text-text-primary flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-text-tertiary hidden sm:inline" />
                <span>#{order.id}</span>
              </div>
              <div className="col-span-4 sm:col-span-4 text-text-primary font-medium truncate">
                {order.customer}
              </div>
              <div className="col-span-3 sm:col-span-3 text-text-secondary font-medium">
                {order.amount}
              </div>
              <div className="col-span-2 sm:col-span-2 text-right">
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-page px-2.5 py-0.5 text-[11px] font-semibold text-text-secondary">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightweight Creation Demo Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-md space-y-5"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-accent-600" />
                <h2 id="modal-title" className="text-[16px] font-semibold text-text-primary">
                  Create Order
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md p-1 text-text-tertiary hover:bg-surface-hover hover:text-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label htmlFor="customer-name" className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1">
                  Customer Name
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  placeholder="e.g. Wayne Enterprises"
                  value={newCustomer}
                  onChange={(e) => setNewCustomer(e.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600/20"
                />
              </div>

              <div>
                <label htmlFor="order-amount" className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1">
                  Order Amount
                </label>
                <input
                  id="order-amount"
                  type="text"
                  required
                  placeholder="e.g. $1,500.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-600/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary hover:bg-surface-hover transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent-700 transition-colors focus-visible:outline-2 focus-visible:outline-accent-600"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Submit Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
