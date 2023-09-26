import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";

import { Button, Checkbox, Divider, Input, Textarea } from "@nextui-org/react";
import { classNames } from "@/app/helpers/twind-helper";
import { useRouter } from "next/router";
import {
  ArrowPathIcon,
  ArrowSmallLeftIcon,
  BellIcon,
  PaperClipIcon,
  PlusIcon,
  SunIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DropdownsDueDateDropdown from "../Dropdowns/DropdownsDueDateDropdown";
import DropdownsRepeatDropdown from "../Dropdowns/DropdownsRepeatDropdown";
import DropdownsReminderDropdown from "../Dropdowns/DropdownsReminderDropdown";
import TaskEditorDropdowns from "./TaskEditorDropdowns";

export default function Sidebar() {
  const router = useRouter();
  const ctx = React.useContext(TasksLayoutContext);
  const { taskInEdit, setTaskInEdit } = ctx;
  const open = ctx.taskEditorOpen;

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    if (taskInEdit) {
      setTaskInEdit({ ...taskInEdit, [name]: value });
    }
  }

  if (!taskInEdit) return <></>;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          transition={{
            duration: 0.25,
            type: "tween",
          }}
          initial={{ width: "0rem" }}
          animate={{ width: "24rem" }}
          exit={{ width: "0rem" }}
          className={classNames(
            "w-full overflow-hidden grow flex flex-col bottom-0 top-0 z-10 max-w-sm  shadow-lg bg-default-100 dark:bg-default"
          )}
        >
          <form className="px-4 pt-4 w-full h-full grow flex flex-col">
            <div className="px-4 space-y-2 w-full grow overflow-y-auto">
              <div className="p-4 w-full dark:bg-default-100 bg-white space-y-4 rounded-sm">
                <div className="flex py-2">
                  <Checkbox />
                  <Input
                    name="title"
                    radius="sm"
                    type="text"
                    variant="bordered"
                    aria-label="Task Name"
                    placeholder="Task Name"
                    className="hover:bg-none border-none outline-none"
                    classNames={{
                      inputWrapper: "default-50 shadow-none h-full border-none",
                      input: "text-lg",
                    }}
                    value={taskInEdit?.title}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex space-x-2 items-center">
                  <PlusIcon className="h-5 w-5 stroke-primary" />
                  <p className="text-sm text-primary-400">Add step</p>
                </div>
              </div>

              <div className="p-4 w-full dark:bg-default-100 bg-white space-y-4 text-primary-500   rounded-sm">
                <div className="flex items-center w-full space-x-2">
                  <SunIcon className="h-6 w-6 stroke-primary" />
                  <p>Add to my day</p>
                </div>
              </div>

              <TaskEditorDropdowns />

              <div className="relative p-4 w-full dark:bg-default-100 bg-white space-y-4 text-sm  rounded-sm">
                <p className="pl-6">Pick a category</p>
                <TagIcon className="h-5 w-5  top-0 absolute" />
              </div>

              <div className="p-4 w-full dark:bg-default-100 bg-white space-y-4 text-sm  rounded-sm">
                <PaperClipIcon className="h-5 w-5 " />
                <p>Attach a file</p>
              </div>

              <div className="p-4 w-full dark:bg-default-100 bg-white space-y-4 text-sm rounded-sm">
                <Textarea
                  radius="sm"
                  variant="bordered"
                  placeholder="Add a note"
                  className="hover:bg-transparent"
                  classNames={{
                    base: "bg-transparent hover:bg-transparent border-none shadow-transparent",
                    input: "bg-transparent hover:bg-transparent border-none",
                    inputWrapper: "bg-transparent hover:bg-transparent border-none shadow-none",
                    innerWrapper: "bg-transparent hover:bg-transparent",
                    mainWrapper: "bg-transparent hover:bg-transparent",
                    clearButton: "",
                    helperWrapper: "bg-transparent hover:bg-transparent",
                  }}
                />
              </div>
            </div>
            <Divider className="my-2" />
            <div className="flex justify-between px-6 py-4">
              <ArrowSmallLeftIcon
                onClick={ctx.closeTaskEditor}
                className="h-5 w-5 cursor-pointer group-hover:stroke-primary"
              />
              <TrashIcon className="h-5 w-5 cursor-pointer" />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
