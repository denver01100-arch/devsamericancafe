# Image map

Which original photograph became which asset. Every entry exists as both `.jpg` and `.webp`.

Regenerate the whole set with `python3 tools/build-images.py` after pointing `SRC` at your folder of originals.

## Hero and atmosphere

| Asset | Source | Size | Used by |
| --- | --- | --- | --- |
| `hero.jpg` | `food22.jpg` | 2400×1350 | Hero plate, Open Graph |
| `hero-alt.jpg` | `food16.jpg` | 2000×1125 | The photography poured into the word "AMERICAN" |
| `band-1.jpg` | `food24.jpg` | 2000×900 | Spare full-bleed band |
| `band-2.jpg` | `food6.jpg` | 2000×900 | Spare full-bleed band |
| `challenge.jpg` | `food14.jpg` | 1800×1200 | Empire State Burger Challenge |
| `og.jpg` | `food22.jpg` | 1200×630 | Social sharing card |

## Story and chef

| Asset | Source | Size | Used by |
| --- | --- | --- | --- |
| `about.jpg` | `about pic.jpg` | 1200×1500 | Story section, large frame |
| `about-2.jpg` | `about pic 2.jpg` | 1000×1250 | Story section, small frame |
| `about-3.jpg` | `about pic 3.jpg` | 1000×1250 | Visit section |
| `chef.jpg` | `cleb pic1.jpeg` | 1100×1400 | **Replace this.** See note below |

> The three `about pic` files are portraits of Chef Dev — `about pic.jpg` (arms crossed), `about pic 2.jpg` (at the counter) and `about pic 3.jpg` (with the knife). They are used for `chef.jpg`, `about.jpg` and `chef-2.jpg` respectively.

## Menu categories

Each card and the matching modal use one image. Order follows `lib/menu.ts`.

| Asset | Source | Category |
| --- | --- | --- |
| `food-1.jpg` | `food1.jpg` | Burgers |
| `food-2.jpg` | `food 3.jpg` | Sandwiches & Dogs |
| `food-3.jpg` | `food10.jpg` | Finger Foods |
| `food-4.jpg` | `food20.jpg` | On The Green Side |
| `food-5.jpg` | `food13.jpg` | The Watering Hole |
| `food-6.jpg` | `food19.jpg` | Guilty Pleasures |

> These were corrected after a second pass. The first version had wings on the Burgers card, a burger on Finger Foods and the chef on Guilty Pleasures. Each photo now matches its section: the burger tower, sauce pouring over a sandwich, buffalo wings, the veg board, iced coffee and the ice cream sandwich.

## Gallery

Twelve frames, landscape sources cropped to 1400×1000 and portrait sources to 1100×1400.

| Asset | Source |
| --- | --- |
| `gallery-1.jpg` | `food 2.jpg` |
| `gallery-2.jpg` | `food 4.jpg` |
| `gallery-3.jpg` | `food 5.jpg` |
| `gallery-4.jpg` | `food7.jpg` |
| `gallery-5.jpg` | `food8.jpg` |
| `gallery-6.jpg` | `food9.jpg` |
| `gallery-7.jpg` | `food11.jpg` |
| `gallery-8.jpg` | `food 12.jpg` |
| `gallery-9.jpg` | `food14.jpg` |
| `gallery-10.jpg` | `food15.jpg` |
| `gallery-11.jpg` | `food17.jpg` |
| `gallery-12.jpg` | `food18.jpg` |

## Celebrity wall

| Asset | Source |
| --- | --- |
| `celeb-1.jpg` … `celeb-6.jpg` | `cleb pic1.jpeg` … `cleb pic6.jpeg` |

Captions read "Frame 01", "Frame 02" and so on. No names are printed, because I couldn't identify the people with confidence. If you want names on the wall, add a `caption` field to the `FRAMES` array in `components/sections/CelebrityWall.tsx`.

## Instagram grid

Six squares at 900×900.

| Asset | Source |
| --- | --- |
| `instagram-1.jpg` | `food21.jpg` |
| `instagram-2.jpg` | `food23.jpg` |
| `instagram-3.jpg` | `food25.jpg` |
| `instagram-4.jpg` | `food26.jpg` |
| `instagram-5.jpg` | `food27.jpg` |
| `instagram-6.jpg` | `food 5.jpg` |

These are static images that link out to the profile — there's no Instagram API call, so they never break or rate-limit. Swap them whenever the feed changes.

## Brand marks

| Asset | Source | Notes |
| --- | --- | --- |
| `logo.png` | `logo.png` | Resized to 900px tall, transparency preserved |
| `../icon.png` | `logo.png` | 32×32 favicon on the brand midnight ground |
| `../apple-icon.png` | `logo.png` | 180×180 |
| `../icon-512.png` | `logo.png` | 512×512 for the web manifest |
