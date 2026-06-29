import { NextResponse } from 'next/server';

const STILLOS_API = process.env.STILLOS_API_URL || 'https://insurecentralhq.com';
const STILLOS_KEY = process.env.STILLOS_CRM_KEY || 'stillos-crm-2026';

export async function GET() {
  const res = await fetch(`${STILLOS_API}/crm/stats`, {
    headers: { 'x-stillos-key': STILLOS_KEY },
    next: { revalidate: 60 },
  });

  if (!res.ok) return NextResponse.json({ error: 'StillOS API error' }, { status: res.status });
  return NextResponse.json(await res.json());
}
