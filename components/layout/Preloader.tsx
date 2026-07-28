"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { easeInOutQuint, easeOutExpo } from "@/lib/motion";
import { lockScroll } from "@/lib/lenis-store";
import { useIntro } from "./IntroProvider";

/** Eight burger frames, cut fast enough to feel like a griddle strobe. */
const FRAMES = Array.from({ length: 8 }, (_, i) => `/images/slam-${i + 1}.jpg`);

/** Cut timings, in ms. Fast at first, then slowing onto the final frame. */
const CUTS = [80, 75, 70, 80, 90, 110, 140, 400];

/** Each frame gets its own jolt so the sequence never feels like a slideshow. */
const JOLT = [
  { scale: 1.55, rotate: -3.5, x: -3, y: 2 },
  { scale: 1.32, rotate: 2.8, x: 4, y: -3 },
  { scale: 1.62, rotate: -1.8, x: -2, y: -4 },
  { scale: 1.28, rotate: 3.4, x: 3, y: 3 },
  { scale: 1.44, rotate: -2.4, x: -4, y: -2 },
  { scale: 1.22, rotate: 1.6, x: 2, y: 4 },
  { scale: 1.34, rotate: -1.1, x: -1, y: -1 },
  { scale: 1.06, rotate: 0, x: 0, y: 0 },
];

export default function Preloader() {
  const { ready, finish } = useIntro();
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [stamped, setStamped] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduced) {
      finish();
      return;
    }

    lockScroll(true);
    window.scrollTo(0, 0);

    let elapsed = 0;
    CUTS.forEach((duration, i) => {
      elapsed += duration;
      if (i < CUTS.length - 1) {
        timers.current.push(setTimeout(() => setFrame(i + 1), elapsed));
      }
    });

    // The wordmark lands while the last frame is still on screen.
    timers.current.push(setTimeout(() => setStamped(true), elapsed - 340));
    timers.current.push(setTimeout(finish, elapsed + 140));

    const captured = timers.current;
    return () => captured.forEach(clearTimeout);
  }, [reduced, finish]);

  useEffect(() => {
    if (ready) lockScroll(false);
  }, [ready]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[95] overflow-hidden bg-navy"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: easeInOutQuint }}
          aria-hidden
        >
          {/* The cuts */}
          <div className="absolute inset-0">
            {FRAMES.map((src, i) => (
              <motion.div
                key={src}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: frame === i ? 1 : 0,
                  scale: frame === i ? JOLT[i].scale : JOLT[i].scale * 1.05,
                  rotate: frame === i ? JOLT[i].rotate : JOLT[i].rotate * 1.4,
                  x: frame === i ? JOLT[i].x : JOLT[i].x * 2,
                  y: frame === i ? JOLT[i].y : JOLT[i].y * 2,
                }}
                transition={
                  i === FRAMES.length - 1
                    ? { duration: 0.85, ease: easeOutExpo }
                    : { duration: 0.06, ease: "linear" }
                }
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Warm wash so the wordmark always reads */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(23,28,56,0.34) 0%, rgba(23,28,56,0.1) 38%, rgba(23,28,56,0.55) 100%)",
            }}
          />

          {/* Shutter bars that snap shut on every cut */}
          <motion.div
            className="absolute inset-x-0 top-0 bg-yellow"
            animate={{ height: frame % 2 === 0 ? "0%" : "3.5%" }}
            transition={{ duration: 0.07, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-ember"
            animate={{ height: frame % 2 === 0 ? "3.5%" : "0%" }}
            transition={{ duration: 0.07, ease: "linear" }}
          />

          {/* The wordmark, stamped */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <motion.div
              className="text-center"
              initial={{ scale: 2.4, opacity: 0 }}
              animate={stamped ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.52, ease: [0.2, 1.4, 0.4, 1] }}
            >
              <span className="block font-display text-[clamp(3rem,15vw,11rem)] font-extrabold leading-[0.84] tracking-[-0.05em] text-cream drop-shadow-[0_6px_28px_rgba(23,28,56,0.6)]">
                DEV&rsquo;S
              </span>
              <span className="mt-3 block font-mono text-[clamp(0.6rem,2.1vw,1.05rem)] font-semibold uppercase tracking-[0.5em] text-yellow-2">
                American Cafe
              </span>
            </motion.div>
          </div>

          {/* Sizzle line */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-navy/25">
            <motion.div
              className="h-full origin-left bg-yellow"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (frame + 1) / FRAMES.length }}
              transition={{ duration: 0.12, ease: "linear" }}
            />
          </div>

          <div className="absolute bottom-7 left-[var(--shell)] right-[var(--shell)] flex items-end justify-between">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-cream/80">
              Firing the griddle
            </span>
            <span className="font-mono text-[clamp(1.1rem,3vw,1.9rem)] font-light leading-none text-cream tabular-nums">
              {String(Math.round(((frame + 1) / FRAMES.length) * 100)).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
