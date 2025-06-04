import { Bell, Settings, User, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'

const Header = () => {
  const { user, logout } = useAuthStore()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    setShowDropdown(false)
  }

  return (
    <header className="fixed top-0 right-0 left-64 bg-white shadow-sm border-b border-gray-200 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Restaurant Billing System
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.name || 'User'}
              </span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header