import { useState } from 'react'
import { 
  Plus, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Edit,
  Trash2,
  MapPin,
  UserPlus
} from 'lucide-react'

interface Table {
  id: string
  number: string
  capacity: number
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'CLEANING'
  section: string
  currentOrder?: {
    id: string
    orderNumber: string
    customerCount: number
    startTime: string
    amount: number
  }
}

interface Customer {
  name: string
  phone: string
  email?: string
  partySize: number
}

const TableManagement = () => {
  const [showAddTableModal, setShowAddTableModal] = useState(false)
  const [showCustomerModal, setShowCustomerModal] = useState(false)
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)
  const [selectedSection, setSelectedSection] = useState('ALL')

  // Mock data - replace with actual data from your store
  const tables: Table[] = [
    {
      id: '1',
      number: 'T1',
      capacity: 4,
      status: 'OCCUPIED',
      section: 'Main Hall',
      currentOrder: {
        id: 'ORD-001',
        orderNumber: 'ORD-001',
        customerCount: 3,
        startTime: '2025-06-05T14:30:00Z',
        amount: 1250
      }
    },
    {
      id: '2',
      number: 'T2',
      capacity: 2,
      status: 'AVAILABLE',
      section: 'Main Hall'
    },
    {
      id: '3',
      number: 'T3',
      capacity: 6,
      status: 'RESERVED',
      section: 'Private Dining'
    },
    {
      id: '4',
      number: 'T4',
      capacity: 4,
      status: 'CLEANING',
      section: 'Terrace'
    },
    {
      id: '5',
      number: 'T5',
      capacity: 8,
      status: 'OCCUPIED',
      section: 'Private Dining',
      currentOrder: {
        id: 'ORD-002',
        orderNumber: 'ORD-002',
        customerCount: 6,
        startTime: '2025-06-05T13:45:00Z',
        amount: 2850
      }
    },
    {
      id: '6',
      number: 'T6',
      capacity: 4,
      status: 'AVAILABLE',
      section: 'Terrace'
    }
  ]

  const sections = ['ALL', 'Main Hall', 'Private Dining', 'Terrace']
  
  const filteredTables = tables.filter(table => 
    selectedSection === 'ALL' || table.section === selectedSection
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800 border-green-200'
      case 'OCCUPIED': return 'bg-red-100 text-red-800 border-red-200'
      case 'RESERVED': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'CLEANING': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return <CheckCircle className="h-4 w-4" />
      case 'OCCUPIED': return <Users className="h-4 w-4" />
      case 'RESERVED': return <Clock className="h-4 w-4" />
      case 'CLEANING': return <AlertCircle className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getTimeDuration = (startTime: string) => {
    const now = new Date()
    const start = new Date(startTime)
    const diffInMinutes = Math.floor((now.getTime() - start.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return `${hours}h ${minutes}m`
  }

  const getTableStats = () => {
    const total = tables.length
    const available = tables.filter(t => t.status === 'AVAILABLE').length
    const occupied = tables.filter(t => t.status === 'OCCUPIED').length
    const reserved = tables.filter(t => t.status === 'RESERVED').length
    
    return { total, available, occupied, reserved }
  }

  const stats = getTableStats()

  const handleTableClick = (table: Table) => {
    setSelectedTable(table)
    if (table.status === 'AVAILABLE') {
      setShowCustomerModal(true)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Table Management</h1>
          <p className="text-gray-600 mt-1">
            Monitor and manage restaurant tables and seating
          </p>
        </div>
        <button
          onClick={() => setShowAddTableModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Table</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tables</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-red-600">{stats.occupied}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Users className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reserved</p>
              <p className="text-2xl font-bold text-blue-600">{stats.reserved}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Section Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Section:</span>
          <div className="flex space-x-2">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedSection === section
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            onClick={() => handleTableClick(table)}
            className={`bg-white rounded-lg p-4 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${getStatusColor(table.status)}`}
          >
            {/* Table Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(table.status)}
                <span className="font-bold text-lg">{table.number}</span>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Edit table', table.id)
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Table Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Capacity:</span>
                <span className="font-medium">{table.capacity} seats</span>
              </div>
              
              <div className="text-xs text-gray-500">
                {table.section}
              </div>

              {/* Current Order Info */}
              {table.currentOrder && (
                <div className="mt-3 p-2 bg-white bg-opacity-50 rounded border">
                  <div className="text-xs font-medium text-gray-700 mb-1">
                    {table.currentOrder.orderNumber}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{table.currentOrder.customerCount} guests</span>
                    <span>{getTimeDuration(table.currentOrder.startTime)}</span>
                  </div>
                  <div className="text-xs font-medium text-gray-800 mt-1">
                    ₹{table.currentOrder.amount}
                  </div>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="mt-3">
              <span className="text-xs font-medium uppercase tracking-wide">
                {table.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Table Modal */}
      {showAddTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Table</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., T7"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of seats"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select Section</option>
                  <option value="Main Hall">Main Hall</option>
                  <option value="Private Dining">Private Dining</option>
                  <option value="Terrace">Terrace</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-2 mt-6">
              <button
                onClick={() => setShowAddTableModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddTableModal(false)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Assignment Modal */}
      {showCustomerModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              Assign Customer to {selectedTable.number}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Party Size
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedTable.capacity}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of guests"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowCustomerModal(false)
                  setSelectedTable(null)
                }}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCustomerModal(false)
                  setSelectedTable(null)
                  // Handle customer assignment
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Start Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableManagement