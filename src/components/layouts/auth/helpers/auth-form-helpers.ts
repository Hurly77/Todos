import { AuthFormType } from "../constants/auth-text";
import { AUTH_LOGIN_TEXT, AUTH_SIGNUP_TEXT, AUTH_FORGOT_PASSWORD_TEXT } from "../constants/auth-text";

export function getFormConstants(type: AuthFormType) {
  switch (type) {
    case AuthFormType.LOGIN:
      return AUTH_LOGIN_TEXT;
    case AuthFormType.SIGNUP:
      return AUTH_SIGNUP_TEXT;
    case AuthFormType.FORGOT_PASSWORD:
      return AUTH_FORGOT_PASSWORD_TEXT;
    default:
      return AUTH_LOGIN_TEXT;
  }
}
