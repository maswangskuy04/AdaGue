import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthService from "../../../services/authService"
import { useAlert } from "../../../hooks/useAlert"
import OtpInput from "./OtpInput"
import VerifyOtpActions from "./VerifyOtpActions"
import { NeumorphismBox } from "../../../styles/components"
import { Mail } from "lucide-react"

const VerifyOtpPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)

  const { success, error } = useAlert()

  const submitOtp = async () => {
    if (otp.length !== 6) {
      error("OTP must be 6 digits")
      return
    }

    try {
      setLoading(true)

      const res = await AuthService.verifyOtp({
        email: state.email,
        otp,
      })

      success(res.message)
      navigate("/auth/login")
    } catch (err) {
      error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen color-flows flex items-center justify-center px-4">
      <NeumorphismBox
        variant="card"
        className="w-full max-w-md p-8"
      >
        <div className="text-center">
          <NeumorphismBox
            variant="inset"
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center"
          >
            <Mail className="text-teal-500" />
          </NeumorphismBox>

          <h1 className="text-2xl font-semibold text-zinc-800">
            Verify Email
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Enter the 6 digit OTP code sent to your email address
          </p>
        </div>

        <div className="mt-8">
          <OtpInput value={otp} onChange={setOtp} />
        </div>

        <VerifyOtpActions
          loading={loading}
          onSubmit={submitOtp}
        />
      </NeumorphismBox>
    </div>
  )
}

export default VerifyOtpPage