"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Plan = { learningPath: string };

export function LearningPath() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      if (!user || user.isAnonymous) { setLoading(false); return; }
      try {
        const res = await fetch('/api/ai/learning-path', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.uid }),
        });
        const data = await res.json();
        if (!ignore) setPlan(data || null);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true };
  }, [user]);

  const weeks = useMemo(() => {
    if (!plan?.learningPath) return [] as string[];
    // naive split by lines starting with "Week"
    return plan.learningPath
      .split(/\n+/)
      .filter((ln) => /week\s*\d+/i.test(ln) || ln.trim().length > 0)
      .slice(0, 12);
  }, [plan]);

  return (
    <section className="container mx-auto px-4 md:px-6 py-8">
      <h2 className="font-headline text-2xl mb-4">Your Personalized Learning Path</h2>
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : !plan ? (
        <div className="text-sm text-muted-foreground">No plan generated yet.</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {weeks.map((w, i) => (
            <Card key={i} className="min-w-[240px] glass-card">
              <CardHeader>
                <CardTitle className="text-base">{`Week ${i + 1}`}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm whitespace-pre-wrap text-muted-foreground">
                {w}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
