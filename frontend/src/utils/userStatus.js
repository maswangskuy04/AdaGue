export const formatPresence = (value) => {
    switch(value) {
        case 'online': 
            return 'Online'
        case 'offline':
            return 'Offline'
        default: 
            return '-'
    }
}

export const formatChatStatus = (value) => {
    switch(value) {
        case 'idle': 
            return 'Siap ngobrol'
        case 'searching':
            return 'Mencari teman'
        case 'matched':
            return 'Sudah terhubung'
        case 'chatting':
            return 'Sedang ngobrol'
        default:
            return '-'
    }
}

export const formatAccountStatus = (value) => {
    switch(value) {
        case 'active':
            return 'Aktif'
        case 'suspend':
            return 'Ditangguhkan'
        default:
            return '-'
    }
}