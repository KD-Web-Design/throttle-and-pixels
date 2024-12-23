import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { SearchIcon } from "lucide-react";

export default function SearchSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <SearchIcon size={16} />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle className="hidden"></SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
