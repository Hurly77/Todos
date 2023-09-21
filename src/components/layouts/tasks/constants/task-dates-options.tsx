import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const ABBREVIATED_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const ABBREVIATED_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const EOD = new Date().setHours(23, 59, 59, 59);
export const TOMORROW = new Date(EOD).setDate(new Date().getDate() + 1);
export const NEXT_WEEK = new Date(EOD).setDate(new Date().getDate() + 7);

export const DAILY_MILLISECONDS = 1000 * 60 * 60 * 24;
export const WEEKLY_MILLISECONDS = DAILY_MILLISECONDS * 7;
export const MONTHLY_MILLISECONDS = DAILY_MILLISECONDS * 30;
export const YEARLY_MILLISECONDS = DAILY_MILLISECONDS * 365;

export const DUE_DATE_DROPDOWN_OPTIONS = [
  { key: "today", name: "Today", value: new Date(EOD) },
  { key: "tomorrow", name: "Tomorrow", value: new Date(TOMORROW) },
  { key: "next-week", name: "Next Week", value: new Date(NEXT_WEEK) },
];

export const REMINDER_DROPDOWN_OPTIONS = [
  { key: "later-today", name: "Later Today", value: new Date(EOD) },
  { key: "tomorrow", name: "Tomorrow", value: new Date(TOMORROW) },
  { key: "next-week", name: "Next Week", value: new Date(NEXT_WEEK) },
];

export const REPEAT_DROPDOWN_OPTIONS = [
  { key: "daily", name: "Daily", value: DAILY_MILLISECONDS },
  { key: "weekly", name: "Weekly", value: WEEKLY_MILLISECONDS },
  { key: "monthly", name: "Monthly", value: MONTHLY_MILLISECONDS },
  { key: "yearly", name: "Yearly", value: YEARLY_MILLISECONDS },
];
