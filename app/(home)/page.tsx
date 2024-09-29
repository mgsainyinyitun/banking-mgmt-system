
import { signOut } from "@/auth";
import { Button } from "@nextui-org/react";

export default function Home() {


  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
