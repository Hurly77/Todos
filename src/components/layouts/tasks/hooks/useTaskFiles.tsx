import useSWR from "swr";
import { supabase } from "@/lib/sdk/utilities/supabase";

const fetcher = async (taskId: number) => {
  if (!taskId) return;

  const { data, error } = await supabase.storage.from("task_files").list(`${taskId}/`);
  console.log("Fetched Data: ", data);
  if (error) console.error("Error getting files: ", error);
  return data;
};

export function useTaskFiles(taskId: number) {
  const { data, error, isLoading, mutate } = useSWR(`task_files_${taskId}`, () => fetcher(taskId));

  return { files: data ? data : [], error, isLoading, mutate };
}
