import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import AppContextProvider from "./context/AppContext";
import { supabase } from "@/lib/sdk/utilities/supabase";
import React from "react";
type LayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.supabase = supabase;
  }
  React.useEffect(() => {
    async function checkLoginStatus() {
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session);
      });
      console.log(authListener);
    }

    async function loginUser() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "camrbo@gmail.com",
        password: "pass123",
      });
      if (error) {
        console.log(error);
      }
    }
    checkLoginStatus();
  }, []);
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
