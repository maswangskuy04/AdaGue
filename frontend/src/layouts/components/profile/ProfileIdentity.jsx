import { BadgeCheck, TriangleAlert } from "lucide-react"
import ProfileAvatar from "./ProfileAvatar"
import ProfileEditButton from "./ProfileEditButton"
import {
  NeumorphismBox,
} from "../../../styles/components"

const ProfileIdentity = ({ user, onEdit }) => {
  const isVerified = user?.isVerified

  return (
    <NeumorphismBox
      variant="card"
      className="flex items-center justify-between gap-4 rounded-[28px] px-5 py-5"
    >
      <div className="flex min-w-0 items-center gap-4">
        <ProfileAvatar
          avatar={user.avatar}
          fullname={user.fullname}
        />

        <div className="min-w-0 space-y-1">
          <p className="truncate text-sm font-semibold text-zinc-700">
            {user.fullname}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-xs text-zinc-500">
              {user.email}
            </span>

            {isVerified ? (
              <NeumorphismBox
                variant="button"
                rounded="rounded-full"
                padding="px-2.5 py-1"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600"
              >
                <BadgeCheck size={12} />
                Verified
              </NeumorphismBox>
            ) : (
              <NeumorphismBox
                variant="button"
                rounded="rounded-full"
                padding="px-2.5 py-1"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600"
              >
                <TriangleAlert size={12} />
                Unverified
              </NeumorphismBox>
            )}
          </div>
        </div>
      </div>

      <ProfileEditButton onClick={onEdit} />
    </NeumorphismBox>
  )
}

export default ProfileIdentity