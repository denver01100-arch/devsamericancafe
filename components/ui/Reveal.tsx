"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Start immediately instead of waiting for the viewport. */
  play?: boolean;
};

/** A single block sliding up from behind its own mask. */
export function RevealLine({
  children,
  as: Tag = "span",
  className = "",
  delay = 0,
  play,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Motion = motion.create(Tag as ElementType);

  if (reduced) return <Tag className={className}>{children}</Tag>;

  const animateProps =
    play === undefined
      ? { whileInView: { y: "0%" }, viewport: viewportOnce }
      : { animate: play ? { y: "0%" } : { y: "130%" } };

  return (
    <span className="mask-line">
      <Motion
        className={className}
        initial={{ y: "130%" }}
        transition={{ duration: 1.05, ease: easeOutExpo, delay }}
        {...animateProps}
      >
        {children}
      </Motion>
    </span>
  );
}

/** Splits a sentence into words and staggers them up. */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  const animateProps =
    play === undefined
      ? { whileInView: "show" as const, viewport: viewportOnce }
      : { animate: play ? ("show" as const) : ("hidden" as const) };

  return (
    <motion.span
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
      {...animateProps}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="mask-word">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "130%" },
              show: { y: "0%", transition: { duration: 0.95, ease: easeOutExpo } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Fades and lifts any block once it enters the viewport. */
export function Rise({
  children,
  className = "",
  delay = 0,
  distance = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
