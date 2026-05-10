// services
import AuthService from "../services/authService"
import { disconnectSocket } from "../services/socket"
// hooks
import { createContext, useContext, useEffect, useState } from "react"
import { decodeToken } from "../utils/jwt"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const login = async payload => {
    const data = await AuthService.login(payload)
    const decoded = decodeToken(data.accessToken)
    const me = await AuthService.getMe()

    setUser({ ...me.user, roles: decoded.roles })

    return me.user
  }

  const logout = () => {
    AuthService.logout()
    disconnectSocket()
    setUser(null)
  }

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const decoded = decodeToken(token)
        const me = await AuthService.getMe()
        
        setUser({ ...me.user, roles: decoded.roles })
      } catch {
        AuthService.logout()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
