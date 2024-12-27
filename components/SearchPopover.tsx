import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchPopover() {
  return (
    <Popover>
      <PopoverTrigger className="mr-2">
        <SearchIcon size={16} className="text-primary" />
      </PopoverTrigger>
      <PopoverContent sideOffset={12}>
        <form action="" className="flex items-center gap-2">
          <Input placeholder="Search..." />
          <Button size="icon" type="submit">
            <SearchIcon />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
