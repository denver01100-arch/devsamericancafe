#!/usr/bin/env python3
"""Prepare optimised web imagery for Dev's American Cafe."""
import os
from PIL import Image, ImageOps

SRC = "./source-photography"   # folder holding the original photographs
OUT = "./public/images"
os.makedirs(OUT, exist_ok=True)
Image.MAX_IMAGE_PIXELS = None


def load(name):
    return ImageOps.exif_transpose(Image.open(os.path.join(SRC, name))).convert("RGB")


def save(im, name, quality=82, webp=True):
    path = os.path.join(OUT, name)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    if webp:
        im.save(os.path.splitext(path)[0] + ".webp", "WEBP", quality=quality - 4, method=6)
    print(f"  {name:26s} {im.size[0]}x{im.size[1]}  {os.path.getsize(path)//1024} KB")


def fit(im, w, h, center=(0.5, 0.45)):
    return ImageOps.fit(im, (w, h), Image.LANCZOS, centering=center)


def out(src, dst, w, h, q=82, center=(0.5, 0.45)):
    save(fit(load(src), w, h, center), dst, q)


print("Hero — bright backgrounds, chosen to suit a light theme")
out("food17.jpg", "hero.jpg", 1700, 2125)
out("food14.jpg", "hero-2.jpg", 1500, 1875)
out("food22.jpg", "hero-wide.jpg", 2400, 1200)

print("\nOpening sequence — rapid burger cuts")
SLAM = ["food 5.jpg", "food24.jpg", "food23.jpg", "food6.jpg",
        "food9.jpg", "food10.jpg", "food14.jpg", "food17.jpg"]
for i, src in enumerate(SLAM, start=1):
    out(src, f"slam-{i}.jpg", 1100, 1375, q=78)

print("\nChef — the 'about pic' files are portraits of Dev")
out("about pic.jpg", "chef.jpg", 1300, 1625)
out("about pic 3.jpg", "chef-2.jpg", 1100, 1375)
out("about pic 2.jpg", "about.jpg", 1300, 1625)

print("\nMenu categories — corrected so each photo matches its section")
CATEGORIES = [
    ("food14.jpg", "food-1.jpg"),
    ("food26.jpg", "food-2.jpg"),
    ("food1.jpg",  "food-3.jpg"),
    ("food15.jpg", "food-4.jpg"),
    ("food13.jpg", "food-5.jpg"),
    ("food27.jpg", "food-6.jpg"),
]
for src, dst in CATEGORIES:
    out(src, dst, 1200, 1500)

print("\nGallery")
GALLERY = ["food 2.jpg", "food 4.jpg", "food 5.jpg", "food7.jpg", "food8.jpg",
           "food9.jpg", "food11.jpg", "food 12.jpg", "food16.jpg", "food18.jpg",
           "food20.jpg", "food23.jpg", "food24.jpg", "food25.jpg"]
for i, src in enumerate(GALLERY, start=1):
    im = load(src)
    w, h = im.size
    save(fit(im, 1400, 1000) if w > h else fit(im, 1100, 1400), f"gallery-{i}.jpg")

print("\nCelebrity wall")
for i in range(1, 7):
    out(f"cleb pic{i}.jpeg", f"celeb-{i}.jpg", 1000, 1250, center=(0.5, 0.35))

print("\nInstagram grid")
for i, src in enumerate(["food21.jpg", "food 3.jpg", "food25.jpg",
                         "food10.jpg", "food18.jpg", "food7.jpg"], start=1):
    out(src, f"instagram-{i}.jpg", 900, 900)

print("\nFeature bands")
out("food19.jpg", "challenge.jpg", 1500, 1875)
out("food16.jpg", "visit.jpg", 1400, 1050)

print("\nOpen Graph")
save(fit(load("food17.jpg"), 1200, 630, center=(0.5, 0.4)), "og.jpg", 86, webp=False)

print("\nLogo and icons")
logo = Image.open(os.path.join(SRC, "logo.png")).convert("RGBA")
logo.thumbnail((900, 900), Image.LANCZOS)
logo.save(os.path.join(OUT, "logo.png"), optimize=True)
for size, fname in [(32, "icon.png"), (180, "apple-icon.png"), (512, "icon-512.png")]:
    canvas = Image.new("RGBA", (size, size), (255, 249, 236, 255))
    mark = logo.copy()
    mark.thumbnail((int(size * 0.8), int(size * 0.8)), Image.LANCZOS)
    canvas.paste(mark, ((size - mark.size[0]) // 2, (size - mark.size[1]) // 2), mark)
    canvas.convert("RGB").save(os.path.join(OUT, "..", fname))

total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f"\nTotal: {total/1024/1024:.1f} MB")
