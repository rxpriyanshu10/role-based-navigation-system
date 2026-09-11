import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { workspaceNav, accountNav, allNavItems } from '../navigation/navigationConfig.js'
import { filterNavItems } from './navigationFilter.js'
import { mockUsers } from '../data/mockUsers.js'

const admin = mockUsers.find((u) => u.role === 'Admin')
const operations = mockUsers.find((u) => u.role === 'Operations')
const viewer = mockUsers.find((u) => u.role === 'Viewer')

describe('Navigation Filtering Unit Tests', () => {
  describe('Admin Navigation (Alex Morgan)', () => {
    test('Admin receives all workspace modules (Overview, Orders, Billing)', () => {
      const filtered = filterNavItems(workspaceNav, admin)
      const labels = filtered.map((item) => item.label)
      assert.deepEqual(labels, ['Overview', 'Orders', 'Billing'])
    })

    test('Admin receives complete navigation (Overview, Orders, Billing, Settings)', () => {
      const filtered = filterNavItems(allNavItems, admin)
      const labels = filtered.map((item) => item.label)
      assert.deepEqual(labels, ['Overview', 'Orders', 'Billing', 'Settings'])
    })
  })

  describe('Operations Navigation (Jordan Lee)', () => {
    test('Operations receives Overview and Orders, Billing is completely excluded', () => {
      const filtered = filterNavItems(workspaceNav, operations)
      const labels = filtered.map((item) => item.label)
      assert.deepEqual(labels, ['Overview', 'Orders'])
      assert.equal(labels.includes('Billing'), false)
    })

    test('Operations total navigation contains Overview, Orders, Settings', () => {
      const filtered = filterNavItems(allNavItems, operations)
      const labels = filtered.map((item) => item.label)
      assert.deepEqual(labels, ['Overview', 'Orders', 'Settings'])
    })
  })

  describe('Viewer Navigation (Sam Taylor)', () => {
    test('Viewer receives Overview and Orders, Billing is completely excluded', () => {
      const filtered = filterNavItems(workspaceNav, viewer)
      const labels = filtered.map((item) => item.label)
      assert.deepEqual(labels, ['Overview', 'Orders'])
      assert.equal(labels.includes('Billing'), false)
    })

    test('Viewer total navigation contains Overview, Orders, Settings', () => {
      const filtered = filterNavItems(allNavItems, viewer)
      const labels = filtered.map((item) => item.label)
      assert.deepEqual(labels, ['Overview', 'Orders', 'Settings'])
    })
  })

  describe('Unauthenticated / Null User Navigation', () => {
    test('Null user receives only permissionless items (Overview, Settings)', () => {
      const filtered = filterNavItems(allNavItems, null)
      const labels = filtered.map((item) => item.label)
      assert.deepEqual(labels, ['Overview', 'Settings'])
      assert.equal(labels.includes('Orders'), false)
      assert.equal(labels.includes('Billing'), false)
    })
  })
})
