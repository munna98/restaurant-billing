import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Eye, 
  Printer, 
  Download, 
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  Calendar,
  DollarSign
} from 'lucide-react'

interface BillItem {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

interface Bill {
  id: string
  billNumber: string
  orderNumber: string
  table?: string
  customerName?: string
  customerPhone?: string
  items: BillItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paymentMethod: 'CASH' | 'CARD' | 'UPI' | 'WALLET'
  paymentStatus: 'PAID' | 'PENDING' | 'PARTIAL'
  createdAt: string
  paidAt?: string
}

const BillingPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState('TODAY')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('ALL')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('ALL')
  const [showBillDetails, setShowBillDetails] = useState<Bill | null>(null)

  // Mock data - replace with actual data from your store
  const bills: Bill[] = [
    {
      id: '1',
      billNumber: 'BILL-001',
      orderNumber: 'ORD-001',
      table: 'Table 5',
      items: [
        { id: '1', name: 'Butter Chicken', quantity: 2, price: 320, total: 640 },
        { id: '2', name: 'Naan', quantity: 4, price: 45, total: 180 },
        { id: '3', name: 'Lassi', quantity: 2, price: 80, total: 160 }
      ],
      subtotal: 980,
      discount: 50,
      tax: 176.4,
      total: 1106.4,
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      createdAt: '2025-06-05T14:30:00Z',
      paidAt: '2025-06-05T14:35:00Z'
    },
    {
      id: '2',
      billNumber: 'BILL-002',
      orderNumber: 'ORD-002',
      customerName: 'John Doe',
      customerPhone: '+91 9876543210',
      items: [
        { id: '4', name: 'Paneer Tikka', quantity: 1, price: 280, total: 280 },
        { id: '5', name: 'Masala Chai', quantity: 2, price: 40, total: 80 }
      ],
      subtotal: 360,
      discount: 0,
      tax: 64.8,
      total: 424.8,
      paymentMethod: 'UPI',
      paymentStatus: 'PAID',
      createdAt: '2025-06-05T14:15:00Z',
      paidAt: '2025-06-05T14:16:00Z'
    },
    {
      id: '3',
      billNumber: 'BILL-003',
      orderNumber: 'ORD-003',
      table: 'Table 2',
      items: [
        { id: '6', name: 'Dal Makhani', quantity: 1, price: 220, total: 220 },
        { id: '7', name: 'Rice', quantity: 2, price: 80, total: 160 }
      ],
      subtotal: 380,
      discount: 20,
      tax: 64.8,
      total: 424.8,
      paymentMethod: 'CASH',
      paymentStatus: 'PENDING',
      createdAt: '2025-06-05T13:45:00Z'
    }
  ]

  const dateRanges = ['TODAY', 'YESTERDAY', 'THIS_WEEK', 'THIS_MONTH', 'CUSTOM']
  const paymentMethods = ['ALL', 'CASH', 'CARD', 'UPI', 'WALLET']
  const paymentStatuses = ['ALL', 'PAID', 'PENDING', 'PARTIAL']

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bill.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bill.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bill.table?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPaymentMethod = selectedPaymentMethod === 'ALL' || bill.paymentMethod === selectedPaymentMethod
    const matchesPaymentStatus = selectedPaymentStatus === 'ALL' || bill.paymentStatus === selectedPaymentStatus
    
    // Date filtering logic (simplified for mock data)
    const billDate = new Date(bill.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay()); // Start of the current week (Sunday)
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    let matchesDateRange = true;
    switch (selectedDateRange) {
        case 'TODAY':
            matchesDateRange = billDate.getDate() === today.getDate() &&
                               billDate.getMonth() === today.getMonth() &&
                               billDate.getFullYear() === today.getFullYear();
            break;
        case 'YESTERDAY':
            matchesDateRange = billDate.getDate() === yesterday.getDate() &&
                               billDate.getMonth() === yesterday.getMonth() &&
                               billDate.getFullYear() === yesterday.getFullYear();
            break;
        case 'THIS_WEEK':
            matchesDateRange = billDate >= thisWeekStart && billDate <= today;
            break;
        case 'THIS_MONTH':
            matchesDateRange = billDate >= thisMonthStart && billDate <= today;
            break;
        case 'CUSTOM':
            // Implement custom date range selection here if needed
            matchesDateRange = true; 
            break;
        default:
            matchesDateRange = true;
    }


