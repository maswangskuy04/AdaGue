import { Button, Input } from "@headlessui/react"
import { useRef, useState } from "react"
import { useChat } from "../../../context/ChatContext"
import { useSocket } from "../../../context/SocketContext"
import { Plus, SendHorizonal } from "lucide-react"

const MessageInput = () => {
  const [text, setText] = useState("")
  const [sending, setSending] = useState(false)

  const { sendMessages, conversationId } = useChat()
  const socket = useSocket()
  const typingTimeout = useRef(null)

  const handleTyping = (e) => {
    setText(e.target.value)

    if (!socket || !conversationId) return

    socket.emit("chat:typing:start", { conversationId })

    if (typingTimeout.current) clearTimeout(typingTimeout.current)

    typingTimeout.current = setTimeout(() => {
      socket.emit("chat:typing:stop", { conversationId })
    }, 1000)
  }

  const handleSend = () => {
    if (!text.trim()) return

    setSending(true)
    sendMessages(text.trim())
    setText("")

    setTimeout(() => {
      setSending(false)
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 p-2">
      {/* PLUS */}
      <Button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-zinc-600 overflow-hidden shadow-inner hover:bg-white/30 hover:scale-105 active:scale-95 transition-all">
        <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/50 to-transparent opacity-50" />
        <span className="shimmer absolute inset-0 rounded-full opacity-40" />
        <Plus size={18} className="relative z-10" />
      </Button>

      {/* INPUT */}
      <Input
        type="text"
        placeholder="Ketik pesan"
        value={text}
        onChange={handleTyping}
        onKeyDown={handleKeyDown}
        className="flex-1 text-sm px-4 py-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-zinc-800 placeholder-zinc-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300/40"
      />

      {/* SEND */}
      <Button
        onClick={handleSend}
        disabled={sending || !text.trim()}
        className={`relative flex items-center justify-center h-10 rounded-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${text.trim() ? "w-10 opacity-100 scale-100 ml-0" : "w-0 opacity-0 scale-50 ml-0 pointer-events-none"} ${sending ? "bg-green-500/30 scale-95" : "bg-green-400/20 hover:scale-105"} backdrop-blur-lg border border-green-300/30`}
      >
        <span className="shimmer absolute inset-0 rounded-full opacity-40" />

        <div className={`relative z-10 transition-all duration-200 ${sending ? "scale-110" : "scale-100"}`}>
          {sending ? (
            <div className="flex gap-0.5">
              <span className="w-1 h-1 bg-green-700 rounded-full animate-bounce" />
              <span className="w-1 h-1 bg-green-700 rounded-full animate-bounce delay-75" />
              <span className="w-1 h-1 bg-green-700 rounded-full animate-bounce delay-150" />
            </div>
          ) : (
            <SendHorizonal
              size={18}
              style={{ transform: "rotate(-30deg)" }}
            />
          )}
        </div>
      </Button>
    </div>
  )
}

export default MessageInput