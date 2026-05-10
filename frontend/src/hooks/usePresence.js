import { useEffect, useState } from "react"
import { useSocket } from "../context/SocketContext"

export default function usePresence(userId, initialPresence = 'offline') {
    const socket = useSocket()
    const [presence, setPresence] = useState(initialPresence)

    useEffect(() => {
        if (!socket || !userId) return

        socket.emit('presence:get', { targetUserId: userId })

        const handleUpdate = ({ userId: incomingId, presence: newPresence }) => {
            if (incomingId === userId) {
                setPresence(newPresence)
            }
        }

        socket.on('presence:update', handleUpdate)
        socket.on(`presence:res:${userId}`, (status) => setPresence(status))
        return () => {
            socket.off('presence:update', handleUpdate)
            socket.off(`presence:res:${userId}`)
        }
    }, [socket, userId])

    return presence
}