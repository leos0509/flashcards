import { auth } from "@/auth";
import SignInCard from "@/components/SignInCard";
import SignOutCard from "@/components/SignOutCard";
import { headers } from "next/headers";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="page-spacing flex h-screen w-screen flex-col items-center justify-center">
      {session ? <SignOutCard name={session.user.name} /> : <SignInCard />}
    </div>
  );
}
