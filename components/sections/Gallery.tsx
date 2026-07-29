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
const SPANS = [
  "sm:col-span-3 sm:row-span-2",
  "sm:col-span-3",
  "sm:col-span-3 sm:row-span-2",
  "sm:col-span-3",
  "sm:col-span-3",
  "sm:col-span-3 sm:row-span-2",
  "sm:col-span-3 sm:row-span-2",
  "sm:col-span-3",
  "sm:col-span-3",
  "sm:col-span-3 sm:row-span-2",
  "sm:col-span-3",
  "sm:col-span-3",
];

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

        <div className="mt-16 grid auto-rows-[minmax(160px,22vw)] grid-cols-1 gap-4 sm:grid-cols-6 sm:gap-5 lg:grid-cols-12">
          {SHOTS.map((shot, i) => (
            <motion.button
              key={shot.src}
              type="button"
              onClick={() => setIndex(i)}
              data-cursor="View"
              className={`group relative row-span-1 overflow-hidden border-2 border-navy bg-paper-2 ${SPANS[i]} lg:col-span-3`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: (i % 4) * 0.06 }}
              aria-label={`Open image ${i + 1} of ${SHOTS.length}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-all duration-[1.3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(247,181,0,0.8), transparent 55%)",
                }}
              />
              <span className="absolute bottom-4 left-5 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-navy opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

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
