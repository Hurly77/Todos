import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import TaskTypePage from "../components/Pages/TaskTypePage";
import TaskTileList from "../components/TaskTiles/TaskTileList";

export default function ImportantPage() {
  return <TaskTypePage type={TaskFetcherKeys?.IMPORTANT} />;
}
