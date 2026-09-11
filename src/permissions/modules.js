import { PERMISSIONS } from './permissions.js'

export const MODULES = {
  ORDERS: 'Orders',
  BILLING: 'Billing',
}

export const MODULE_DEFINITIONS = [
  {
    name: MODULES.ORDERS,
    permissions: [PERMISSIONS.VIEW, PERMISSIONS.CREATE],
  },
  {
    name: MODULES.BILLING,
    permissions: [PERMISSIONS.VIEW],
  },
]
