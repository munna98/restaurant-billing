import { useState } from 'react'
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  type: 'VEG' | 'NON_VEG' | 'BEVERAGE' | 'DESSERT'
  isAvailable: boolean
  image?: string
}

const MenuManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedType, setSelectedType] = useState('ALL')
  const [showAddModal, setShowAddModal] = useState(false)

  // Mock data - replace with actual data from your store
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Butter Chicken',
      description: 'Tender chicken in rich tomato-butter gravy',
      price: 320,
      category: 'Main Course',
      type: 'NON_VEG',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Paneer Tikka Masala',
      description: 'Grilled paneer cubes in spiced tomato gravy',
      price: 280,
      category: 'Main Course',
      type: 'VEG',
      isAvailable: true
    },
    {
      id: '3',
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea',
      price: 40,
      category: 'Beverages',
      type: 'BEVERAGE',
      isAvailable: false
    },
    {
      id: '4',
      name: 'Gulab Jamun',
      description: 'Sweet milk dumplings in sugar syrup',
      price: 120,
      category: 'Desserts',
      type: 'DESSERT',
      isAvailable: true
    }
  ]

  const categories = ['ALL', 'Starters', 'Main Course', 'Beverages', 'Desserts']
  const types = ['ALL', 'VEG', 'NON_VEG', 'BEVERAGE', 'DESSERT']

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory
    const matchesType = selectedType === 'ALL' || item.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VEG': return 'bg-green-100 text-green-800'
      case 'NON_VEG': return 'bg-red-100 text-red-800'
      case 'BEVERAGE': return 'bg-blue-100 text-blue-800'
      case 'DESSERT': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VEG': return '🟢'
      case 'NON_VEG': return '🔴'
      case 'BEVERAGE': return '🥤'
      case 'DESSERT': return '🍰'
      default: return '🍽️'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your restaurant's menu items and categories
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Item Image Placeholder */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">{getTypeIcon(item.type)}</span>
            </div>

            <div className="p-6">
              {/* Item Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => console.log('Toggle availability', item.id)}
                    className={`p-1 rounded ${item.isAvailable ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    {item.isAvailable ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Item Details */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                    {item.type}
                  </span>
                  <span className="text-sm text-gray-600">{item.category}</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ₹{item.price}
                </div>
              </div>

              {/* Availability Status */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-medium ${item.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => console.log('Edit item', item.id)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => console.log('Delete item', item.id)}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Add Item Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
            <p className="text-gray-600 mb-4">Form implementation needed here</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuManagement