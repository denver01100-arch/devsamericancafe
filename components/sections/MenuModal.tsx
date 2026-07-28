"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Leaf, Star } from "lucide-react";
import { formatPrice, type MenuCategory } from "@/lib/menu";
import { easeInOutQuint, easeOutExpo } from "@/lib/motion";
import { lockScroll } from "@/lib/lenis-store";

export default function MenuModal({
  category,
  onClose,
}: {
  category: MenuCategory | null;
  onClose: () => void;
}) {
  useEffect(() => {
    lockScroll(Boolean(category));
    return () => lockScroll(false);
  }, [category]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {category && (
        <div className="fixed inset-0 z-[85]">
          <motion.button
            type="button"
            className="absolute inset-0 h-full w-full bg-navy/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            aria-label="Close menu"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${category.title} menu`}
            className="absolute inset-x-0 bottom-0 top-[6vh] flex flex-col overflow-hidden border-t-2 border-navy bg-cream md:inset-x-[4vw] md:top-[8vh] md:border-2"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: easeInOutQuint }}
          >
            {/* ── Ticket header (fixed, never scrolls) ── */}
            <div className="shrink-0 flex items-start justify-between gap-6 border-b-2 border-navy bg-yellow px-[max(1.25rem,4vw)] py-5 md:px-12">
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-navy-2">
                  {category.kicker}
                </p>
                <h2 className="t-h2 mt-2 text-navy">{category.title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-cream text-navy transition-colors duration-500 hover:bg-navy hover:text-cream"
                aria-label="Close"
              >
                <X size={17} strokeWidth={1.4} />
              </button>
            </div>

            {/* ── Body (fills remaining height, desktop splits into 2 cols) ── */}
            <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-12">

              {/* Photo panel — desktop only */}
              <div className="relative hidden lg:col-span-5 lg:block">
                <motion.div
                  className="absolute inset-0 graded"
                  initial={{ scale: 1.14, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.3, ease: easeOutExpo, delay: 0.18 }}
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(23,28,56,0.88) 6%, rgba(23,28,56,0.18) 52%, transparent 100%)",
                  }}
                />
                <p className="absolute bottom-10 left-12 right-16 t-accent text-[1.2rem] leading-[1.45] text-cream">
                  {category.blurb}
                </p>
              </div>

              {/* ── Scrollable items column ── */}
              {/*
                  Key fixes for mobile:
                  • min-h-0 lets the flexbox child shrink below its content height
                  • overflow-y-scroll (not auto) forces the scrollbar track on iOS
                  • overscroll-contain stops the scroll event escaping to the page
                  • -webkit-overflow-scrolling:touch re-enables momentum on older iOS
              */}
              <div
                className="min-h-0 flex-1 overflow-y-scroll overscroll-contain px-[max(1.25rem,4vw)] py-8 lg:col-span-7 lg:px-12"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {/* Blurb — mobile only (desktop shows it over the photo) */}
                <p className="t-body mb-8 max-w-[46ch] lg:hidden">{category.blurb}</p>

                {category.groups.map((group, gi) => (
                  <section key={group.title} className={gi > 0 ? "mt-12" : ""}>
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-ember">
                        {group.title}
                      </h3>
                      <span className="h-px flex-1 bg-line" />
                    </div>

                    {group.note && (
                      <p className="mt-3 text-sm italic text-slate">{group.note}</p>
                    )}

                    <ul className="mt-5">
                      {group.items.map((item, i) => (
                        <motion.li
                          key={item.name}
                          className="border-b border-line/60 py-4 last:border-0"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.55,
                            ease: easeOutExpo,
                            delay: 0.25 + gi * 0.05 + i * 0.03,
                          }}
                        >
                          <div className="flex items-baseline gap-3">
                            <h4 className="t-h3 flex flex-1 flex-wrap items-center gap-2 text-navy">
                              {item.name}
                              {item.veg && (
                                <Leaf
                                  size={13}
                                  strokeWidth={1.6}
                                  className="text-steel"
                                  aria-label="Vegetarian"
                                />
                              )}
                              {item.signature && (
                                <Star
                                  size={12}
                                  strokeWidth={1.6}
                                  className="text-ember"
                                  aria-label="Signature dish"
                                />
                              )}
                            </h4>
                            <span
                              className="hidden h-px flex-1 self-end sm:block"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(90deg, var(--color-line) 0 4px, transparent 4px 9px)",
                              }}
                              aria-hidden
                            />
                            <span className="ml-auto whitespace-nowrap font-mono text-sm font-semibold text-navy tabular-nums">
                              {formatPrice(item.price)}
                            </span>
                          </div>

                          {(item.description || item.priceNote) && (
                            <p className="mt-1.5 text-[0.88rem] leading-[1.6] text-navy-2">
                              {item.description}
                              {item.priceNote && (
                                <span className="ml-1 text-slate">({item.priceNote})</span>
                              )}
                            </p>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </section>
                ))}

                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-line pt-7">
                  <p className="t-meta">Prices subject to change without prior notice</p>
                  <Link href="/menu" className="btn" onClick={onClose}>
                    See the full menu
                  </Link>
                </div>

                {/* Bottom breathing room so the last item clears the safe area on phones */}
                <div className="h-[env(safe-area-inset-bottom,1.5rem)]" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
