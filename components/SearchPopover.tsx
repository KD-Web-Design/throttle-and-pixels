"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function SearchPopover() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/searchResults?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <Popover>
      <PopoverTrigger className="mr-2">
        <SearchIcon size={16} className="text-primary" />
      </PopoverTrigger>
      <PopoverContent sideOffset={12}>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            placeholder="Search article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="icon" type="submit">
            <SearchIcon />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
