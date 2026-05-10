import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { connectSocket, disconnectSocket } from "../services/socket"

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const { user } = useAuth()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!user) return

    const token = localStorage.getItem("accessToken")
    if (!token) return

    const s = connectSocket(token)
    setSocket(s)

    return () => {
      disconnectSocket()
      setSocket(null)
    }
  }, [user?.id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
