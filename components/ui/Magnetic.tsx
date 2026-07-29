"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type Common = {
  children: ReactNode;
  className?: string;
  /** Pull strength in pixels. */
  strength?: number;
};

function useMagnet(strength: number) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.5 });

  const onMove = (event: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength * 2);
    y.set((dy / rect.height) * strength * 2);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, sx, sy, onMove, onLeave };
}

export function MagneticLink({
  children,
  className = "",
  strength = 14,
  href,
  external = false,
  cursor,
}: Common & { href: string; external?: boolean; cursor?: string }) {
  const { ref, sx, sy, onMove, onLeave } = useMagnet(strength);
  const MotionLink = motion.create(Link);

  const shared = {
    ref: ref as React.Ref<HTMLAnchorElement>,
    className,
    style: { x: sx, y: sy },
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    "data-cursor": cursor,
  };

  if (external) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} {...shared}>
      {children}
    </MotionLink>
  );
}

export function MagneticButton({
  children,
  className = "",
  strength = 14,
  onClick,
  label,
  cursor,
}: Common & { onClick?: () => void; label?: string; cursor?: string }) {
  const { ref, sx, sy, onMove, onLeave } = useMagnet(strength);

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={label}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      data-cursor={cursor}
    >
      {children}
    </motion.button>
  );
}
