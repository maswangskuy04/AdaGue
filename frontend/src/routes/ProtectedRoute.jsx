import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import loadingAnimation from "../assets/loading.json"
import LottieRaw from "lottie-react"

const Lottie = LottieRaw.default || LottieRaw

const ProtectedRoute = () => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="w-28 h-28"
        />
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute