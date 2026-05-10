const NeumorphismBox = ({
  children,
  variant = "card",
  rounded = "rounded-3xl",
  padding = "p-3",
  className = "",
  ...props
}) => {
  const shadowVariants = {
    card: "neo-out",
    button: "neo-light",
    inset: "neo-inset",
    header: "neo-header",
    buttonHover: "neo-button-hover",
  }

  return (
    <div
      className={`
        neo
        ${rounded}
        ${padding}
        ${shadowVariants[variant]}
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default NeumorphismBox