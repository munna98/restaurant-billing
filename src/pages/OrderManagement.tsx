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
  Printer
} from 'lucide-react'

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

const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [selectedType, setSelectedType] = useState('ALL')
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)

  // Mock data - replace with actual data from your store
  const orders: Order[] = [
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
    }
  ]

  const statuses = ['ALL', 'NEW', 'CONFIRMED', 'PREPARING', 'READY', 'SERVED', 'CANCELLED']
  const types = ['ALL', 'DINE_IN', 'TAKEAWAY', 'DELIVERY']

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.table?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'ALL' || order.status === selectedStatus
    const matchesType = selectedType === 'ALL' || order.type === selectedType
    
    return matchesSearch && matchesStatus && matchesType
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW': return <AlertCircle className="h-4 w-4" />
      case 'CONFIRMED': return <CheckCircle className="h-4 w-4" />
      case 'PREPARING': return <Clock className="h-4 w-4" />
      case 'READY': return <CheckCircle className="h-4 w-4" />
      case 'SERVED': return <CheckCircle className="h-4 w-4" />
      case 'CANCELLED': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'DINE_IN': return <Users className="h-4 w-4" />
      case 'TAKEAWAY': return <ShoppingCart className="h-4 w-4" />
      case 'DELIVERY': return <ShoppingCart className="h-4 w-4" />
      default: return <ShoppingCart className="h-4 w-4" />
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const orderTime = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - orderTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">
            Track and manage all restaurant orders
          </p>
        </div>
        <button
          onClick={() => setShowNewOrderModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Summary Cards */}
{/* need to complete this */}