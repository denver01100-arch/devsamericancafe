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
            className="absolute inset-x-0 bottom-0 top-[6vh] overflow-hidden border-t-2 border-navy bg-cream md:inset-x-[4vw] md:top-[8vh] md:border-2"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: easeInOutQuint }}
          >
            <div className="flex h-full flex-col">
              {/* Ticket header */}
              <div className="relative flex items-start justify-between gap-6 border-b-2 border-navy bg-yellow px-[max(1.25rem,4vw)] py-6 md:px-12">
                <div>
                  <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-navy-2">{category.kicker}</p>
                  <h2 className="t-h2 mt-3 text-navy">{category.title}</h2>
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

              <div className="grid flex-1 overflow-hidden lg:grid-cols-12">
                {/* Plate */}
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

                {/* Items */}
                <div className="overflow-y-auto px-[max(1.25rem,4vw)] py-10 lg:col-span-7 lg:px-12">
                  <p className="t-body mb-10 max-w-[46ch] lg:hidden">{category.blurb}</p>

                  {category.groups.map((group, gi) => (
                    <section key={group.title} className={gi > 0 ? "mt-14" : ""}>
                      <div className="flex items-baseline gap-4">
                        <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-ember-2">
                          {group.title}
                        </h3>
                        <span className="h-px flex-1 bg-line" />
                      </div>
                      {group.note && (
                        <p className="mt-3 text-sm italic text-slate">{group.note}</p>
                      )}

                      <ul className="mt-6">
                        {group.items.map((item, i) => (
                          <motion.li
                            key={item.name}
                            className="border-b border-line/60 py-5 last:border-0"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.6,
                              ease: easeOutExpo,
                              delay: 0.3 + gi * 0.06 + i * 0.035,
                            }}
                          >
                            <div className="flex items-baseline gap-4">
                              <h4 className="t-h3 flex items-center gap-2.5 text-navy">
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
                                    className="text-ember-2"
                                    aria-label="Signature dish"
                                  />
                                )}
                              </h4>
                              <span
                                className="h-px flex-1 self-end"
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(90deg, var(--color-line) 0 4px, transparent 4px 9px)",
                                }}
                                aria-hidden
                              />
                              <span className="whitespace-nowrap font-mono text-sm text-navy tabular-nums">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                            {(item.description || item.priceNote) && (
                              <p className="mt-2 max-w-[62ch] text-[0.9rem] leading-[1.6] text-navy-2/85">
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

                  <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
                    <p className="t-meta">Prices subject to change without prior notice</p>
                    <Link href="/menu" className="btn" onClick={onClose}>
                      See the full menu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
