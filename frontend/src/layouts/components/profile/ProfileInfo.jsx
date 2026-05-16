const ProfileInfo = ({ label, value }) => {
  return (
    <div className="grid gap-1 sm:grid-cols-2 sm:items-center border-b border-zinc-50/10 pb-3 last:border-none">
      <span className="text-sm text-zinc-400">
        {label}
      </span>

      <span className="text-sm text-zinc-400 sm:text-right font-medium wrap-break-word">
        {value || "-"}
      </span>
    </div>
  )
}

export default ProfileInfo