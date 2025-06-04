// ==================== src/App.jsx ====================
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import MenuManagement from './pages/MenuManagement'
import OrderManagement from './pages/OrderManagement'
import BillingPage from './pages/BillingPage'
import TableManagement from './pages/TableManagement'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import Header from './components/common/Header'
import Sidebar from './components/common/Sidebar'

function App() {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={
              <ProtectedRoute requiredRoles={['ADMIN', 'MANAGER']}>
                <MenuManagement />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/billing" element={<BillingPage />} />
            <Route path="/tables" element={<TableManagement />} />
            <Route path="/reports" element={
              <ProtectedRoute requiredRoles={['ADMIN', 'MANAGER']}>
                <ReportsPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <SettingsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
      <Toaster position="