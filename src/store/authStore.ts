// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// export interface User {
//   id: string
//   username: string
//   fullName: string
//   role: 'ADMIN' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'KITCHEN'
//   isActive: boolean
// }

// interface AuthState {
//   user: User | null
//   isAuthenticated: boolean
//   isLoading: boolean
  
//   // Actions
//   login: (username: string, password: string) => Promise<boolean>
//   logout: () => void
//   checkAuth: () => void
//   setLoading: (loading: boolean) => void
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       isAuthenticated: false,
//       isLoading: true,

//       login: async (username: string, password: string) => {
//         set({ isLoading: true })
        
//         try {
//           // Simulate API call - replace with actual auth logic
//           if (username === 'admin' && password === 'admin123') {
//             const user: User = {
//               id: '1',
//               username: 'admin',
//               fullName: 'Administrator',
//               role: 'ADMIN',
//               isActive: true
//             }
            
//             set({ 
//               user, 
//               isAuthenticated: true,
//               isLoading: false 
//             })
//             return true
//           }
          
//           set({ isLoading: false })
//           return false
//         } catch (error) {
//           console.error('Login error:', error)
//           set({ isLoading: false })
//           return false
//         }
//       },

//       logout: () => {
//         set({ 
//           user: null, 
//           isAuthenticated: false,
//           isLoading: false 
//         })
//       },

//       checkAuth: () => {
//         const { user } = get()
//         set({ 
//           isAuthenticated: !!user,
//           isLoading: false 
//         })
//       },

//       setLoading: (loading: boolean) => {
//         set({ isLoading: loading })
//       }
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) => ({ 
//         user: state.user,
//         isAuthenticated: state.isAuthenticated 
//       }),
//     }
//   )
// )

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'KITCHEN'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          // Demo login - replace with actual API call
          if (email === 'admin@restaurant.com' && password === 'admin123') {
            const user: User = {
              id: '1',
              name: 'Admin User',
              email: 'admin@restaurant.com',
              role: 'ADMIN'
            }
            set({ user, isAuthenticated: true })
            return true
          }
          return false
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)