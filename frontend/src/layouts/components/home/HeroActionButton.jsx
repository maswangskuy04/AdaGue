import { AnimatePresence, motion } from "motion/react"
import { Loader2, Search } from "lucide-react"
import { useMatch } from "../../../context/MatchContext"
import { useEffect, useState } from "react"

import {
  NeumorphismButton,
  NeumorphismBox,
} from "../../../styles/components"

const HeroActionButton = () => {
  const { match, isSearching, findMatch, cancelMatch } = useMatch()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!isSearching) {
      setElapsed(0)
      return
    }

    const interval = setInterval(() => setElapsed((p) => p + 1), 1000)
    return () => clearInterval(interval)
  }, [isSearching])

  if (match) return null

  const getText = () => {
    if (elapsed < 3) return "Mencari teman..."
    if (elapsed < 7) return "Sabar broo..."
    if (elapsed < 12) return "Nyari yang cocok dulu..."
    return "Sedikit lagi..."
  }

  return (
    <div className="flex justify-center">
      <AnimatePresence mode="wait">
        {!isSearching ? (
          <motion.div
            key="idle"
            whileTap={{ scale: 0.97 }}
          >
            <NeumorphismButton
              onClick={findMatch}
              size="lg"
              variant="secondary"
              className="relative min-w-60 h-14 overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-5">
                <NeumorphismBox
                  variant="inset"
                  rounded="rounded-xl"
                  padding="p-2"
                >
                  <Search
                    size={14}
                    className="text-indigo-500"
                  />
                </NeumorphismBox>

                <span className="font-semibold tracking-wide text-indigo-500">
                  Cari Partner
                </span>
              </div>

              <motion.div
                className="absolute inset-y-0 -left-32 w-24 rotate-12 bg-white/40 blur-xl"
                whileHover={{ x: 320 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            </NeumorphismButton>
          </motion.div>
        ) : (
          <motion.div
            key="searching"
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.97,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.97,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-5"
          >
            <NeumorphismBox
              variant="button"
              className="relative min-w-60 h-14 overflow-hidden flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-y-0 -left-32 w-24 rotate-12 bg-teal-300/30 blur-xl"
                animate={{ x: ["0%", "420%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 flex items-center gap-3">
                <NeumorphismBox
                  variant="inset"
                  rounded="rounded-xl"
                  padding="p-2"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-4 h-4 text-indigo-500" />
                  </motion.div>
                </NeumorphismBox>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={getText()}
                    initial={{
                      opacity: 0,
                      y: 4,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                      filter: "blur(6px)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-zinc-500"
                  >
                    {getText()}
                  </motion.span>
                </AnimatePresence>
              </div>
            </NeumorphismBox>

            <NeumorphismButton
              onClick={cancelMatch}
              variant="secondary"
              className="w-full h-11 text-sm text-red-400"
            >
              Batalkan
            </NeumorphismButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeroActionButton