import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const mentors = [
  {
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    image: PlaceHolderImages.find(p => p.id === 'mentor1')
  },
  {
    name: "David Lee",
    title: "Product Manager",
    company: "Microsoft",
    image: PlaceHolderImages.find(p => p.id === 'mentor2')
  },
  {
    name: "Jessica Rodriguez",
    title: "UX Design Lead",
    company: "Meta",
    image: PlaceHolderImages.find(p => p.id === 'mentor3')
  }
];

export function MentorConnect() {
  return (
    <section id="mentors" className="bg-secondary/50 dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Learn Directly from Industry Mentors 🧠</h2>
            <p className="text-muted-foreground text-lg">
              Get personalized guidance, career advice, and interview prep from professionals at top tech companies.
            </p>
            <Button size="lg">View All Mentors</Button>
          </div>
          <div className="space-y-6">
            {mentors.map((mentor, index) => (
              <Card key={index} className="flex items-center gap-4 p-4 glass-card rounded-xl transition-transform transform hover:-translate-x-2">
                {mentor.image && (
                  <Image
                    src={mentor.image.imageUrl}
                    alt={mentor.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                    data-ai-hint={mentor.image.imageHint}
                  />
                )}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{mentor.name}</h3>
                  <p className="text-muted-foreground">{mentor.title} at <span className="font-semibold text-primary">{mentor.company}</span></p>
                </div>
                <Button variant="outline">Connect</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
