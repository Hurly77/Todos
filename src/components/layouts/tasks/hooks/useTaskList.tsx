import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import getCurrentUserTasks from "@/lib/sdk/methods/get-current-user-tasks";
import { TaskFormat } from "@/lib/sdk/models";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import React from "react";
import useSWR from "swr";

export default function useTaskList(type?: TaskFetcherKeys) {
  const { data, error, mutate } = useSWR(type, () => getCurrentUserTasks(type ?? TaskFetcherKeys.ALL), {
    revalidateOnFocus: false,
  });

  React.useEffect(() => {
    const onPostgresChange = (payload: RealtimePostgresChangesPayload<TaskFormat>) => mutate();

    const taskChannel = supabase
      .channel("realtime tasksList")
      .on<TaskFormat>("postgres_changes", { event: "*", schema: "public", table: "tasks" }, (payload) =>
        onPostgresChange(payload)
      )
      .subscribe();

    const taskRepeatChannel = supabase
      .channel("realtime taskRepeatsList")
      .on<TaskFormat>("postgres_changes", { event: "*", schema: "public", table: "task_repeat" }, onPostgresChange)
      .subscribe();

    const taskStepChannel = supabase
      .channel("realtime task Steps List")
      .on<TaskFormat>("postgres_changes", { event: "*", schema: "public", table: "task_steps" }, onPostgresChange)
      .subscribe();

    const taskTagChannel = supabase
      .channel("realtime taskTag")
      .on<TaskFormat>("postgres_changes", { event: "*", schema: "public", table: "task_tag" }, onPostgresChange)
      .subscribe();

    return () => {
      supabase.removeChannel(taskChannel);
      supabase.removeChannel(taskRepeatChannel);
      supabase.removeChannel(taskStepChannel);
      supabase.removeChannel(taskTagChannel);
    };
  }, [mutate]);

  return { taskList: data ? data : [], mutate };
}
