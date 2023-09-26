import React, { ReactNode } from "react";
import ReactDatePicker, { CalendarContainerProps } from "react-datepicker";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import { Button, Input } from "@nextui-org/react";

type CustomInputProps = { onChange: (value: any) => void; date: Date; value: string };
type DropdownsDatePickerPopoverProps = {
  key?: "due_date" | "reminder" | "repeat";
  date: Date | null;
  showTimeInput?: boolean;
  handleChange: (date: Date) => void;
  onSave: () => void;
};
export default function DropdownsDatePickerPopover(props: DropdownsDatePickerPopoverProps) {
  const { date, showTimeInput, onSave, key, handleChange } = props;

  const Calendar = ({ children, className }: CalendarContainerProps) => (
    <div className={className} style={{ border: "none" }}>
      {children}
    </div>
  );

  const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(props, ref) {
    const { date, value, onChange } = props;
    return (
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
          console.log(date);
          onChange(e.target.value);
        }}
        type="time"
        classNames={{
          base: "cursor-pointer",
          input: "cursor-pointer",
          inputWrapper: "bg-white hover:bg-white w-full cursor-pointer",
        }}
      />
    );
  });
  CustomInput.displayName = "CustomInput";

  return (
    <>
      <ReactDatePicker
        inline
        calendarClassName="calendar"
        onSelect={handleChange}
        onChange={handleChange}
        calendarContainer={Calendar}
        showTimeInput={showTimeInput}
        selected={date || new Date()}
        customInput={<CustomInput date={date || new Date()} onChange={() => null} value={""} />}
      />
      <div className="px-4 w-full">
        <Button onPress={onSave} fullWidth color="primary" radius="sm">
          Save
        </Button>
      </div>
    </>
  );
}
