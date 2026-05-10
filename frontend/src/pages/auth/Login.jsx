// components
import AuthForm from "../../layouts/components/AuthForm";
import AuthLayout from "../../layouts/AuthLayout";
// hooks
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginFields } from "../../utils/authFormField";
import { useAuth } from "../../context/AuthContext";
import { redirectByRole } from "../../utils/redirectByRole";
import { useAlert } from "../../hooks/useAlert";

const Login = () => {
  const { user, login, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { success, error } = useAlert()

  if (!loading && user) {
    const from = location.state?.from?.pathname
    return <Navigate to={from || redirectByRole(user.roles)} replace />
  }

  const handleLogin = async (payload) => {
    try {
      const user = await login(payload)
      const from = location.state?.from?.pathname
      navigate(from || redirectByRole(user.roles), { replace: true })
      success(`Welcome back, ${user.fullname}`)
    } catch (err) {
      error(err.message)
    }
  }

  return (
    <AuthLayout>
      <AuthForm
        title="AdaGue"
        subtitle="Yuk masuk dan mulai ngobrol"
        fields={loginFields}
        submitText="Gas Masuk"
        footerText="Baru di sini?"
        footerLink="/auth/register"
        footerLinkText="Gabung sekarang"
        onSubmit={handleLogin}
      />
    </AuthLayout>
  )
}

export default Login