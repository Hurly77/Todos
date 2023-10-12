import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import AppContextProvider from "./context/AppContext";
import { supabase } from "@/lib/sdk/utilities/supabase";
import React from "react";
import { useRouter } from "next/router";
type LayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  const router = useRouter();
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.supabase = supabase;
  }
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" && !router.pathname.includes("/auth")) router.push("/auth/login");
      if (["SIGNED_IN", "INITIAL_SESSION"].includes(event) && session && !router.pathname.includes("/tasks")) {
        console.log("session ", session);
        router.push("/tasks");
      }
    });
    return () => {
      if (authListener.subscription) authListener?.subscription?.unsubscribe();
    };
  }, [router]);
  return (
    <AppContextProvider>
      <NextUIProvider>
        <NextThemeProvider themes={["light", "dark"]} attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">{children}</div>
        </NextThemeProvider>
      </NextUIProvider>
    </AppContextProvider>
  );
}
