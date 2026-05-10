import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ShieldX } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Forbidden() {
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
              <ShieldX className="mx-auto h-14 w-14 text-red-500" />

              <DialogTitle className="mt-4 text-2xl font-bold text-center text-gray-900">
                403 - Forbidden
              </DialogTitle>

              <DialogDescription className="mt-2 text-sm text-center text-gray-600">
                You do not have access to this page.
              </DialogDescription>

              <div className="mt-6 flex justify-center">
                <Link to="/auth/login" className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Back
                </Link>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
