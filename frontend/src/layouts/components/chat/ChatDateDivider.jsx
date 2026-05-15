import { AnimatePresence, motion } from "motion/react"
import { formatChatLabel } from "../../../utils/date"

const ChatDateDivider = ({ date }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="sticky top-2 z-10 flex justify-center my-4 pointer-events-none"
      >
        <span className="px-3 py-1 text-xs bg-zinc-400 text-zinc-50 rounded-full shadow-sm">
          {formatChatLabel(date)}
        </span>
      </motion.div>
    </AnimatePresence>
  )
}

export default ChatDateDivider