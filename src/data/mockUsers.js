export const mockUsers = [
  {
    id: 'admin-001',
    name: 'Alex Morgan',
    role: 'Admin',
    permissions: {
      Orders: ['VIEW', 'CREATE'],
      Billing: ['VIEW'],
    },
  },
  {
    id: 'operations-001',
    name: 'Jordan Lee',
    role: 'Operations',
    permissions: {
      Orders: ['VIEW', 'CREATE'],
      Billing: [],
    },
  },
  {
    id: 'viewer-001',
    name: 'Sam Taylor',
    role: 'Viewer',
    permissions: {
      Orders: ['VIEW'],
      Billing: [],
    },
  },
]

export function getMockUserById(id) {
  if (!id) return null
  return mockUsers.find((user) => user.id === id) || null
}

export function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
