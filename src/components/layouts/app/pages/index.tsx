import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function AppHomePage() {
  const router = useRouter();
  return (
    <div className="p-4 h-screen justify-center flex items-center">
      <div className="flex-col space-y-4">
        <div>
          <div className="flex items-center">
            <Image
              src="/images/favicon.png"
              width={75}
              height={75}
              alt={""}
              className="-rotate-[20deg] translate-x-3 translate-y-2"
            />
            <h1 className="text-6xl text-primary-500">Toduit</h1>
          </div>
          <p className="text-gray-500">A simple todo app with Next.js, Tailwind CSS and NextUI</p>
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" radius="sm" color="primary" onClick={() => router.push("/tasks")}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
