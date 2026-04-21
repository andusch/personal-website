"use client";

import { useState, useEffect } from "react";

export default function PingDisplay() {

    const [latency, setLatency] = useState<number | null>(null);

    useEffect(() => {
    const checkPing = async () => {
      const start = performance.now();
      try {
        // Fetching the edge route
        await fetch("/api/ping", { method: "GET", cache: "no-store" });
        const end = performance.now();
        setLatency(Math.round(end - start));
      } catch (e) {
        console.error("Ping failed", e);
      }
    };

    checkPing();
    // const interval = setInterval(checkPing, 30000);
    // return () => clearInterval(interval);
  }, []);

  if (latency === null) return null;

  // Determine status color
  const getStatusColor = () => {
    if (latency < 50) return "bg-green-500"; // Excellent
    if (latency < 150) return "bg-yellow-500"; // Average
    return "bg-red-500"; // High
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-[#2a2a2a]/50 border border-[#e5e5e5] dark:border-[#333] backdrop-blur-sm">
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${getStatusColor()}`} />
      <span className="text-[10px] font-mono uppercase tracking-tighter text-[#666] dark:text-[#999]">
        Edge Latency: <span className="text-[#1a1a1a] dark:text-[#fafafa]">{latency}ms</span>
      </span>
    </div>
  );

}