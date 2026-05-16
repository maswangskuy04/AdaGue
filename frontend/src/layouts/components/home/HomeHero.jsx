import { useAuth } from "../../../context/AuthContext"
import { useMatch } from "../../../context/MatchContext"
import useOnlineCount from "../../../hooks/useOnlineCount"
import { formatGreeting } from "../../../utils/date"
import HeroActionButton from "./HeroActionButton"
import { AnimatePresence, motion } from "motion/react"

const enter = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18 },
  },
}

const HomeHero = () => {
  const { user } = useAuth()
  const { isSearching } = useMatch()
  const onlineCount = useOnlineCount()

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {!isSearching ? (
          <motion.div
            key="idle"
            variants={enter}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full max-w-md"
          >
            <div className="flex flex-col items-center text-center">
              {/* online */}
              <div className="mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-sm text-zinc-500">
                  {onlineCount} pengguna aktif
                </span>
              </div>

              {/* title */}
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800">
                Selamat {formatGreeting()}
              </h1>

              <p className="mt-3 text-zinc-500">
                Semoga harimu menyenangkan,{" "}
                <span className="font-semibold text-zinc-700">
                  {user?.fullname}
                </span>
              </p>

              {/* action */}
              <div className="mt-10">
                <HeroActionButton />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="searching"
            variants={enter}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full max-w-md flex justify-center"
          >
            <HeroActionButton />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HomeHero