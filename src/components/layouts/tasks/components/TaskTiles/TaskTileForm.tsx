import { Input, Checkbox } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";

import "react-datepicker/dist/react-datepicker.css";
import TaskTileFormBottom from "./TaskTileFormBottom";
import { getPlaceholderTask, uuidv4 } from "../../helpers/task-helpers";
import { supabase } from "@/lib/sdk/utilities/supabase";
import taskCreator from "@/lib/sdk/creators/taskCreator";
import { classNames } from "@/components/layouts/app/helpers/twind-helper";
import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import useTaskList from "../../hooks/useTaskList";
import { TaskFormat } from "@/lib/sdk/models";

export default function TaskTileForm({ type }: { type?: TaskFetcherKeys }) {
  const ctx = React.useContext(TasksLayoutContext);
  const { mutate, taskList } = ctx;

  const lastId = Math.max(...(taskList?.map((t) => t.id) ?? [0]));

  const [isFocused, setIsFocused] = ctx.taskFormFocusedState;

  const [currentTask, setCurrentTask] = ctx.currentTaskStates;
  const [datePickerOpen] = ctx.datePickerStates;

  const divRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    const listener = (e: MouseEvent) => {
      const all = Object.values(currentTask).every((value) => !value);

      if (!divRef.current?.contains(e.target as Node) && all && !datePickerOpen) {
        setIsFocused(false);
      }
    };

    if (divRef.current) {
      document.body.addEventListener("click", listener, false);
    }

    return () => document.body.removeEventListener("click", listener, false);
  }, [currentTask, currentTask.title, datePickerOpen, setIsFocused]);

  async function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const taskPayload = { task: currentTask, type: type ?? TaskFetcherKeys.ALL };
    setCurrentTask({ id: "", title: "", date: null, reminder: null, repeat: null });

    const optimisticTask: TaskFormat = {
      ...currentTask,
      id: lastId + 1,
      ...getPlaceholderTask(type ?? TaskFetcherKeys.ALL),
    };

    mutate((prevTasks) => [optimisticTask, ...(prevTasks ?? [])], false);
    await taskCreator(taskPayload);

    const { repeat, id, ...task } = currentTask;
  }

  return (
    <form ref={divRef} onSubmit={handleSubmitTask} className={classNames("task-form")}>
      <div className={classNames("task-form--inner-wrapper", isFocused ? "rounded-b-none" : "rounded")}>
        <div>
          {isFocused ? (
            <Checkbox isReadOnly radius="full" color="primary" />
          ) : (
            <PlusIcon className="h-7 w-7 stroke-primary" />
          )}
        </div>
        <Input
          radius="sm"
          type="text"
          variant="bordered"
          aria-label="Task Name"
          placeholder="Task Name"
          className="hover:bg-none border-none outline-none"
          classNames={{
            inputWrapper: "default-50 shadow-none h-full border-none",
          }}
          value={currentTask.title}
          onFocus={() => setIsFocused(true)}
          onValueChange={(value) => setCurrentTask((prevTask) => ({ ...prevTask, title: value }))}
        />
      </div>
      <TaskTileFormBottom buttonDisabled={!currentTask?.title} show={isFocused} />
    </form>
  );
}
