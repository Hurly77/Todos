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
  Button,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { ABBREVIATED_DAYS, REMINDER_DROPDOWN_OPTIONS } from "../../constants/task-dates-options";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import ReactDatePicker from "react-datepicker";
import DateChip from "./DateChip";

export default function ReminderDropdown({ taskStates }: { taskStates: UseStateProps<Task> }) {
  const ctx = React.useContext(TasksLayoutContext);
  const [currentTask, setCurrentTask] = ctx.currentTaskStates;
  const [datePickerOpen, setDatePickerOpen] = ctx.datePickerStates;

  function handleOnClick(option: (typeof REMINDER_DROPDOWN_OPTIONS)[0]) {
    setCurrentTask((prevTask) => {
      return { ...prevTask, reminder: option.value };
    });
  }

  const ReminderBadge = () => {
    return <DateChip date={currentTask.reminder} icon="bell" />;
  };

  console.log(datePickerOpen);

  return (
    <>
      {datePickerOpen !== "reminder" ? (
        <Dropdown radius="sm">
          <DropdownTrigger>
            <button>
              {currentTask.reminder ? <ReminderBadge /> : <BellIcon className="h-5 w-5 hover:cursor-pointer" />}
            </button>
          </DropdownTrigger>
          <DropdownMenu selectionMode="single" aria-label="Reminder" disabledKeys={["Title"]}>
            <DropdownSection showDivider>
              <DropdownItem isReadOnly key="Title" className="opacity-100">
                <h1 className="font-bold text-center">Reminder</h1>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              {REMINDER_DROPDOWN_OPTIONS.map((option) => (
                <DropdownItem onClick={() => handleOnClick(option)} key={option.key}>
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
              <ReminderBadge />
            </button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4">
            <ReactDatePicker
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
              onChange={(date) => setCurrentTask((prevTask) => ({ ...prevTask, reminder: date as Date }))}
              inline
              showTimeInput
              onSelect={(date) => setCurrentTask((prevTask) => ({ ...prevTask, reminder: date as Date }))}
              selected={currentTask?.reminder || new Date()}
              customTimeInput={<Input fullWidth style={{ width: "100%" }} type="time" className="w-full" />}
            />
            <div className="w-full  px-4">
              <Button onClick={() => setDatePickerOpen(null)} radius="sm" fullWidth color="primary">
                Save
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
