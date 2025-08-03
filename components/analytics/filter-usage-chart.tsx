"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface FilterUsageChartProps {
  data: {
    [filterType: string]: {
      count: number
      percentage: number
    }
  }
}

export function FilterUsageChart({ data }: FilterUsageChartProps) {
  const chartData = Object.entries(data).map(([name, stats]) => ({
    name: name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()),
    value: stats.count,
    percentage: stats.percentage,
  }))

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--muted))",
    "#8884d8",
    "#82ca9d",
  ]

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name}: ${percentage.toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, "Usage Count"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
