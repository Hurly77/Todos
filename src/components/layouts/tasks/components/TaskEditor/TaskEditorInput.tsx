import { Input, InputProps } from "@nextui-org/react";

export default function TaskEditorInput(props: InputProps) {
  return (
    <Input
      radius="sm"
      type="text"
      variant="bordered"
      className="hover:bg-none border-none outline-none"
      classNames={{
        inputWrapper: "default-50 shadow-none h-full border-none",
        input: "text-lg",
      }}
      {...props}
    />
  );
}
