import { Divider } from "@nextui-org/react";
import DropdownsDueDateDropdown from "../Dropdowns/DropdownsDueDateDropdown";
import DropdownsReminderDropdown from "../Dropdowns/DropdownsReminderDropdown";
import DropdownsRepeatDropdown from "../Dropdowns/DropdownsRepeatDropdown";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";

export default function TaskEditorDropdowns() {
  const ctx = React.useContext(TasksLayoutContext);
  const { taskInEdit, setTaskInEdit } = ctx;
  const [datePickerOpen, setDatePickerOpen] = React.useState(null as string | null);

  const sharedProps = {
    task: taskInEdit,
    setTask: setTaskInEdit,
    datePickerOpen,
    setDatePickerOpen,
  };

  return (
    <div className="p-4 w-full dark:bg-default-100 bg-white space-y-4 text-sm rounded-sm">
      <DropdownsReminderDropdown placeholder="Add reminder" {...sharedProps} hasChip={false} />
      <Divider />
      <DropdownsDueDateDropdown placeholder="Add due date" {...sharedProps} hasChip={false} />
      <Divider />
      <DropdownsRepeatDropdown placeholder="Add due date" {...sharedProps} hasChip={false} />
    </div>
  );
}
