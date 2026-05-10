import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AuthService from "../../../services/authService"
import { useAlert } from "../../../hooks/useAlert"
import OtpInput from "./OtpInput"
import VerifyOtpActions from "./VerifyOtpActions"

const VerifyOtpPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const { success, info, error } = useAlert()

  const submitOtp = async () => {
    if (otp.length !== 6) {
      error("OTP must be 6 digits")
      return
    }

    try {
      setLoading(true)
      const res = await AuthService.verifyOtp({
        email: state.email,
        otp
      })
      navigate('/auth/login')
      success(res.message)
    } catch (err) {
      error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <div className="w-full max-w-sm p-6 rounded-xl shadow-lg bg-zinc-50">
        <h1 className="text-xl font-semibold text-center">Email Verification</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Enter the OTP code sent to your email</p>

        <OtpInput value={otp} onChange={setOtp} />

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {error}
          </p>
        )}

        <VerifyOtpActions
          loading={loading}
          onSubmit={submitOtp}
        />
      </div>
    </div>
  )
}

export default VerifyOtpPage