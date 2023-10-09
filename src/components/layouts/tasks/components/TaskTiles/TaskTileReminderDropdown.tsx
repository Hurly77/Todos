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
import ReactDatePicker, { ReactDatePickerCustomHeaderProps, ReactDatePickerProps } from "react-datepicker";
import DateChip from "./TaskTilesDateChip";

export default function ReminderDropdown() {
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

  const CustomInput = React.forwardRef<HTMLInputElement, { onChange: (value: any) => void; date: Date; value: string }>(
    ({ date, value, onChange }, ref) => (
      <Input
        ref={ref}
        radius="sm"
        color="default"
        variant="bordered"
        className="cursor-pointer"
        fullWidth
        style={{ width: "100%" }}
        onClick={(e) => e.currentTarget?.showPicker()}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type="time"
        classNames={{
          base: "cursor-pointer",
          input: "cursor-pointer",
          inputWrapper: "bg-white hover:bg-white w-full cursor-pointer",
        }}
      />
    )
  );
  CustomInput.displayName = "CustomInput";

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
              // Ignore the date, onChange and value
              customTimeInput={<CustomInput date={currentTask.date || new Date()} onChange={() => null} value={""} />}
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
