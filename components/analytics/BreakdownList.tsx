import type { NamedCount } from "@/types/analytics";

export default function BreakdownList({
  title,
  items,
  accent = "var(--accent)",
}: {
  title: string;
  items: NamedCount[];
  accent?: string;
}) {
  const max = Math.max(...items.map((item) => item.clicks), 1);

  return (
    <section className="studio-panel p-5 sm:p-6">
      <h3 className="text-sm font-black uppercase tracking-[0.12em] text-foreground">{title}</h3>
      {items.length === 0 ? (
        <div className="mt-8 border-t border-border pt-5">
          <p className="text-sm text-muted-foreground">No signal yet. Share a link to start this view.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          {items.map((item) => (
            <div key={item.name || "unknown"}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="max-w-[70%] truncate text-sm font-semibold text-foreground">{item.name || "Unknown"}</span>
                <span className="data-number text-xs font-bold text-muted-foreground">{item.clicks}</span>
              </div>
              <div className="h-2 overflow-hidden bg-secondary">
                <div
                  className="h-full"
                  style={{ width: `${(item.clicks / max) * 100}%`, backgroundColor: accent }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
