import AuthForm from "../components/AuthForm";
import { AuthFormType } from "../constants/auth-text";

export default function LoginPage() {
  return <AuthForm formType={AuthFormType.LOGIN} />;
}
