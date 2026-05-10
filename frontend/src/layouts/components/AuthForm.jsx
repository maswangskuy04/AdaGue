// components
import FormField from "../../layouts/components/FormField"
// hooks
import { Link } from "react-router-dom"
import { useAuthForm } from "../../hooks/useAuthForm"

const AuthForm = ({
  title,
  subtitle,
  fields,
  submitText,
  footerText,
  footerLink,
  footerLinkText,
  onSubmit
}) => {
  const {
    values,
    errors,
    submitted,
    isSubmitting,
    handleChange,
    handleSubmit
  } = useAuthForm({ fields, onSubmit })

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-zinc-400 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={values[field.name] || ""}
            error={submitted ? errors[field.name] : null}
            onChange={handleChange}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-linear-to-r from-indigo-500 to-indigo-400 py-3 text-sm font-semibold text-white hover:from-indigo-400 hover:to-indigo-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {isSubmitting ? "Loading..." : submitText}
      </button>

      {footerText && (
        <p className="text-center text-sm text-zinc-400">
          {footerText}{" "}
          <Link to={footerLink} className="font-medium text-indigo-400 hover:text-indigo-300 transition">
            {footerLinkText}
          </Link>
        </p>
      )}
    </form>
  )
}

export default AuthForm