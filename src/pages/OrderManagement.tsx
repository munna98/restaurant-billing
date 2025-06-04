import React, { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  ShoppingCart,
  Eye,
  Edit,
  Printer,
  X, // Added for closing modals
  Tag, // For order number
  UtensilsCrossed, // For preparing
  Package, // For ready
  ClipboardList, // For new order
  DollarSign // For total
} from 'lucide-react'

// Interface definitions for OrderItem and Order
interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
}

interface Order {
  id: string
  orderNumber: string
  table?: string
  customerName?: string
  customerPhone?: string
  type: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'
  status: 'NEW' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'SERVED' | 'CANCELLED'
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  createdAt: string
  notes?: string
}

const OrderManagement = () => {
  // State variables for search and filter functionality
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [selectedType, setSelectedType] = useState('ALL')
  // State variables for modal visibility
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false)
  // State to hold the currently selected order for details view
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Mock data - In a real application, this would come from a database or API
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-001',
      table: 'Table 5',
      type: 'DINE_IN',
      status: 'PREPARING',
      items: [
        { id: '1', name: 'Butter Chicken', quantity: 2, price: 320 },
        { id: '2', name: 'Naan', quantity: 4, price: 45 }
      ],
      subtotal: 820,
      tax: 147.6,
      total: 967.6,
      createdAt: '2025-06-05T14:30:00Z'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'John Doe',
      customerPhone: '+91 9876543210',
      type: 'TAKEAWAY',
      status: 'READY',
      items: [
        { id: '3', name: 'Paneer Tikka', quantity: 1, price: 280 },
        { id: '4', name: 'Masala Chai', quantity: 2, price: 40 }
      ],
      subtotal: 360,
      tax: 64.8,
      total: 424.8,
      createdAt: '2025-06-05T14:15:00Z'
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      table: 'Table 2',
      type: 'DINE_IN',
      status: 'SERVED',
      items: [
        { id: '5', name: 'Dal Makhani', quantity: 1, price: 220 },
        { id: '6', name: 'Rice', quantity: 2, price: 80 }
      ],
      subtotal: 380,
      tax: 68.4,
      total: 448.4,
      createdAt: '2025-06-05T13:45:00Z'
    },
    {
      id: '4',
      orderNumber: 'ORD-004',
      customerName: 'Jane Smith',
      customerPhone: '+91 9988776655',
      type: 'DELIVERY',
      status: 'NEW',
      items: [
        { id: '7', name: 'Chicken Biryani', quantity: 1, price: 450 }
      ],
      subtotal: 450,
      tax: 81,
      total: 531,
      createdAt: '2025-06-05T15:00:00Z'
    },
    {
      id: '5',
      orderNumber: 'ORD-005',
      table: 'Table 1',
      type: 'DINE_IN',
      status: 'CONFIRMED',
      items: [
        { id: '8', name: 'Veg Thali', quantity: 2, price: 250 }
      ],
      subtotal: 500,
      tax: 90,
      total: 590,
      createdAt: '2025-06-05T15:10:00Z'
    }
  ])

  // Define all possible statuses and types for filters
  const statuses = ['ALL', 'NEW', 'CONFIRMED', 'PREPARING', 'READY', 'SERVED', 'CANCELLED']
  const types = ['ALL', 'DINE_IN', 'TAKEAWAY', 'DELIVERY']

  // Filter orders based on search term, selected status, and selected type
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.table?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus
    const matchesType = selectedType === 'ALL' || order.type === selectedType

    return matchesSearch && matchesStatus && matchesType
  })

  // Helper function to determine status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-100 text-blue-800'
      case 'CONFIRMED': return 'bg-purple-100 text-purple-800'
      case 'PREPARING': return 'bg-yellow-100 text-yellow-800'
      case 'READY': return 'bg-green-100 text-green-800'
      case 'SERVED': return 'bg-gray-100 text-gray-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW': return <AlertCircle className="h-4 w-4" />
      case 'CONFIRMED': return <CheckCircle className="h-4 w-4" />
      case 'PREPARING': return <UtensilsCrossed className="h-4 w-4" /> // Changed to UtensilsCrossed for preparing
      case 'READY': return <Package className="h-4 w-4" /> // Changed to Package for ready
      case 'SERVED': return <CheckCircle className="h-4 w-4" />
      case 'CANCELLED': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  // Helper function to get order type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DINE_IN': return <Users className="h-4 w-4" />
      case 'TAKEAWAY': return <ShoppingCart className="h-4 w-4" />
      case 'DELIVERY': return <ShoppingCart className="h-4 w-4" /> // Can use a different icon if desired for delivery
      default: return <ShoppingCart className="h-4 w-4" />
    }
  }

  // Helper function to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  // Helper function to calculate time ago
  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const orderTime = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  // Function to handle viewing order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setShowOrderDetailsModal(true)
  }

  // Function to handle editing an order (placeholder)
  const handleEditOrder = (orderId: string) => {
    console.log(`Edit order: ${orderId}`)
    // In a real app, this would navigate to an edit form or open an edit modal
  }

  // Function to handle printing an order (placeholder)
  const handlePrintOrder = (orderId: string) => {
    console.log(`Print order: ${orderId}`)
    // In a real app, this would trigger a print functionality
  }

  // Calculate summary statistics
  const totalOrders = orders.length
  const newOrders = orders.filter(order => order.status === 'NEW').length
  const preparingOrders = orders.filter(order => order.status === 'PREPARING').length
  const readyOrders = orders.filter(order => order.status === 'READY').length

  // Function to handle new order submission (mock)
  const handleAddNewOrder = (event: React.FormEvent) => {
    event.preventDefault()
    // In a real app, you would gather form data and add a new order to your state/database
    console.log('Adding new order...')
    // For now, just close the modal
    setShowNewOrderModal(false)
    // You might want to add a dummy order here for demonstration
    const newOrder: Order = {
      id: String(orders.length + 1),
      orderNumber: `ORD-00${orders.length + 1}`,
      type: 'DINE_IN', // Default or from form
      status: 'NEW',
      items: [{ id: '99', name: 'New Item', quantity: 1, price: 100 }],
      subtotal: 100,
      tax: 18,
      total: 118,
      createdAt: new Date().toISOString(),
      notes: 'New order from form'
    }
    setOrders(prevOrders => [...prevOrders, newOrder]);
  }


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">Orders Management</h1>
          <p className="text-gray-600 mt-1 text-lg">
            Track and manage all restaurant orders efficiently.
          </p>
        </div>
        <button
          onClick={() => setShowNewOrderModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus className="h-5 w-5" />
          <span className="font-semibold text-lg">New Order</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Orders Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
        </div>

        {/* New Orders Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">New Orders</p>
            <p className="text-2xl font-bold text-gray-900">{newOrders}</p>
          </div>
        </div>

        {/* Preparing Orders Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="p-3 bg-orange-100 rounded-full text-orange-600">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Preparing</p>
            <p className="text-2xl font-bold text-gray-900">{preparingOrders}</p>
          </div>
        </div>

        {/* Ready Orders Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Ready for Pickup/Serve</p>
            <p className="text-2xl font-bold text-gray-900">{readyOrders}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by order number, table, or customer name..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative w-full md:w-auto">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status.replace('_', ' ')}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Type Filter */}
          <div className="relative w-full md:w-auto">
            <ShoppingCart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-700"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>{type.replace('_', ' ')}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedStatus('ALL')
              setSelectedType('ALL')
            }}
            className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm transition-colors duration-200 font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-xl">
                  Order No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-xl">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <span>{order.orderNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(order.type)}
                        <span>{order.type.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(order.status)}
                          <span>{order.status.replace('_', ' ')}</span>
                        </div>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.type === 'DINE_IN' && order.table && (
                        <p>Table: <span className="font-medium">{order.table}</span></p>
                      )}
                      {(order.type === 'TAKEAWAY' || order.type === 'DELIVERY') && order.customerName && (
                        <>
                          <p>Customer: <span className="font-medium">{order.customerName}</span></p>
                          {order.customerPhone && <p>Phone: <span className="font-medium">{order.customerPhone}</span></p>}
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <ul className="list-disc list-inside text-sm">
                        {order.items.slice(0, 2).map(item => (
                          <li key={item.id}>{item.name} (x{item.quantity})</li>
                        ))}
                        {order.items.length > 2 && (
                          <li>...and {order.items.length - 2} more items</li>
                        )}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <p>{formatTime(order.createdAt)}</p>
                      <p className="text-xs text-gray-500">{getTimeAgo(order.createdAt)}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                          title="View Order Details"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditOrder(order.id)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                          title="Edit Order"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handlePrintOrder(order.id)}
                          className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors duration-200"
                          title="Print Receipt"
                        >
                          <Printer className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-gray-500 text-lg">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Order Details: {selectedOrder.orderNumber}</h2>
              <button
                onClick={() => setShowOrderDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm font-semibold text-gray-500">Order Type:</p>
                <p className="text-lg font-medium capitalize">{selectedOrder.type.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500">Status:</p>
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(selectedOrder.status)}
                    <span>{selectedOrder.status.replace('_', ' ')}</span>
                  </div>
                </span>
              </div>
              {selectedOrder.table && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">Table:</p>
                  <p className="text-lg font-medium">{selectedOrder.table}</p>
                </div>
              )}
              {selectedOrder.customerName && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">Customer Name:</p>
                  <p className="text-lg font-medium">{selectedOrder.customerName}</p>
                </div>
              )}
              {selectedOrder.customerPhone && (
                <div>
                  <p className="text-sm font-semibold text-gray-500">Customer Phone:</p>
                  <p className="text-lg font-medium">{selectedOrder.customerPhone}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-500">Order Placed At:</p>
                <p className="text-lg font-medium">{new Date(selectedOrder.createdAt).toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Items:</h3>
              <div className="space-y-3">
                {selectedOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-600">x{item.quantity} @ ₹{item.price.toFixed(2)}</p>
                    <p className="font-semibold text-gray-900">₹{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 text-right">
                <p className="text-lg text-gray-700">Subtotal: <span className="font-semibold">₹{selectedOrder.subtotal.toFixed(2)}</span></p>
                <p className="text-lg text-gray-700">Tax: <span className="font-semibold">₹{selectedOrder.tax.toFixed(2)}</span></p>
                <p className="text-2xl font-bold text-gray-900">Total: <span className="text-blue-600">₹{selectedOrder.total.toFixed(2)}</span></p>
              </div>
            </div>

            {selectedOrder.notes && (
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Notes:</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowOrderDetailsModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm transition-colors duration-200 font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => handlePrintOrder(selectedOrder.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md flex items-center space-x-2 transition-colors duration-200"
              >
                <Printer className="h-5 w-5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Order</h2>
              <button
                onClick={() => setShowNewOrderModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddNewOrder} className="p-6 space-y-6">
              {/* Order Type */}
              <div>
                <label htmlFor="orderType" className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                <select
                  id="orderType"
                  name="orderType"
                  className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                  defaultValue="DINE_IN" // Set a default value
                >
                  {types.filter(type => type !== 'ALL').map(type => (
                    <option key={type} value={type}>{type.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              {/* Customer/Table Details (simplified for demo) */}
              <div>
                <label htmlFor="customerInfo" className="block text-sm font-medium text-gray-700 mb-2">Table / Customer Name</label>
                <input
                  type="text"
                  id="customerInfo"
                  name="customerInfo"
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  placeholder="e.g., Table 7 or John Doe"
                />
              </div>

              {/* Items (simplified for demo) */}
              <div>
                <label htmlFor="items" className="block text-sm font-medium text-gray-700 mb-2">Items (e.g., 2x Butter Chicken, 1x Naan)</label>
                <textarea
                  id="items"
                  name="items"
                  rows={4}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  placeholder="List items and quantities here"
                ></textarea>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400"
                  placeholder="Any special requests or instructions"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewOrderModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm transition-colors duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md flex items-center space-x-2 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement

