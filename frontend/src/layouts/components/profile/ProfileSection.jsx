import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import {
  NeumorphismBox,
} from "../../../styles/components"

const ProfileSection = ({ title, description, children }) => {
  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <NeumorphismBox
          variant="card"
          className="overflow-hidden rounded-[28px]"
        >
          <DisclosureButton
            className="w-full flex items-center justify-between px-5 py-5 text-left"
          >
            <div>
              <h2 className="text-sm font-semibold text-zinc-700">
                {title}
              </h2>

              {description && (
                <p className="mt-1 text-xs text-zinc-500">
                  {description}
                </p>
              )}
            </div>

            <motion.div
              animate={{
                rotate: open ? 180 : 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <ChevronDown
                className="h-4 w-4 text-indigo-500"
              />
            </motion.div>
          </DisclosureButton>

          <AnimatePresence initial={false}>
            {open && (
              <DisclosurePanel static>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  <div className="px-5 pb-4 pt-1 space-y-3">
                    {children}
                  </div>
                </motion.div>
              </DisclosurePanel>
            )}
          </AnimatePresence>
        </NeumorphismBox>
      )}
    </Disclosure>
  )
}

export default ProfileSection