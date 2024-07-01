import { TaskFetcherKeys } from "../constants/global-enums.";
import { taskFetcher } from "../fetchers/taskFetcher";
import { TaskFormat } from "../models";

export default async function getCurrentUserTasks(key: TaskFetcherKeys): Promise<TaskFormat[]> {
  console.log("Getting Tasks");
  const { data, error } = await taskFetcher(key);
  if (error) throw error;

  const taskFormatted = data.map((task) => ({
    ...task,
    reminder: task.reminder ? new Date(task.reminder) : null,
    date: task.date ? new Date(task.date) : null,
  }));

  return taskFormatted;
}
