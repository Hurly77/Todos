import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import AppContextProvider from "./context/AppContext";
import { supabase } from "@/lib/sdk/utilities/supabase";
import React from "react";
import { Toaster } from "sonner";
import SessionContextProvider from "./context/SessionContext";
import Toast from "./components/Toast";
type LayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.supabase = supabase;
  }

  return (
    <AppContextProvider>
      <NextUIProvider>
        <NextThemeProvider themes={["light", "dark"]} attribute="class" defaultTheme="light">
          <Toast />
          <SessionContextProvider>
            <div className="flex flex-col min-h-screen">{children}</div>
          </SessionContextProvider>
        </NextThemeProvider>
      </NextUIProvider>
    </AppContextProvider>
  );
}
