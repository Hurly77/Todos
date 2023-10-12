import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Link } from "@nextui-org/react";
import { AuthFormType } from "../constants/auth-text";
import { getFormConstants } from "../helpers/auth-form-helpers";
import { classNames } from "../../app/helpers/twind-helper";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { AuthError } from "@supabase/supabase-js";

export default function LoginForm({ formType }: { formType: AuthFormType }) {
  const AUTH_TEXT = getFormConstants(formType);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response =
        formType === AuthFormType.LOGIN
          ? await supabase.auth.signInWithPassword({ email, password })
          : formType === AuthFormType.SIGNUP
          ? await supabase.auth.signUp({ email, password })
          : formType === AuthFormType.FORGOT_PASSWORD
          ? await supabase.auth.resetPasswordForEmail(email)
          : null;
      console.log("response ", response);
      if (response?.error) throw response.error;
    } catch (e) {
      const error = e as AuthError;
      console.log("ERROR_h ", error.message);
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  }

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
          {error && <span className="text-danger font-medium pb-1">*{error}</span>}
          <div className="space-y-4">
            <Input
              autoComplete="email"
              placeholder="john@doeknowme.com"
              label="Email"
              labelPlacement="outside"
              radius="sm"
              color="primary"
              variant="bordered"
              onValueChange={(value) => setEmail(value)}
              classNames={{
                label: "text-foreground-500",
              }}
            />
            {formType !== AuthFormType.FORGOT_PASSWORD && (
              <Input
                autoComplete="current-password"
                label="Password"
                type="password"
                labelPlacement="outside"
                placeholder="type password here"
                radius="sm"
                color="primary"
                variant="bordered"
                onValueChange={(value) => setPassword(value)}
                classNames={{
                  label: "text-foreground-500",
                }}
              />
            )}
          </div>
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
          <Button type="submit" radius="sm" color="primary" className="w-full text-md font-medium">
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
