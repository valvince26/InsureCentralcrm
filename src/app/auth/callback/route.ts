import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

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
      
      // Check if they exist by clerkId
      const existingUserById = await prisma.user.findUnique({
        where: { clerkId: user.id }
      })

      if (!existingUserById) {
        // Check if they exist by email (e.g., they were invited)
        const existingUserByEmail = user.email ? await prisma.user.findUnique({
          where: { email: user.email }
        }) : null;

        if (existingUserByEmail) {
          // They were invited! Update their placeholder record with the real auth ID
          await prisma.user.update({
            where: { id: existingUserByEmail.id },
            data: {
              clerkId: user.id,
              isActive: true,
              // Optionally update their name to their Google profile name if it was just "New User"
              firstName: user.user_metadata?.full_name?.split(" ")[0] || existingUserByEmail.firstName,
              lastName: user.user_metadata?.full_name?.split(" ")[1] || existingUserByEmail.lastName,
            }
          });
        } else {
          // Completely new user. Create default org if none exists.
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
              clerkId: user.id, // Using clerkId field to store Supabase User ID
              email: user.email || "",
              firstName: user.user_metadata?.full_name?.split(" ")[0] || "New",
              lastName: user.user_metadata?.full_name?.split(" ")[1] || "User",
              role: role,
              isActive: true,
              organizationId: defaultOrg.id
            }
          })
        }
      }
      
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/login?error=true', request.url))
}
