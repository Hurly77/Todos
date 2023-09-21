import { HomeIcon, CalendarDaysIcon, StarIcon, SunIcon } from "@heroicons/react/24/outline";

export const tasksNavigationSidebarLinks = [
  {
    href: "/tasks",
    Icon: SunIcon,
    routes: [],
    name: "Today",
    metadata: {
      "aria-label": "Today",
      role: "link",
    },
  },
  {
    href: "/tasks/important",
    Icon: StarIcon,
    routes: [],
    name: "Important",
    metadata: {
      "aria-label": "Important",
      role: "link",
    },
  },
  {
    href: "/tasks/planned",
    Icon: CalendarDaysIcon,
    routes: [],
    name: "Planned",
    metadata: {
      "aria-label": "Planned",
      role: "link",
    },
  },
  {
    href: "/tasks/all",
    Icon: HomeIcon,
    routes: [],
    name: "Tasks",
    metadata: {
      "aria-label": "All Tasks",
      role: "link",
    },
  },
];
