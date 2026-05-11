import { useEffect } from "react"
import { useMatch } from "../../../context/MatchContext"
import useOnlineCount from "../../../hooks/useOnlineCount"
import HomeHero from "../../../layouts/components/home/HomeHero"
import MatchedBanner from "../../../layouts/components/home/MatchedBanner"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"

const HomeUser = () => {
  const navigate = useNavigate()
  const onlineCount = useOnlineCount()
  const { match } = useMatch()

  useEffect(() => {
    if (match?.conversationId) {
      const timer = setTimeout(() => {
        navigate(`/chat/${match.conversationId}`, { replace: true })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [match?.conversationId, navigate])

  return (
    <main className="relative flex-1 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {match ? (
          <motion.div
            key="matched"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-3xl px-4"
          >
            <MatchedBanner partner={match.partner} />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl px-4"
          >
            <HomeHero onlineCount={onlineCount} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default HomeUser