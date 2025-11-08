"use client";
import { DashboardPreview } from "@/components/sections/dashboard-preview";
import { Connections } from "@/components/dashboard/Connections";
import { PlacementCourse } from "@/components/dashboard/PlacementCourse";
import { MyCourses } from "@/components/dashboard/MyCourses";
import { TopBar } from "@/components/dashboard/TopBar";
import { LearningPath } from "@/components/dashboard/LearningPath";
import { useUser } from "@/firebase";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div>
        <TopBar />
        <section className="container mx-auto px-4 md:px-6 py-6">
          <h1 className="font-headline text-2xl md:text-3xl">{`Welcome back${user?.displayName ? `, ${user.displayName}` : ''} 👋 Let’s continue your journey to 100% placement!`}</h1>
        </section>
        <DashboardPreview />
        <Connections />
        <LearningPath />
        <PlacementCourse />
        <MyCourses />
        {/** Floating coach removed; Omnidimension widget is integrated via AiCareerCoach section on landing */}
    </div>
  )
}
