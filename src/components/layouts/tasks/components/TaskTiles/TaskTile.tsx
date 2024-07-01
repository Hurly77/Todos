import { classNames as cls } from "@/app/helpers/twind-helper";
import { TaskFormat } from "@/lib/sdk/models";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { StarIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import { TaskFetcherKeys } from "@/lib/sdk/constants/global-enums.";
import useTaskList from "../../hooks/useTaskList";

export default function TaskTile(props: {
  task: TaskFormat;
  type: TaskFetcherKeys;
  handleOnChange: (id: number, completed: boolean) => void;
}) {
  const { task, type, handleOnChange } = props;

  const ctx = React.useContext(TasksLayoutContext);
  const { mutate } = ctx;
  const [isImportant, setIsImportant] = React.useState(task.important);
  const [isComplete, setIsComplete] = React.useState(task.completed);

  async function onChangeImportance() {
    setIsImportant(!isImportant);
    await supabase.from("tasks").update({ important: !isImportant }).match({ id: task.id }).select();
    if (type === "important" && !isImportant) {
      console.log("removing task");
      mutate((prevTasks) => {
        const updatedTasks = prevTasks?.filter((t) => t.id !== task.id);
        return updatedTasks;
      });
    }
  }

  return (
    <motion.li
      key={task.id}
      exit={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -25 }}
      className="z-0  justify-between relative border border-default-200 bg-content1 rounded flex items-center shadow-sm"
    >
      <div onClick={() => ctx.openTaskEditor(task)} className="w-full p-4">
        <Checkbox
          radius="full"
          color="primary"
          isSelected={isComplete}
          onValueChange={(complete) => {
            setIsComplete(!isComplete);
            handleOnChange(task.id, complete);
          }}
        />
        <span>{task.title}</span>
      </div>
      <div className="p-4">
        <StarIcon
          className={cls("h-5 w-5 cursor-pointer stroke-primary", isImportant ? "fill-primary" : "")}
          onClick={onChangeImportance}
        />
      </div>
    </motion.li>
  );
}
