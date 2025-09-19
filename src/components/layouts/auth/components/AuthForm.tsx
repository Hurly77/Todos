import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link } from "@nextui-org/react";
import { AuthFormType } from "../constants/auth-text";
import { getFormConstants } from "../helpers/auth-form-helpers";
import { classNames } from "../../app/helpers/twind-helper";
import { ChevronLeftIcon, EyeSlashIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import React from "react";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { AuthError } from "@supabase/supabase-js";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { toast } from "sonner";

const getDemoUser = (demo: string) => {
  try {
    const { email, password } = JSON.parse(demo) as { email: string; password: string };
    return { email, password };
  } catch (e) {
    console.error("Error parsing demo user: ", e);
    toast.error("Could not parse demo user", { duration: 2500 });
  }
};

export default function LoginForm({ formType }: { formType: AuthFormType }) {
  const AUTH_TEXT = getFormConstants(formType);
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showingPassword, setShowingPassword] = React.useState(false);
  const [resetLinkSent, setResetLinkSent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const passwordsMatch = password === confirmPassword;
  const displayPasswordError = !passwordsMatch && confirmPassword.length > 0 && password.length > 0;

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formType === AuthFormType.SIGNUP && !passwordsMatch) return;
    setIsLoading(true);
    try {
      const response =
        formType === AuthFormType.LOGIN
          ? await supabase.auth.signInWithPassword({ email, password })
          : formType === AuthFormType.SIGNUP
          ? await supabase.auth.signUp({ email, password })
          : formType === AuthFormType.FORGOT_PASSWORD
          ? await supabase.auth.resetPasswordForEmail(email)
          : null;

      if (response?.error) throw response.error;
      if (formType === AuthFormType.FORGOT_PASSWORD) {
        setResetLinkSent(true);
        return;
      }
    } catch (e) {
      const error = e as AuthError;
      console.log("ERROR_h ", error.message);
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    if (router.query.demo) {
      const demoUser = getDemoUser(router.query.demo as string);
      if (demoUser) {
        setEmail(demoUser.email);
        setPassword(demoUser.password);
      }
    }
  }, [router.query.demo]);

  return (
    <form
      onSubmit={handleOnSubmit}
      className=" w-full flex justify-center items-center p-4 to-background grow from-default bg-gradient-to-tr"
      role="form"
    >
      <Card shadow="none" className="max-w-md w-full rounded-md shadow-md p-6">
        <CardHeader>
          <div className="w-full pb-4">
            <h1 className="flex w-full text-2xl text-foreground-700">
              <span>{AUTH_TEXT?.HEADER}</span>
            </h1>
            <span className="text-sm text-foreground-500">{AUTH_TEXT?.SUBHEADER}</span>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 pb-4">
          {error && (
            <span aria-label="auth-error" className="text-danger font-medium pb-1">
              *{error}
            </span>
          )}
          {resetLinkSent && formType === AuthFormType.FORGOT_PASSWORD ? (
            <p>A reset link has been sent to {email}.</p>
          ) : (
            <div className="space-y-4">
              <Input
                autoComplete="email"
                placeholder="john@doeknowme.com"
                label="Email"
                aria-label="Email"
                labelPlacement="outside"
                radius="sm"
                color="primary"
                variant="bordered"
                onValueChange={setEmail}
                value={email}
                classNames={{
                  label: "text-foreground-500",
                }}
              />
              {formType !== AuthFormType.FORGOT_PASSWORD && (
                <Input
                  autoComplete="current-password"
                  label="Password"
                  type={showingPassword ? "text" : "password"}
                  labelPlacement="outside"
                  placeholder="type password here"
                  radius="sm"
                  color="primary"
                  variant="bordered"
                  onValueChange={setPassword}
                  value={password}
                  endContent={
                    showingPassword ? (
                      <EyeSlashIcon
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => setShowingPassword(!showingPassword)}
                      />
                    ) : (
                      <EyeIcon
                        className="h-5 w-5 cursor-pointer"
                        onClick={() => setShowingPassword(!showingPassword)}
                      />
                    )
                  }
                  classNames={{
                    label: "text-foreground-500",
                  }}
                />
              )}

              {formType === AuthFormType.SIGNUP && (
                <Input
                  autoComplete="current-password"
                  label="Password"
                  type={showingPassword ? "text" : "password"}
                  labelPlacement="outside"
                  placeholder="type password here"
                  radius="sm"
                  color={displayPasswordError ? "danger" : "primary"}
                  variant="bordered"
                  onValueChange={setConfirmPassword}
                  value={confirmPassword}
                  isInvalid={displayPasswordError}
                  errorMessage={displayPasswordError ? "Passwords do not match" : ""}
                  classNames={{
                    label: "text-foreground-500",
                    inputWrapper: displayPasswordError ? "border-danger" : "",
                  }}
                  endContent={
                    displayPasswordError ? (
                      <ShieldExclamationIcon className={classNames("h-6 w-6 stroke-danger")} />
                    ) : (
                      <ShieldCheckIcon
                        className={classNames("h-6 w-6", passwordsMatch ? "stroke-success" : "stroke-foreground")}
                      />
                    )
                  }
                />
              )}
            </div>
          )}
        </CardBody>
        <CardFooter className="flex flex-col space-y-4 px-3 py-0 pb-4">
          <div className={classNames("flex w-full text-sm", formType !== AuthFormType.SIGNUP ? "justify-between" : "")}>
            {formType !== AuthFormType.FORGOT_PASSWORD && (
              <span className="flex justify-between text-foreground-600">
                <Checkbox radius="sm" />
                <span>{AUTH_TEXT.CHECKBOX_TEXT}&nbsp;</span>
              </span>
            )}

            {[AuthFormType.SIGNUP, AuthFormType.LOGIN].includes(formType) && (
              <div>
                <Link size="sm" href={AUTH_TEXT.LINK_HREF}>
                  {AUTH_TEXT.LINK_TEXT}
                </Link>
              </div>
            )}
          </div>
          <Button
            isLoading={isLoading}
            type="submit"
            radius="sm"
            color="primary"
            className="w-full text-md font-medium"
          >
            {AUTH_TEXT.BUTTON}
          </Button>
          <div className="text-foreground-600 text-sm">
            <span className="text-foreground-600">{AUTH_TEXT.FOOTER_TEXT}&nbsp;</span>
            <Link size="sm" href={AUTH_TEXT.BOTTOM_LINK_HREF}>
              {formType === AuthFormType.FORGOT_PASSWORD && <ChevronLeftIcon className="h-5 w-5" />}
              <span>{AUTH_TEXT.BOTTOM_LINK_TEXT}</span>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
