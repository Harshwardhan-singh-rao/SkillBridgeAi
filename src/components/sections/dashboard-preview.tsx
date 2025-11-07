import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { IconPython, IconReact, IconSQL } from "../icons";
import { Badge } from "../ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Lightbulb, BookOpen } from "lucide-react";

export function DashboardPreview() {
  const dashboardImage = PlaceHolderImages.find(p => p.id === 'dashboard-mockup');

  return (
    <section id="features" className="bg-gray-900 text-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Your Smart Dashboard — Powered by AI</h2>
          <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
            All your career-building tools in one place. Track progress, find resources, and get AI-driven insights.
          </p>
        </div>

        <div className="relative">
          {/* Floating Icons */}
          <IconPython className="absolute -top-8 -left-8 h-12 w-12 text-blue-400 opacity-20 animate-pulse" />
          <IconReact className="absolute -bottom-12 right-0 h-16 w-16 text-cyan-400 opacity-20 animate-spin-slow" />
          <IconSQL className="absolute top-1/2 -right-12 h-10 w-10 text-purple-400 opacity-20 animate-pulse delay-500" />
          
          <Card className="glass-card border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden">
            {dashboardImage && (
              <Image
                src={dashboardImage.imageUrl}
                alt={dashboardImage.description}
                width={1200}
                height={800}
                className="w-full h-auto"
                data-ai-hint={dashboardImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/20 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 p-4 lg:p-8">
                <Card className="glass-card bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                        <div className="p-2 bg-primary/20 rounded-md"><BookOpen className="h-6 w-6 text-primary"/></div>
                        <CardTitle className="text-lg font-headline text-white">Recommended Courses</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-300">
                        <p>Advanced Python for Data Science</p>
                        <p>React: From Beginner to Advanced</p>
                        <p>Database Design &amp; SQL</p>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
                         <div className="p-2 bg-accent/20 rounded-md"><Lightbulb className="h-6 w-6 text-accent"/></div>
                        <CardTitle className="text-lg font-headline text-white">AI Project Ideas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-300">
                       <p>Sentiment Analysis on Social Media Data</p>
                       <p>Predictive Modeling for Stock Prices</p>
                       <p>Build a Recommendation Engine</p>
                    </CardContent>
                </Card>
                 <Card className="glass-card bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardHeader>
                        <CardTitle className="text-lg font-headline text-white">Your Skill Graph</CardTitle>
                    </CardHeader>
                    <CardContent className="space-x-2 space-y-2">
                        <Badge variant="secondary" className="bg-blue-500/70 border-blue-400 text-white">Python</Badge>
                        <Badge variant="secondary" className="bg-purple-500/70 border-purple-400 text-white">Data Analysis</Badge>
                        <Badge variant="secondary" className="bg-green-500/70 border-green-400 text-white">Communication</Badge>
                        <Badge variant="secondary" className="bg-cyan-500/70 border-cyan-400 text-white">React</Badge>
                        <Badge variant="secondary" className="bg-red-500/70 border-red-400 text-white">UI/UX</Badge>
                    </CardContent>
                </Card>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
