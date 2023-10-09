import { PaperClipIcon } from "@heroicons/react/24/outline";

export default function TaskEditorAddFiles() {
  return (
    <div className="p-4 w-full dark:bg-default-100 bg-white space-y-4 text-sm  rounded-sm">
      <PaperClipIcon className="h-5 w-5 " />
      <p>Attach a file</p>
    </div>
  );
}
