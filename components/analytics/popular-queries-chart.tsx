"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PopularQueriesChartProps {
  data: {
    query: string
    count: number
    avgResultCount: number
  }[]
}

export function PopularQueriesChart({ data }: PopularQueriesChartProps) {
  const chartData = data.slice(0, 10).map((item) => ({
    query: item.query.length > 15 ? `${item.query.substring(0, 15)}...` : item.query,
    fullQuery: item.query,
    count: item.count,
    avgResults: item.avgResultCount,
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="query" fontSize={12} angle={-45} textAnchor="end" height={60} />
          <YAxis fontSize={12} />
          <Tooltip
            formatter={(value, name) => [value, name === "count" ? "Search Count" : "Avg Results"]}
            labelFormatter={(label, payload) => {
              const item = payload?.[0]?.payload
              return item?.fullQuery || label
            }}
          />
          <Bar dataKey="count" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
