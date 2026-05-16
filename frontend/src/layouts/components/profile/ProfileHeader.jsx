import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import {
  NeumorphismBox,
} from "../../../styles/components"

const ProfileHeader = () => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 pt-5 pb-4">
        <NeumorphismBox
          variant="button"
          className="flex items-center gap-3 rounded-[28px] px-4 py-3"
        >
          <NeumorphismBox
            as="button"
            onClick={() => navigate(-1)}
            variant="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-zinc-500 transition-all hover:text-zinc-700 active:scale-[0.96]"
          >
            <ArrowLeft size={18} />
          </NeumorphismBox>
          <div>
            <h1 className="text-sm font-semibold text-zinc-700">
              Profil Akun
            </h1>

            <p className="text-xs text-zinc-500">
              Kelola informasi akun kamu
            </p>
          </div>
        </NeumorphismBox>
      </div>
    </header>
  )
}

export default ProfileHeader