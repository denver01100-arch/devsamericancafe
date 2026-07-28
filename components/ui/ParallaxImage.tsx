"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** How far the photograph drifts inside its frame, in percent. */
  parallax?: number;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
  grade?: boolean;
  cursor?: string;
};

export default function ParallaxImage({
  src,
  alt,
  className = "",
  parallax = 10,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = false,
  grade = true,
  cursor,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : [`-${parallax}%`, `${parallax}%`]
  );

  return (
    <motion.div
      ref={ref}
      data-cursor={cursor}
      className={`relative overflow-hidden ${rounded ? "rounded-sm" : ""} ${
        grade ? "graded" : ""
      } ${className}`}
      initial={reduced ? undefined : { clipPath: "inset(0% 0% 100% 0%)" }}
      whileInView={reduced ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={viewportOnce}
      transition={{ duration: 1.4, ease: easeOutExpo }}
    >
      <motion.div className="absolute inset-[-12%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
