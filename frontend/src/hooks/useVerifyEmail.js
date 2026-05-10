import { useEffect, useState } from "react"
import AuthService from "../services/authService"

export const useVerifyEmail = (token) => {
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!token) {
            setError("Token tidak ditemukan")
            setLoading(false)
            return
        }

        const verify = async () => {
            try {
                await AuthService.verifyEmail(token)
                setSuccess(true)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        verify()
    }, [token])

    return { loading, success, error }
}