import Link from "next/link";
import React from "react";
import GithubIcon from "./icons/GithubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import { Dot } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-4 flex flex-col items-center gap-4 mt-auto">
      <h3 className="text-muted-foreground text-sm">
        Throttle & Pixels Made By{" "}
        <Link
          href="https://www.malt.fr/profile/kddesign"
          target="_blank"
          className="text-primary"
        >
          KD Web Design
        </Link>
      </h3>
      <h3 className="text-muted-foreground text-sm">
        All articles from{" "}
        <Link
          href="https://www.overtake.gg/"
          target="_blank"
          className="text-primary"
        >
          Overtake.gg
        </Link>
      </h3>
      <div className="flex gap-2">
        <Link href="https://github.com/KD-Web-Design" target="_blank">
          <GithubIcon size={24} className="text-primary" />
        </Link>
        <span>
          <Dot />
        </span>
        <Link
          href="https://www.linkedin.com/in/killiam-d-64b496315/"
          target="_blank"
        >
          <LinkedInIcon size={24} className="text-primary" />
        </Link>
      </div>
    </footer>
  );
}
