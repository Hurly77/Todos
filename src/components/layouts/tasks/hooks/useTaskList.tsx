import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import getCurrentUserTasks from "@/lib/sdk/methods/get-current-user-tasks";
import { TaskFormat } from "@/lib/sdk/models";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import React from "react";

type UseTaskListData = Awaited<ReturnType<typeof getCurrentUserTasks>>;
type UTaskListCallback = (payload: RealtimePostgresChangesPayload<TaskFormat>) => void;

export default function useTaskList(type?: TaskFetcherKeys) {
  const [dataFetched, setDataFetched] = React.useState(false);
  const [taskList, setTaskList] = React.useState([] as UseTaskListData);

  React.useEffect(() => {
    async function fetchTasks() {
      setDataFetched(true);
      const data = await getCurrentUserTasks(type ?? TaskFetcherKeys.ALL);
      if (data) setTaskList(data);
    }

    if (!dataFetched) fetchTasks();
  }, [dataFetched, type]);

  React.useEffect(() => {
    const taskChannel = supabase
      .channel("realtime tasksList")
      .on<TaskFormat>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        (payload) => {
          console.log("realtime test", payload);

          setDataFetched(false);
        }
      )
      .subscribe();

    const taskRepeatChannel = supabase
      .channel("realtime taskRepeatsList")
      .on<TaskFormat>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "task_repeat",
        },
        (payload) => {
          console.log("realtime test", payload);

          setDataFetched(false);
        }
      )
      .subscribe();

    const taskStepChannel = supabase
      .channel("realtime task Steps List")
      .on<TaskFormat>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "task_steps",
        },
        (payload) => {
          console.log("realtime test", payload);

          setDataFetched(false);
        }
      )
      .subscribe();
    const taskTagChannel = supabase
      .channel("realtime taskTag")
      .on<TaskFormat>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "task_tag",
        },
        (payload) => {
          console.log("realtime test", payload);

          setDataFetched(false);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(taskChannel);
      supabase.removeChannel(taskRepeatChannel);
      supabase.removeChannel(taskStepChannel);
      supabase.removeChannel(taskTagChannel);
    };
  }, []);

  return { taskList, setTaskList };
}
