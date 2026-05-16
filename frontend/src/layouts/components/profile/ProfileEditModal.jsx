import Modal from "../../../layouts/components/Modal"
import ProfileForm from "./ProfileForm"

const ProfileEditModal = ({ open, onClose, user }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Profil"
      size="md"
    >
      <ProfileForm
        user={user}
        onCancel={onClose}
        onSuccess={onClose}
      />
    </Modal>
  )
}

export default ProfileEditModal