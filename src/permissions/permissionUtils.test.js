import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { PERMISSIONS } from './permissions.js'
import { MODULES } from './modules.js'
import {
  hasPermission,
  canAccessModule,
  hasAnyPermission,
  hasAllPermissions,
} from './permissionUtils.js'
import { mockUsers } from '../data/mockUsers.js'

const admin = mockUsers.find((u) => u.role === 'Admin')
const operations = mockUsers.find((u) => u.role === 'Operations')
const viewer = mockUsers.find((u) => u.role === 'Viewer')

describe('Permission Utilities Unit Tests', () => {
  describe('A. Admin Permissions', () => {
    test('Admin should have Orders VIEW', () => {
      assert.equal(hasPermission(admin, MODULES.ORDERS, PERMISSIONS.VIEW), true)
    })

    test('Admin should have Orders CREATE', () => {
      assert.equal(hasPermission(admin, MODULES.ORDERS, PERMISSIONS.CREATE), true)
    })

    test('Admin should have Billing VIEW', () => {
      assert.equal(hasPermission(admin, MODULES.BILLING, PERMISSIONS.VIEW), true)
    })
  })

  describe('B. Operations Permissions', () => {
    test('Operations should have Orders VIEW', () => {
      assert.equal(hasPermission(operations, MODULES.ORDERS, PERMISSIONS.VIEW), true)
    })

    test('Operations should have Orders CREATE', () => {
      assert.equal(hasPermission(operations, MODULES.ORDERS, PERMISSIONS.CREATE), true)
    })

    test('Operations should NOT have Billing VIEW', () => {
      assert.equal(hasPermission(operations, MODULES.BILLING, PERMISSIONS.VIEW), false)
    })
  })

  describe('C. Viewer Permissions', () => {
    test('Viewer should have Orders VIEW', () => {
      assert.equal(hasPermission(viewer, MODULES.ORDERS, PERMISSIONS.VIEW), true)
    })

    test('Viewer should NOT have Orders CREATE', () => {
      assert.equal(hasPermission(viewer, MODULES.ORDERS, PERMISSIONS.CREATE), false)
    })

    test('Viewer should NOT have Billing VIEW', () => {
      assert.equal(hasPermission(viewer, MODULES.BILLING, PERMISSIONS.VIEW), false)
    })
  })

  describe('D. Module Access Checks', () => {
    test('Admin can access Orders module', () => {
      assert.equal(canAccessModule(admin, MODULES.ORDERS), true)
    })

    test('Admin can access Billing module', () => {
      assert.equal(canAccessModule(admin, MODULES.BILLING), true)
    })

    test('Operations can access Orders module', () => {
      assert.equal(canAccessModule(operations, MODULES.ORDERS), true)
    })

    test('Operations CANNOT access Billing module', () => {
      assert.equal(canAccessModule(operations, MODULES.BILLING), false)
    })

    test('Viewer can access Orders module', () => {
      assert.equal(canAccessModule(viewer, MODULES.ORDERS), true)
    })

    test('Viewer CANNOT access Billing module', () => {
      assert.equal(canAccessModule(viewer, MODULES.BILLING), false)
    })
  })

  describe('E. Invalid and Edge Cases', () => {
    test('Null user returns false for hasPermission', () => {
      assert.equal(hasPermission(null, MODULES.ORDERS, PERMISSIONS.VIEW), false)
    })

    test('Null user returns false for canAccessModule', () => {
      assert.equal(canAccessModule(null, MODULES.ORDERS), false)
    })

    test('Unknown module returns false', () => {
      assert.equal(hasPermission(admin, 'UnknownModule', PERMISSIONS.VIEW), false)
      assert.equal(canAccessModule(admin, 'UnknownModule'), false)
    })

    test('Unknown permission returns false', () => {
      assert.equal(hasPermission(admin, MODULES.ORDERS, 'DELETE'), false)
      assert.equal(hasPermission(admin, MODULES.ORDERS, 'EXECUTE'), false)
    })
  })

  describe('F. Multiple Permission Helpers', () => {
    test('hasAnyPermission returns true if user has at least one permission', () => {
      assert.equal(
        hasAnyPermission(operations, MODULES.ORDERS, [PERMISSIONS.CREATE, 'DELETE']),
        true
      )
    })

    test('hasAnyPermission returns false if user has none of the permissions', () => {
      assert.equal(
        hasAnyPermission(viewer, MODULES.ORDERS, [PERMISSIONS.CREATE, 'DELETE']),
        false
      )
    })

    test('hasAllPermissions returns true if user has all listed permissions', () => {
      assert.equal(
        hasAllPermissions(admin, MODULES.ORDERS, [PERMISSIONS.VIEW, PERMISSIONS.CREATE]),
        true
      )
    })

    test('hasAllPermissions returns false if user lacks any listed permission', () => {
      assert.equal(
        hasAllPermissions(viewer, MODULES.ORDERS, [PERMISSIONS.VIEW, PERMISSIONS.CREATE]),
        false
      )
    })
  })

  describe('G. Orders CREATE Action Control Matrix', () => {
    test('Alex (Admin) has Orders CREATE permission -> Create Order button VISIBLE', () => {
      assert.equal(hasPermission(admin, MODULES.ORDERS, PERMISSIONS.CREATE), true)
    })

    test('Jordan (Operations) has Orders CREATE permission -> Create Order button VISIBLE', () => {
      assert.equal(hasPermission(operations, MODULES.ORDERS, PERMISSIONS.CREATE), true)
    })

    test('Sam (Viewer) lacks Orders CREATE permission -> Create Order button HIDDEN', () => {
      assert.equal(hasPermission(viewer, MODULES.ORDERS, PERMISSIONS.CREATE), false)
    })

    test('Null user lacks Orders CREATE permission -> Create Order button HIDDEN', () => {
      assert.equal(hasPermission(null, MODULES.ORDERS, PERMISSIONS.CREATE), false)
    })
  })
})
