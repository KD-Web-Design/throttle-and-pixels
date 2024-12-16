import Link from "next/link";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { UserCircleIcon } from "lucide-react";

export default function Navbar() {
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
    </header>
  );
}
