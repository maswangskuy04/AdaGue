import { useAuth } from "../../../context/AuthContext"
import { useMatch } from "../../../context/MatchContext"
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
              className="space-y-2"
            >
              <h1 className="text-[24px] sm:text-[30px] lg:text-[34px] text-center font-semibold tracking-[-0.03em] leading-tight text-[#8d96a5] select-none"
                style={{
                  textShadow: `
                    -2px -2px 4px rgba(255,255,255,0.95),
                    2px 2px 4px rgba(163,177,198,0.45)
                  `,
                }}
              >
                Selamat {formatGreeting()},{" "}

                <span className="text-[#6f7888]">
                  {user?.fullname}
                </span>
              </h1>

              <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-center font-medium tracking-[0.01em] text-[#a0a8b5] select-none"
                style={{
                  textShadow: `
                    -1px -1px 2px rgba(255,255,255,0.9),
                    1px 1px 2px rgba(163,177,198,0.28)
                  `,
                }}
              >
                Klik tombol untuk mulai pencarian partner.
              </p>
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