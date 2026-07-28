"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

/**
 * A cursor that reports what the thing under it does.
 * Elements opt in with data-cursor="View" / "Drag" / "Open".
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 });

  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.body.dataset.cursor = "off";
      return;
    }
    document.body.dataset.cursor = "on";

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const labelled = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const interactive = target?.closest?.(
        "a, button, [role='button'], input, textarea, select"
      );

      setLabel(labelled?.dataset.cursor ?? null);
      setActive(Boolean(interactive || labelled));
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.body.dataset.cursor = "off";
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[97]"
      style={{ x: sx, y: sy }}
      aria-hidden
    >
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border backdrop-blur-[1px]"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{
          width: label ? 76 : active ? 44 : 22,
          height: label ? 76 : active ? 44 : 22,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? "rgba(194,69,42,0.95)" : "rgba(23,28,56,0.08)",
          borderColor: label ? "rgba(194,69,42,0)" : "rgba(23,28,56,0.55)",
        }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && (
          <span className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-cream">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
