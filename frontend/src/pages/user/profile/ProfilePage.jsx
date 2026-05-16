import { useAuth } from "../../../context/AuthContext"
import { formatLastSeen, formatUserCreatedAt } from "../../../utils/date"
import { formatAccountStatus, formatChatStatus, formatPresence } from "../../../utils/userStatus"
import ProfileHeader from "../../../layouts/components/profile/ProfileHeader"
import ProfileIdentity from "../../../layouts/components/profile/ProfileIdentity"
import ProfileInfo from "../../../layouts/components/profile/ProfileInfo"
import ProfileSection from "../../../layouts/components/profile/ProfileSection"
import ProfileEditModal from "../../../layouts/components/profile/ProfileEditModal"
import { useState } from "react"

const ProfilePage = () => {
  const { user } = useAuth()
  const [openEdit, setOpenEdit] = useState(false)

  if (!user) return

  return (
    <>
      <ProfileHeader />

      <div className="max-w-2xl mx-auto px-4 pt-5 space-y-6">
        <ProfileIdentity user={user} onEdit={() => setOpenEdit(true)} />

        <ProfileSection title="Informasi Akun" description="Detail dasar akun kamu">
          <ProfileInfo label="Nama Lengkap" value={user.fullname} />
          <ProfileInfo label="Email" value={user.email} />
          <ProfileInfo label="Tanggal Bergabung" value={formatUserCreatedAt(user.createdAt)} />
        </ProfileSection>

        <ProfileSection title="Status & Aktivitas" description="Kondisi akun dan chat saat ini">
          <ProfileInfo
            label="Status Online"
            value={formatPresence(user.presence)}
          />
          <ProfileInfo
            label="Aktivitas Chat"
            value={formatChatStatus(user.chatStatus)}
          />
          <ProfileInfo
            label="Status Akun"
            value={formatAccountStatus(user.isActive)}
          />
        </ProfileSection>

        <ProfileSection title="Keamanan Akun" description="Informasi keamanan dasar akun">
          <ProfileInfo label="Login Terakhir" value={formatLastSeen(user.lastSeenAt, user.presence === "online")} />
        </ProfileSection>
      </div>

      <ProfileEditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={user}
      />
    </>
  )
}

export default ProfilePage