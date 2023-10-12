import Head from "next/head";
import { NextPageWithLayout } from "../_app";
import ForgotPasswordPage from "@/components/layouts/auth/pages/ForgotPasswordPage";
import AuthLayout from "@/components/layouts/auth";

export const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>ForgotPassword - Toduit</title>
        <meta name="NextJS Todo Application Auth Forgot password" content="Forgot Password Authentication" />
      </Head>
      <ForgotPasswordPage />
    </>
  );
};

ForgotPassword.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default ForgotPassword;
