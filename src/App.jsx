import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import LoginPage from './pages/Login'
import Register from './pages/Register'
import { Courses } from './pages/Courses'
import { Categories } from './pages/Categories'
import { CourseDetail } from './pages/CourseDetail'
import { CourseFormPage } from './pages/CourseFormPage'
import { CategoryFormPage } from './pages/CategoryFormPage'
import { Toaster } from 'react-hot-toast'

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
)

// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Simple Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-600">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <p>Please refresh the page or try again later.</p>
        </div>
      )
    }
    return this.props.children
  }
}

// ProtectedRoute wrapper for nested routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />

                {/* All protected routes nested here */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/courses/new" element={<CourseFormPage />} />
                  <Route path="/courses/edit/:id" element={<CourseFormPage />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/new" element={<CategoryFormPage />} />
                  <Route path="/categories/edit/:id" element={<CategoryFormPage />} />
                </Route>
              </Routes>
            </div>
          </Router>
          <Toaster />
        </ErrorBoundary>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
