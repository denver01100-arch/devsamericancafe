import type { Variants, Transition } from "framer-motion";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

export const slow: Transition = { duration: 1.1, ease: easeOutExpo };
export const medium: Transition = { duration: 0.8, ease: easeOutExpo };
export const quick: Transition = { duration: 0.5, ease: easeOutExpo };

/** A line of type sliding up from behind its own mask. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { ...slow, delay: 0.06 * i },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...medium, delay: 0.08 * i },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 1, ease: easeOutExpo, delay: 0.08 * i },
  }),
};

/** Photography arriving from behind a wipe. */
export const imageWipe: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.14 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.5, ease: easeOutExpo },
  },
};

export const stagger = (amount = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
});

export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;
