import { useEffect, useRef, useState } from "react"

export const useAutoScroll = (deps = []) => {
    const containerRef = useRef(null)
    const bottomRef = useRef(null)
    const [isNearBottom, setIsNearBottom] = useState(true)

    useEffect(() => {
        const element = containerRef.current
        if (!element) return

        const handleScroll = () => {
            const threshold = 120
            const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight

            setIsNearBottom(distanceFromBottom < threshold)
        }

        element.addEventListener('scroll', handleScroll)
        return () => element.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (isNearBottom) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, deps)

    return { containerRef, bottomRef }
}