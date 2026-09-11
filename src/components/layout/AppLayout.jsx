import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  return (
    <div className="flex h-screen overflow-hidden bg-page">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={openSidebar} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1220px] px-6 sm:px-8 lg:px-10 py-8 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
