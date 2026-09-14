"use client";

import { useEffect, useState } from "react";

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  active,
  duration = 1.6,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, duration]);

  return (
    <span>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
