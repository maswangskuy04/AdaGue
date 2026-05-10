export function validateAuthForm(fields, values) {
    const errors = {}

    fields.forEach((field) => {
        const value = values[field.name]
        
        if (field.required !== false && !value) {
            errors[field.name] = `${field.label} wajib diisi`
            return
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(value)) {
                errors[field.name] = 'Format email tidak valid'
            }
        }

        if (field.type === 'password' && value && value.length < 8) {
            errors[field.name] = 'Password minimal 8 karakter'
        }
    })

    return errors
}