import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import { Database } from "@/lib/sdk/constants/supabase-types";
import getCurrentUserTasks from "@/lib/sdk/methods/get-current-user-tasks";
import { TaskFormat } from "@/lib/sdk/models";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import React from "react";
import useSWR from "swr";

export default function useTaskList(type?: TaskFetcherKeys) {
  const { data, error, mutate } = useSWR(type, () => getCurrentUserTasks(type ?? TaskFetcherKeys.ALL), {
    // revalidateOnFocus: false,
    keepPreviousData: true,
    // revalidateIfStale: false,
  });

  async function optimisticMutate<T>(updater: () => Promise<T | void>, tasks: TaskFormat[]) {
    mutate(tasks, false); // first mutate with out revalidating, to get immediate UI update
    const response = await updater();
    await mutate(tasks); // revalidate with the updated data
    return response;
  }

  React.useEffect(() => {
    const onPostgresChange = ({ old, new: NewItem, eventType, table }: RealtimePostgresChangesPayload<TaskFormat>) => {
      console.log(`${eventType} on ${table} table`, old, NewItem);
      mutate();
    };

    const taskChannel = supabase
      .channel("realtime tasksList")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        ({ old, new: NewItem, eventType, table }) => {
          if (eventType === "INSERT") {
            console.log("inserted", NewItem);
          }

          mutate();
        }
      )
      .subscribe();

    const taskRepeatChannel = supabase
      .channel("realtime taskRepeatsList")
      .on("postgres_changes", { event: "*", schema: "public", table: "task_repeat" }, onPostgresChange)
      .subscribe();

    const taskStepChannel = supabase
      .channel("realtime task Steps List")
      .on<TaskFormat>("postgres_changes", { event: "*", schema: "public", table: "task_steps" }, onPostgresChange)
      .subscribe();

    const taskTagChannel = supabase
      .channel("realtime taskTag")
      .on<TaskFormat>("postgres_changes", { event: "*", schema: "public", table: "task_tag" }, onPostgresChange)
      .subscribe();

    console.log("✓ subscribed to channels");

    return () => {
      console.log("✗ unsubscribing");
      supabase.removeChannel(taskChannel);
      supabase.removeChannel(taskRepeatChannel);
      supabase.removeChannel(taskStepChannel);
      supabase.removeChannel(taskTagChannel);
    };
  }, [mutate]);

  return { taskList: data ? data : [], mutate, optimisticMutate };
}
