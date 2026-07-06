"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function EmailRealtimeRefresher() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Subscribe to new emails being inserted into the database
    const channel = supabase
      .channel('email_inbox_updates')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'EmailMessage' },
        () => {
          // Tell Next.js to quietly re-fetch the server component data without reloading the page
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}
