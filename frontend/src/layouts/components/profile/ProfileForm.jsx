import { useState } from "react"
import {
  NeumorphismBox,
  NeumorphismButton,
} from "../../../styles/components"

import FormField from "../../../layouts/components/FormField"

const ProfileForm = ({ user, onCancel, onSuccess }) => {
  const [form, setForm] = useState({
    fullname: user.fullname || "",
    email: user.email || "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  return (
    <form className="space-y-4">
      <FormField
        label="Nama Lengkap"
        name="fullname"
        placeholder="Nama lengkap kamu"
        value={form.fullname}
        error={errors.fullname}
      />

      <FormField
        label="Email"
        name="email"
        placeholder="Email kamu"
        value={form.email}
        error={errors.email}
      />

      <div className="flex justify-end gap-3 pt-4">
        <NeumorphismBox
          as="button"
          type="button"
          onClick={onCancel}
          variant="button"
          className="rounded-2xl px-5 py-2.5 text-sm text-zinc-600 active:scale-[0.96]"
        >
          Batal
        </NeumorphismBox>

        <NeumorphismButton
          type="submit"
          disabled={loading}
          variant="primary"
          className="px-5 py-2.5"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </NeumorphismButton>
      </div>
    </form>
  )
}

export default ProfileForm