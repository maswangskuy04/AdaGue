import { io } from "socket.io-client"

let socket

export const connectSocket = (accessToken) => {
    if (socket) return socket

    socket = io(import.meta.env.VITE_SOCKET_URL, {
        auth: { accessToken },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 500,
        withCredentials: true
    })

    return socket
}

export const getSocket = () => socket

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect()
        socket = null
    }
}