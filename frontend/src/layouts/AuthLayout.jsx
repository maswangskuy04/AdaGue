import { Fragment } from "react"
import { Transition } from "@headlessui/react"

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
          `,
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <Transition
          as={Fragment}
          appear
          show
          enter="transition-all duration-500 ease-out"
          enterFrom="opacity-0 translate-y-6 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
        >
          <div className="w-full max-w-md rounded-3xl bg-zinc-900/90 backdrop-blur-md text-zinc-100 p-7 ring-1 ring-white/10">
            {children}
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default AuthLayout
