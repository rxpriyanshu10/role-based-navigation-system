import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { evaluateRouteAccess } from './routeAuthorization.js'
import { MODULES } from '../permissions/modules.js'
import { mockUsers } from '../data/mockUsers.js'

const admin = mockUsers.find((u) => u.role === 'Admin')
const operations = mockUsers.find((u) => u.role === 'Operations')
const viewer = mockUsers.find((u) => u.role === 'Viewer')

describe('Route Authorization Matrix Unit Tests', () => {
  describe('Unauthenticated User Route Access', () => {
    test('Unauthenticated user accessing root / is redirected to /login', () => {
      const result = evaluateRouteAccess({ isAuthenticated: false, user: null })
      assert.deepEqual(result, { allowed: false, redirectTo: '/login' })
    })

    test('Unauthenticated user accessing Orders is redirected to /login', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: false,
        user: null,
        moduleName: MODULES.ORDERS,
      })
      assert.deepEqual(result, { allowed: false, redirectTo: '/login' })
    })

    test('Unauthenticated user accessing Billing is redirected to /login', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: false,
        user: null,
        moduleName: MODULES.BILLING,
      })
      assert.deepEqual(result, { allowed: false, redirectTo: '/login' })
    })
  })

  describe('Admin (Alex Morgan) Route Access', () => {
    test('Admin accessing root / is allowed', () => {
      const result = evaluateRouteAccess({ isAuthenticated: true, user: admin })
      assert.deepEqual(result, { allowed: true })
    })

    test('Admin accessing Orders is allowed', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: true,
        user: admin,
        moduleName: MODULES.ORDERS,
      })
      assert.deepEqual(result, { allowed: true })
    })

    test('Admin accessing Billing is allowed', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: true,
        user: admin,
        moduleName: MODULES.BILLING,
      })
      assert.deepEqual(result, { allowed: true })
    })
  })

  describe('Operations (Jordan Lee) Route Access', () => {
    test('Operations accessing root / is allowed', () => {
      const result = evaluateRouteAccess({ isAuthenticated: true, user: operations })
      assert.deepEqual(result, { allowed: true })
    })

    test('Operations accessing Orders is allowed', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: true,
        user: operations,
        moduleName: MODULES.ORDERS,
      })
      assert.deepEqual(result, { allowed: true })
    })

    test('Operations accessing Billing is denied and redirected to /', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: true,
        user: operations,
        moduleName: MODULES.BILLING,
      })
      assert.deepEqual(result, { allowed: false, redirectTo: '/' })
    })
  })

  describe('Viewer (Sam Taylor) Route Access', () => {
    test('Viewer accessing root / is allowed', () => {
      const result = evaluateRouteAccess({ isAuthenticated: true, user: viewer })
      assert.deepEqual(result, { allowed: true })
    })

    test('Viewer accessing Orders is allowed', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: true,
        user: viewer,
        moduleName: MODULES.ORDERS,
      })
      assert.deepEqual(result, { allowed: true })
    })

    test('Viewer accessing Billing is denied and redirected to /', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: true,
        user: viewer,
        moduleName: MODULES.BILLING,
      })
      assert.deepEqual(result, { allowed: false, redirectTo: '/' })
    })
  })

  describe('Invalid User and Edge Cases', () => {
    test('Null user with isAuthenticated=true fails safely and redirects to /login', () => {
      const result = evaluateRouteAccess({ isAuthenticated: true, user: null })
      assert.deepEqual(result, { allowed: false, redirectTo: '/login' })
    })

    test('Authenticated user with unknown module fails safely and redirects to /', () => {
      const result = evaluateRouteAccess({
        isAuthenticated: true,
        user: admin,
        moduleName: 'UnknownModule',
      })
      assert.deepEqual(result, { allowed: false, redirectTo: '/' })
    })
  })
})
