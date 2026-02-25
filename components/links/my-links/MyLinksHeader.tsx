import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
const MyLinksHeader = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: (sort: string) => void;
}) => {
  const sortLabels: Record<string, string> = {
    newest: "Newest first",
    oldest: "Oldest first",
    mostClicked: "Most clicked",
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <h1 className="text-2xl font-semibold text-white">My Links</h1>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-[#111] border-white/10 text-white hover:bg-white/5 hover:text-white flex items-center gap-2"
            >
              {sortLabels[sort]}
              <ChevronDown className="size-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#1a1a1a] border-white/10 text-white min-w-[160px]"
          >
            <DropdownMenuItem
              className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
              onClick={() => setSort("newest")}
            >
              Newest first
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
              onClick={() => setSort("oldest")}
            >
              Oldest first
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
              onClick={() => setSort("mostClicked")}
            >
              Most clicked
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          asChild
          className="bg-[#ff2d2d] text-white hover:bg-[#ff2d2d]/90"
        >
          <Link href="/create">Create Link</Link>
        </Button>
      </div>
    </div>
  );
};

export default MyLinksHeader;
