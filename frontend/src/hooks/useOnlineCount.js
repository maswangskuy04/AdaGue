import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export default function useOnlineCount() {
    const socket = useSocket()
    const [onlineCount, setOnlineCount] = useState(0)

    useEffect(() => {
        if (!socket) return

        socket.emit('get:online:count')

        socket.on('online:count', (count) => setOnlineCount(count))

        return () => socket.off('online:count')
    }, [socket])

    return onlineCount
}