import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <p>This a protected route!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
