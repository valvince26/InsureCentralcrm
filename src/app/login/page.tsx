import LoginForm from "@/features/auth/components/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7F9]">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Subtle Atmospheric Background Detail */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px]"></div>
        
        {/* Header: Logo & Title */}
        <header className="flex flex-col items-center mb-10 z-10">
          <div className="w-16 h-16 bg-primary-container rounded-lg flex items-center justify-center mb-4 shadow-[0px_1px_3px_rgba(0,0,0,0.05),_0px_10px_15px_-3px_rgba(0,0,0,0.03)]">
            <span className="material-symbols-outlined text-on-primary text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">InsureFlow</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Enterprise CRM Portal</p>
        </header>

        {/* Form: Login Card */}
        <LoginForm />

        {/* Secondary Action: Register */}
        <p className="mt-8 font-body-md text-body-md text-on-surface-variant z-10">
          Don't have an account? <a className="text-primary font-semibold hover:underline" href="#">Contact Admin</a>
        </p>
      </main>

      {/* Footer: Security Note */}
      <footer className="py-6 px-6 text-center z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
            encrypted
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant">Enterprise Security Guaranteed</span>
        </div>
        <p className="font-label-md text-label-md text-outline uppercase tracking-wider">
          © 2024 Insure Central | Built for Professionals
        </p>
      </footer>
    </div>
  );
}
