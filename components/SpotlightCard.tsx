"use client";

import { useRef } from "react";

/**
 * Card whose border picks up a soft glow that follows the pointer.
 * Replaces the uniform `hover:scale-105` that every card used to share —
 * the surface reacts to where you actually are instead of just inflating.
 */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`group relative overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift ${className}`}
    >
      {/* Pointer glow. Transparent until hover, so it costs nothing at rest. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), hsl(var(--primary) / 0.14), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
