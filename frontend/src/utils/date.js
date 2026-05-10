import { format, isToday, isYesterday } from "date-fns";
import { TZDate } from "@date-fns/tz"
import { id } from "date-fns/locale";

export const getUserTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export const formatGreeting = () => {
    const now = new TZDate(new Date(), getUserTimeZone())
    const hour = now.getHours()

    if (hour >= 5 && hour < 11) return 'pagi'
    if (hour >= 11 && hour < 15) return 'siang'
    if (hour >= 15 && hour < 18) return 'sore'
    
    return 'malam'
}

export const formatWithUserTimeZone = (date, formatStr = "HH:mm") => {
    if (!date) return ""

    const zonedDate = new TZDate(date, getUserTimeZone())
    return format(zonedDate, formatStr)
}

export const formatChatLabel = (date) => {
    if (!date) return ""
    
    const zonedDate = new TZDate(date, getUserTimeZone())

    if (isToday(zonedDate)) return "Hari ini"
    if (isYesterday(zonedDate)) return "Kemarin"

    return format(zonedDate, "dd MMM yyyy", { locale: id })
}

export const formatUserCreatedAt = (date) => {
    if (!date) return ""

    const zonedDate = new TZDate(date, getUserTimeZone())

    return format(zonedDate, "dd MMMM yyyy", { locale: id })
}

export const formatLastSeen = (date, isOnline = false) => {
    if (isOnline) return "Sedang online"
    if (!date) return ""

    const zonedDate = new TZDate(date, getUserTimeZone())

    if (isToday(zonedDate)) {
        return `Hari ini ${format(zonedDate, "HH:mm")}`
    }

    if (isYesterday(zonedDate)) {
        return `Kemarin ${format(zonedDate, "HH:mm")}`
    }

    return format(zonedDate, "dd MMM yyyy HH:mm", { locale: id })
}