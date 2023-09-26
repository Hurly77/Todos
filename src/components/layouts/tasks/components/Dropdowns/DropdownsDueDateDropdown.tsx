import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { DUE_DATE_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";
import DatePicker from "react-datepicker";
import React from "react";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import DropdownsTriggerDisplay from "./DropdownsTriggerDisplay";
import DropdownsDatePickerPopover from "./DropdownsDatePickerPopover";

export default function DropdownsDueDateDropdown(props: TaskSpecificDropdownsProps) {
  const { placeholder, hasChip, setTask, task, datePickerOpen, setDatePickerOpen } = props;
  const ctx = React.useContext(TasksLayoutContext);

  function handleOnClick(option: (typeof DUE_DATE_DROPDOWN_OPTIONS)[0]) {
    if (task)
      setTask({
        ...task,
        date: option.value,
      });
  }

  return (
    <>
      {datePickerOpen !== "due_date" ? (
        <Dropdown radius="sm">
          <DropdownTrigger>
            <button>
              <DropdownsTriggerDisplay {...{ hasChip, placeholder }} icon="calendar" date={task?.date || null} />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Due Date" disabledKeys={["Title"]}>
            <DropdownSection showDivider>
              <DropdownItem isReadOnly key="Title" className="opacity-100 hover:cursor-pointer">
                <h1 className="font-bold text-center">Due</h1>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              {DUE_DATE_DROPDOWN_OPTIONS.map((option) => (
                <DropdownItem onClick={() => handleOnClick(option)} key={option.key}>
                  {option.name}
                </DropdownItem>
              ))}
            </DropdownSection>
            <DropdownSection>
              <DropdownItem onClick={() => setDatePickerOpen("due_date")} key="Custom">
                Custom
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Popover
          radius="sm"
          isOpen={datePickerOpen === "due_date"}
          onClose={() => setDatePickerOpen(null)}
          showArrow
          classNames={{
            base: "p-0 m-0 pb-2 bg-white dark:bg-white",
          }}
        >
          <PopoverTrigger>
            <button>
              <DropdownsTriggerDisplay hasChip icon="calendar" date={task?.date || null} />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <DropdownsDatePickerPopover
              date={task?.date || null}
              onSave={() => setDatePickerOpen(null)}
              handleChange={(date) => {
                if (task)
                  setTask({
                    ...task,
                    date: date as Date,
                  });
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
