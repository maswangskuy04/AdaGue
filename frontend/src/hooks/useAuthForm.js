import { useCallback, useState } from "react";
import { validateAuthForm } from "../utils/validateAuthForm";

export function useAuthForm({ fields, onSubmit }) {
    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues((prev) => ({ ...prev, [name]: value }))
        setErrors(prev => {
            if (!prev[name]) return prev
            const { [name]: _, ...cleanErrors } = prev
            return cleanErrors
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        const validationErrors = validateAuthForm(fields, values)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            setIsSubmitting(true)
            await onSubmit(values)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        values,
        errors,
        submitted,
        isSubmitting,
        handleChange,
        handleSubmit
    }
}