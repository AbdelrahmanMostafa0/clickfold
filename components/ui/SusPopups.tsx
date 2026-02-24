"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { POPUP_MESSAGES } from "@/data/popup-messages";

interface PopupData {
  id: number;
  title: string;
  message: string;
  icon: React.ElementType;
  color: string;
  x: number;
  y: number;
  delay: number;
  isCustomImage?: boolean; // For future expansion
}

export default function SusPopups({
  isActive,
  onComplete,
  duration = 3000,
}: {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
}) {
  const [popups, setPopups] = useState<PopupData[]>([]);

  useEffect(() => {
    if (!isActive) {
      setPopups([]);
      return;
    }

    // Generate random popups
    const newPopups: PopupData[] = [];
    const numPopups = Math.floor(Math.random() * 8) + 12; // 12 to 20 popups for maximum chaos

    for (let i = 0; i < numPopups; i++) {
      const template =
        POPUP_MESSAGES[Math.floor(Math.random() * POPUP_MESSAGES.length)];

      // Calculate random positions (keeping them somewhat within the viewport)
      // We use percentages relative to window size to avoid overflow
      const x = Math.random() * 70; // 0 to 70vw
      const y = Math.random() * 70; // 0 to 70vh

      // Delays so they appear sequentially and rapidly
      const delay = (Math.random() * (duration - 1000)) / 1000;

      newPopups.push({
        id: i,
        ...template,
        x,
        y,
        delay,
      });
    }

    setPopups(newPopups);

    // Call onComplete after the duration passes
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, duration, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {popups.map((popup) => {
          const Icon = popup.icon;
          return (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                delay: popup.delay,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              style={{
                left: `${popup.x}vw`,
                top: `${popup.y}vh`,
                position: "absolute",
              }}
              className="pointer-events-auto bg-[#c0c0c0] border-[3px] border-t-white border-l-white border-b-gray-800 border-r-gray-800 shadow-[2px_2px_10px_rgba(0,0,0,0.5)] w-72 sm:w-80"
            >
              {/* Retro Win95 Style Title Bar */}
              <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between cursor-default">
                <span
                  className="text-sm font-bold tracking-wider"
                  style={{ fontFamily: "monospace" }}
                >
                  {popup.title}
                </span>
                <button className="bg-[#c0c0c0] text-black border border-t-white border-l-white border-b-black border-r-black w-5 h-5 flex items-center justify-center font-bold text-xs active:border-t-black active:border-l-black active:border-b-white active:border-r-white">
                  X
                </button>
              </div>

              {/* Content */}
              <div className="p-4 flex gap-4 items-start bg-[#c0c0c0] text-black">
                <Icon className={`w-10 h-10 flex-shrink-0 ${popup.color}`} />
                <p className="text-sm font-medium leading-tight font-sans">
                  {popup.message}
                </p>
              </div>

              {/* Action Button */}
              <div className="px-4 pb-4 flex justify-center bg-[#c0c0c0]">
                <button className="px-6 py-1 bg-[#c0c0c0] border-[2px] border-t-white border-l-white border-b-gray-800 border-r-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white text-black text-sm">
                  OK
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Random full screen static/flash near the end? Optional. Let's stick to popups for now. */}
    </div>
  );
}
