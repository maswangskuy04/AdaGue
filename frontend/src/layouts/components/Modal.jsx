import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"

import { X } from "lucide-react"
import { Fragment } from "react"

import {
  NeumorphismBox,
} from "../../styles/components"

const Modal = ({
  open,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }

  return (
    <Transition
      appear
      show={open}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        {/* BACKDROP */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-[3px]"
          />
        </TransitionChild>

        {/* MODAL */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-5">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-6"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-6"
            >
              <DialogPanel
                className={`
                  w-full
                  ${sizeClass[size] || sizeClass.md}
                `}
              >
                <NeumorphismBox
                  variant="card"
                  className="overflow-hidden rounded-[32px] p-0"
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <DialogTitle
                      className="text-base font-semibold tracking-tight text-zinc-700"
                    >
                      {title}
                    </DialogTitle>

                    <NeumorphismBox
                      as="button"
                      onClick={onClose}
                      variant="button"
                      className="flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-500 transition-all hover:text-red-500 active:scale-[0.96]"
                    >
                      <X size={18} />
                    </NeumorphismBox>
                  </div>

                  <div className="p-5">
                    {children}
                  </div>
                </NeumorphismBox>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal