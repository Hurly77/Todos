import { ArrowPathRoundedSquareIcon, BellIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Chip } from "@nextui-org/react";

export default function DateChip({
  date,
  icon,
}: {
  date: Date | null | number;
  icon?: "bell" | "calendar" | "repeat";
}) {
  let dateValue =
    typeof date !== "number"
      ? (date || new Date()).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : new Intl.RelativeTimeFormat("en-US", { numeric: "auto" }).format(date / 1000 / 60 / 60 / 24, "days");

  const Icon =
    icon === "calendar"
      ? CalendarDaysIcon
      : icon === "bell"
      ? BellIcon
      : icon === "repeat"
      ? ArrowPathRoundedSquareIcon
      : CalendarDaysIcon;

  return (
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
  );
}
