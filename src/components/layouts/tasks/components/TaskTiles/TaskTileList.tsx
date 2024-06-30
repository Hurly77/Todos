import React from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/sdk/utilities/supabase";
import useTaskList from "../../hooks/useTaskList";
import { TaskFormat, TaskRow } from "@/lib/sdk/models/TaskModel";
import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import TaskTile from "./TaskTile";
import { KeyedMutator } from "swr";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/components/layouts/app/helpers/twind-helper";

type TaskListProps = {
  type: TaskFetcherKeys;
  tasks: TaskFormat[];
  mutate: KeyedMutator<TaskFormat[]>;
};

function TaskTileList({ type, tasks, mutate }: TaskListProps) {
  async function handleOnChange(id: number, completed: boolean) {
    await supabase.from("tasks").update({ completed }).match({ id }).select();
    mutate((prevTasks) => {
      return prevTasks?.map((task) => (task.id === id ? { ...task, completed } : task));
    }, false);
  }

  return (
    <div>
      <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {tasks.map((task) => (
          <TaskTile key={task.id} task={task} type={type} handleOnChange={handleOnChange} />
        ))}
      </motion.ul>
    </div>
  );
}

export default function TaskTiles({ type }: { type: TaskFetcherKeys }) {
  const { taskList, mutate } = useTaskList(type);
  const [showCompleted, setShowCompleted] = React.useState(true);

  const incompleteTasks = taskList?.filter((task) => !task.completed);
  const completedTasks = taskList?.filter((task) => task.completed);
  if (!taskList) return <div>Loading...</div>;

  const variants = {
    show: { opacity: 1, height: "auto" },
    hide: { opacity: 1, height: 0 },
  };

  return (
    <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
      <TaskTileList type={type} tasks={incompleteTasks ?? []} mutate={mutate} />
      <div className="py-4">
        <h1 onClick={() => setShowCompleted(!showCompleted)} className="pb-4 flex gap-2">
          <ChevronDownIcon
            className={classNames("h-6 w-6 transition-transform", showCompleted ? "rotate-0" : "rotate-180")}
          />
          <span className="font-bold">Completed</span>
          <span>{completedTasks.length}</span>
        </h1>
        <motion.div
          initial={showCompleted ? "show" : "hide"}
          animate={showCompleted ? "show" : "hide"}
          variants={variants}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <TaskTileList type={type} tasks={completedTasks} mutate={mutate} />
        </motion.div>
      </div>
    </div>
  );
}
