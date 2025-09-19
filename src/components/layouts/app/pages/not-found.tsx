import NextLink from "next/link";
import { Link } from "@nextui-org/react";

export default function NotFoundPage() {
  return (
    <div className="w-full h-full grow flex justify-center items-center flex-col space-y-2">
      <h2 className="text-3xl front-bold">Ops, Looks like the page your looking for doesn&apos;t exist</h2>
      <p className="text-lg">
        Click here to
        <Link as={NextLink} href="/tasks" className="underline text-primary ml-1">
          go to your tasks
        </Link>
      </p>
    </div>
  );
}
