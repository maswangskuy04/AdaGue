const ProfileAvatar = ({ avatar, fullname }) => {
  return (
    <img
      src={avatar ? avatar : `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(fullname)}`}
      alt={fullname}
      className="w-14 h-14 rounded-full object-cover bg-zinc-800 border border-zinc-800/50"
    />
  )
}

export default ProfileAvatar
