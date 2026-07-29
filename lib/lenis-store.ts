import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

/** Freeze the page behind an overlay without losing scroll position. */
export function lockScroll(locked: boolean) {
  if (typeof document === "undefined") return;
  document.body.dataset.locked = locked ? "true" : "false";
  const lenis = getLenis();
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
