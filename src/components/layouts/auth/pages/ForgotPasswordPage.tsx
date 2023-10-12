import AuthForm from "../components/AuthForm";
import { AuthFormType } from "../constants/auth-text";

export default function ForgotPasswordPage() {
  return <AuthForm formType={AuthFormType.FORGOT_PASSWORD} />;
}
