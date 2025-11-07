"use client"

import { Briefcase, School, Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedNumber } from "@/components/ui/animated-number"

const problemCards = [
  {
    icon: <School className="h-10 w-10 text-primary" />,
    title: "Students",
    description: "Learn theory in college but often lack the practical, real-world skills that companies demand.",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "Companies",
    description: "Struggle to find entry-level talent that is already trained and ready to contribute from day one.",
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "SkillBridge AI",
    description: "Our AI platform analyzes your profile and connects you to a personalized learning path to bridge that gap.",
  },
]

export function ProblemMission() {
  return (
    <section id="problem" className="bg-secondary/50 dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">The Skill Gap Is Real.</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Millions of talented graduates are finding it harder than ever to land their first job. Here's why.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-12 lg:max-w-none lg:gap-16 mt-12">
          {problemCards.map((card, index) => (
            <Card key={index} className="glass-card rounded-xl transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader className="flex flex-col items-center text-center gap-4">
                {card.icon}
                <CardTitle className="font-headline text-2xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                {card.description}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
            <p className="font-headline text-4xl font-bold text-primary">
              <AnimatedNumber value={82} />%
            </p>
            <p className="text-muted-foreground text-lg">of graduates feel they lack industry-ready skills.</p>
        </div>
      </div>
    </section>
  )
}
