import { Button, Field, Input, Label } from "@headlessui/react"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const FormField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  icon: Icon = null,
  error = null,
  value = "",
  onChange,
  togglePassword = true,
  className = "",
  inputClassName = ""
}) => {
  const isPassword = type === "password"
  const [showPassword, setShowPassword] = useState(false)
  const inputType = isPassword && togglePassword && showPassword ? "text" : type

  const baseClass = "w-full rounded-xl px-4 py-3 text-sm placeholder:text-zinc-400 border transition focus:outline-none"
  const stateClass = error ? "border-rose-500 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/20" : "border-zinc-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
  const paddingLeft = Icon ? "pl-11" : "pl-4"
  const paddingRight = isPassword && togglePassword ? "pr-11" : "pr-4"

  return (
    <Field className={`flex flex-col gap-1.5 ${className}`}>
      {label && <Label className="text-xs font-medium text-zinc-400">{label}</Label>}

      <div className="relative">
        {Icon && (
          <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 pointer-events-none">
            <Icon size={18} />
          </span>
        )}

        <Input
          id={name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`${baseClass} ${stateClass} ${paddingLeft} ${paddingRight} ${inputClassName}`}
        />

        {isPassword && togglePassword && (
          <Button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-indigo-400 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        )}
      </div>

      {error && <p className="text-xs text-rose-400">{error}</p>}
    </Field>
  )
}

export default FormField