import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import { tasksNavigationSidebarLinks } from "../../constants/navbar-data.constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { classNames } from "@/app/helpers/twind-helper";
import { useMediaQuery, useSizes, useIsSmall } from "@/app/hooks/useMediaQuery";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export default function Sidebar() {
  const router = useRouter();
  const ctx = React.useContext(TasksLayoutContext);
  const [open, setOpen] = ctx.sidebarState;

  const isSmall = useIsSmall((isSmall) => {
    if (isSmall) setOpen(false);
    if (!isSmall) setOpen(true);
  });
  const pathname = router.pathname;

  const toastTypes = ["info", "success", "error", "warning", "loading", "default"] as const;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          transition={{ duration: 0.5, type: "tween" }}
          initial={{ width: 0 }}
          animate={{ width: isSmall ? "100vw" : "22rem" }}
          exit={{ width: 0 }}
          className={classNames(
            isSmall ? "absolute z-30 bg-background h-full max-h-[calc(100vh-4rem)]" : "",
            "z-10 sm:max-w-xs overflow-hidden py-4 custom-shadow bg-content1"
          )}
        >
          <div className="p-0">
            {tasksNavigationSidebarLinks.map(({ name, Icon, href, metadata }) => (
              <Link
                {...metadata}
                key={name}
                href={href}
                onClick={() => {
                  if (isSmall) setOpen(false);
                }}
              >
                <div
                  className={classNames(
                    "border-l-4 pl-8 py-2 flex items-center space-x-3 hover:text-content1-foreground  cursor-pointer",
                    pathname === href
                      ? "bg-default text-default-foreground bg-opacity-50 border-primary"
                      : "border-transparent hover:bg-default-300"
                  )}
                >
                  <Icon className="h-5 w-5 min-w-[1.5rem]" />

                  <span>{name}</span>
                </div>
              </Link>
            ))}

            <div className="p-4 border-t mt-4 flex flex-col space-y-2">
              {toastTypes.map((type) => (
                <Button
                  key={type}
                  color={
                    type === "error" ? "danger" : type === "info" ? "secondary" : type === "loading" ? "default" : type
                  }
                  onPress={() => {
                    const toastProps = { duration: 3000, closeButton: true };

                    if (type === "default") {
                      toast(`I'm ${type} Toast`, { duration: 3000, closeButton: true });
                    } else if (type === "loading") {
                      const id = toast.loading("I'm a loading Toast", toastProps);
                      setTimeout(() => {
                        toast.success("I'm a success Toast", { id, ...toastProps });
                      }, 2000);
                    } else toast[type](`I'm a ${type} Toast`, { duration: 3000, closeButton: true });
                  }}
                >
                  Show {type} toast
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
