import { auth } from "@/auth";
import SignOutCard from "@/components/SignOutCard";
import SignUpCard from "@/components/SignUpCard";
import { headers } from "next/headers";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="page-spacing flex h-screen w-screen flex-col items-center justify-center">
      {session ? <SignOutCard name={session.user.name} /> : <SignUpCard />}
    </div>
  );
}
