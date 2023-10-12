import Head from "next/head";
import { NextPageWithLayout } from "../_app";
import SignupPage from "@/components/layouts/auth/pages/SignupPage";
import AuthLayout from "@/components/layouts/auth";

export const Signup: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Sign Up - Toduit</title>
        <meta name="description" content="Important Tasks" />
      </Head>
      <SignupPage />
    </>
  );
};

Signup.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Signup;
