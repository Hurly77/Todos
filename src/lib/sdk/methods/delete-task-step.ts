import { supabase } from "../utilities/supabase";

export default async function deleteTaskStep(step_id: number) {
  await supabase.from("task_steps").delete().eq("id", step_id);
}
