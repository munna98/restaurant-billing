import { create } from 'zustand'

export interface AppSettings {
  restaurantName: string
  address?: string
  phone?: string
  email?: string
  gstNumber?: string
  currency: string
  taxRate: number
  theme: 'light' | 'dark'
  printLogo: boolean
  autoBackup: boolean
}

export interface Table {
  id: string
  number: string
  capacity: number
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE'
  location?: string
}

interface AppState {
  settings: AppSettings
  tables: Table[]
  isLoading: boolean
  sidebarCollapsed: boolean
  
  // Actions
  fetchSettings: () => Promise<void>
  updateSettings: (settings: Partial<AppSettings>) => Promise<void>
  fetchTables: () => Promise<void>
  updateTableStatus: (tableId: string, status: Table['status']) => Promise<void>
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  settings: {
    restaurantName: 'The Great Restaurant',
    address: '123 Food Street, Flavor City',
    phone: '+91 98765 43210',
    email: 'contact@greatrestaurant.com',
    currency: '₹',
    taxRate: 18.0,
    theme: 'light',
    printLogo: true,
    autoBackup: true
  },
  tables: [],
  isLoading: false,
  sidebarCollapsed: false,

  fetchSettings: async () => {
    set({ isLoading: true })
    try {
      // Mock API call - replace with actual implementation
      // const settings = await api.getSettings()
      set({ isLoading: false })
    } catch (error) {
      console.error('Error fetching settings:', error)
      set({ isLoading: false })
    }
  },

  updateSettings: async (newSettings) => {
    try {
      set(state => ({
        settings: { ...state.settings, ...newSettings }
      }))
      // await api.updateSettings(newSettings)
    } catch (error) {
      console.error('Error updating settings:', error)
    }
  },

  fetchTables: async () => {
    set({ isLoading: true })
    try {
      // Mock data - replace with actual API call
      const tables: Table[] = [
        { id: '1', number: 'T01', capacity: 2, status: 'AVAILABLE', location: 'Ground Floor' },
        { id: '2', number: 'T02', capacity: 4, status: 'OCCUPIED', location: 'Ground Floor' },
        { id: '3', number: 'T03', capacity: 4, status: 'AVAILABLE', location: 'Ground Floor' },
        { id: '4', number: 'T04', capacity: 6, status: 'RESERVED', location: 'Ground Floor' },
        { id: '5', number: 'T05', capacity: 2, status: 'AVAILABLE', location: 'First Floor' },
        { id: '6', number: 'T06', capacity: 4, status: 'AVAILABLE', location: 'First Floor' },
        { id: '7', number: 'T07', capacity: 4, status: 'MAINTENANCE', location: 'First Floor' },
        { id: '8', number: 'T08', capacity: 6, status: 'AVAILABLE', location: 'First Floor' }
      ]
      set({ tables, isLoading: false })
    } catch (error) {
      console.error('Error fetching tables:', error)
      set({ isLoading: false })
    }
  },

  updateTableStatus: async (tableId, status) => {
    try {
      set(state => ({
        tables: state.tables.map(table => 
          table.id === tableId ? { ...table, status } : table
        )
      }))
      // await api.updateTableStatus(tableId, status)
    } catch (error) {
      console.error('Error updating table status:', error)
    }
  },

  toggleSidebar: () => {
    set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }))
  },

  setSidebarCollapsed: (collapsed) => {
    set({ sidebarCollapsed: collapsed })
  }
}))