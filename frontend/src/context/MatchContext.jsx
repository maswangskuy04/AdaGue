import { Children, createContext, useCallback, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { useSocket } from "./SocketContext"
import MatchService from "../services/matchService"
import { useAlert } from "../hooks/useAlert"
import { Outlet, useNavigate } from "react-router-dom"

const MatchContext = createContext()

export const MatchProvider = ({ children }) => {
  const { user } = useAuth()
  const socket = useSocket()
  const { success, info, warning, error } = useAlert()

  const [match, setMatch] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [loading, setLoading] = useState(true)

  const reset = useCallback(() => {
    setMatch(null)
    setIsSearching(false)
  }, [])

  useEffect(() => {
    if (!user) {
      reset()
      return
    }

    const init = async () => {
      try {
        const res = await MatchService.getActiveMatch()

        if (res?.status === "active") {
          setMatch(res)
        }
      } catch (err) {
        error("Gagal mengambil status match")
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [user?.id])

  useEffect(() => {
    if (!socket) return

    const onWaiting = (res) => {
      setIsSearching(true)
      info(res.message)
    }

    const onFound = (res) => {
      setIsSearching(false)

      setMatch({
        matchId: res.matchId,
        conversationId: res.conversationId,
        partner: res.partner,
        status: "active"
      })

      setTimeout(() => setIsMatchingReady(true), 300)

      success(`Kamu terhubung dengan ${res.partner.fullname}`)
    }

    const onEnd = () => {
      reset()
      warning("Chat berakhir")
    }

    socket.on("match:waiting", onWaiting)
    socket.on("match:found", onFound)
    socket.on("match:end", onEnd)
    socket.on("match:cancel", reset)

    return () => {
      socket.off("match:waiting", onWaiting)
      socket.off("match:found", onFound)
      socket.off("match:end", onEnd)
      socket.off("match:cancel", reset)
    }
  }, [socket, reset, info, success, warning])

  const findMatch = () => {
    if (isSearching || match) return
    setIsSearching(true)
    socket.emit("match:start")
  }

  const cancelMatch = () => {
    setIsSearching(false)
    socket.emit("match:cancel")
  }

  const endMatch = () => {
    socket.emit("match:end")
  }

  return (
    <MatchContext.Provider value={{ match, isSearching, loading, findMatch, cancelMatch, endMatch }}>
      {children}
    </MatchContext.Provider>
  )
}

export const useMatch = () => useContext(MatchContext)
