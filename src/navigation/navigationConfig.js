import { LayoutGrid, ShoppingCart, CreditCard, Settings } from 'lucide-react'
import { MODULES } from '../permissions/modules.js'
import { PERMISSIONS } from '../permissions/permissions.js'

export const workspaceNav = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/',
    icon: LayoutGrid,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/orders',
    icon: ShoppingCart,
    module: MODULES.ORDERS,
    requiredPermission: PERMISSIONS.VIEW,
  },
  {
    id: 'billing',
    label: 'Billing',
    path: '/billing',
    icon: CreditCard,
    module: MODULES.BILLING,
    requiredPermission: PERMISSIONS.VIEW,
  },
]

export const accountNav = [
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

export const allNavItems = [...workspaceNav, ...accountNav]
