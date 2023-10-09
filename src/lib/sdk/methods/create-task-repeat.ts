import { supabase } from "../utilities/supabase";

type TaskRepeatCreate = Database["public"]["Tables"]["task_repeat"]["Insert"];
export default async function createTaskRepeat(task_repeat: TaskRepeatCreate) {
  if (!task_repeat?.task_id) return;

  const { data, error } = await supabase
    .from("task_repeat")
    .insert([
      {
        task_id: task_repeat?.task_id,
        indefinite: task_repeat?.indefinite || false,
        interval: task_repeat?.interval || 1,
        days: task_repeat?.days || null,
        type: task_repeat?.type || "days",
      },
    ])
    .select("id")
    .single();
  if (data?.id) {
    await supabase.from("tasks").update({ repeat_id: data?.id }).eq("id", task_repeat?.task_id);
    console.log("success");
  }
}
