import type { NamedCount } from "@/types/analytics";

export default function BreakdownList({
  title,
  items,
  accent = "#00ff88",
}: {
  title: string;
  items: NamedCount[];
  accent?: string;
}) {
  const max = Math.max(...items.map((item) => item.clicks), 1);

  return (
    <div className="bg-[#111] border border-white/5 rounded-xl p-6">
      <h3 className="text-white text-sm font-medium mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-[#555] text-sm">No data yet</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.name || "unknown"}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#ccc] text-xs truncate max-w-[70%]">
                  {item.name || "Unknown"}
                </span>
                <span className="text-[#888] text-xs font-mono">
                  {item.clicks}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.clicks / max) * 100}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
