"use client";

import React, { useState, useEffect } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className={`w-full max-w-[400px] bg-surface-container-lowest p-8 rounded-lg shadow-[0px_1px_3px_rgba(0,0,0,0.05),_0px_10px_15px_-3px_rgba(0,0,0,0.03)] border border-outline-variant z-10 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <form action="#" className="space-y-6" method="POST">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              mail
            </span>
            <input 
              className="w-full h-12 pl-10 pr-4 bg-surface-bright border border-outline-variant rounded font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
              id="email" 
              name="email" 
              placeholder="name@company.com" 
              required 
              type="email" 
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="password">Password</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              lock
            </span>
            <input 
              className="w-full h-12 pl-10 pr-12 bg-surface-bright border border-outline-variant rounded font-body-md text-body-md text-on-surface placeholder:text-outline focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
              id="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              type={showPassword ? "text" : "password"} 
            />
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer" 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Action: Sign In Button */}
        <div className="pt-2">
          <button 
            className="w-full h-12 bg-primary text-on-primary font-title-md text-title-md rounded shadow-sm hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer" 
            type="submit"
          >
            Sign In
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Action: Forgot Password */}
        <div className="text-center">
          <a className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors font-semibold" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
