import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@nextui-org/react";
import { REPEAT_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";

import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import DropdownsTriggerDisplay from "./DropdownsTriggerDisplay";
import DropdownsRepeatPopover from "./DropdownsRepeatPopover";
import { TaskFormat } from "@/lib/sdk/models";

import createTaskRepeat from "@/lib/sdk/methods/create-task-repeat";
import updateTaskRepeat from "@/lib/sdk/methods/update-task-repeat";

export default function DropdownsRepeatDropdown(props: TaskSpecificDropdownsProps<TaskFormat>) {
  const { placeholder, hasChip, setTask, task, datePickerOpen, setDatePickerOpen } = props;
  const { taskEditorOpen } = React.useContext(TasksLayoutContext);

  function handleOnClick(option: (typeof REPEAT_DROPDOWN_OPTIONS)[0]) {
    if (task) setTask({ ...task, repeat: option.value as TaskFormat["repeat"] });

    if (taskEditorOpen && task?.repeat_id) {
      updateTaskRepeat({
        ...option?.value,
        id: task?.repeat_id,
        indefinite: true,
        task_id: task?.id,
      });
    } else if (taskEditorOpen && !task?.repeat_id && task?.id) {
      createTaskRepeat({
        ...option?.value,
        indefinite: true,
        task_id: task?.id,
      });
    }
  }

  return (
    <>
      {datePickerOpen !== "repeat" ? (
        <Dropdown radius="sm">
          <DropdownTrigger>
            <button>
              <DropdownsTriggerDisplay
                placeholder={placeholder}
                hasChip={hasChip}
                icon="repeat"
                date={task?.repeat ?? null}
              />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Due Date" disabledKeys={["Title"]}>
            <DropdownSection showDivider>
              <DropdownItem textValue="Repeat" isReadOnly key="Title" className="opacity-100 hover:cursor-pointer">
                <h1 className="font-bold text-center">Repeat</h1>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              {REPEAT_DROPDOWN_OPTIONS.map((option) => (
                <DropdownItem textValue={option?.name} onClick={() => handleOnClick(option)} key={option.key}>
                  {option.name}
                </DropdownItem>
              ))}
            </DropdownSection>
            <DropdownSection>
              <DropdownItem onClick={() => setDatePickerOpen("repeat")} key="Custom">
                Custom
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Popover isOpen={datePickerOpen === "repeat"} placement="bottom" showArrow radius="sm">
          <PopoverTrigger>
            <button>
              <DropdownsTriggerDisplay hasChip={!!task?.repeat} icon="repeat" date={task?.repeat ?? null} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col items-center space-y-4 py-2">
            <DropdownsRepeatPopover
              onSave={({ interval, type, days }) => {
                setDatePickerOpen(null);
                if (task)
                  setTask({
                    ...task,
                    repeat: { interval, type, days } as TaskFormat["repeat"],
                  });
                if (taskEditorOpen && task?.repeat_id) {
                  updateTaskRepeat({
                    id: task?.repeat_id,
                    type,
                    days,
                    interval,
                    indefinite: true,
                    task_id: task?.id,
                  });
                } else if (taskEditorOpen && !task?.repeat_id && task?.id) {
                  createTaskRepeat({
                    type,
                    days,
                    interval,
                    indefinite: true,
                    task_id: task?.id,
                  });
                }
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
