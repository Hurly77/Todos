import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import AppContextProvider from "./context/AppContext";
type LayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
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
