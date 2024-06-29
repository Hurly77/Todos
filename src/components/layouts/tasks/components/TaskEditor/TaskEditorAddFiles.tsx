import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/lib/sdk/utilities/supabase";
import { TasksLayoutContext } from "../../context/TasksLayoutContext";
import React from "react";
import { FileObject } from "@supabase/storage-js";
import { Divider, Link } from "@nextui-org/react";
import { useTaskFiles } from "../../hooks/useTaskFiles";
import { getFileType, getElementType } from "../../helpers/file";

export default function TaskEditorAddFiles() {
  const ctx = React.useContext(TasksLayoutContext);
  const { files, mutate } = useTaskFiles(ctx.taskInEdit?.id ?? 0);

  async function onAddFile(e: React.ChangeEvent<HTMLInputElement>) {
    const task = ctx.taskInEdit;
    const file = e.target.files?.[0];
    if (!file || !task) return;

    const { error } = await supabase.storage.from("task_files").upload(`${task.id}/${file.name}`, file);

    if (error) return console.error("Error uploading file: ", error);
    await mutate();
  }

  async function onDeleteFile(file: FileObject) {
    const filePath = `${ctx.taskInEdit?.id}/${file.name}`;
    const { data, error } = await supabase.storage.from("task_files").remove([filePath]);
    console.log(data, error);

    if (error) return console.error("Error deleting file: ", error);

    await mutate(files.filter((f) => f.id === file?.id));
  }

  return (
    <div className="bg-content1 dark:bg-content2 p-4">
      <div className="space-y-2">
        {files?.map((file) => {
          const fileType = getFileType(file.metadata?.["mimetype"] ?? "");
          const elementType = getElementType(file.metadata?.["mimetype"] ?? "");
          return (
            <>
              <div className="w-full grid grid-cols-6 justify-items-center gap-2 items-center" key={file.name}>
                <div className="bg-primary rounded flex items-center justify-center text-xs text-primary-foreground font-bold uppercase h-10 w-12">
                  <p>{fileType}</p>
                </div>
                <Link
                  size="sm"
                  target="_blank"
                  className="overflow-truncate w-full col-span-4"
                  href={`/tasks/attachment/${ctx?.taskInEdit?.id}?fileName=${file.name}&type=${elementType}`}
                >
                  {file.name}
                </Link>
                <XMarkIcon onClick={() => onDeleteFile(file)} className="h-5 w-5 cursor-pointer" />
              </div>
              <Divider />
            </>
          );
        })}
      </div>
      <label htmlFor="file-uploader" className="cursor-pointer">
        <div className="w-full h-12 items-center flex gap-2 text-sm hover:bg-content3 rounded mt-1">
          <PaperClipIcon className="h-5 w-5" />
          <p>Attach a file</p>
        </div>
        <input onChange={onAddFile} type="file" id="file-uploader" className="hidden" />
      </label>
    </div>
  );
}
