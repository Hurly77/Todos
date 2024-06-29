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
import { useSizes, useIsSmall } from "@/app/hooks/useMediaQuery";

export default function TaskEditor() {
  const isSmall = useIsSmall();
  const ctx = React.useContext(TasksLayoutContext);
  const open = ctx.taskEditorOpen;
  const { taskInEdit } = ctx;

  console.log(isSmall);

  const variantsSmall = {
    open: { x: 0 },
    closed: { x: "24rem" },
    leave: { x: "24rem" },
  };

  const variantsLarge = {
    open: { width: "24rem" },
    closed: { width: "0rem" },
    leave: { width: "0rem" },
  };

  return (
    <AnimatePresence>
      {open && taskInEdit && (
        <motion.div
          transition={{ company: "", duration: 0.5, type: "tween" }}
          variants={isSmall ? variantsSmall : variantsLarge}
          initial="closed"
          animate="open"
          exit="leave"
          className={classNames(
            isSmall ? "absolute z-20 bg-background h-full max-h-[calc(100vh-4rem)]" : "",
            "w-full overflow-hidden flex flex-col z-10 sm:max-w-sm  shadow-lg bg-content2 dark:bg-content1"
          )}
        >
          <form className="pt-4 w-full h-full grow flex flex-col justify-between min-w-[calc(24rem-24px)]">
            <div className="px-6 pb-4 space-y-2 w-full grow overflow-y-auto max-h-[calc(100vh-150px)]">
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
