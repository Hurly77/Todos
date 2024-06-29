import React from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/sdk/utilities/supabase";
import Image from "next/image";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";

export default function Attachment() {
  const [fileSrc, setFileSrc] = React.useState<string>("");
  const router = useRouter();
  const taskId = router.query.id?.toString();
  const fileName = router.query.fileName?.toString();
  const type = router.query.type?.toString();

  React.useEffect(() => {
    async function getURL() {
      const { data, error } = await supabase.storage.from("task_files").createSignedUrl(`${taskId}/${fileName}`, 60);
      if (data) setFileSrc(data.signedUrl);
    }
    if (taskId && fileName) getURL();
  }, [fileName, taskId]);

  if (!fileSrc) return <div>Loading...</div>;

  return (
    <div className="bg-content4 h-screen w-screen p-4">
      <div className="h-full w-full rounded overflow-hidden relative">
        {type === "img" ? (
          <Image src={fileSrc} alt={fileName ?? "Image"} layout="fill" className="object-contain" />
        ) : type === "embed" ? (
          <embed src={fileSrc} className="h-full w-full" />
        ) : type === "video" ? (
          <video controls className="w-full h-full bg-black">
            <source src={fileSrc} type="audio/mp3" />
          </video>
        ) : type === "audio" ? (
          <>
            <SpeakerWaveIcon className="h-20 w-20 absolute left-[calc(50%-40px)] top-[calc(50%-40px)] bg-primary rounded-full stroke-primary-foreground p-1" />
            <video controls className="w-full h-full">
              <source src={fileSrc} type="audio/mp3" />
            </video>
          </>
        ) : (
          <>
            <p>Unsorted File Type</p>
          </>
        )}
      </div>
    </div>
  );
}
