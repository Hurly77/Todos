import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";

import { classNames } from "@/app/helpers/twind-helper";

import TaskEditorDropdowns from "./TaskEditorDropdowns";
import TaskEditorTitleAnStepInputs from "./TaskEditorTitleAnStepInputs";
import TaskEditorAddToMyDay from "./TaskEditorAddToMyDay";
import TaskEditorCategories from "./TaskEditorCategories";
import TaskEditorAddFiles from "./TaskEditorAddFiles";
import TaskEditorNotes from "./TaskEditorNotes";
import TaskEditorBottomMenu from "./TaskEditorBottomMenu";

export default function TaskEditor() {
  const ctx = React.useContext(TasksLayoutContext);
  const open = ctx.taskEditorOpen;
  const { taskInEdit } = ctx;

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
            "w-full overflow-hidden grow flex flex-col z-10 max-w-sm  shadow-lg bg-default-100 dark:bg-default"
          )}
        >
          <form className="pt-4 w-full h-full grow flex flex-col justify-between">
            <div className="px-6 pb-4 space-y-2 w-full grow overflow-y-auto max-h-[calc(100vh_-_150px)]">
              <TaskEditorTitleAnStepInputs />
              <TaskEditorAddToMyDay />
              <TaskEditorDropdowns />
              <TaskEditorCategories />
              <TaskEditorAddFiles />
              <TaskEditorNotes />
            </div>
            <TaskEditorBottomMenu />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
