import { NavLink } from 'react-router-dom'
import {
  Home,
  Menu,
  ShoppingCart,
  Receipt,
  Users,
  BarChart3,
  Settings,
  Utensils
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Menu Management', href: '/menu', icon: Menu },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Tables', href: '/tables', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <Utensils size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">RestaurantPOS</h2>
            <p className="text-xs text-gray-500">Billing System</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`
            }
          >
            <item.icon size={20} className="mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-primary-50 rounded-lg p-3">
          <p className="text-xs font-medium text-primary-700 mb-1">
            System Status
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Online</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar