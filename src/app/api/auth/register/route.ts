import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/ai/server/data';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email, skills = [], goal = '' } = body ?? {};
    if (!userId || !email) {
      return NextResponse.json({ error: 'userId and email are required' }, { status: 400 });
    }
    const ref = doc(db, 'users', userId);
    await setDoc(ref, { email, skills, goal }, { merge: true });
    return NextResponse.json({ ok: true, user: { userId, email, skills, goal } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
