import { hasPermission } from '../permissions/permissionUtils.js'

/**
 * Pure function: Filters navigation items based on the authenticated user's permissions.
 * Items requiring a module permission (e.g. Orders VIEW, Billing VIEW) are checked via hasPermission.
 * Items without permission requirements (e.g. Overview, Settings) remain accessible.
 * Unauthorized items are completely excluded from the returned array.
 */
export function filterNavItems(items = [], user = null) {
  if (!Array.isArray(items)) return []

  return items.filter((item) => {
    // Items without module or permission requirements are always accessible
    if (!item.module || !item.requiredPermission) {
      return true
    }

    // Module-permission items require valid user authorization
    return hasPermission(user, item.module, item.requiredPermission)
  })
}
