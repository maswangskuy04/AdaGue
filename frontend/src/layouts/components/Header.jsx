import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Link } from "react-router-dom"
import { LogOut, User } from "lucide-react"
import { Fragment } from "react"

import {
  NeumorphismBox,
  NeumorphismButton,
} from "../../styles/components"

const Header = ({
  user,
  onlineStatus,
  isSearching,
  isMatched,
  logout,
}) => {
  const avatarSrc = user.avatar
    ? user.avatar
    : `https://api.dicebear.com/9.x/thumbs/svg?seed=${user.fullname}`

  return (
    <header className="relative z-50 px-6 py-5">
      <div className="flex items-center">
        {/* Logo */}
        <NeumorphismBox
          variant="header"
          className="px-4 py-2"
        >
          <span className="text-sm font-semibold tracking-wide text-zinc-700">
            AdaGue
          </span>
        </NeumorphismBox>

        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          {!isSearching && !isMatched && onlineStatus && (
            <NeumorphismBox
              variant="header"
              className="px-4 py-2"
            >
              <span
                className={`
                  text-xs
                  font-medium
                  ${onlineStatus.color}
                `}
              >
                {onlineStatus.label}
              </span>
            </NeumorphismBox>
          )}

          {/* Menu */}
          <Menu
            as="div"
            className="relative"
          >
            <MenuButton as={Fragment}>
              <NeumorphismButton
                variant="secondary"
                className="p-1 focus:outline-none"
              >
                <img
                  src={avatarSrc}
                  alt={user.fullname}
                  className="h-10 w-10 rounded-xl object-cover"
                />
              </NeumorphismButton>
            </MenuButton>

            <MenuItems
              anchor="bottom end"
              transition
              className="mt-3 w-60 origin-top-right outline-none transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 z-50"
            >
              <NeumorphismBox
                variant="default"
                className="p-2 rounded-3xl"
              >
                {/* User */}
                <div className="mb-2 rounded-2xl px-4 py-3 shadow-[inset_2px_2px_6px_rgba(163,177,198,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.8)]">
                  <p className="truncate text-sm font-semibold text-zinc-700">
                    {user.fullname || "-"}
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    {user.email || "-"}
                  </p>
                </div>

                <div className="space-y-1">
                  {/* Profile */}
                  <MenuItem as={Fragment}>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "bg-[#e7ebf0] text-zinc-800 shadow-[inset_3px_3px_6px_rgba(163,177,198,0.18),inset_-3px_-3px_6px_rgba(255,255,255,0.85)]"
                              : "text-zinc-600 hover:text-zinc-800"
                          }
                        `}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef1f5] shadow-[4px_4px_8px_rgba(163,177,198,0.12),-4px_-4px_8px_rgba(255,255,255,0.9)]">
                          <User className="h-4 w-4" />
                        </div>

                        Profil
                      </Link>
                    )}
                  </MenuItem>

                  {/* Logout */}
                  <MenuItem as={Fragment}>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={logout}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "bg-red-50 text-red-500 shadow-[inset_3px_3px_6px_rgba(255,220,220,0.25),inset_-3px_-3px_6px_rgba(255,255,255,0.9)]"
                              : "text-red-400 hover:text-red-500"
                          }
                        `}
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef1f5] shadow-[4px_4px_8px_rgba(163,177,198,0.12),-4px_-4px_8px_rgba(255,255,255,0.9)]">
                          <LogOut className="h-4 w-4" />
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