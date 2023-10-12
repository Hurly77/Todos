export const AUTH_LOGIN_TEXT = {
  type: "LOGIN",
  HEADER: "Login to Toduit",
  SUBHEADER: "Make getting things done easy.",
  BUTTON: "Login",
  CHECKBOX_TEXT: "Remember me",
  LINK: "Don't have an account? Sign up",
  HREF: "/auth/signup",

  LINK_TEXT: "Forgot Password?",
  LINK_HREF: "/auth/forgot-password",

  BOTTOM_LINK_TEXT: "Sign up",
  BOTTOM_LINK_HREF: "/auth/signup",
  FOOTER_TEXT: "Don't have an account?",
};

export const AUTH_SIGNUP_TEXT = {
  type: "SIGNUP",
  HEADER: "Sign Up for Toduit",
  SUBHEADER: "Enter your details below.",
  BUTTON: "Sign up",
  LINK: "Already have an account? Login",
  HREF: "/auth/signup",
  CHECKBOX_TEXT: "I agree to",

  LINK_TEXT: "privacy policy & terms",
  LINK_HREF: "/auth/forgot-passwords",

  BOTTOM_LINK_TEXT: "Sign in instead",
  BOTTOM_LINK_HREF: "/auth/login",
  FOOTER_TEXT: "Already have an account?",
};

export const AUTH_FORGOT_PASSWORD_TEXT = {
  type: "FORGOT_PASSWORD",
  HEADER: "Forgot Password",
  SUBHEADER: "Enter your email to reset your password.",
  BUTTON: "Send Reset Link",
  LINK: "Back to login",
  HREF: "/auth/forgot-password",
  CHECKBOX_TEXT: "",

  LINK_TEXT: "",
  LINK_HREF: "",

  BOTTOM_LINK_TEXT: "Back to login",
  BOTTOM_LINK_HREF: "/auth/login",
  FOOTER_TEXT: "",
};

export enum AuthFormType {
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
}
