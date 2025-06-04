import { create } from 'zustand'

export interface Payment {
  id: string
  amount: number
  method: 'CASH' | 'CARD' | 'UPI' | 'WALLET' | 'CREDIT'
  reference?: string
  notes?: string
  createdAt: string
}

export interface Invoice {
  id: string
  invoiceNo: string
  orderId: string
  customerId?: string
  customerName?: string
  userId: string
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
  paidAmount: number
  status: 'PAID' | 'UNPAID' | 'PARTIAL' | 'CANCELLED'
  paymentMode?: 'CASH' | 'CARD' | 'UPI' | 'WALLET' | 'CREDIT'
  payments: Payment[]
  createdAt: string
  updatedAt: string
}

interface BillingState {
  invoices: Invoice[]
  currentInvoice: Invoice | null
  isLoading: boolean
  
  // Actions
  fetchInvoices: () => Promise<void>
  createInvoice: (invoiceData: Partial<Invoice>) => Promise<void>
  updateInvoice: (id: string, updates: Partial<Invoice>) => Promise<void>
  addPayment: (invoiceId: string, payment: Omit<Payment, 'id' | 'createdAt'>) => Promise<void>
  setCurrentInvoice: (invoice: Invoice | null) => void
  calculateInvoiceTotals: (invoiceId: string) => void
  markAsPaid: (invoiceId: string, paymentMethod: Payment['method']) => Promise<void>
  applyDiscount: (invoiceId: string, discountAmount: number) => void
}

export const useBillingStore = create<BillingState>((set, get) => ({
  invoices: [],
  currentInvoice: null,
  isLoading: false,

  fetchInvoices: async () => {
    set({ isLoading: true })
    try {
      // Mock data - replace with actual API call
      const invoices: Invoice[] = []
      set({ invoices, isLoading: false })
    } catch (error) {
      console.error('Error fetching invoices:', error)
      set({ isLoading: false })
    }
  },

  createInvoice: async (invoiceData) => {
    const newInvoice: Invoice = {
      id: Date.now().toString(),
      invoiceNo: `INV-${Date.now()}`,
      orderId: '',
      userId: '1', // Replace with actual user ID
      subtotal: 0,
      taxAmount: 0,
      discountAmount: 0,
      total: 0,
      paidAmount: 0,
      status: 'UNPAID',
      payments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...invoiceData,
    }
    
    set(state => ({
      invoices: [...state.invoices, newInvoice],
      currentInvoice: newInvoice
    }))
  },

  updateInvoice: async (id, updates) => {
    set(state => ({
      invoices: state.invoices.map(invoice => 
        invoice.id === id 
          ? { ...invoice, ...updates, updatedAt: new Date().toISOString() } 
          : invoice
      ),
      currentInvoice: state.currentInvoice?.id === id 
        ? { ...state.currentInvoice, ...updates, updatedAt: new Date().toISOString() }
        : state.currentInvoice
    }))
  },

  addPayment: async (invoiceId, paymentData) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    set(state => {
      const updatedInvoices = state.invoices.map(invoice => {
        if (invoice.id === invoiceId) {
          const updatedPayments = [...invoice.payments, newPayment]
          const paidAmount = updatedPayments.reduce((sum, p) => sum + p.amount, 0)
          
          let status: Invoice['status'] = 'UNPAID'
          if (paidAmount >= invoice.total) {
            status = 'PAID'
          } else if (paidAmount > 0) {
            status = 'PARTIAL'
          }
          
          return {
            ...invoice,
            payments: updatedPayments,
            paidAmount,
            status,
            paymentMode: newPayment.method,
            updatedAt: new Date().toISOString()
          }
        }
        return invoice
      })
      
      return {
        invoices: updatedInvoices,
        currentInvoice: state.currentInvoice?.id === invoiceId 
          ? updatedInvoices.find(i => i.id === invoiceId) || state.currentInvoice
          : state.currentInvoice
      }
    })
  },

  setCurrentInvoice: (invoice) => {
    set({ currentInvoice: invoice })
  },

  calculateInvoiceTotals: (invoiceId) => {
    set(state => {
      const updatedInvoices = state.invoices.map(invoice => {
        if (invoice.id === invoiceId) {
          const taxAmount = invoice.subtotal * 0.18 // 18% tax
          const total = invoice.subtotal + taxAmount - invoice.discountAmount
          
          return { ...invoice, taxAmount, total }
        }
        return invoice
      })
      
      return {
        invoices: updatedInvoices,
        currentInvoice: state.currentInvoice?.id === invoiceId 
          ? updatedInvoices.find(i => i.id === invoiceId) || state.currentInvoice
          : state.currentInvoice
      }
    })
  },

  markAsPaid: async (invoiceId, paymentMethod) => {
    const invoice = get().invoices.find(i => i.id === invoiceId)
    if (!invoice) return
    
    const remainingAmount = invoice.total - invoice.paidAmount
    
    await get().addPayment(invoiceId, {
      amount: remainingAmount,
      method: paymentMethod,
      notes: 'Full payment'
    })
  },

  applyDiscount: (invoiceId, discountAmount) => {
    set(state => {
      const updatedInvoices = state.invoices.map(invoice => {
        if (invoice.id === invoiceId) {
          const total = invoice.subtotal + invoice.taxAmount - discountAmount
          return { 
            ...invoice, 
            discountAmount, 
            total,
            updatedAt: new Date().toISOString()
          }
        }
        return invoice
      })
      
      return {
        invoices: updatedInvoices,
        currentInvoice: state.currentInvoice?.id === invoiceId 
          ? updatedInvoices.find(i => i.id === invoiceId) || state.currentInvoice
          : state.currentInvoice
      }
    })
  }
}))