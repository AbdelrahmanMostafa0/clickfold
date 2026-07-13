"use client";

import type { ReactNode } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { ClicksByDate } from "@/types/analytics";

function formatDate(date: ReactNode) {
  const d = new Date(String(date));
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ClicksLineChart({ data }: { data: ClicksByDate[] }) {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-[#555] text-sm">
        No click data yet
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff2d2d" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#ff2d2d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0d" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#555"
            tick={{ fill: "#666", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#ffffff14" }}
          />
          <YAxis
            allowDecimals={false}
            stroke="#555"
            tick={{ fill: "#666", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: "#888" }}
            labelFormatter={formatDate}
          />
          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#ff2d2d"
            strokeWidth={2}
            fill="url(#clicksGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
