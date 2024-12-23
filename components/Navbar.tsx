"use client";

import Link from "next/link";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { LogOut, UserCircleIcon } from "lucide-react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/db/firebaseConfig";
import { Button } from "./ui/button";

export default function Navbar() {
  const router = useRouter();
  const handleSignOut = () => {
    signOut(auth);
    router.push("/");
  };
  return (
    <header className="my-4 flex items-center gap-2 rounded-lg border bg-card px-3 py-3 shadow-xl">
      <SidebarTrigger />
      <Link href="/" className="font-semibold text-lg">
        Throttle <span className="text-primary">&</span> Pixels
      </Link>

      <div className="ml-auto"></div>
      <Link href="/signInAndUp" className="text-primary">
        <UserCircleIcon />
      </Link>
      <Button onClick={handleSignOut} className="mx-2">
        <LogOut />
      </Button>
    </header>
  );
}
