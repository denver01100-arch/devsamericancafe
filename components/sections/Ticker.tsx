"use client";

import { motion, useReducedMotion } from "framer-motion";

const PHRASES = [
  "Cooked in front of you",
  "Original recipes since 1983",
  "Cowboy candy on everything",
  "If it isn't messy, it isn't American",
  "Hand-ground patties",
  "One chef, one counter",
];

export default function Ticker() {
  const reduced = useReducedMotion();
  const row = [...PHRASES, ...PHRASES];

  return (
    <div className="relative overflow-hidden border-y-2 border-navy bg-navy py-5">
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--color-navy) 0%, transparent 10%, transparent 90%, var(--color-navy) 100%)",
        }}
      />
      <motion.div
        className="flex w-max items-center gap-12 whitespace-nowrap"
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        {row.map((phrase, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-[clamp(1rem,2vw,1.5rem)] font-medium tracking-tight text-cream">
              {phrase}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-yellow" />
          </span>
        ))}
      </motion.div>
      <span className="sr-only">
        Cooked in front of you. Original recipes. One chef, one counter.
      </span>
    </div>
  );
}
