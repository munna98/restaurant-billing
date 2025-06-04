import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Lock, User as UserIcon, Utensils } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

interface LoginForm {
  username: string //
  password: string
}

const LoginPage = () => {
  const { isAuthenticated, login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      // Pass data.username to the login function
      const success = await login(data.username, data.password)
      if (success) {
        toast.success('Login successful!')
      } else {
        toast.error('Invalid credentials')
      }
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Utensils size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Restaurant POS
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username {/* Changed label from "Email Address" */}
              </label>
              <div className="relative">
                <UserIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> {/* Changed icon */}
                <input
                  type="text" // Changed type from "email" to "text"
                  {...register('username', { // Registered as 'username'
                    required: 'Username is required',
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your username" // Changed placeholder
                />
              </div>
              {errors.username && ( // Checking for 'username' errors
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 font-medium mb-1">Demo Credentials</p>
              <p className="text-xs text-blue-600">
                Username: admin<br /> {/* Updated demo credentials */}
                Password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage