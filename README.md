# Dev's American Cafe

A static marketing site for Dev's American Cafe — Golf Links Market, Sector 118, TDI City, Mohali.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, GSAP and Lenis. Every route is prerendered at build time. There is no backend, database, CMS or API route.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Deploying to Vercel

1. Push this folder to a Git repository.
2. Import it at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js automatically — no build settings to change.
3. Set one environment variable:

   | Key | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |

   This drives the canonical tag, `sitemap.xml`, `robots.txt` and Open Graph URLs. Without it the site falls back to `https://devsamericancafe.com`.

---

## The design

**Direction — "Diner Daylight."** Warm paper, mustard yellow, ember red and navy ink. The red, navy and steel blue are sampled from the cafe's own logo; the yellow is the griddle, the mustard and the light coming through the window. Sections alternate between cream and sand, with flat yellow and navy panels for the loudest moments (the ticker, the burger challenge, the footer).

Cards use a hard offset shadow that shifts to yellow on hover, and rules are 2px navy rather than hairlines — the whole thing should read as bold and appetising rather than delicate.

| Token | Value | Role |
| --- | --- | --- |
| `--color-cream` | `#fff9ec` | Page ground — warm paper |
| `--color-sand` | `#fbf1dd` | Alternating section ground |
| `--color-paper` / `--color-paper-2` | `#ffffff` / `#f5e9d3` | Cards and picture frames |
| `--color-yellow` / `--color-yellow-2` | `#f7b500` / `#ffd23f` | The loudest surface — panels, buttons, hovers |
| `--color-butter` | `#ffeeb8` | Soft yellow tint for hover states |
| `--color-ember` / `--color-ember-2` | `#b83f24` / `#e2703f` | Heat — eyebrows, solid CTAs |
| `--color-steel` | `#3d6a9e` | Cold accent, sampled from the logo |
| `--color-navy` … `--color-navy-3` | `#171c38` → `#5f6480` | Ink, in three weights |
| `--color-line` | `#e6d6b8` | Soft rules; structural borders use navy |

Yellow is never used for text on cream — the contrast is nowhere near enough. It is a **surface** colour. Text on yellow is always navy (9.18:1).

**Typography.** Bodoni Moda for display, Instrument Serif italic for the chef's voice, Inter Tight for body copy, JetBrains Mono for prices, labels and indices. Loaded via a stylesheet `<link>` with `preconnect`, so the build never depends on network access to Google Fonts.

**Cascade layers.** All custom classes live inside `@layer components` in `app/globals.css`. This matters: it means a Tailwind utility such as `text-[clamp(2.2rem,5vw,3.6rem)]` still overrides `.t-h1`. Move them out of the layer and the type scale breaks.

---

## Structure

```
app/
  layout.tsx          Fonts, metadata, Restaurant schema, site chrome
  page.tsx            The home page — every section in order
  menu/page.tsx       Full menu + the Inspiration board
  not-found.tsx       404
  globals.css         Design tokens and component layer
  robots.ts  sitemap.ts  manifest.ts
components/
  layout/             SmoothScroll, Preloader, Header, Footer, Cursor, Chrome, IntroProvider
  sections/           Hero, Ticker, About, SignatureMenu, MenuModal, Experience,
                      Challenge, Chef, Gallery, CelebrityWall, Instagram, Visit
  ui/                 Reveal, ParallaxImage, Magnetic, SectionHeading, BrandIcons
lib/
  site.ts             Address, hours, phone, social links, navigation
  menu.ts             Every dish, price, description and the challenge details
  motion.ts           Shared variants and easing curves
  lenis-store.ts      Scroll-lock helper used by modals
  hooks.ts            Media query helpers
tools/
  build-images.py     Regenerates /public/images from source photography
```

---

## Editing content

Almost everything is data, not markup.

- **Address, hours, phone, socials** → `lib/site.ts`
- **Menu items and prices** → `lib/menu.ts` (typed; `price` accepts a number or an array for tiered pricing)
- **Burger challenge** → the `challenge` object in `lib/menu.ts`
- **Inspiration board** → the `inspirations` array in `lib/menu.ts`

Hours drive three things at once: the printed tables in the footer and Visit section, the live "Open now / Closed right now" indicator, and the `openingHoursSpecification` in the structured data. Change them in one place.

### Things you must replace before launch

| What | Where | Current value |
| --- | --- | --- |
| Chef Priyam | `components/sections/Chef.tsx` | Listed by name only under "Also on the line". No biography was supplied and none was invented |
| Domain | Vercel env var | `NEXT_PUBLIC_SITE_URL` |

Phone (`+91 98131 12995`), the exact map pin (`30.7367806, 76.6824996`) and the Google place link are all set.

---

## Images

`public/images` holds 44 optimised assets — every file in both JPG and WebP, generated from the original photography. See `IMAGE-MAP.md` for exactly which source file became which asset.

To swap a photograph, drop a replacement at the same path. Aspect ratios are enforced by the layout, and everything uses `object-cover`, so any reasonable crop works.

To regenerate the whole set from new originals:

```bash
python3 tools/build-images.py     # edit SRC at the top of the file first
```

---

## Accessibility and motion

- `prefers-reduced-motion` is honoured throughout: Lenis, the custom cursor, the grain animation, the loading screen and every scroll reveal switch off, and all content renders immediately at full opacity.
- The custom cursor only activates on `pointer: fine` devices.
- Modals lock scroll, close on <kbd>Escape</kbd>, and carry `role="dialog"` with `aria-modal` and labels. The gallery supports arrow-key navigation.
- The hero's photo-clipped headline has a screen-reader-only text alternative, and falls back to solid bone type where `background-clip: text` is unsupported.
- Every text element on the home page was measured against its computed background. All pass WCAG AA; the palette table above ranges from 4.79:1 to 15.89:1.
- A skip link precedes the header.

## SEO

Restaurant schema (address, geo, hours, founder, menu URL, social profiles), Open Graph and Twitter cards with a 1200×630 image, canonical URLs, `robots.txt`, `sitemap.xml` and a web manifest.

---

## The opening

`components/layout/Preloader.tsx` runs a burger "slam": eight frames cut at 80–190ms with a per-frame scale, rotation and offset jolt, shutter bars snapping on alternate cuts, then the wordmark stamped in with an overshoot spring before a yellow curtain lifts the whole thing away. Total runtime is roughly 2.5–3 seconds.

Tuning knobs at the top of the file:

- `FRAMES` — which images play. They come from `slam-1.jpg` … `slam-8.jpg`.
- `CUTS` — the duration of each cut in ms. The last entry is the hold on the final frame.
- `JOLT` — per-frame scale, rotation and offset.

The eight frames total ~500KB. The first seven are deliberately rendered small (680×850, quality 68) because they are on screen for under a fifth of a second at motion-blurred scale; only the final frame, which holds, is full size. If you add frames, keep that split or the intro gets heavy.

The whole sequence is skipped entirely under `prefers-reduced-motion`.

## Verification

The build was checked with a headless Chromium pass at 390px, 768px and 1512px:

- no horizontal overflow at any breakpoint
- no broken images
- no tap target under 24px
- heading line breaks behave
- menu modal opens, locks scroll, closes on Escape and unlocks
- gallery lightbox advances on arrow keys
- reduced-motion path renders all content
