import React from "react";
import { Task, TasksLayoutContext } from "../../context/TasksLayoutContext";
import { Checkbox } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

function TaskTileList({ tasks, setTasks }: { tasks: Task[]; setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) {
  function handleOnChange(id: string, completed: boolean) {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed };
        }
        return task;
      });

      return updatedTasks;
    });
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
            className="z-50 relative border border-default-200 p-4 bg-background rounded flex items-center shadow-sm"
          >
            <div>
              <Checkbox
                radius="full"
                color="primary"
                isSelected={task.completed}
                onValueChange={(isSelected) => handleOnChange(task.id, isSelected)}
              />
            </div>
            {task.title}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function TaskTiles() {
  const ctx = React.useContext(TasksLayoutContext);
  const [taskList, setTaskList] = ctx.taskListState;

  const completedTasks = taskList.filter((task) => task.completed);
  const incompleteTasks = taskList.filter((task) => !task.completed);

  return (
    <div>
      <TaskTileList tasks={incompleteTasks} setTasks={setTaskList} />
      <div className="py-4">
        <h1 className="pb-4">Completed</h1>
        <TaskTileList tasks={completedTasks} setTasks={setTaskList} />
      </div>
    </div>
  );
}
