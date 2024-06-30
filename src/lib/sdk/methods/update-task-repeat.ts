import { Database } from "../constants/supabase-types";
import { supabase } from "../utilities/supabase";
type TaskRepeatUpdate = Database["public"]["Tables"]["task_repeat"]["Update"];

export default async function updateTaskRepeat(task_repeat: TaskRepeatUpdate) {
  if (!task_repeat?.id) return;
  try {
    await supabase.from("task_repeat").update(task_repeat).eq("id", task_repeat?.id);
  } catch (error) {
    console.log(error);
  }
}
