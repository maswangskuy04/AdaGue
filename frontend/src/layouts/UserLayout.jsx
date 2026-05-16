import { Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import usePresence from "../hooks/usePresence"
import { useMatch } from "../context/MatchContext"
import Header from "./components/Header"
import Footer from "./components/Footer"

const statusActive = {
  online: { label: "Online", color: "text-emerald-500" },
  offline: { label: "Offline", color: "text-red-500" }
}

const UserLayout = () => {
  const { user, logout } = useAuth()
  const { match } = useMatch()
  const location = useLocation()

  if (!user) return null

  const presence = usePresence(user.id)
  const isChatPage = location.pathname.startsWith("/chat")
  const onlineStatus = statusActive[presence || user.presence]

  return (
    <div className={`relative min-h-screen flex flex-col ${isChatPage ? "bg-[#f6f7fb]" : "bg-[#e9eaf0]"}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-md h-112 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute top-10 -left-10 w-40 h-40 rounded-full bg-sky-400/10 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-violet-400/10 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isChatPage && (
          <div className="relative z-20">
            <Header
              user={user}
              onlineStatus={onlineStatus}
              isSearching={false}
              isMatched={Boolean(match)}
              logout={logout}
            />
          </div>
        )}

        <main className={`flex-1 w-full ${isChatPage ? "" : "px-4 sm:px-6 pt-4 pb-6"}`}>
          <Outlet />
        </main>

        {!isChatPage && (
          <div className="mt-auto">
            <Footer />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserLayout