"use client";

import { authClient } from "@/lib/auth-client";
import nameShorten from "@/lib/name-shorten";
import {
  ChevronDownIcon,
  HouseIcon,
  Loader2Icon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

function isActiveLink(href: string, currentPath: string) {
  const normalize = (path: string) => path.replace(/\/+$/, "");
  return normalize(href) === normalize(currentPath);
}

type NavItem = {
  name: string;
  href: string;
  variant?: "default" | "secondary";
};

const authNavList: NavItem[] = [
  { name: "Sign In", href: "/signin", variant: "default" },
];

const navList: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Decks", href: "/decks" },
  { name: "Cards", href: "/cards" },
];

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const res = await authClient.signOut();

    if (res.error) {
      toast.error(res.error.message);
    } else {
      toast.success("Signed out successfully!");
      router.push("/signin");
    }
  }

  if (isPending) {
    return (
      <nav className="fixed top-0 left-0 flex h-16 w-screen items-center justify-center bg-transparent">
        <div className="bg-card border-border flex min-w-xl items-center justify-between gap-8 rounded-lg p-2 shadow-sm border">
          <div className="flex gap-1">
            <Link href="/">
              <Button variant="ghost" size="icon-sm">
                <HouseIcon className="size-4" />
              </Button>
            </Link>
            {navList.map((navItem) => (
              <Link key={navItem.href} href={navItem.href}>
                <Button
                  variant={
                    isActiveLink(navItem.href, pathname) ? "default" : "ghost"
                  }
                  size="sm"
                >
                  {navItem.name}
                </Button>
              </Link>
            ))}
          </div>
          <div className="flex gap-1 px-2">
            <Loader2Icon className="size-4 animate-spin" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 flex h-16 w-screen items-center justify-center bg-transparent">
      <div className="bg-card border-border flex min-w-xl items-center justify-between gap-4 rounded-lg p-2 shadow-sm">
        <div className="flex gap-1">
          <Link href="/">
            <Button variant="ghost" size="icon-sm">
              <HouseIcon className="size-4" />
            </Button>
          </Link>
          {navList.map((navItem) => (
            <Link key={navItem.href} href={navItem.href}>
              <Button
                variant={
                  isActiveLink(navItem.href, pathname) ? "default" : "ghost"
                }
                size="sm"
              >
                {navItem.name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex gap-1">
          {!session ? (
            authNavList.map((navItem) => (
              <Link key={navItem.href} href={navItem.href}>
                <Button size="sm" variant={navItem.variant}>
                  {navItem.name}
                </Button>
              </Link>
            ))
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <button className="group bg-secondary flex h-8 items-center justify-center gap-2 rounded px-2 hover:cursor-pointer">
                  <Avatar size="sm" className="shadow-xs">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback>
                      {nameShorten(session.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs leading-[100%]">
                    {session.user.name}
                  </span>
                  <ChevronDownIcon className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="border-border flex w-fit max-w-lg flex-col gap-1 p-1"
                sideOffset={8}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-between"
                  onClick={handleSignOut}
                >
                  <span>Sign Out</span>
                  <LogOutIcon className="ml-2 size-4" />
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
