import { Chip } from "@nextui-org/react";

import { getIcon, getRepeatString } from "../../helpers/task-display-helpers";

type DropdownsTriggerDisplayProps = {
  date: Date | null | Task["repeat"];
  icon?: "bell" | "calendar" | "repeat";
  plainText?: boolean;
  hasChip?: boolean;
  placeholder?: string;
};

export default function DropdownsTriggerDisplay({ date, icon, hasChip, placeholder }: DropdownsTriggerDisplayProps) {
  let dateValue = "";
  if (date && "interval" in date) {
    dateValue = getRepeatString(date);
  } else if (date instanceof Date) {
    dateValue = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  const Icon = getIcon(icon || "calendar");
  console.log(`Trigger ${icon} hasChip`, hasChip);
  return (
    <>
      {hasChip ? (
        <Chip
          radius="sm"
          size="md"
          className="border dark:border-foreground-400 bg-white dark:bg-black rounded-sm"
          classNames={{
            base: "flex max-w-max",
            content: "flex items-center justify-between space-x-2 px-0",
          }}
        >
          <Icon className="h-5 w-5 hover:cursor-pointer" />
          <span className="capitalize">{dateValue}</span>
        </Chip>
      ) : (
        <div className="flex space-x-2 items-center">
          <Icon className="h-5 w-5 hover:cursor-pointer" />
          {placeholder && !date ? <span>{placeholder}</span> : <span className="capitalize">{dateValue}</span>}
        </div>
      )}
    </>
  );
}
