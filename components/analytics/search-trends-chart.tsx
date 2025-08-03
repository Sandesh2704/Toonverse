"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface SearchTrendsChartProps {
  data: { date: string; searches: number; users: number }[]
  detailed?: boolean
}

export function SearchTrendsChart({ data, detailed = false }: SearchTrendsChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className={detailed ? "h-96" : "h-64"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatDate} fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip
            labelFormatter={(value) => formatDate(value as string)}
            formatter={(value, name) => [value, name === "searches" ? "Searches" : "Users"]}
          />
          <Legend />
          <Line type="monotone" dataKey="searches" stroke="hsl(var(--primary))" strokeWidth={2} name="Searches" />
          <Line type="monotone" dataKey="users" stroke="hsl(var(--secondary))" strokeWidth={2} name="Users" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
