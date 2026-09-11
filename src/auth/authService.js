import { mockUsers, getMockUserById } from '../data/mockUsers.js'

const AUTH_STORAGE_KEY = 'rbn_authenticated_user'

export const authService = {
  getStoredUser() {
    try {
      const storedId = localStorage.getItem(AUTH_STORAGE_KEY)
      if (!storedId) return null

      const user = getMockUserById(storedId)
      if (!user) {
        // Clear invalid or unknown stored user state
        localStorage.removeItem(AUTH_STORAGE_KEY)
        return null
      }
      return user
    } catch {
      // Handle corrupted localStorage cleanly
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      } catch {
        // Ignore storage errors in restricted contexts
      }
      return null
    }
  },

  login(userId) {
    const user = getMockUserById(userId)
    if (!user) {
      throw new Error(`Authentication failed: User '${userId}' not found.`)
    }
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, user.id)
    } catch {
      // Fail safely if storage access is blocked
    }
    return user
  },

  logout() {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      // Fail safely
    }
  },

  getAllMockUsers() {
    return mockUsers
  },
}
