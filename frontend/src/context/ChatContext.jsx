import ChatService from "../services/chatService"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "./SocketContext"
import { useAuth } from "./AuthContext"

const ChatContext = createContext()

export const ChatProvider = ({ conversationId, children }) => {
  const socket = useSocket()
  const { user } = useAuth()

  const [messages, setMessages] = useState([])
  const [typingUserId, setTypingUserId] = useState(null)

  const joinedRef = useRef(false)
  const typingRef = useRef(null)

  useEffect(() => {
    if (!conversationId) return

    const load = async () => {
      const res = await ChatService.getMessages(conversationId)
      setMessages(res)
    }

    load()
  }, [conversationId])

  useEffect(() => {
    if (!socket || !conversationId || !user?.id) return
    if (joinedRef.current) return

    joinedRef.current = true
    socket.emit("chat:join", { conversationId })

    const onNewMessage = (msg) => {
      setMessages(prev => [...prev, msg])
    }

    const onRead = ({ readerId, messageId }) => {
      if (readerId === user.id) return
      if (!messageId?.length) return

      setMessages(prev => prev.map(msg => messageId.includes(msg.id) ? { ...msg, isRead: true } : msg))
    }

    const onTypingStart = ({ userId }) => {
      if (userId === user.id) return
      typingRef.current = userId
      setTypingUserId(userId)
    }

    const onTypingStop = ({ userId }) => {
      if (typingRef.current === userId) {
        typingRef.current = null
        setTypingUserId(null)
      }
    }

    socket.on("chat:new", onNewMessage)
    socket.on("chat:read", onRead)
    socket.on("chat:typing:start", onTypingStart)
    socket.on("chat:typing:stop", onTypingStop)

    return () => {
      socket.emit("chat:leave", { conversationId })
      socket.off("chat:new", onNewMessage)
      socket.off("chat:read", onRead)
      socket.off("chat:typing:start", onTypingStart)
      socket.off("chat:typing:stop", onTypingStop)
      joinedRef.current = false
    }
  }, [socket, conversationId, user?.id])

  const sendMessages = (content) => {
    if (!content.trim() || !socket) return

    socket.emit("chat:send", {
      conversationId,
      content
    })

    socket.emit("chat:typing:stop", { conversationId })
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessages, typingUserId, isTyping: !!typingUserId, conversationId}}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
