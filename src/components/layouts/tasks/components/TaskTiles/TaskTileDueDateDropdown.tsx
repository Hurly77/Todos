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
import DateChip from "./DateChip";

export default function DueDateDropdown({ taskStates }: { taskStates: UseStateProps<Task> }) {
  const ctx = React.useContext(TasksLayoutContext);
  const [currentTask, setCurrentTask] = ctx.currentTaskStates;
  const [datePickerOpen, setDatePickerOpen] = ctx.datePickerStates;

  console.log("currentTask", currentTask);

  function handleOnClick(option: (typeof DUE_DATE_DROPDOWN_OPTIONS)[0]) {
    setCurrentTask((prevTask) => {
      return { ...prevTask, date: option.value };
    });
  }

  return (
    <>
      {datePickerOpen !== "due_date" ? (
        <Dropdown radius="sm">
          <DropdownTrigger>
            <button>
              {currentTask?.date ? <DateChip date={currentTask.date} /> : <CalendarDaysIcon className="h-5 w-5" />}
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
              <DateChip date={currentTask.date} />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <DatePicker
              calendarClassName="calendar"
              calendarContainer={({ children, className }) => {
                return (
                  <div
                    className={className}
                    style={{
                      border: "none",
                    }}
                  >
                    {children}
                  </div>
                );
              }}
              onSelect={(date) => setCurrentTask((prevTask) => ({ ...prevTask, date: date as Date }))}
              onChange={(date) => {
                setCurrentTask((prevTask) => ({ ...prevTask, date: date as Date }));
              }}
              selected={currentTask?.date || new Date()}
              inline
            />
            <div className="px-4 w-full">
              <Button onClick={() => setDatePickerOpen(null)} fullWidth color="primary" radius="sm">
                Save
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
