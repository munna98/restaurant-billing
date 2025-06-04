import { create } from 'zustand'

export interface OrderItem {
  id: string
  menuItemId: string
  menuItemName: string
  quantity: number
  unitPrice: number
  total: number
  notes?: string
  status: 'ORDERED' | 'PREPARING' | 'READY' | 'SERVED'
}

export interface Order {
  id: string
  orderNo: string
  type: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'
  status: 'NEW' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'SERVED' | 'CANCELLED'
  tableId?: string
  tableNumber?: string
  customerId?: string
  customerName?: string
  userId: string
  subtotal: number
  taxAmount: number
  total: number
  notes?: string
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  
  // Actions
  fetchOrders: () => Promise<void>
  createOrder: (orderData: Partial<Order>) => Promise<void>
  updateOrder: (id: string, updates: Partial<Order>) => Promise<void>
  addItemToOrder: (orderId: string, item: Omit<OrderItem, 'id'>) => void
  updateOrderItem: (orderId: string, itemId: string, updates: Partial<OrderItem>) => void
  removeItemFromOrder: (orderId: string, itemId: string) => void
  setCurrentOrder: (order: Order | null) => void
  calculateOrderTotals: (orderId: string) => void
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  currentOrder: null,
  isLoading: false,

  fetchOrders: async () => {
    set({ isLoading: true })
    try {
      // Mock data - replace with actual API call
      const orders: Order[] = []
      set({ orders, isLoading: false })
    } catch (error) {
      console.error('Error fetching orders:', error)
      set({ isLoading: false })
    }
  },

  createOrder: async (orderData) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      orderNo: `ORD-${Date.now()}`,
      type: 'DINE_IN',
      status: 'NEW',
      userId: '1', // Replace with actual user ID
      subtotal: 0,
      taxAmount: 0,
      total: 0,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...orderData,
    }
    
    set(state => ({
      orders: [...state.orders, newOrder],
      currentOrder: newOrder
    }))
  },

  updateOrder: async (id, updates) => {
    set(state => ({
      orders: state.orders.map(order => 
        order.id === id ? { ...order, ...updates, updatedAt: new Date().toISOString() } : order
      ),
      currentOrder: state.currentOrder?.id === id 
        ? { ...state.currentOrder, ...updates, updatedAt: new Date().toISOString() }
        : state.currentOrder
    }))
  },

  addItemToOrder: (orderId, item) => {
    const newItem: OrderItem = {
      ...item,
      id: Date.now().toString(),
      total: item.quantity * item.unitPrice
    }
    
    set(state => {
      const updatedOrders = state.orders.map(order => {
        if (order.id === orderId) {
          const existingItemIndex = order.items.findIndex(
            i => i.menuItemId === item.menuItemId
          )
          
          if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = [...order.items]
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + item.quantity,
              total: (updatedItems[existingItemIndex].quantity + item.quantity) * item.unitPrice
            }
            return { ...order, items: updatedItems }
          } else {
            // Add new item
            return { ...order, items: [...order.items, newItem] }
          }
        }
        return order
      })
      
      return { 
        orders: updatedOrders,
        currentOrder: state.currentOrder?.id === orderId 
          ? updatedOrders.find(o => o.id === orderId) || state.currentOrder
          : state.currentOrder
      }
    })
    
    // Recalculate totals
    get().calculateOrderTotals(orderId)
  },

  updateOrderItem: (orderId, itemId, updates) => {
    set(state => {
      const updatedOrders = state.orders.map(order => {
        if (order.id === orderId) {
          const updatedItems = order.items.map(item => {
            if (item.id === itemId) {
              const updatedItem = { ...item, ...updates }
              updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
              return updatedItem
            }
            return item
          })
          return { ...order, items: updatedItems }
        }
        return order
      })
      
      return {
        orders: updatedOrders,
        currentOrder: state.currentOrder?.id === orderId 
          ? updatedOrders.find(o => o.id === orderId) || state.currentOrder
          : state.currentOrder
      }
    })
    
    get().calculateOrderTotals(orderId)
  },

  removeItemFromOrder: (orderId, itemId) => {
    set(state => {
      const updatedOrders = state.orders.map(order => {
        if (order.id === orderId) {
          return { 
            ...order, 
            items: order.items.filter(item => item.id !== itemId) 
          }
        }
        return order
      })
      
      return {
        orders: updatedOrders,
        currentOrder: state.currentOrder?.id === orderId 
          ? updatedOrders.find(o => o.id === orderId) || state.currentOrder
          : state.currentOrder
      }
    })
    
    get().calculateOrderTotals(orderId)
  },

  setCurrentOrder: (order) => {
    set({ currentOrder: order })
  },

  calculateOrderTotals: (orderId) => {
    set(state => {
      const updatedOrders = state.orders.map(order => {
        if (order.id === orderId) {
          const subtotal = order.items.reduce((sum, item) => sum + item.total, 0)
          const taxAmount = subtotal * 0.18 // 18% tax
          const total = subtotal + taxAmount
          
          return { ...order, subtotal, taxAmount, total }
        }
        return order
      })
      
      return {
        orders: updatedOrders,
        currentOrder: state.currentOrder?.id === orderId 
          ? updatedOrders.find(o => o.id === orderId) || state.currentOrder
          : state.currentOrder
      }
    })
  },

  updateOrderStatus: async (id, status) => {
    set(state => ({
      orders: state.orders.map(order => 
        order.id === id ? { ...order, status, updatedAt: new Date().toISOString() } : order
      ),
      currentOrder: state.currentOrder?.id === id 
        ? { ...state.currentOrder, status, updatedAt: new Date().toISOString() }
        : state.currentOrder
    }))
  }
}))