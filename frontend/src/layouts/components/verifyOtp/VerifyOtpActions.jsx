import { Button } from "@headlessui/react"
import {
  NeumorphismBox,
  NeumorphismButton,
} from "../../../styles/components"

const VerifyOtpActions = ({
  loading,
  onSubmit,
  onResend,
}) => {
  return (
    <div className="mt-8 space-y-4">
      <NeumorphismButton
        onClick={onSubmit}
        disabled={loading}
        variant="secondary"
        size="lg"
        className="w-full text-zinc-600"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </NeumorphismButton>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-indigo-500/30 shadow-[0_1px_2px_rgba(163,177,198,0.25)]" />

        <p className="text-xs font-medium tracking-wide text-zinc-400">
          OR
        </p>

        <div className="h-px flex-1 bg-indigo-500/30 shadow-[0_1px_2px_rgba(163,177,198,0.25)]" />
      </div>

      <NeumorphismBox
        as="button"
        type="button"
        onClick={onResend}
        variant="button"
        className="w-full cursor-pointer py-3 text-sm text-center font-medium text-zinc-600 transition-all hover:text-indigo-400 active:scale-[0.98]"
      >
        Resend OTP
      </NeumorphismBox>
    </div>
  )
}

export default VerifyOtpActions