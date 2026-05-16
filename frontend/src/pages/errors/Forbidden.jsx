import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  Transition,
  TransitionChild,
} from "@headlessui/react"

import { ShieldX } from "lucide-react"
import { Fragment } from "react"
import { Link } from "react-router-dom"

import {
  NeumorphismBox,
  NeumorphismButton,
} from "../../styles/components"

export default function Forbidden() {
  return (
    <Transition appear show as={Fragment}>
      <Dialog
        as="div"
        onClose={() => {}}
        className="relative z-50"
      >
        {/* BACKDROP */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px]" />
        </TransitionChild>

        {/* CONTENT */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-2"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md">
              <NeumorphismBox
                variant="card"
                className="p-8 text-center"
              >
                {/* ICON */}
                <NeumorphismBox
                  variant="inset"
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl"
                >
                  <ShieldX
                    className="h-10 w-10 text-red-500"
                    strokeWidth={2}
                  />
                </NeumorphismBox>

                {/* TITLE */}
                <DialogTitle className="mt-6 text-3xl font-bold tracking-tight text-zinc-800">
                  403
                </DialogTitle>

                <p className="mt-1 text-sm font-medium text-zinc-500">
                  Access Forbidden
                </p>

                {/* DESCRIPTION */}
                <DialogDescription className="mt-4 text-sm leading-relaxed text-zinc-500">
                  You do not have permission to
                  access this page or resource.
                </DialogDescription>

                {/* ACTION */}
                <div className="mt-8">
                  <Link to="/auth/login">
                    <NeumorphismButton
                      variant="secondary"
                      size="lg"
                      className="w-full"
                    >
                      Back to Login
                    </NeumorphismButton>
                  </Link>
                </div>
              </NeumorphismBox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}