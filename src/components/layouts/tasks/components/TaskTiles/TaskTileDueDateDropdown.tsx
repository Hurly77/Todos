import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/react";
import { DUE_DATE_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";
import ReactDatePicker from "react-datepicker";
import React from "react";

export default function DueDateDropdown({ taskStates }: { taskStates: UseStateProps<Task> }) {
  const [, setCurrentTask] = taskStates;
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);

  function handleOnClick(option: (typeof DUE_DATE_DROPDOWN_OPTIONS)[0]) {
    setCurrentTask((prevTask) => {
      return { ...prevTask, date: option.value };
    });
  }

  return (
    <>
      <Dropdown radius="sm">
        <DropdownTrigger>
          <button>
            <CalendarDaysIcon className="h-5 w-5" />
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
            <DropdownItem onClick={() => setDatePickerOpen(true)} key="Custom">
              Custom
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
