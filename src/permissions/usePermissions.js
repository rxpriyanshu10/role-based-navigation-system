import { useCallback } from 'react'
import { useAuth } from '../auth/AuthContext'
import {
  hasPermission,
  canAccessModule,
  hasAnyPermission,
  hasAllPermissions,
} from './permissionUtils'

export function usePermissions() {
  const { user } = useAuth()

  const can = useCallback(
    (moduleName, permission) => hasPermission(user, moduleName, permission),
    [user]
  )

  const canAccess = useCallback(
    (moduleName) => canAccessModule(user, moduleName),
    [user]
  )

  const canAny = useCallback(
    (moduleName, permissions) => hasAnyPermission(user, moduleName, permissions),
    [user]
  )

  const canAll = useCallback(
    (moduleName, permissions) => hasAllPermissions(user, moduleName, permissions),
    [user]
  )

  return {
    can,
    canAccess,
    canAny,
    canAll,
    user,
  }
}
