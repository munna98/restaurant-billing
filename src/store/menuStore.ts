import { create } from 'zustand'

export interface Category {
  id: string
  name: string
  description?: string
  sortOrder: number
  isActive: boolean
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  cost?: number
  categoryId: string
  itemType: 'VEG' | 'NON_VEG' | 'BEVERAGE' | 'DESSERT'
  isAvailable: boolean
  taxRate: number
  image?: string
  sortOrder: number
}

interface MenuState {
  categories: Category[]
  menuItems: MenuItem[]
  isLoading: boolean
  
  // Actions
  fetchCategories: () => Promise<void>
  fetchMenuItems: () => Promise<void>
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>
  deleteMenuItem: (id: string) => Promise<void>
  toggleItemAvailability: (id: string) => Promise<void>
}

export const useMenuStore = create<MenuState>((set, get) => ({
  categories: [],
  menuItems: [],
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true })
    try {
      // Mock data - replace with actual API call
      const categories: Category[] = [
        { id: '1', name: 'Starters', description: 'Appetizers and starters', sortOrder: 1, isActive: true },
        { id: '2', name: 'Main Course', description: 'Main dishes', sortOrder: 2, isActive: true },
        { id: '3', name: 'Beverages', description: 'Drinks and beverages', sortOrder: 3, isActive: true },
        { id: '4', name: 'Desserts', description: 'Sweet treats', sortOrder: 4, isActive: true }
      ]
      set({ categories, isLoading: false })
    } catch (error) {
      console.error('Error fetching categories:', error)
      set({ isLoading: false })
    }
  },

  fetchMenuItems: async () => {
    set({ isLoading: true })
    try {
      // Mock data - replace with actual API call
      const menuItems: MenuItem[] = [
        { id: '1', name: 'Chicken Wings', price: 299, categoryId: '1', itemType: 'NON_VEG', isAvailable: true, taxRate: 18, sortOrder: 1 },
        { id: '2', name: 'Paneer Tikka', price: 249, categoryId: '1', itemType: 'VEG', isAvailable: true, taxRate: 18, sortOrder: 2 },
        { id: '3', name: 'Butter Chicken', price: 399, categoryId: '2', itemType: 'NON_VEG', isAvailable: true, taxRate: 18, sortOrder: 1 },
        { id: '4', name: 'Dal Makhani', price: 299, categoryId: '2', itemType: 'VEG', isAvailable: true, taxRate: 18, sortOrder: 2 }
      ]
      set({ menuItems, isLoading: false })
    } catch (error) {
      console.error('Error fetching menu items:', error)
      set({ isLoading: false })
    }
  },

  addCategory: async (category) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    }
    set(state => ({ 
      categories: [...state.categories, newCategory] 
    }))
  },

  updateCategory: async (id, updates) => {
    set(state => ({
      categories: state.categories.map(cat => 
        cat.id === id ? { ...cat, ...updates } : cat
      )
    }))
  },

  deleteCategory: async (id) => {
    set(state => ({
      categories: state.categories.filter(cat => cat.id !== id)
    }))
  },

  addMenuItem: async (item) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    }
    set(state => ({ 
      menuItems: [...state.menuItems, newItem] 
    }))
  },

  updateMenuItem: async (id, updates) => {
    set(state => ({
      menuItems: state.menuItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }))
  },

  deleteMenuItem: async (id) => {
    set(state => ({
      menuItems: state.menuItems.filter(item => item.id !== id)
    }))
  },

  toggleItemAvailability: async (id) => {
    set(state => ({
      menuItems: state.menuItems.map(item => 
        item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
      )
    }))
  }
}))