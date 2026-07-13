import NextLink from "next/link";
import { BarChart3, Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { goeyToast } from "goey-toast";
import type { Link } from "@/types/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LinksTable({ links, loading }: { links: Link[]; loading: boolean }) {
  const copyToClipboard = async (slug: string) => {
    const shortUrl = `${window.location.origin}/l/${slug}`;
    await navigator.clipboard.writeText(shortUrl);
    goeyToast.success("Link copied. It's ready to share.");
  };

  if (loading) {
    return (
      <div className="space-y-3" aria-label="Loading links">
        {[0, 1, 2, 3].map((item) => <div key={item} className="h-20 animate-pulse border border-border bg-card" />)}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <section className="hard-shadow border-2 border-foreground bg-card p-7 sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Empty index</p>
        <h2 className="mt-4 max-w-[13ch] text-4xl font-black tracking-[-0.045em]">Build a route and it will report back here.</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Your link index keeps destinations, share previews, status, and analytics within reach.</p>
        <NextLink href="/create" className="mt-7 inline-block font-bold text-primary underline underline-offset-4">Build your first link</NextLink>
      </section>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden border-2 border-foreground bg-card md:block">
        <Table>
          <TableHeader className="border-b border-foreground bg-secondary">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Route</TableHead>
              <TableHead>Short link</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link._id} className="border-border hover:bg-secondary/60">
                <TableCell>
                  <div className="flex max-w-[19rem] flex-col">
                    <NextLink href={`/profile/my-links/${link.slug}`} className="truncate font-bold hover:text-primary">{link.og?.title || link.slug}</NextLink>
                    <a href={link.destination} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-foreground"><span className="truncate">{link.destination}</span><ExternalLink className="size-3 shrink-0" /></a>
                  </div>
                </TableCell>
                <TableCell>
                  <button onClick={() => copyToClipboard(link.slug)} className="flex items-center gap-2 font-semibold hover:text-primary" aria-label={`Copy /${link.slug}`}>
                    /{link.slug}<Copy className="size-3" />
                  </button>
                </TableCell>
                <TableCell><span className="data-number font-black">{link.clicks || 0}</span></TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">{new Date(link.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</TableCell>
                <TableCell><Status active={link.isActive} /></TableCell>
                <TableCell className="text-right"><Actions slug={link.slug} onCopy={() => copyToClipboard(link.slug)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4 md:hidden">
        {links.map((link) => (
          <article key={link._id} className="border-2 border-foreground bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <NextLink href={`/profile/my-links/${link.slug}`} className="block truncate text-xl font-black tracking-[-0.03em] hover:text-primary">{link.og?.title || link.slug}</NextLink>
                <a href={link.destination} target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground"><span className="truncate">{link.destination}</span><ExternalLink className="size-3 shrink-0" /></a>
              </div>
              <Actions slug={link.slug} onCopy={() => copyToClipboard(link.slug)} />
            </div>
            <button onClick={() => copyToClipboard(link.slug)} className="mt-5 flex min-h-11 w-full items-center justify-between bg-secondary px-3 text-left text-sm font-bold" aria-label={`Copy /${link.slug}`}>
              <span className="truncate">clickfold.app/{link.slug}</span><Copy className="size-4 shrink-0" />
            </button>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
              <Status active={link.isActive} />
              <p className="data-number text-sm font-black">{link.clicks || 0} clicks</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function Status({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider ${active ? "text-success-foreground" : "text-muted-foreground"}`}>
      <span className={`size-2 ${active ? "bg-success" : "bg-muted-foreground"}`} />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function Actions({ slug, onCopy }: { slug: string; onCopy: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label={`Actions for /${slug}`}>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border bg-popover text-popover-foreground">
        <DropdownMenuItem onClick={onCopy} className="cursor-pointer focus:bg-secondary focus:text-foreground"><Copy className="mr-2 size-4" />Copy link</DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-secondary focus:text-foreground">
          <NextLink href={`/profile/my-links/${slug}`}><BarChart3 className="mr-2 size-4" />Read analytics</NextLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
