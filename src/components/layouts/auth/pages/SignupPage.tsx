import AuthForm from "../components/AuthForm";
import { AuthFormType } from "../constants/auth-text";

export default function SignupPage() {
  return <AuthForm formType={AuthFormType.SIGNUP} />;
}
