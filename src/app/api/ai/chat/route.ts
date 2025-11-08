import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { logAIResponse } from '@/ai/server/logger';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anon';
  const rl = rateLimit(`chat:${ip}`, { limit: 30, windowMs: 60_000 });
  if (!rl.allowed) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });

  try {
    const { message, userId } = await req.json();
    if (!message || typeof message !== 'string') {
      const error = 'Invalid body. Expect { message: string, userId?: string }';
      await logAIResponse({ route: 'chat', userId: userId ?? null, ip, request: { message }, error });
      return NextResponse.json({ error }, { status: 400 });
    }

    const prompt = `You are an AI Career Coach for SkillBridge. Help the student with career, learning path, resume, or project advice. Keep tone friendly, motivating, and concise. User: ${message}`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 });
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      await logAIResponse({ route: 'chat', userId: userId ?? null, ip, request: { message }, error: txt });
      return NextResponse.json({ error: 'AI provider error' }, { status: 502 });
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';

    await logAIResponse({ route: 'chat', userId: userId ?? null, ip, request: { message }, response: { reply } });
    return NextResponse.json({ reply });
  } catch (e: any) {
    await logAIResponse({ route: 'chat', userId: null, ip, request: null, error: e?.message || 'Server error' });
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
