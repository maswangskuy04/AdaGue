import { LayoutDashboard, Users, X } from "lucide-react"
import { NavLink } from "react-router-dom"

const menus = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
]

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative w-64 min-h-screen bg-[#e9eaf0] text-gray-800 flex flex-col gap-4 p-4 transform transition-transform duration-300 z-40 lg:translate-x-0 lg:z-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Close Button Mobile */}
        <button
          onClick={onClose}
          className="lg:hidden self-end p-2 rounded-2xl bg-white text-gray-700 neo-button hover:neo-button-hover hover:bg-gray-50 transition"
        >
          <X size={20} />
        </button>

        <div className="neo neo-out p-3 neo-card">
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold tracking-tight text-gray-900">RealtimeChat</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-3 neo-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 neo-inset flex items-center justify-center text-gray-700 text-base font-semibold">
              A
            </div>
            <div>
              <p className="text-xs text-gray-500">Selamat datang,</p>
              <p className="text-sm font-semibold text-gray-900">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-3xl text-sm transition duration-200 ${
                    isActive
                      ? "bg-gradient-to-b from-blue-500 to-blue-600 text-white neo-gradient"
                      : "text-gray-600 bg-white neo-button hover:neo-button-hover hover:text-blue-600"
                  }`
                }
              >
                <Icon className="transition duration-200" size={18} />
                <span className="font-medium">{menu.name}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="rounded-3xl bg-white p-3 neo-card">
          <p className="text-xs font-semibold text-gray-900">Tips Admin</p>
          <p className="mt-2 text-xs leading-5 text-gray-600">
            Kelola pengguna dan pantau statistik untuk menjaga percakapan tetap aman.
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
