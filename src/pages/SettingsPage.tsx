import { useState } from 'react'
import {
  Save,
  Settings as SettingsIcon,
  Store,
  CreditCard,
  Users,
  Database,
  Printer,
  Download,
  Upload,
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

interface RestaurantSettings {
  name: string
  address: string
  phone: string
  email: string
  gstNumber: string
  fssaiNumber: string
  logo?: string
}

interface TaxSettings {
  cgst: number
  sgst: number
  serviceCharge: number
  packagingCharge: number
}

interface PrinterSettings {
  kotPrinter: string
  billPrinter: string
  paperSize: string
  printLogo: boolean
  printGst: boolean
}

interface SystemSettings {
  autoBackup: boolean
  backupFrequency: string
  dataRetention: number
  currency: string
  timezone: string
  language: string
  theme: string
}

const SettingsPage = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('restaurant')
  const [isLoading, setIsLoading] = useState(false)

  // Mock settings data - replace with actual store data
  const [restaurantSettings, setRestaurantSettings] = useState<RestaurantSettings>({
    name: 'Spice Garden Restaurant',
    address: '123 Main Street, City Center, State - 123456',
    phone: '+91 9876543210',
    email: 'info@spicegarden.com',
    gstNumber: '22AAAAA0000A1Z5',
    fssaiNumber: '12345678901234'
  })

  const [taxSettings, setTaxSettings] = useState<TaxSettings>({
    cgst: 2.5,
    sgst: 2.5,
    serviceCharge: 10,
    packagingCharge: 15
  })

  const [printerSettings, setPrinterSettings] = useState<PrinterSettings>({
    kotPrinter: 'Kitchen Printer',
    billPrinter: 'Bill Printer',
    paperSize: '80mm',
    printLogo: true,
    printGst: true
  })

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    autoBackup: true,
    backupFrequency: 'daily',
    dataRetention: 365,
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    language: 'en',
    theme: 'light'
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`${section} settings saved successfully!`)
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackup = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Backup created successfully!')
    } catch (error) {
      toast.error('Backup failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestore = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Data restored successfully!')
    } catch (error) {
      toast.error('Restore failed')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'restaurant', label: 'Restaurant Info', icon: Store },
    { id: 'tax', label: 'Tax & Charges', icon: CreditCard },
    { id: 'printer', label: 'Printer Setup', icon: Printer },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System', icon: SettingsIcon },
    { id: 'backup', label: 'Backup & Restore', icon: Database }
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure your restaurant management system
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Restaurant Info Tab */}
            {activeTab === 'restaurant' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Store className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Restaurant Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Restaurant Name *
                    </label>
                    <input
                      type="text"
                      value={restaurantSettings.name}
                      onChange={(e) => setRestaurantSettings({ ...restaurantSettings, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={restaurantSettings.phone}
                      onChange={(e) => setRestaurantSettings({ ...restaurantSettings, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={restaurantSettings.email}
                      onChange={(e) => setRestaurantSettings({ ...restaurantSettings, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST Number
                    </label>
                    <input
                      type="text"
                      value={restaurantSettings.gstNumber}
                      onChange={(e) => setRestaurantSettings({ ...restaurantSettings, gstNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      value={restaurantSettings.address}
                      onChange={(e) => setRestaurantSettings({ ...restaurantSettings, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      FSSAI Number
                    </label>
                    <input
                      type="text"
                      value={restaurantSettings.fssaiNumber}
                      onChange={(e) => setRestaurantSettings({ ...restaurantSettings, fssaiNumber: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('Restaurant')}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tax Settings Tab */}
            {activeTab === 'tax' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Tax & Charges</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CGST Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={taxSettings.cgst}
                      onChange={(e) => setTaxSettings({ ...taxSettings, cgst: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SGST Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={taxSettings.sgst}
                      onChange={(e) => setTaxSettings({ ...taxSettings, sgst: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Charge (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={taxSettings.serviceCharge}
                      onChange={(e) => setTaxSettings({ ...taxSettings, serviceCharge: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Packaging Charge (₹)
                    </label>
                    <input
                      type="number"
                      value={taxSettings.packagingCharge}
                      onChange={(e) => setTaxSettings({ ...taxSettings, packagingCharge: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Tax Calculation Preview</h3>
                  <div className="text-sm text-blue-800">
                    <p>Sample Bill for ₹1000:</p>
                    <p>CGST ({taxSettings.cgst}%): ₹{(1000 * taxSettings.cgst / 100).toFixed(2)}</p>
                    <p>SGST ({taxSettings.sgst}%): ₹{(1000 * taxSettings.sgst / 100).toFixed(2)}</p>
                    <p>Service Charge ({taxSettings.serviceCharge}%): ₹{(1000 * taxSettings.serviceCharge / 100).toFixed(2)}</p>
                    <p className="font-medium">Total: ₹{(1000 + (1000 * (taxSettings.cgst + taxSettings.sgst + taxSettings.serviceCharge) / 100)).toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('Tax')}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Printer Settings Tab */}
            {activeTab === 'printer' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Printer className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Printer Setup</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      KOT Printer
                    </label>
                    <input
                      type="text"
                      value={printerSettings.kotPrinter}
                      onChange={(e) => setPrinterSettings({ ...printerSettings, kotPrinter: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bill Printer
                    </label>
                    <input
                      type="text"
                      value={printerSettings.billPrinter}
                      onChange={(e) => setPrinterSettings({ ...printerSettings, billPrinter: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paper Size
                    </label>
                    <select
                      value={printerSettings.paperSize}
                      onChange={(e) => setPrinterSettings({ ...printerSettings, paperSize: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="80mm">80mm</option>
                      <option value="58mm">58mm</option>
                      <option value="A4">A4</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center mt-2">
                      <input
                        id="printLogo"
                        type="checkbox"
                        checked={printerSettings.printLogo}
                        onChange={(e) => setPrinterSettings({ ...printerSettings, printLogo: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="printLogo" className="ml-2 block text-sm font-medium text-gray-700">
                        Print Restaurant Logo on Bill
                      </label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="printGst"
                        type="checkbox"
                        checked={printerSettings.printGst}
                        onChange={(e) => setPrinterSettings({ ...printerSettings, printGst: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="printGst" className="ml-2 block text-sm font-medium text-gray-700">
                        Print GST Details on Bill
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('Printer')}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* User Management Tab - Placeholder */}
            {activeTab === 'users' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                </div>
                <div className="text-gray-600">
                  <p>User management features will be available here.</p>
                  <p className="mt-2">Current User: <span className="font-medium">{'N/A'}</span></p>
                </div>
              </div>
            )}

            {/* System Settings Tab */}
            {activeTab === 'system' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <SettingsIcon className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={systemSettings.currency}
                      onChange={(e) => setSystemSettings({ ...systemSettings, currency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="INR">Indian Rupee (₹)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={systemSettings.timezone}
                      onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata</option>
                      <option value="America/New_York">America/New York</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <select
                      value={systemSettings.language}
                      onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <select
                      value={systemSettings.theme}
                      onChange={(e) => setSystemSettings({ ...systemSettings, theme: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center mt-2">
                      <input
                        id="autoBackup"
                        type="checkbox"
                        checked={systemSettings.autoBackup}
                        onChange={(e) => setSystemSettings({ ...systemSettings, autoBackup: e.target.checked })}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="autoBackup" className="ml-2 block text-sm font-medium text-gray-700">
                        Enable Automatic Backup
                      </label>
                    </div>
                  </div>

                  {systemSettings.autoBackup && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={systemSettings.backupFrequency}
                          onChange={(e) => setSystemSettings({ ...systemSettings, backupFrequency: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Retention (days)
                        </label>
                        <input
                          type="number"
                          value={systemSettings.dataRetention}
                          onChange={(e) => setSystemSettings({ ...systemSettings, dataRetention: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('System')}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Backup & Restore Tab */}
            {activeTab === 'backup' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Database className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Backup & Restore</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Create Backup</h3>
                    <p className="text-gray-600 mb-4">
                      Create a manual backup of your entire restaurant data. This is recommended before major changes.
                    </p>
                    <button
                      onClick={handleBackup}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                    >
                      <Download className="h-4 w-4" />
                      <span>{isLoading ? 'Creating Backup...' : 'Create Backup Now'}</span>
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Restore Data</h3>
                    <p className="text-gray-600 mb-4">
                      Restore your restaurant data from a previously created backup file.
                      <span className="font-bold text-red-600 ml-1">
                        Warning: This will overwrite current data.
                      </span>
                    </p>
                    <input
                      type="file"
                      // You'd typically have an onChange handler here to handle file selection
                      className="block w-full text-sm text-gray-700
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-lg file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-blue-50 file:text-blue-700
                                 hover:file:bg-blue-100"
                    />
                    <button
                      onClick={handleRestore}
                      disabled={isLoading}
                      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                    >
                      <Upload className="h-4 w-4" />
                      <span>{isLoading ? 'Restoring...' : 'Restore Data'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage