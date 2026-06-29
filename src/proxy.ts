import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  // Internal API proxy routes use x-stillos-key auth — skip Supabase session gate
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
