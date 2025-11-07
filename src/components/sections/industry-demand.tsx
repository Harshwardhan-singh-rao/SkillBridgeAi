"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Card } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const chartData = [
  { skill: "AI/ML", demand: 95 },
  { skill: "Python", demand: 92 },
  { skill: "Cloud", demand: 88 },
  { skill: "UI/UX", demand: 85 },
  { skill: "Data Analysis", demand: 90 },
]

const chartConfig = {
  demand: {
    label: "Demand",
    color: "hsl(var(--primary))",
  },
}

export function IndustryDemand() {
  return (
    <section id="industry-demand" className="bg-gray-900 text-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-12 space-y-2">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Stay Ahead of the Curve</h2>
          <p className="max-w-3xl mx-auto text-gray-400 md:text-xl/relaxed">
            SkillBridge uses real-time data to guide your next learning step, focusing on the most in-demand skills.
          </p>
        </div>

        <Card className="glass-card bg-gray-800/30 border-primary/20 p-6 shadow-2xl shadow-primary/10">
          <h3 className="text-2xl font-headline font-bold mb-4 text-left">Top 5 In-Demand Skills for 2025</h3>
          <div className="h-[350px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
                <XAxis dataKey="skill" stroke="hsl(var(--foreground) / 0.5)" />
                <YAxis stroke="hsl(var(--foreground) / 0.5)" />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="demand" fill="var(--color-demand)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      </div>
    </section>
  )
}
