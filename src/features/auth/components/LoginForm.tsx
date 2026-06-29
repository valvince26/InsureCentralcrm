"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function LoginForm() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div 
      className={`w-full max-w-[400px] bg-surface-container-lowest p-8 rounded-lg shadow-[0px_1px_3px_rgba(0,0,0,0.05),_0px_10px_15px_-3px_rgba(0,0,0,0.03)] border border-outline-variant z-10 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-headline-sm text-on-surface">Welcome Back</h2>
          <p className="text-body-sm text-on-surface-variant mt-1">Sign in to your CRM portal to continue</p>
        </div>

        {/* Action: Google Sign In */}
        <div className="pt-2">
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 bg-white border border-outline-variant text-on-surface font-title-md text-title-md rounded shadow-sm hover:bg-surface-container-low active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50" 
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            {loading ? "Connecting..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
