import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import Overview from './pages/Overview'
import Orders from './pages/Orders'
import { Billing, SettingsPage } from './pages/Placeholders'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { MODULES } from './permissions/modules.js'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Authenticated Layout Guard */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route
            path="orders"
            element={
              <ProtectedRoute module={MODULES.ORDERS}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="billing"
            element={
              <ProtectedRoute module={MODULES.BILLING}>
                <Billing />
              </ProtectedRoute>
            }
          />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
