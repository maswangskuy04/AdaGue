import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { Construction } from "lucide-react"
import { Fragment } from "react"
import { Link } from "react-router-dom"

export default function UnderConstruction() {
  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" onClose={() => {}} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
              <Construction className="mx-auto h-14 w-14 text-yellow-500" />

              <DialogTitle className="mt-4 text-2xl font-bold text-center text-gray-900">
                Under Construction
              </DialogTitle>

              <DialogDescription className="mt-2 text-sm text-center text-gray-600">
                This feature is currently under development.  
                We’re working hard to make it available as soon as possible.
              </DialogDescription>

              <div className="mt-6 flex justify-center gap-3">
                <Link to="/dashboard" className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition">
                  Okay
                </Link>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}
