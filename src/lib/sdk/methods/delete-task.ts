import { supabase } from "../utilities/supabase";

export default async function deleteTask(task_id: number) {
  const deleteAllFiles = async () => {
    const { data, error } = await supabase.storage.from("task_files").list(`${task_id}/`);
    if (data && data.length > 0) {
      const filePaths = data.map((file) => `${task_id}/${file.name}`);
      await supabase.storage.from("task_files").remove(filePaths);
    }
    if (error) console.error(error);
  };

  Promise.all([await deleteAllFiles(), await supabase.from("tasks").delete().eq("id", task_id)]);
}
