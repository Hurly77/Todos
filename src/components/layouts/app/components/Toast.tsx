import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export default function Toast() {
  const { theme } = useTheme();
  return (
    <>
      <Toaster
        position="top-right"
        theme={theme as "dark" | "light"}
        richColors
        closeButton
        toastOptions={{
          style: {
            backgroundColor: "hsl(var(--nextui-background))",
          },
          classNames: {
            success: "text-success",
            info: "text-info",
            error: "text-danger",
            warning: "text-warning",
            loading: "text-default-foreground",
            default: "text-default-foreground",
          },
        }}
      />
    </>
  );
}