    return matchesSearch && matchesPaymentMethod && matchesPaymentStatus && matchesDateRange
  })

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'CASH': return <Banknote className="h-4 w-4" />
      case 'CARD': return <CreditCard className="h-4 w-4" />
      case 'UPI': return <Smartphone className="h-4 w-4" />
      case 'WALLET': return <Smartphone className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'PARTIAL': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'CASH': return 'bg-green-100 text-green-800'
      case 'CARD': return 'bg-blue-100 text-blue-800'
      case 'UPI': return 'bg-purple-100 text-purple-800'
      case 'WALLET': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getTotalStats = () => {
    const totalBills = filteredBills.length
    const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.total, 0)
    const paidAmount = filteredBills
      .filter(bill => bill.paymentStatus === 'PAID')
      .reduce((sum, bill) => sum + bill.total, 0)
    const pendingAmount = filteredBills
      .filter(bill => bill.paymentStatus === 'PENDING')
      .reduce((sum, bill) => sum + bill.total, 0)
    
    return { totalBills, totalAmount, paidAmount, pendingAmount }
  }

  const stats = getTotalStats()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600 mt-1">
            View and manage all billing transactions
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bills</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBills}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Receipt className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid Amount</p>
              <p className="text-2xl font-bold text-green-600">₹{stats.paidAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Amount</p>
              <p className="text-2xl font-bold text-red-600">₹{stats.pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Banknote className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date Range */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {dateRanges.map(range => (
                <option key={range} value={range}>
                  {range.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method Filter */}
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {paymentMethods.map(method => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {paymentStatuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bill No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer/Table
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBills.length > 0 ? (
              filteredBills.map(bill => (
                <tr key={bill.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bill.billNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {bill.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {bill.customerName || bill.table || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ₹{bill.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentMethodColor(bill.paymentMethod)}`}>
                      {getPaymentMethodIcon(bill.paymentMethod)}
                      <span className="ml-1">{bill.paymentMethod}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(bill.paymentStatus)}`}>
                      {bill.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDateTime(bill.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowBillDetails(bill)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors" title="Print Bill">
                        <Printer className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No bills found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bill Details Modal */}
      {showBillDetails && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Bill Details: {showBillDetails.billNumber}</h2>
              <button
                onClick={() => setShowBillDetails(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
                <div>
                  <p><strong className="font-semibold">Order Number:</strong> {showBillDetails.orderNumber}</p>
                  {showBillDetails.table && <p><strong className="font-semibold">Table:</strong> {showBillDetails.table}</p>}
                  {showBillDetails.customerName && <p><strong className="font-semibold">Customer:</strong> {showBillDetails.customerName}</p>}
                  {showBillDetails.customerPhone && <p><strong className="font-semibold">Phone:</strong> {showBillDetails.customerPhone}</p>}
                </div>
                <div className="text-right">
                  <p><strong className="font-semibold">Billed On:</strong> {formatDateTime(showBillDetails.createdAt)}</p>
                  {showBillDetails.paidAt && <p><strong className="font-semibold">Paid At:</strong> {formatDateTime(showBillDetails.paidAt)}</p>}
                  <p><strong className="font-semibold">Payment Method:</strong> {showBillDetails.paymentMethod}</p>
                  <p><strong className="font-semibold">Payment Status:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(showBillDetails.paymentStatus)}`}>{showBillDetails.paymentStatus}</span></p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Items</h3>
              <div className="border rounded-lg overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {showBillDetails.items.map(item => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{item.price.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right text-sm text-gray-800">
                <p className="mb-1"><strong className="font-semibold">Subtotal:</strong> ₹{showBillDetails.subtotal.toLocaleString()}</p>
                <p className="mb-1"><strong className="font-semibold">Discount:</strong> ₹{showBillDetails.discount.toLocaleString()}</p>
                <p className="mb-1"><strong className="font-semibold">Tax:</strong> ₹{showBillDetails.tax.toLocaleString()}</p>
                <p className="text-lg font-bold text-gray-900 mt-2">Total: ₹{showBillDetails.total.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowBillDetails(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors mr-2"
              >
                Close
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BillingPage