import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import loadingAnimation from "../assets/loading.json"
import Lottie from "lottie-react"

const RoleRoute = ({ allowed }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Lottie
          animationData={loadingAnimation}
          loop
          className="w-28 h-28"
        />
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/auth/login' replace />
  }

  if (!allowed.includes(user.roles)) {
    return <Navigate to='/403' replace />
  }

  return <Outlet />
}

export default RoleRoute