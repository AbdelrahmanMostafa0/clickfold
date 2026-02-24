"use client";

import { useState } from "react";
import SusPopups from "@/components/ui/SusPopups";

export default function TestPopupsPage() {
  const [isActive, setIsActive] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const handleTrigger = () => {
    setIsActive(true);
    setRedirecting(false);
  };

  const handleComplete = () => {
    setIsActive(false);
    setRedirecting(true);
    // Here you would do the actual redirect using window.location.href or router.push
    setTimeout(() => {
      setRedirecting(false); // Reset for demo purposes
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white relative">
      <div className="text-center space-y-8 z-10 w-full max-w-lg px-6">
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Redirect Test Page
        </h1>

        <p className="text-[#888]">
          Click the button below to see what the user will experience before
          they are redirected to their destination.
        </p>

        <button
          onClick={handleTrigger}
          disabled={isActive}
          className="px-8 py-4 bg-[#ff2d2d] text-white font-bold rounded-lg hover:bg-[#ff2d2d]/90 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,45,45,0.3)]"
        >
          {isActive ? "Preparing Redirect..." : "Trigger Chaotic Redirect"}
        </button>

        {redirecting && (
          <div className="text-[#00ff88] text-xl animate-pulse font-mono mt-8">
            &gt; Redirecting to target URL...
          </div>
        )}
      </div>

      <SusPopups
        isActive={isActive}
        duration={5000} // 3.5 seconds of chaos before redirect
        onComplete={handleComplete}
      />
    </div>
  );
}
