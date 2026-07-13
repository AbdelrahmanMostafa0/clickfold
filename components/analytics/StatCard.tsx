import { LucideIcon } from "lucide-react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = "#ff2d2d",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-xl p-6 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}1a` }}
      >
        <Icon className="size-5" style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl text-white font-semibold truncate">{value}</p>
        <p className="text-[#888] text-xs uppercase tracking-wider mt-0.5">
          {label}
        </p>
      </div>
    </div>
  );
}
