import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { session } } = await supabase.auth.getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  // Enforce 24-hour session logout
  const signInTime = session.user.last_sign_in_at || session.user.created_at;
  if (signInTime) {
    const hoursSinceLogin = (Date.now() - new Date(signInTime).getTime()) / (1000 * 60 * 60);
    if (hoursSinceLogin > 24) {
      await supabase.auth.signOut();
      redirect("/login");
    }
  }

  const user = session.user;

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser || !dbUser.isActive) {
    // Force sign out if user is deleted or deactivated
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-[260px] pt-[64px] min-h-screen flex flex-col bg-surface-bright">
        {children}
      </main>
    </>
  );
}
