"use client";

import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Field } from "./ui/field";

type SignOutCardProps = {
  name: string;
};

export default function SignOutCard({ name }: SignOutCardProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await authClient.signOut();

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Sign out successful! Redirecting...");
      router.push("/signin");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">You already sign in, {name}</CardTitle>
        <CardDescription>
          Please sign out before sign in or sign up.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full">
          <Button className="flex-1" onClick={handleSignOut}>
            <span>Sign Out</span>
            <LogOutIcon className="ml-2 size-4" />
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
