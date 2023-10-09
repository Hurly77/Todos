import { SunIcon } from "@heroicons/react/24/outline";
import TaskTileForm from "../components/TaskTiles/TaskTileForm";
import TaskTileList from "../components/TaskTiles/TaskTileList";
import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";

export default function TodayTaskPage() {
  return (
    <div className="p-6 bg-default-100 grow">
      <h1 className="text-2xl flex items-center space-x-2">
        <SunIcon className="w-8 h-8" />
        <span>Today</span>
      </h1>
      <span className="text-foreground-600 font-light text-xs">{new Date().toDateString()}</span>
      <div className="pt-10 pb-2">
        <TaskTileForm type={TaskFetcherKeys.MY_DAY} />
      </div>
      <TaskTileList type={TaskFetcherKeys.MY_DAY} />
    </div>
  );
}
