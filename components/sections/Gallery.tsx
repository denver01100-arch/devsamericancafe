"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { lockScroll } from "@/lib/lenis-store";
import SectionHeading from "@/components/ui/SectionHeading";

const SHOTS = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/gallery-${i + 1}.jpg`,
  alt: `Dish and room detail at Dev's American Cafe, frame ${i + 1}`,
}));

/** Column spans keep the masonry from settling into a plain grid. */

export default function Gallery() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((delta: number) => {
    setIndex((current) =>
      current === null ? null : (current + delta + SHOTS.length) % SHOTS.length
    );
  }, []);

  useEffect(() => {
    lockScroll(index !== null);
    return () => lockScroll(false);
  }, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (index === null) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  return (
    <section id="gallery" className="band bg-cream lighting">
      <div className="shell-wide">
        <SectionHeading
          eyebrow="The Gallery"
          index="06 / 07"
          title="Everything that leaves the pass."
          lead="Shot in the room, on the boards we actually serve on."
        />


        <div className="gallery-scroll mt-16 overflow-x-auto scroll-smooth pb-6">
          <div className="flex w-max snap-x snap-mandatory gap-6 pr-8">
            {SHOTS.map((shot, i) => (
              <motion.button
                key={shot.src}
                type="button"
                onClick={() => setIndex(i)}
                data-cursor="View"
                className="group relative h-[520px] w-[360px] shrink-0 snap-center overflow-hidden rounded-3xl border-2 border-navy bg-paper-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.8,
                  ease: easeOutExpo,
                  delay: i * 0.05,
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="360px"
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute bottom-6 left-6 flex items-center gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div> {/* <-- closes shell-wide */}

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center bg-navy/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery viewer"
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full"
              onClick={close}
              aria-label="Close viewer"
              tabIndex={-1}
            />

            <motion.div
              key={index}
              className="relative mx-auto max-h-[78vh] w-[min(92vw,66rem)]"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={SHOTS[index].src}
                  alt={SHOTS[index].alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => step(-1)}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-cream/40 text-cream transition-colors duration-500 hover:bg-yellow hover:text-navy"
                aria-label="Previous image"
              >
                <ArrowLeft size={16} strokeWidth={1.4} />
              </button>
              <span className="font-mono text-[0.7rem] tracking-[0.22em] text-cream tabular-nums">
                {String(index + 1).padStart(2, "0")} / {SHOTS.length}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-cream/40 text-cream transition-colors duration-500 hover:bg-yellow hover:text-navy"
                aria-label="Next image"
              >
                <ArrowRight size={16} strokeWidth={1.4} />
              </button>
            </div>

            <button
              type="button"
              onClick={close}
              className="absolute right-[var(--shell)] top-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-cream/40 text-cream transition-colors duration-500 hover:bg-yellow hover:text-navy"
              aria-label="Close viewer"
            >
              <X size={17} strokeWidth={1.4} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
