import { Fragment, useState } from "react"
import { Button, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { ArrowBigLeft, ArrowBigLeftDash, ArrowLeft, ChevronLeft, CircleArrowLeft, CircleEllipsis, Ellipsis, EllipsisVertical, Logs, Power, Unplug, User } from "lucide-react"
import { useMatch } from "../../../context/MatchContext"
import clsx from "clsx"
import Modal from "../../components/Modal"
import { formatLastSeen } from "../../../utils/date"
import usePresence from "../../../hooks/usePresence"
import { useChat } from "../../../context/ChatContext"

const ChatHeader = () => {
  const { match, endMatch } = useMatch()
  const { isTyping } = useChat()
  const [showModal, setShowModal] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const realtimePresence = usePresence(match?.partner?.id, match?.partner?.presence)

  const handleBack = () => {
    if (match?.conversationId) {
      setShowModal(true)
    }
  }

  return (
    <>
      <div className="sticky top-0 z-20 h-14 bg-zinc-50 border-b border-zinc-300 px-4 shadow flex items-center gap-3">
        <Button onClick={handleBack} className="text-zinc-500 border border-zinc-100 w-7 h-7 rounded-full flex items-center justify-center shadow-inner cursor-pointer">
          <ChevronLeft size={18} />
        </Button>

        <div className="w-9 h-9 rounded-full bg-slate-500 text-white flex items-center justify-center text-sm font-semibold">
          {match?.partner?.fullname.charAt(0)}
        </div>

        <div className="leading-tight">
          <div className="text-sm font-medium">{match?.partner?.fullname}</div>
          {isTyping ? (
            <div className="text-xs text-emerald-600">mengetik...</div>
          ) : (
            <div className={clsx(
              "text-xs font-medium transition-colors",
              realtimePresence === 'online' ? 'text-emerald-600' : 'text-zinc-400'
            )}>
              {realtimePresence === 'online' ? 'Online' : 'Offline'}  
            </div>
          )}
        </div>

        <div className="ml-auto">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="focus:outline-none flex items-center justify-center transition-transform active:scale-95">
              <div className="p-1 text-zinc-500 border border-zinc-100 hover:bg-zinc-50 w-8 h-8 rounded-full flex items-center justify-center shadow-sm cursor-pointer transition-colors">
                <EllipsisVertical size={18} strokeWidth={2.5} />
              </div>
            </MenuButton>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95 -translate-y-2"
              enterTo="transform opacity-100 scale-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="transform opacity-100 scale-100 translate-y-0"
              leaveTo="transform opacity-0 scale-95 -translate-y-2"
            >
              <MenuItems className="absolute right-0 mt-2 w-52 origin-top-right rounded-[20px] border border-white/30 bg-white/50 backdrop-blur-3xl saturate-[1.6] shadow-[0_15px_35px_rgba(0,0,0,0.12)] outline-none p-1.5 z-50 ring-1 ring-white/10">
                <div className="flex flex-col gap-1">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() => setShowProfile(true)}
                        className={clsx(
                          "group flex w-full items-center gap-3 rounded-[14px] px-3 py-2 text-sm font-medium transition-all",
                          active ? "bg-white/40 text-indigo-600" : "text-zinc-600"
                        )}
                      >
                        <div className={clsx("p-1.5 rounded-lg transition-colors", active ? "bg-indigo-100/60" : "bg-zinc-100/50")}>
                          <User size={16} />
                        </div>
                        Lihat Profil
                      </button>
                    )}
                  </MenuItem>

                  <div className="h-px bg-black/4 mx-2 my-0.5" />

                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={endMatch}
                        className={clsx(
                          "group flex w-full items-center gap-3 rounded-[14px] px-3 py-2 text-sm font-medium transition-all",
                          active ? "bg-red-500 text-white shadow-md shadow-red-200" : "text-red-500"
                        )}
                      >
                        <div className={clsx("p-1.5 rounded-lg transition-colors", active ? "bg-white/20" : "bg-red-50")}>
                          <Unplug size={16} />
                        </div>
                        Akhiri Obrolan
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Akhiri Obrolan?"
      >
        <p className="text-zinc-800">Selesaikan dulu yuk obrolannya supaya bisa lanjut ke halaman berikutnya.</p>
        <div className="flex justify-end gap-2 mt-5">
          <Button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-sm rounded-lg text-zinc-50 border border-zinc-300 bg-zinc-600/70 hover:bg-zinc-100"
          >
            Nanti Dulu
          </Button>
          <Button
            onClick={() => {
              endMatch()
              setShowModal(false)
            }}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Selesaikan Obrolan
          </Button>
        </div>
      </Modal>

      <Modal
        open={showProfile}
        onClose={() => setShowProfile(false)}
        title="Profil Partner"
      >
        <div className="flex flex-col items-center py-2">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-slate-500 text-white flex items-center justify-center text-3xl font-bold shadow-inner">
              {match?.partner?.fullname.charAt(0)}
            </div>
            
            {realtimePresence === 'online' && (
              <div className="absolute bottom-1 right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-zinc-900">{match?.partner?.fullname}</h3>
          
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-zinc-600 text-sm">
              {realtimePresence === 'online' ? 'Sedang aktif' : "Aktif " + formatLastSeen(match?.partner?.lastSeenAt)}
            </p>
          </div>
        </div>
        <div className="mt-5 w-full">
          <Button
            onClick={() => setShowProfile(false)}
            className="w-full py-2 text-sm font-medium rounded-xl bg-zinc-800 text-white hover:bg-zinc-900 transition-colors"
          >
            Tutup
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ChatHeader