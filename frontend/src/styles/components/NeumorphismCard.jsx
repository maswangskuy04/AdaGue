const NeumorphismCard = ({
  children,
  title,
  subtitle,
  rounded = "rounded-3xl",
  padding = "p-3",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        neo
        neo-card
        ${rounded}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-900">
            {title}
          </p>

          {subtitle && (
            <p className="mt-1 text-xs text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  )
}

export default NeumorphismCard