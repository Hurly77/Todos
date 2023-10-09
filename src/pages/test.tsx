import { Input } from "@nextui-org/react";
import { supabase } from "../lib/sdk/utilities/supabase";
import React from "react";
import { Database } from "@/lib/sdk/constants/supabase-types";

export default function Test() {
  const [name, setName] = React.useState("");
  const [loadedName, setLoadedName] = React.useState("");

  React.useEffect(() => {
    const channel = supabase
      .channel("realtime test")
      .on<Database["public"]["Tables"]["test_data"]["Row"]>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "test_data",
        },
        (payload) => {
          console.log("realtime test", payload);
          if ("name" in payload.new) setLoadedName(payload.new.name || "");
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onChange = async (value: string) => {
    setName(value);
    const { data, error } = await supabase.from("test_data").select("*").eq("id", 1).single();
    if (error) console.log("error", error);
    if (!data) {
      console.log("No data");
      const { data: insert, error } = await supabase.from("test_data").insert([{ name: value }]);
    }
    if (data) {
      console.log("data", data);
      const { data: update, error } = await supabase.from("test_data").update({ name: value }).eq("id", 1);
      console.log(update);
    }
  };
  return (
    <div className="bg-default w-screen h-screen p-6">
      <h1>HEllo</h1>
      <Input value={name} onValueChange={onChange} />
      <p>{loadedName}</p>
    </div>
  );
}
