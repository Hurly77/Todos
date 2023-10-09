import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import TaskTypePage from "../components/Pages/TaskTypePage";

export default function PlannedPage() {
  return <TaskTypePage type={TaskFetcherKeys?.PLANNED} />;
}
