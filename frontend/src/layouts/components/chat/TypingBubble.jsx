import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "../../../context/ChatContext"
import { useAuth } from "../../../context/AuthContext"

const dotVariants = {
  animate: (i) => ({
    opacity: [0.3, 0.8, 0.3],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.2,
    },
  }),
}

const TypingBubble = () => {
  const { typingUserId } = useChat()
  const { user } = useAuth()

  if (!typingUserId || typingUserId === user.id) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex w-full justify-start mt-1 px-4 mb-4"
      >
        <div className="relative backdrop-blur-xl saturate-[1.8] bg-white/95 dark:bg-[#202c33]/95 border border-zinc-200 dark:border-white/10 shadow-sm rounded-[20px] rounded-tl-sm transition-all duration-300">
          <div className="px-4 py-3 flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                custom={i}
                variants={dotVariants}
                animate="animate"
                className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TypingBubble