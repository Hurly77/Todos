import { CalendarDaysIcon, BellIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { DAYS_OF_WEEK, REPEAT_TYPE_ADVERBS_MAP } from "../constants/task-dates-options";
import { TaskCategories } from "../constants/enums";

export function getRepeatString({ type, days, interval }: NonNullable<Task["repeat"]>) {
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

export const getCategoryColor = (category: TaskCategories) => {
  switch (category) {
    case TaskCategories.RED:
      return "border-red-500 bg-red-500 bg-opacity-10";
    case TaskCategories.BLUE:
      return "border-blue-500 bg-blue-500 bg-opacity-10";
    case TaskCategories.GREEN:
      return "border-green-500 bg-green-500 bg-opacity-10";
    case TaskCategories.YELLOW:
      return "border-yellow-500 bg-yellow-500 bg-opacity-10";
    case TaskCategories.PURPLE:
      return "border-purple-500 bg-purple-500 bg-opacity-10";
    case TaskCategories.ORANGE:
      return "border-orange-500 bg-orange-500 bg-opacity-10";
    default:
      return "border-gray-500";
  }
};

export const getCategoryBadge = (category: TaskCategories) => {
  switch (category) {
    case TaskCategories.RED:
      return "border-red-500 hover:bg-opacity-100 bg-red-500 bg-opacity-10";
    case TaskCategories.BLUE:
      return "border-blue-500 hover:bg-opacity-100 bg-blue-500 bg-opacity-10";
    case TaskCategories.GREEN:
      return "border-green-500 hover:bg-opacity-100 bg-green-500 bg-opacity-10";
    case TaskCategories.YELLOW:
      return "border-yellow-500 hover:bg-opacity-100 bg-yellow-500 bg-opacity-10";
    case TaskCategories.PURPLE:
      return "border-purple-500 hover:bg-opacity-100 bg-purple-500 bg-opacity-10";
    case TaskCategories.ORANGE:
      return "border-orange-500 bg-orange-500 hover:bg-opacity-100 bg-opacity-10";
    default:
      return "border-gray-500 hover:bg-opacity-100";
  }
};
