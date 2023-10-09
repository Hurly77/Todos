import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import { Checkbox } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { classNames } from "@/app/helpers/twind-helper";
import { supabase } from "@/lib/sdk/utilities/supabase";
import useTaskList from "../../hooks/useTaskList";
import { TaskFormat, TaskRow } from "@/lib/sdk/models/TaskModel";
import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";

type TaskListProps = {
  tasks: TaskFormat[];
  setTasks: React.Dispatch<React.SetStateAction<TaskFormat[]>>;
};

function TaskTileList({ tasks, setTasks }: TaskListProps) {
  const ctx = React.useContext(TasksLayoutContext);

  async function handleOnChange(id: number, completed: boolean) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed };
        }
        return task;
      });

      return updatedTasks;
    });

    await supabase.from("tasks").update({ completed }).match({ id }).select();
  }

  return (
    <div>
      <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            exit={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -25 }}
            className="z-0  justify-between relative border border-default-200 bg-background rounded flex items-center shadow-sm"
          >
            <div onClick={() => ctx.openTaskEditor(task)} className="w-full p-4">
              <Checkbox
                radius="full"
                color="primary"
                isSelected={task.completed}
                onValueChange={(isSelected) => handleOnChange(task.id, isSelected)}
              />
              <span>{task.title}</span>
            </div>
            <div className="p-4">
              {task.important ? (
                <StarIcon
                  onClick={async () => {
                    const { data, error } = await supabase
                      .from("tasks")
                      .update({ important: false })
                      .match({ id: task.id })
                      .select();
                  }}
                  className={classNames("h-5 w-5 fill-primary cursor-pointer")}
                />
              ) : (
                <StarIconOutline
                  className="h-5 w-5 stroke-primary cursor-pointer"
                  onClick={async () => {
                    const { data, error } = await supabase
                      .from("tasks")
                      .update({ important: true })
                      .match({ id: task.id })
                      .select();
                  }}
                />
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function TaskTiles({ type }: { type: TaskFetcherKeys }) {
  const { taskInEdit, setTaskInEdit } = React.useContext(TasksLayoutContext);

  const { taskList, setTaskList } = useTaskList(type);

  const incompleteTasks = taskList?.filter((task) => !task.completed);
  const completedTasks = taskList?.filter((task) => task.completed);
  if (!taskList) return <div>Loading...</div>;

  return (
    <div>
      <TaskTileList tasks={incompleteTasks ?? []} setTasks={setTaskList} />
      <div className="py-4">
        <h1 className="pb-4">Completed</h1>
        <TaskTileList tasks={completedTasks} setTasks={setTaskList} />
      </div>
    </div>
  );
}
