import { Tables } from "../constants/supabase-types";

export type RealtimeTask = Partial<Tables<"tasks">>;
export type RealTimeRepeat = Partial<Tables<"task_repeat">>;
export type RealTimeTaskStep = Partial<Tables<"task_steps">>;
export type RealTimeTaskTag = Partial<Tables<"task_tag">>;
