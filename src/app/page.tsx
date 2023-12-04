import { Button, TextInput } from "@mantine/core";
import { FaBeer } from "react-icons/fa";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Test Mantine</h1>
      <div className="mt-5">
        <Button variant="filled">Button</Button>
        <TextInput
          leftSection={<FaBeer />}
          label="Username"
          description="Test username"
          placeholder="Input username"
        />
      </div>
    </main>
  );
}
