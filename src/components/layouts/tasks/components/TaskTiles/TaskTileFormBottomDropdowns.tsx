import DropdownsRepeatDropdown from "../Dropdowns/DropdownsRepeatDropdown";
import DropdownsReminderDropdown from "../Dropdowns/DropdownsReminderDropdown";
import DropdownsDueDateDropdown from "../Dropdowns/DropdownsDueDateDropdown";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";

export default function TaskTileFormBottomOptions() {
  const { currentTaskStates } = React.useContext(TasksLayoutContext);
  const [currentTask, setCurrentTask] = currentTaskStates;
  const [datePickerOpen, setDatePickerOpen] = React.useState(null as string | null);

  const hasReminder = !!currentTask?.reminder;
  const hasDueDate = !!currentTask?.date;
  const hasRepeat = !!currentTask?.repeat;

  const sharedProps = {
    task: currentTask,
    setTask: setCurrentTask as UseStateProps<Task | null>[1],
    datePickerOpen,
    setDatePickerOpen,
  };

  return (
    <div className="flex space-x-2 h-full items-center pl-2">
      <DropdownsDueDateDropdown {...sharedProps} hasChip={hasDueDate} />
      <DropdownsReminderDropdown {...sharedProps} hasChip={hasReminder} />
      <DropdownsRepeatDropdown {...sharedProps} hasChip={hasRepeat} />
    </div>
  );
}
