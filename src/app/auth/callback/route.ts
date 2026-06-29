import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: authData, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && authData.user) {
      // Sync the Supabase User to Prisma DB
      const user = authData.user
      
      // Check if they exist
      const existingUser = await prisma.user.findUnique({
        where: { clerkId: user.id }
      })

      if (!existingUser) {
        // If no organization exists, create a default one for this instance
        let defaultOrg = await prisma.organization.findFirst()
        if (!defaultOrg) {
          defaultOrg = await prisma.organization.create({
            data: { name: "Insure Central HQ" }
          })
        }

        // Determine Role: First user is SUPER_ADMIN
        const userCount = await prisma.user.count()
        const role = userCount === 0 ? "SUPER_ADMIN" : "AGENT"

        await prisma.user.create({
          data: {
            clerkId: user.id, // Using clerkId field to store Supabase User ID to avoid schema changes right now
            email: user.email || "",
            firstName: user.user_metadata?.full_name?.split(" ")[0] || "New",
            lastName: user.user_metadata?.full_name?.split(" ")[1] || "User",
            role: role,
            organizationId: defaultOrg.id
          }
        })
      }
      
      return NextResponse.redirect(`${origin}/`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=true`)
}
