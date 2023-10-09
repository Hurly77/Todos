import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { TaskRow } from "../models/TaskModel";
import { supabase } from "../utilities/supabase";
import { TaskFetcherKeys } from "../constants/global-enums.";

export async function taskFetcher(key: TaskFetcherKeys): Promise<PostgrestSingleResponse<TaskRow[]>> {
  const beginningOfDay = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString();

  const userId = (await supabase.auth.getUser().then(({ data }) => data?.user?.id)) || "";

  const filterBuilder = supabase
    .from("tasks")
    .select(
      "*, repeat:task_repeat!tasks_repeat_id_fkey(*), steps:task_steps(*), categories:task_tag!tasks_tag_id_fkey(*)"
    )
    .eq("user_id", userId);

  if (key === TaskFetcherKeys.MY_DAY) {
    filterBuilder.filter("is_my_day", "eq", true).gte("my_day_date", beginningOfDay);
  } else if (key === TaskFetcherKeys.IMPORTANT) {
    filterBuilder.filter("important", "eq", true);
  } else if (key === TaskFetcherKeys.PLANNED) {
    filterBuilder.gte("date", endOfDay);
  }

  const response = await filterBuilder.order("created_at", { ascending: false });

  return response;
}
