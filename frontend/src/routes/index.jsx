import { createBrowserRouter, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import RoleRoute from "./RoleRoute"

import UserLayout from "../layouts/UserLayout"
import AdminLayout from "../layouts/AdminLayout"

import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
// import HomeUser from "../pages/user"
import Forbidden from "../pages/errors/Forbidden"
import NotFound from "../pages/errors/NotFound"
// import ChatRoom from "../pages/user"
// import ProfilePage from "../pages/user"
import VerifyOtpPage from "../layouts/components/verifyOtp/VerifyOtpPage"

const router = createBrowserRouter([
  {
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      {
        children: [
          { path: "/auth/login", element: <Login /> },
          { path: "/auth/register", element: <Register /> },
          { path: "/auth/verify-otp", element: <VerifyOtpPage /> },
        ]
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       element: <RoleRoute allowed={["user"]} />,
      //       children: [
      //         {
      //           element: <UserLayout />,
      //           children: [
      //             { path: "/dashboard", element: <HomeUser /> },
      //             { path: "/profile", element: <ProfilePage /> },
      //             { path: "/chat/:conversationId", element: <ChatRoom /> }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       element: <RoleRoute allowed={["admin"]} />,
      //       children: [
      //         {
      //           element: <AdminLayout />,
      //           children: [
      //             { path: "/admin/dashboard", element: <HomeAdmin /> }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // },
      { path: "/403", element: <Forbidden /> },
      { path: "*", element: <NotFound /> },
    ]
  }
])

export default router
