import { BellIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { REMINDER_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import DropdownsTriggerDisplay from "./DropdownsTriggerDisplay";
import DropdownsDatePickerPopover from "./DropdownsDatePickerPopover";
import { TaskFormat, TaskRow } from "@/lib/sdk/models";
import { updateTask } from "@/lib/sdk/methods/update-task";

export default function DropdownsReminderDropdown(props: TaskSpecificDropdownsProps<TaskFormat>) {
  const { placeholder, hasChip, setTask, task, datePickerOpen, setDatePickerOpen } = props;
  const { taskEditorOpen } = React.useContext(TasksLayoutContext);

  function handleOnClick(option: (typeof REMINDER_DROPDOWN_OPTIONS)[0]) {
    if (task) setTask({ ...task, reminder: option.value });

    if (taskEditorOpen && task) {
      updateTask({
        id: task.id,
        reminder: option.value?.toISOString(),
      });
    }
  }

  const reminderDate = (typeof task?.reminder === "string" ? new Date(task?.reminder) : task?.reminder) ?? null;

  return (
    <>
      {datePickerOpen !== "reminder" ? (
        <Dropdown radius="sm">
          <DropdownTrigger>
            <button>
              <DropdownsTriggerDisplay
                placeholder={placeholder}
                hasChip={hasChip}
                icon="bell"
                date={task?.reminder || null}
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu selectionMode="single" aria-label="Reminder" disabledKeys={["Title"]}>
            <DropdownSection showDivider>
              <DropdownItem textValue={"Reminder"} isReadOnly key="Title" className="opacity-100">
                <h1 className="font-bold text-center">Reminder</h1>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              {REMINDER_DROPDOWN_OPTIONS.map((option) => (
                <DropdownItem textValue={option.name} onClick={() => handleOnClick(option)} key={option.key}>
                  {option.name}
                </DropdownItem>
              ))}
            </DropdownSection>
            <DropdownSection>
              <DropdownItem onClick={() => setDatePickerOpen("reminder")} key="Custom">
                Custom
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Popover
          radius="sm"
          isOpen={datePickerOpen === "reminder"}
          onClose={() => setDatePickerOpen(null)}
          showArrow
          classNames={{
            base: "p-0 m-0 pb-2 bg-white dark:bg-white",
          }}
        >
          <PopoverTrigger>
            <button>
              <DropdownsTriggerDisplay hasChip={!!task?.reminder} icon="bell" date={task?.reminder || null} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            <DropdownsDatePickerPopover
              date={reminderDate}
              onSave={() => setDatePickerOpen(null)}
              handleChange={(date) => {
                if (task) setTask({ ...task, reminder: date as Date });
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
