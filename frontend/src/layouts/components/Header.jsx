import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Link } from "react-router-dom"
import { LogOut, User } from "lucide-react"
import { Fragment } from "react"
import { NeumorphismBox, NeumorphismButton } from "../../styles/components"

const Header = ({ user, onlineStatus, isSearching, isMatched, logout }) => {
  const avatarSrc = user.avatar ? user.avatar : `https://api.dicebear.com/9.x/thumbs/svg?seed=${user.fullname}`

  return (
    <header className="relative z-50 px-6 py-4 bg-transparent">
      <div className="flex items-center">
        {/* Logo pill */}
        <NeumorphismBox variant="header" className="px-4 py-2">
          <span className="relative text-sm font-bold tracking-wide text-indigo-400 uppercase">
            AdaGue
          </span>
        </NeumorphismBox>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-3">
          {!isSearching && !isMatched && onlineStatus && (
            <NeumorphismBox variant="header" className="flex items-center gap-2 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${onlineStatus.color}`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${onlineStatus.color}`}
                />
              </span>

              <span className="text-xs font-semibold text-zinc-500">
                {onlineStatus.label}
              </span>
            </NeumorphismBox>
          )}

          {/* Menu */}
          <Menu as="div" className="relative">
            <MenuButton as={Fragment}>
              <NeumorphismButton variant="secondary" className="focus:outline-none">
                <img
                  src={avatarSrc}
                  alt={user.fullname}
                  className="w-10 h-10 rounded-xl object-cover"
                />
              </NeumorphismButton>
            </MenuButton>

            <MenuItems
              anchor="bottom end"
              transition
              className="mt-3 w-56 origin-top-right outline-none transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 z-50"
            >
              <NeumorphismBox
                variant=""
              >
                {/* User Info */}
                <div className="px-3 py-2 mb-2 rounded-2xl shadow-[inset_2px_2px_6px_rgba(163,177,198,0.18),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
                  <p className="text-sm font-semibold text-zinc-700 truncate">
                    {user.fullname || '-'}
                  </p>
                  <p className="text-xs text-zinc-500 truncate">
                    {user.email || '-'}
                  </p>
                </div>

                <div className="space-y-1">
                  <MenuItem as={Fragment}>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "bg-[#e7ebf0] text-zinc-800 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.22),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]"
                              : "text-zinc-600 hover:text-zinc-800"
                          }
                        `}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#eef1f5] shadow-[4px_4px_8px_rgba(163,177,198,0.18),-4px_-4px_8px_rgba(255,255,255,0.9)]">
                          <User className="w-4 h-4" />
                        </div>

                        Profil
                      </Link>
                    )}
                  </MenuItem>

                  <MenuItem as={Fragment}>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={logout}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "bg-red-50 text-red-500 shadow-[inset_3px_3px_6px_rgba(255,200,200,0.25),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]"
                              : "text-red-400 hover:text-red-500"
                          }
                        `}
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#eef1f5] shadow-[4px_4px_8px_rgba(163,177,198,0.18),-4px_-4px_8px_rgba(255,255,255,0.9)]">
                          <LogOut className="w-4 h-4" />
                        </div>

                        Keluar
                      </button>
                    )}
                  </MenuItem>
                </div>
              </NeumorphismBox>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  )
}

export default Header