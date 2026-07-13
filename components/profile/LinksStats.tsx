import Link from "next/link";
import { ArrowUpRight, BarChart3, Link2, Megaphone, Plus } from "lucide-react";

const workspaceLinks = [
  { href: "/dashboard", label: "Campaign overview", icon: BarChart3 },
  { href: "/profile/my-links", label: "Link index", icon: Link2 },
  { href: "/campaigns", label: "Campaign index", icon: Megaphone },
];

export const LinksStats = () => {
  return (
    <aside className="space-y-5">
      <section className="ink-panel p-6">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Workspace routes</p>
        <nav className="mt-5 divide-y divide-background/20" aria-label="Workspace shortcuts">
          {workspaceLinks.map((item) => (
            <Link key={item.href} href={item.href} className="flex min-h-14 items-center justify-between gap-3 py-3 font-bold text-background/75 hover:text-background">
              <span className="flex items-center gap-3"><item.icon className="size-4 text-primary" />{item.label}</span>
              <ArrowUpRight className="size-4" />
            </Link>
          ))}
        </nav>
      </section>
      <Link href="/create" className="hard-shadow flex min-h-12 items-center justify-center gap-2 border border-foreground bg-primary px-4 font-extrabold text-primary-foreground">
        <Plus className="size-4" /> Build a link
      </Link>
    </aside>
  );
};
