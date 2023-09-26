import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  PopoverTrigger,
  PopoverContent,
  Popover,
  Input,
  Select,
  SelectItem,
  Button,
  ButtonGroup,
} from "@nextui-org/react";
import {
  DAYS_OF_WEEK_ABBREVIATED_TWO_LETTERS,
  REPEAT_DROPDOWN_OPTIONS,
  REPEAT_TIME_CATEGORY_OPTIONS,
} from "../../constants/task-dates-options";

import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import DropdownsTriggerDisplay from "./DropdownsTriggerDisplay";
import DropdownsRepeatPopover from "./DropdownsRepeatPopover";

export default function DropdownsRepeatDropdown(props: TaskSpecificDropdownsProps) {
  const { placeholder, hasChip, setTask, task, datePickerOpen, setDatePickerOpen } = props;
  const { datePickerStates } = React.useContext(TasksLayoutContext);

  function handleOnClick(option: (typeof REPEAT_DROPDOWN_OPTIONS)[0]) {
    if (task) setTask({ ...task, repeat: option.value });
  }

  return (
    <>
      {datePickerOpen !== "repeat" ? (
        <Dropdown radius="sm">
          <DropdownTrigger onClick={() => console.log("clicked repeat")}>
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
              <DropdownItem isReadOnly key="Title" className="opacity-100 hover:cursor-pointer">
                <h1 className="font-bold text-center">Repeat</h1>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              {REPEAT_DROPDOWN_OPTIONS.map((option) => (
                <DropdownItem onClick={() => handleOnClick(option)} key={option.key}>
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
                    repeat: { interval, type, days },
                  });
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
