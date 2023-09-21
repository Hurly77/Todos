import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function AppHomePage() {
  const router = useRouter();
  return (
    <div>
      <h1>Home</h1>
      <Button radius="sm" color="primary" onClick={() => router.push("/tasks")}>
        Get Started
      </Button>
    </div>
  );
}
