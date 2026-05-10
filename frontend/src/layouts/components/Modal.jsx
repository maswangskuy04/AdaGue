import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { X } from "lucide-react"
import { Fragment } from "react"

const Modal = ({ open, onClose, title, children, size = 'md' }) => {
  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-8"
            >
              <DialogPanel className={`w-full ${sizeClass[size] || sizeClass.md} text-left align-middle transition-all transform rounded-4xl bg-white/50 backdrop-blur-sm saturate-[1.8] border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden outline-none`}>
                {/* HEADER */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-black/15">
                  <DialogTitle className="text-lg font-bold text-zinc-700 tracking-tight">
                    {title}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors outline-none"
                  >
                    <X size={18} className="text-zinc-600" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal