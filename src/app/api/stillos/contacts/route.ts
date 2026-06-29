import { NextRequest, NextResponse } from 'next/server';

const STILLOS_API = process.env.STILLOS_API_URL || 'https://insurecentralhq.com';
const STILLOS_KEY = process.env.STILLOS_CRM_KEY || 'stillos-crm-2026';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '50';
  const classification = searchParams.get('classification') || '';
  const state = searchParams.get('state') || '';

  const params = new URLSearchParams({ page, limit });
  if (classification) params.set('classification', classification);
  if (state) params.set('state', state);

  const res = await fetch(`${STILLOS_API}/crm/contacts?${params}`, {
    headers: { 'x-stillos-key': STILLOS_KEY },
    next: { revalidate: 60 },
  });

  if (!res.ok) return NextResponse.json({ error: 'StillOS API error' }, { status: res.status });
  return NextResponse.json(await res.json());
}
