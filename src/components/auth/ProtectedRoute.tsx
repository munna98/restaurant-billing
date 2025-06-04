import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Layout from '../common/Layout'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string[]
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role-based access if required
  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-500">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return <Layout>{children}</Layout>
}

export default ProtectedRoute