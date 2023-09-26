import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import { tasksNavigationSidebarLinks } from "../../constants/navbar-data.constants";
import { useRouter } from "next/router";
import Link from "next/link";
import { classNames } from "@/app/helpers/twind-helper";

export default function Sidebar() {
  const router = useRouter();
  const ctx = React.useContext(TasksLayoutContext);
  const [open] = ctx.sidebarState;
  const pathname = router.pathname;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          transition={{
            company: "",
            duration: 0.5,
            type: "tween",
          }}
          initial={{ width: 0 }}
          animate={{ width: 320, maxWidth: "50%" }}
          exit={{ width: 0 }}
          className={classNames("z-10 max-w-xs overflow-hidden py-4 custom-shadow dark:bg-default")}
        >
          <div className="p-0">
            {tasksNavigationSidebarLinks.map(({ name, Icon, href, metadata }) => (
              <Link {...metadata} key={name} href={href}>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
