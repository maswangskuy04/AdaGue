import { useAuth } from "../../../context/AuthContext"
import { useMatch } from "../../../context/MatchContext"
import useOnlineCount from "../../../hooks/useOnlineCount"
import { formatGreeting } from "../../../utils/date"
import HeroActionButton from "./HeroActionButton"
import { motion, AnimatePresence } from "motion/react"

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    filter: "blur(4px)",
    transition: {
      duration: 0.25,
    },
  },
}

const HomeHero = () => {
  const { user } = useAuth()
  const { isSearching } = useMatch()
  const onlineCount = useOnlineCount()

  return (
    <section className="relative flex items-center justify-center min-h-[70vh] px-6">
      <AnimatePresence mode="wait">
        {!isSearching && (
          <motion.div
            key="idle-hero"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative w-full max-w-md flex flex-col items-center gap-5"
          >
            <motion.div
              variants={item}
              className="text-center space-y-5"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#eef1f5] shadow-[6px_6px_12px_rgba(163,177,198,0.18),-6px_-6px_12px_rgba(255,255,255,0.95)]">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#9aa3b2]">
                    {onlineCount}
                  </span>

                  <span className="text-sm font-bold uppercase text-[#9aa3b2]">
                    Online
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h1
                  className="text-[34px] sm:text-[42px] lg:text-[52px] font-black tracking-tighter leading-none text-[#6f7888]"
                  style={{
                    textShadow: `
                      -3px -3px 6px rgba(255,255,255,0.95),
                      3px 3px 6px rgba(163,177,198,0.3)
                    `,
                  }}
                >
                  Selamat {formatGreeting()}
                </h1>

                <div className="inline-flex items-center px-5 py-3 rounded-2xl bg-[#eef1f5] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.18),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]">
                  <span className="text-[20px] sm:text-[24px] font-bold tracking-[-0.03em] text-[#5d6573]">
                    {user?.fullname}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              className="pt-1 flex justify-center"
            >
              <HeroActionButton />
            </motion.div>
          </motion.div>
        )}

        {isSearching && (
          <motion.div
            key="searching-hero"
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center"
          >
            <HeroActionButton />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HomeHero