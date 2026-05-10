// components
import AuthForm from "../../layouts/components/AuthForm"
import AuthLayout from "../../layouts/AuthLayout"
// services
import AuthService from "../../services/authService"
// hooks
import { useNavigate } from "react-router-dom"
import { registerFields } from "../../utils/authFormField"
import { useAlert } from "../../hooks/useAlert"

const Register = () => {
  const navigate = useNavigate()
  const { success, error } = useAlert()

  const handleRegister = async (payload) => {
    try {
      const res = await AuthService.register(payload)
      navigate('/auth/verify-otp', {
        state: {
          email: payload.email
        }
      })
      success(res.message)
    } catch (err) {
      error(err.message)
    }
  }

  return (
    <AuthLayout>
      <AuthForm
        title="AdaGue"
        subtitle="Daftar dulu biar bisa mulai ngobrol"
        fields={registerFields}
        footerText="Udah punya akun?"
        footerLink='/auth/login'
        footerLinkText="Masuk aja"
        submitText="Gas Daftar"
        onSubmit={handleRegister}
      />
    </AuthLayout>
  )
}

export default Register