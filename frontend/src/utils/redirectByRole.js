export function redirectByRole(role) {
    if (role === 'admin') return '/admin/dashboard'
    if (role === 'user') return '/dashboard'
    return '/auth/login'
}