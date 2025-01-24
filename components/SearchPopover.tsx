"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SearchPopover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();

    if (searchQuery.trim()) {
      queryParams.set("q", searchQuery);
    }

    if (selectedCategory && selectedCategory !== "everywhere") {
      queryParams.set("category", selectedCategory);
    }

    router.push(`/searchResults?${queryParams.toString()}`);
  };
  return (
    <Popover>
      <PopoverTrigger className="mr-2">
        <SearchIcon size={20} className="text-primary" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[300px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2">
            <Input
              placeholder="Search article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pick a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="everywhere">Everywhere</SelectItem>
                  <SelectItem value="games">Games</SelectItem>
                  <SelectItem value="guides">Guides</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="misc">Misc</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="ml-auto">
            <SearchIcon />
            Search
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
