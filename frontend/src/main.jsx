import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { SnackbarProvider } from 'notistack'
import { SocketProvider } from './context/SocketContext.jsx'
import { MatchProvider } from './context/MatchContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ 
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={3000}
    >
      <SocketProvider>
        <MatchProvider>
          <RouterProvider router={router} />
        </MatchProvider>
      </SocketProvider>
    </SnackbarProvider>
  </AuthProvider>
)
