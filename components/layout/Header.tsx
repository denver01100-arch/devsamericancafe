"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, openingSummary, site } from "@/lib/site";
import { easeInOutQuint, easeOutExpo } from "@/lib/motion";
import { lockScroll } from "@/lib/lenis-store";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 40);
  });

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[65]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: easeOutExpo, delay: 2.5 }}
      >
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            scrolled
              ? "border-b-2 border-navy bg-cream/92 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        />

        <div className="shell-wide relative flex h-[var(--nav-h)] items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="hidden font-display text-sm font-semibold uppercase tracking-[0.3em] text-navy sm:block">
              Dev&rsquo;s
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="underline-slide py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-navy-2 transition-colors duration-500 hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/menu"
              className="hidden font-mono text-[0.68rem] uppercase tracking-[0.2em] text-navy md:block"
            >
              <span className="btn px-6 py-3">Full Menu</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors duration-500 hover:bg-yellow lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={17} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] bg-yellow"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.85, ease: easeInOutQuint }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="shell flex h-[var(--nav-h)] items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy text-navy"
                aria-label="Close menu"
              >
                <X size={17} strokeWidth={1.4} />
              </button>
            </div>

            <div className="shell flex h-[calc(100dvh-var(--nav-h))] flex-col justify-between pb-12">
              <nav className="flex flex-col gap-1 pt-6" aria-label="Mobile">
                {[...nav, { label: "Full Menu", href: "/menu" }].map((item, i) => (
                  <span key={item.href} className="mask-line">
                    <motion.span
                      className="block"
                      initial={{ y: "130%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.9,
                        ease: easeOutExpo,
                        delay: 0.25 + i * 0.055,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 font-display text-[clamp(2.1rem,10vw,3.4rem)] font-semibold leading-[1.05] tracking-tight text-navy"
                      >
                        {item.label}
                      </Link>
                    </motion.span>
                  </span>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="space-y-3"
              >
                <p className="t-meta">{openingSummary}</p>
                <p className="t-meta text-navy-2">Golf Link Market, Sector 118, Mohali</p>
                <div className="flex gap-6 pt-3">
                  <a
                    className="t-meta text-navy underline-slide"
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    className="t-meta text-navy underline-slide"
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
