/**
* NeumorphismButton - Reusable Button Component
*/

const NeumorphismButton = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  disabled = false,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs rounded-xl",
    md: "px-3 py-2 text-sm rounded-2xl",
    lg: "px-4 py-3 text-base rounded-2xl",
  }

  const variantClasses = {
    primary:
      "text-white bg-gradient-to-b from-blue-500 to-blue-600 neo-gradient",
    secondary:
      "neo neo-button text-gray-700 hover:neo-button-hover",
    ghost:
      "text-gray-700 hover:neo-light",
  }

  return (
    <button onClick={onClick} disabled={disabled} className={` font-medium transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]}
      ${disabled ? "opacity-50 cursor-not-allowed" : "" } ${className} `} {...props}>
      {children}
    </button>
  )
}

export default NeumorphismButton
