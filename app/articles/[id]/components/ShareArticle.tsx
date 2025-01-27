import FacebookIcon from "@/components/icons/FacebookIcon";
import PinteresetIcon from "@/components/icons/PinteresetIcon";
import RedditIcon from "@/components/icons/RedditIcon";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import XIcon from "@/components/icons/XIcon";
import { LinkIcon, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ShareArticle() {
  return (
    <div className="flex gap-3 text-muted-foreground">
      <span>Share:</span>
      <Link
        href="https://www.facebook.com/sharer/sharer.php?u="
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon size={24} />
      </Link>
      <Link
        href="https://twitter.com/intent/tweet?url="
        target="_blank"
        rel="noopener noreferrer"
      >
        <XIcon size={24} />
      </Link>
      <Link
        href="https://www.reddit.com/submit?url="
        target="_blank"
        rel="noopener noreferrer"
      >
        <RedditIcon size={24} />
      </Link>
      <Link
        href="https://pinterest.com/pin/create/button/?url="
        target="_blank"
        rel="noopener noreferrer"
      >
        <PinteresetIcon size={24} />
      </Link>
      <Link
        href="https://api.whatsapp.com/send?text="
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsappIcon size={24} />
      </Link>
      <Link href="mailto:?body=" target="_blank" rel="noopener noreferrer">
        <Mail size={24} />
      </Link>
      <Link href="#">
        <LinkIcon size={24} />
      </Link>
    </div>
  );
}
