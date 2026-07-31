"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { RevealWords, Rise } from "@/components/ui/Reveal";

const FRAMES = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/celeb-${i + 1}.jpg`,
  alt: `A photograph from Chef Dev's culinary journey, frame ${i + 1}`,
}));

/** Each frame hangs at a slightly different angle and height, like a real wall. */
const HANG = [
  { rotate: -1.6, offset: 0 },
  { rotate: 1.1, offset: 34 },
  { rotate: -0.7, offset: 12 },
  { rotate: 1.9, offset: 44 },
  { rotate: -1.2, offset: 6 },
  { rotate: 0.8, offset: 28 },
  { rotate: -0.5, offset: 15 },
  { rotate: 2.3, offset: 40 },
];

export default function CelebrityWall() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const update = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setProgress(max > 0 ? rail.scrollLeft / max : 0);
    };

    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft };
    rail.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    rail.scrollLeft = drag.current.startScroll - (event.clientX - drag.current.startX);
  };

  const endDrag = (event: React.PointerEvent) => {
    const rail = railRef.current;
    drag.current.active = false;
    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section id="wall" className="relative overflow-hidden bg-sand py-[var(--rhythm)]">
      {/* Wall wash — a picture light from above, ember spill from below */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(76% 40% at 50% -4%, rgba(255,210,63,0.5), transparent 62%), radial-gradient(64% 46% at 18% 106%, rgba(226,112,63,0.14), transparent 62%)",
        }}
      />

      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Rise>
              <span className="t-eyebrow">The Wall · 07 / 07</span>
            </Rise>
            <h2 className="t-h1 mt-7 text-navy">
              <RevealWords text="Forty years leaves you with photographs." />
            </h2>
            <Rise delay={0.12} className="mt-8">
              <p className="t-lead max-w-[48ch]">
                Comedians, cooks, players and regulars, collected across two countries and
                a lot of kitchens. They hang on the walls here, above the tables where you
                eat.
              </p>
            </Rise>
          </div>

          <Rise delay={0.2}>
            <p className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-slate">
              <MoveHorizontal size={15} strokeWidth={1.4} className="text-ember-2" />
              Drag to walk the wall
            </p>
          </Rise>
        </div>
      </div>

      <div
        ref={railRef}
        className="no-scrollbar drag-x relative mt-16 flex gap-8 overflow-x-auto overscroll-x-contain px-[var(--shell)] pb-6 pt-4 md:gap-12"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="group"
        aria-label="Photographs from Chef Dev's career — scroll horizontally"
        data-cursor="Drag"
      >
        {FRAMES.map((frame, i) => (
          <motion.figure
            key={frame.src}
            className="relative shrink-0"
            style={{ marginTop: HANG[i].offset }}
            initial={{ opacity: 0, y: 40, rotate: HANG[i].rotate * 2.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: reduced ? 0 : HANG[i].rotate }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: easeOutExpo, delay: (i % 4) * 0.08 }}
            whileHover={reduced ? {} : { rotate: 0, y: -10, scale: 1.02 }}
          >
            {/* Picture light */}
            <span
              className="pointer-events-none absolute -inset-10 -z-10 opacity-0 blur-2xl transition-opacity duration-700"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,210,63,0.55), transparent)",
              }}
            />

            {/* Frame */}
            <div
              className="relative w-[64vw] max-w-[24rem] border-[10px] border-paper bg-paper p-2 outline outline-2 outline-navy sm:w-[34vw] md:w-[26vw]"
              style={{ boxShadow: "0 26px 44px -24px rgba(23,28,56,0.45)" }}
            >
              <div className="relative aspect-4/5 overflow-hidden bg-paper-2">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 64vw, 26vw"
                  className="select-none object-cover"
                />
                {/* Glass sheen */}
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(122deg, rgba(255,255,255,0.42) 0%, transparent 32%, transparent 70%, rgba(110,154,200,0.16) 100%)",
                  }}
                />
              </div>
            </div>

            <figcaption className="mt-5 flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-slate">
              <span className="h-px w-6 bg-line" />
              Frame {String(i + 1).padStart(2, "0")}
            </figcaption>
          </motion.figure>
        ))}

        <div className="w-[var(--shell)] shrink-0" aria-hidden />
      </div>

      <div className="shell relative mt-6">
        <div className="h-[3px] w-full bg-line">
          <div
            className="h-full origin-left bg-navy transition-transform duration-200"
            style={{ transform: `scaleX(${Math.max(progress, 0.06)})` }}
          />
        </div>
      </div>
    </section>
  );
}
