import { motion } from "motion/react"
import { ArrowBigRightDash, MessageCircleMore } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useMatch } from "../../../context/MatchContext"
import { Button } from "@headlessui/react"

const MatchedBanner = ({ partner }) => {
  const navigate = useNavigate()
  const { match } = useMatch()

  if (!match) return

  return (
    <div className="relative py-24 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md text-center"
      >
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-sky-400 shadow-lg border border-sky-500 flex items-center justify-center">
          <MessageCircleMore className="w-6 h-6 text-sky-100" />
        </div>

        <h2 className="text-lg font-semibold text-zinc-200">
          Berhasil Menemukan Teman
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Sekarang kamu bisa ngobrol dengan{" "}
          <span className="font-medium text-yellow-600">
            {partner.fullname}
          </span>
        </p>

        <div className="mt-4 mb-3 flex justify-center">
          <span className="w-12 h-px bg-zinc-500" />
        </div>

        <p className="text-xs text-zinc-400">
          Sapa dia dan mulai percakapanmu
        </p>

        <div className="mt-3 flex justify-center items-center gap-2 text-xs text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Terhubung
        </div>

        <Button
          onClick={() => navigate(`/chat/${match.conversationId}`)}
          className="cta-chat"
        >
          Masuk Ruang Obrolan
          <ArrowBigRightDash />
        </Button>
      </motion.div>
    </div>
  )
}

export default MatchedBanner
