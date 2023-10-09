import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import TaskTileForm from "../components/TaskTiles/TaskTileForm";
import TaskTypePage from "../components/Pages/TaskTypePage";

export default function AllTasksPage() {
  return <TaskTypePage type={TaskFetcherKeys?.ALL} />;
}
