import { PencilLine } from "lucide-react"
import {
  NeumorphismBox,
} from "../../../styles/components"

const ProfileEditButton = ({ onClick }) => {
  return (
    <NeumorphismBox
      as="button"
      onClick={onClick}
      variant="button"
      className="shrink-0 flex h-11 w-11 items-center justify-center rounded-2xl text-zinc-500 transition-all hover:text-indigo-500 active:scale-[0.96]"
    >
      <PencilLine size={16} />
    </NeumorphismBox>
  )
}

export default ProfileEditButton