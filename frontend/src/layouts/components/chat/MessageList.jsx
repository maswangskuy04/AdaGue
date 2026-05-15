import MessageItem from "./MessageItem"
import ChatDateDivider from "./ChatDateDivider"
import { useChat } from "../../../context/ChatContext"
import { useAuth } from "../../../context/AuthContext"
import { TZDate } from "@date-fns/tz"
import { getUserTimeZone } from "../../../utils/date"

const MessageList = () => {
  const { messages } = useChat()
  const { user } = useAuth()

  return (
    <div className="flex flex-col py-2">
      {messages.map((msg, index) => {
        const prevMsg = messages[index - 1]
        const isOwn = msg.senderId === user.id
        const isFirstOfGroup = !prevMsg || prevMsg.senderId !== msg.senderId
        const currentDate = new TZDate(msg.createdAt, getUserTimeZone()).toDateString()
        const prevDate = prevMsg ? new TZDate(prevMsg.createdAt, getUserTimeZone()).toDateString() : null
        const showDivider = currentDate !== prevDate

        return (
          <div key={msg.id}>
            {showDivider && (
              <div className="flex justify-center my-6">
                <ChatDateDivider date={msg.createdAt} />
              </div>
            )}

            <MessageItem
              isOwn={isOwn}
              content={msg.content}
              time={msg.createdAt}
              isRead={msg.isRead}
              isFirst={isFirstOfGroup}
            />
          </div>
        )
      })}
    </div>
  )
}

export default MessageList
