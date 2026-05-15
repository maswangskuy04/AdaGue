// components
import ChatHeader from "../../../layouts/components/chat/ChatHeader"
import MessageList from "../../../layouts/components/chat/MessageList"
import MessageInput from "../../../layouts/components/chat/MessageInput"
import TypingBubble from "../../../layouts/components/chat/TypingBubble"

// hooks
import { useAutoScroll } from "../../../hooks/useAutoScroll"
import { ChatProvider, useChat } from "../../../context/ChatContext"
import { useNavigate, useParams } from "react-router-dom"
import { useMatch } from "../../../context/MatchContext"
import { useEffect } from "react"

const ChatRoomContent = () => {
  const { messages, isTyping } = useChat()
  const { match } = useMatch()
  const { containerRef, bottomRef } = useAutoScroll([messages.length, isTyping])
  const navigate = useNavigate()

  useEffect(() => {
    if (match === null) navigate('/dashboard')
  }, [match, navigate])

  return (
    <div className="fixed inset-0 bg-zinc-200md:bg-gradient-to-br md:from-indigo-100 md:via-white md:to-purple-100 md:flex md:items-center md:justify-center">
      <div className="flex flex-col w-full h-full md:max-w-3xl md:h-[92vh] bg-white/70 backdrop-blur-2xl backdrop-saturate-150 md:rounded-3xl md:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/40 overflow-hidden transition-all">
        <ChatHeader />
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto overscroll-contain scroll-smooth bg-transparent"
        >
          <MessageList />
          {isTyping && <TypingBubble />}
          <div ref={bottomRef} />
        </div>

        <div className="sticky bottom-0 bg-white/40 backdrop-blur-lg border-t border-white/20">
          <MessageInput />
        </div>
      </div>
    </div>
  )
}

const ChatRoom = () => {
  const { conversationId } = useParams()
  if (!conversationId) return null

  return (
    <ChatProvider conversationId={conversationId}>
      <ChatRoomContent />
    </ChatProvider>
  )
}

export default ChatRoom