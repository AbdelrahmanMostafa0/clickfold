import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const sortLabels: Record<string, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  mostClicked: "Most clicked",
};

export default function MyLinksHeader({
  sort,
  setSort,
}: {
  sort: string;
  setSort: (sort: string) => void;
}) {
  return (
    <header className="grid gap-8 border-b-2 border-foreground pb-9 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <span className="eyebrow">Link index</span>
        <h1 className="mt-6 text-5xl font-black leading-none tracking-[-0.055em] sm:text-6xl">Every route, in one place.</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Copy, review, and compare the links carrying your campaigns.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-h-11 rounded-none border-foreground bg-card px-4 text-foreground hover:bg-secondary hover:text-foreground">
              {sortLabels[sort]} <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-44 border-border bg-popover text-popover-foreground">
            {Object.entries(sortLabels).map(([value, label]) => (
              <DropdownMenuItem key={value} onClick={() => setSort(value)} className="cursor-pointer focus:bg-secondary focus:text-foreground">
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/create" className="hard-shadow inline-flex min-h-11 items-center gap-2 border border-foreground bg-primary px-4 font-extrabold text-primary-foreground">
          Build a link <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}
