import React, { useState } from 'react'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Users,
  Filter,
  FileText,
  Printer
} from 'lucide-react'

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('today')
  const [reportType, setReportType] = useState('sales')

  // Mock data - replace with actual data from your store
  const salesData = [
    { date: '2025-06-01', sales: 12500, orders: 45 },
    { date: '2025-06-02', sales: 15800, orders: 52 },
    { date: '2025-06-03', sales: 13200, orders: 41 },
    { date: '2025-06-04', sales: 18900, orders: 67 },
    { date: '2025-06-05', sales: 16400, orders: 58 }
  ]

  const topItemsData = [
    { name: 'Butter Chicken', quantity: 45, revenue: 14400 },
    { name: 'Paneer Tikka', quantity: 38, revenue: 10640 },
    { name: 'Biryani', quantity: 32, revenue: 12800 },
    { name: 'Naan', quantity: 67, revenue: 3015 },
    { name: 'Dal Makhani', quantity: 28, revenue: 6160 }
  ]

  const paymentMethodData = [
    { name: 'Cash', value: 45, color: '#10B981' },
    { name: 'Card', value: 30, color: '#3B82F6' },
    { name: 'UPI', value: 20, color: '#8B5CF6' },
    { name: 'Other', value: 5, color: '#F59E0B' }
  ]

  const hourlyData = [
    { hour: '10:00', orders: 2 },
    { hour: '11:00', orders: 5 },
    { hour: '12:00', orders: 12 },
    { hour: '13:00', orders: 18 },
    { hour: '14:00', orders: 15 },
    { hour: '15:00', orders: 8 },
    { hour: '16:00', orders: 6 },
    { hour: '17:00', orders: 10 },
    { hour: '18:00', orders: 14 },
    { hour: '19:00', orders: 22 },
    { hour: '20:00', orders: 25 },
    { hour: '21:00', orders: 18 }
  ]

  const summaryStats = {
    totalSales: 76800,
    totalOrders: 263,
    averageOrderValue: 292,
    topSellingItem: 'Butter Chicken',
    peakHour: '8:00 PM - 9:00 PM',
    customerCount: 420
  }

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting ${reportType} report as ${format}`)
    // Implement export functionality
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ReportsPage & Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track performance and generate business insights
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleExport('csv')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="sales">Sales Report</option>
              <option value="items">Item Performance</option>
              <option value="payment">Payment Analysis</option>
              <option value="hourly">Hourly Analysis</option>
              <option value="customers">Customer Report</option>
            </select>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <TrendingUp className="h-4 w-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{summaryStats.totalSales.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+15% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Avg: {summaryStats.averageOrderValue} per order
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers Served</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.customerCount}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Peak: {summaryStats.peakHour}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Item</p>
              <p className="text-lg font-bold text-gray-900">{summaryStats.topSellingItem}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Most popular today
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? `₹${value.toLocaleString()}` : value,
                    name === 'sales' ? 'Sales' : 'Orders'
                  ]}
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Items */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Items</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topItemsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip formatter={(value) => [`${value}`, 'Quantity']} />
                <Bar dataKey="quantity" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Orders */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Order Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage