import { CalendarDaysIcon, BellIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { DAYS_OF_WEEK, REPEAT_TYPE_ADVERBS_MAP } from "../constants/task-dates-options";

export function getRepeatString({ type, days, interval }: NonNullable<Task["repeat"]>) {
  const isWeeks = type === "weeks";

  const typeCategory = interval <= 1 ? REPEAT_TYPE_ADVERBS_MAP[type] : `Every ${interval} ${type}`;
  const currentDays = days?.map((day) => DAYS_OF_WEEK[day]);
  console.log(days);

  if (isWeeks && currentDays) {
    const daysString =
      currentDays?.length > 1
        ? currentDays?.slice(0, -1)?.join(", ") + ((" & " + currentDays?.[currentDays?.length - 1]) as string)
        : currentDays?.join("");
    return `${typeCategory}, ${daysString}`;
  } else {
    return interval <= 1 ? REPEAT_TYPE_ADVERBS_MAP[type] : `Every ${interval} ${type}`;
  }
}

export const getIcon = (type: "calendar" | "repeat" | "bell") => {
  switch (type) {
    case "calendar":
      return CalendarDaysIcon;
    case "repeat":
      return ArrowPathRoundedSquareIcon;
    case "bell":
      return BellIcon;
  }
};
