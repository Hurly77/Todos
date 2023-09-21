import TaskTileReminderDropdown from "./TaskTileReminderDropdown";
import TaskTileRepeatDropdown from "./TaskTileRepeatDropdown";
import TaskTileDueDateDropdown from "./TaskTileDueDateDropdown";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";

export default function TaskTileBottomFormOptions() {
  const ctx = React.useContext(TasksLayoutContext);

  return (
    <div className="flex space-x-2 h-full items-center pl-2">
      <TaskTileDueDateDropdown taskStates={ctx.currentTaskStates} />
      <TaskTileReminderDropdown taskStates={ctx.currentTaskStates} />
      <TaskTileRepeatDropdown taskStates={ctx.currentTaskStates} />
    </div>
  );
}
