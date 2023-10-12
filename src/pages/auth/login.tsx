import Head from "next/head";
import { NextPageWithLayout } from "../_app";
import LoginPage from "@/components/layouts/auth/pages/LoginPage";
import AuthLayout from "@/components/layouts/auth";

export const Login: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Login - Toduit</title>
        <meta name="Login to NextJS application For Todo" content="Login to Toduit" />
      </Head>
      <LoginPage />
    </>
  );
};

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Login;
