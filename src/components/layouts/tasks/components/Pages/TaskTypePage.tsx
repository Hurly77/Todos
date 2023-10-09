import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import TaskTileForm from "../TaskTiles/TaskTileForm";
import TaskTileList from "../TaskTiles/TaskTileList";
import { CalendarDaysIcon, HomeIcon, StarIcon, SunIcon } from "@heroicons/react/24/outline";

export default function TaskTypePage({ type }: { type: TaskFetcherKeys }) {
  const Icon = () => {
    switch (type) {
      case TaskFetcherKeys.ALL:
        return HomeIcon;
      case TaskFetcherKeys.MY_DAY:
        return SunIcon;
      case TaskFetcherKeys.IMPORTANT:
        return StarIcon;
      case TaskFetcherKeys.PLANNED:
        return CalendarDaysIcon;
    }
  };

  const PageIcon = Icon();
  return (
    <div className="p-6 bg-default-100 grow">
      <h1 className="text-2xl flex items-center space-x-2">
        <PageIcon className="w-7 h-7" />
        <span className="capitalize">{type?.replace("_", " ")}</span>
      </h1>
      <span className="text-foreground-600 font-light text-xs">{new Date().toDateString()}</span>
      <div className="pt-10 pb-2">
        <TaskTileForm type={type} />
      </div>
      <TaskTileList type={type} />
    </div>
  );
}
