import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Switch,
  User,
} from "@nextui-org/react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { useRouter } from "next/router";

export default function NavigationDropdownMenu() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <Dropdown showArrow radius="sm">
      <DropdownTrigger>
        <Cog6ToothIcon className="h-7 w-7 stroke-primary-foreground cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Custom item styles" className="p-3">
        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <Switch
                isSelected={theme === "dark" ? true : false}
                onValueChange={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                size="sm"
                defaultSelected
                aria-label="Automatic updates"
              />
            }
          >
            Dark Mode
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem
            onClick={() => {
              supabase.auth.signOut();
              router.push("auth/login");
            }}
            key="logout"
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
