import { supabase } from "../utilities/supabase";

export default async function deleteTask(task_id: number) {
  await supabase.from("tasks").delete().eq("id", task_id);
}
