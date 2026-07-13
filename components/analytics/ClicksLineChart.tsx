"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ClicksByDate } from "@/types/analytics";

function formatDate(date: ReactNode) {
  const value = new Date(String(date));
  return value.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ClicksLineChart({ data }: { data: ClicksByDate[] }) {
  if (data.length === 0) {
    return (
      <div className="grid h-64 place-items-center border border-dashed border-border bg-background/60 px-6 text-center">
        <div>
          <p className="font-bold text-foreground">The chart is ready for its first click.</p>
          <p className="mt-1 text-sm text-muted-foreground">Share a campaign link and activity will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="var(--border)"
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
          />
          <YAxis
            allowDecimals={false}
            stroke="var(--border)"
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--foreground)",
              color: "var(--background)",
              border: "1px solid var(--foreground)",
              borderRadius: 0,
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--background)" }}
            labelFormatter={formatDate}
          />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="var(--primary)"
            strokeWidth={3}
            fill="var(--primary)"
            fillOpacity={0.12}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
