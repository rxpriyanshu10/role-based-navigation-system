import { PERMISSIONS } from './permissions.js'
import { MODULE_DEFINITIONS } from './modules.js'

/**
 * Validates if a module exists in the centralized module definitions.
 */
function isValidModule(moduleName) {
  if (!moduleName) return false
  return MODULE_DEFINITIONS.some((mod) => mod.name === moduleName)
}

/**
 * Validates if a permission exists for a given module in the definitions.
 */
function isValidPermissionForModule(moduleName, permission) {
  if (!isValidModule(moduleName) || !permission) return false
  const modDef = MODULE_DEFINITIONS.find((mod) => mod.name === moduleName)
  return modDef ? modDef.permissions.includes(permission) : false
}

/**
 * Pure function: Checks whether a user has a specific permission for a module.
 * Default-deny: returns false if user, module, or permission is invalid or unassigned.
 */
export function hasPermission(user, moduleName, permission) {
  if (!user || !user.permissions || typeof user.permissions !== 'object') {
    return false
  }

  if (!isValidPermissionForModule(moduleName, permission)) {
    return false
  }

  const modulePermissions = user.permissions[moduleName]
  if (!Array.isArray(modulePermissions)) {
    return false
  }

  return modulePermissions.includes(permission)
}

/**
 * Pure function: Checks whether a user can access a module.
 * A module is accessible if the user has at least the VIEW permission for that module.
 */
export function canAccessModule(user, moduleName) {
  return hasPermission(user, moduleName, PERMISSIONS.VIEW)
}

/**
 * Pure function: Checks whether a user has AT LEAST ONE of the specified permissions.
 */
export function hasAnyPermission(user, moduleName, permissions = []) {
  if (!Array.isArray(permissions) || permissions.length === 0) {
    return false
  }
  return permissions.some((perm) => hasPermission(user, moduleName, perm))
}

/**
 * Pure function: Checks whether a user has ALL of the specified permissions.
 */
export function hasAllPermissions(user, moduleName, permissions = []) {
  if (!Array.isArray(permissions) || permissions.length === 0) {
    return false
  }
  return permissions.every((perm) => hasPermission(user, moduleName, perm))
}
