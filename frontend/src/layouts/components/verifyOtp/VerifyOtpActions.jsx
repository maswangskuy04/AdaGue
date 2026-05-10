import { Button } from "@headlessui/react"

const VerifyOtpActions = ({ loading, onSubmit, onResend }) => {
  return (
    <div className="mt-6 space-y-2">
      <Button
        onClick={onSubmit}
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-500 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verification"}
      </Button>
      <Button
        onClick={onResend}
        className="w-full text-sm text-indigo-600 hover:underline"
      >
        Resend OTP
      </Button>
    </div>
  )
}

export default VerifyOtpActions