import { Cog6ToothIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { Avatar, Button } from "@nextui-org/react";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import NavigationDropdownMenu from "./NavigationDropdownMenu";
import useSession from "@/app/hooks/useSession";

export default function ToDosNavbar() {
  const ctx = React.useContext(TasksLayoutContext);
  const [open, setOpen] = ctx.sidebarState;
  const session = useSession();

  return (
    <div className="z-40 h-16 bg-primary text-primary-foreground shadow-md flex items-center px-12 justify-between">
      <div className="text-2xl flex items-center space-x-4">
        <ListBulletIcon onClick={() => setOpen(!open)} className="h-7 w-7 stroke-primary-foreground cursor-pointer" />
        <span aria-label="Brand Label">Toduit</span>
      </div>
      <div className="flex items-center h-full space-x-5">
        <NavigationDropdownMenu />
        <span className="cursor-pointer">
          <Avatar size="sm" name={session?.user?.email?.slice(0, 2)?.toUpperCase()} />
        </span>
      </div>
    </div>
  );
}
