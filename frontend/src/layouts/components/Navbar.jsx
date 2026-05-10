import { Menu } from "lucide-react"

const Navbar = ({ onToggleSidebar }) => {
  return (
    <header className="h-16 bg-[#eef1f5] border-b border-white/70 px-4 flex items-center justify-between neo-header sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-2xl bg-[#eef1f5] border border-white/70 text-gray-700 neo-button hover:neo-button-hover transition"
        >
          <Menu size={20} />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Dashboard Admin
          </h2>
          <p className="text-xs text-gray-600 hidden sm:block">Kelola percakapan dan pengguna secara real-time</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="hidden sm:block rounded-2xl bg-[#eef1f5] border border-white/70 px-3 py-2 text-xs text-gray-700 font-medium neo-button hover:neo-button-hover transition">
          Overview
        </button>

        <div className="flex items-center gap-2 sm:gap-3 rounded-3xl bg-[#eef1f5] border border-white/70 px-2 sm:px-3 py-2 neo-button">
          <div className="flex flex-col text-right hidden sm:flex">
            <p className="text-sm font-medium text-gray-900">Admin</p>
            <p className="text-[10px] text-gray-600">admin@email.com</p>
          </div>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-9 h-9 rounded-full border border-white/70"
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar
