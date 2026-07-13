import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "var(--primary)",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="studio-panel flex min-h-36 flex-col justify-between p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <Icon className="size-4" style={{ color: accent }} aria-hidden="true" />
      </div>
      <div className="mt-8 flex items-end justify-between gap-4">
        <p className="data-number truncate text-4xl font-black tracking-[-0.05em] text-foreground">{value}</p>
        <span className="size-3 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
      </div>
    </div>
  );
}
