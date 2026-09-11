import { canAccessModule } from '../permissions/permissionUtils.js'

/**
 * Pure decision function evaluating route authorization.
 * @param {Object} options
 * @param {boolean} options.isAuthenticated - Whether user is signed in
 * @param {Object|null} options.user - The current authenticated user object
 * @param {string} [options.moduleName] - Optional module permission requirement
 * @returns {{ allowed: boolean, redirectTo?: string }}
 */
export function evaluateRouteAccess({ isAuthenticated, user, moduleName }) {
  if (!isAuthenticated || !user) {
    return { allowed: false, redirectTo: '/login' }
  }

  if (moduleName) {
    const isAllowed = canAccessModule(user, moduleName)
    if (!isAllowed) {
      return { allowed: false, redirectTo: '/' }
    }
  }

  return { allowed: true }
}
