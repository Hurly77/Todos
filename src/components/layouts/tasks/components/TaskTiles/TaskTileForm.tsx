import { Button, Input, Checkbox } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";

import TaskTileBottomFormOptions from "./TaskTileBottomFormOptions";
import { uuidv4 } from "../../helpers/task-helpers";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function BottomForm({ show, buttonDisabled }: { show: boolean; buttonDisabled: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          transition={{ duration: 0.5 }}
          initial={{ zIndex: 0, height: 0, y: -40 }}
          animate={{ height: 50, y: -1 }}
          exit={{ height: 0, y: -40 }}
          className="flex z-10 h-16 overflow-hidden items-end justify-between space-x-4 bg-default-50 w-full"
        >
          <TaskTileBottomFormOptions />
          <div className="p-2">
            <Button isDisabled={buttonDisabled} type="submit" className="bg-background border rounded" size="sm">
              Add
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function TaskTileForm() {
  const ctx = React.useContext(TasksLayoutContext);

  const [taskList, setTaskList] = ctx.taskListState;
  const [isFocused, setIsFocused] = ctx.taskFormFocusedState;

  const [currentTask, setCurrentTask] = ctx.currentTaskStates;
  const [datePickerOpen] = ctx.datePickerStates;

  const divRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    const listener = (e: MouseEvent) => {
      const all = Object.values(currentTask).every((value) => value === null || value === "");
      console.log(all);
      if (!divRef.current?.contains(e.target as Node) && all && !datePickerOpen) {
        setIsFocused(false);
      }
    };

    if (divRef.current) {
      console.log(Object.getPrototypeOf(divRef.current));
      document.body.addEventListener("click", listener, false);
    }

    return () => document.body.removeEventListener("click", listener, false);
  }, [currentTask, currentTask.title, datePickerOpen, setIsFocused]);

  function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitting task");
    setTaskList([...taskList, currentTask]);
    setCurrentTask({ id: uuidv4(), title: "", completed: false, date: null, reminder: null, repeat: null });
  }

  return (
    <form
      ref={divRef}
      onSubmit={handleSubmitTask}
      className="p-0 bg-default-50 shadow-[0px_0.3px_0.9px_rgba(0,0,0,0.1),0px_1.6px_3.6px_rgba(0,0,0,0.1)] rounded"
    >
      <div className="z-40 relative border-b bg-white dark:bg-default-50  p-2 rounded flex items-center rounded-b-none border-default">
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
      <BottomForm buttonDisabled={!currentTask?.title} show={isFocused} />
    </form>
  );
}
