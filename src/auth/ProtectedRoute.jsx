import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { evaluateRouteAccess } from './routeAuthorization.js'

export default function ProtectedRoute({ module, children }) {
  const { isAuthenticated, user } = useAuth()

  const { allowed, redirectTo } = evaluateRouteAccess({
    isAuthenticated,
    user,
    moduleName: module,
  })

  if (!allowed) {
    return <Navigate to={redirectTo} replace />
  }

  return children ? children : <Outlet />
}
