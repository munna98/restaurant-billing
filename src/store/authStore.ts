import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  username: string
  name: string
  role: 'ADMIN' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'KITCHEN'
  isActive: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (username: string, password: string) => {
        set({ isLoading: true })
        
        try {
          // Simulate API call - replace with actual auth logic
          if (username === 'admin' && password === 'admin123') {
            const user: User = {
              id: '1',
              username: 'admin',
              name: 'Administrator',
              role: 'ADMIN',
              isActive: true
            }
            
            set({ 
              user, 
              isAuthenticated: true,
              isLoading: false 
            })
            return true
          }
          
          set({ isLoading: false })
          return false
        } catch (error) {
          console.error('Login error:', error)
          set({ isLoading: false })
          return false
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false 
        })
      },

      checkAuth: () => {
        const { user } = get()
        set({ 
          isAuthenticated: !!user,
          isLoading: false 
        })
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
