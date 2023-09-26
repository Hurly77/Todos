import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import TaskTileFormBottomDropdowns from "./TaskTileFormBottomDropdowns";

export default function TaskTileFormBottom({ show, buttonDisabled }: { show: boolean; buttonDisabled: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          transition={{ type: "spring", duration: 0.25, delay: 0.2 }}
          initial={{ zIndex: 0, height: 0, y: -40 }}
          animate={{ height: 50, y: -1 }}
          exit={{ height: 0, y: -40 }}
          className="flex h-16 overflow-hidden items-end justify-between space-x-4 bg-default-50 w-full"
        >
          <TaskTileFormBottomDropdowns />
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
