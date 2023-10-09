import { ArrowPathRoundedSquareIcon, BellIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Chip } from "@nextui-org/react";
import { DAYS_OF_WEEK, REPEAT_TYPE_ADVERBS_MAP } from "../../constants/task-dates-options";

const getRepeatString = ({ type, days, interval }: NonNullable<Task["repeat"]>) => {
  const isWeeks = type === "weeks";

  const typeCategory = interval <= 1 ? REPEAT_TYPE_ADVERBS_MAP[type] : `Every ${interval} ${type}`;
  const currentDays = days?.map((day) => DAYS_OF_WEEK[day]);

  if (isWeeks && currentDays) {
    const daysString =
      currentDays?.length > 1
        ? currentDays?.slice(0, -1)?.join(", ") + ((" & " + currentDays?.[currentDays?.length - 1]) as string)
        : currentDays?.join("");
    return `${typeCategory}, ${daysString}`;
  } else {
    return interval <= 1 ? REPEAT_TYPE_ADVERBS_MAP[type] : `Every ${interval} ${type}`;
  }
};

export default function DateChip({
  date,
  icon,
}: {
  date: Date | null | Task["repeat"];
  icon?: "bell" | "calendar" | "repeat";
}) {
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
