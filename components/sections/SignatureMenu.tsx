"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { menu, type MenuCategory } from "@/lib/menu";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuModal from "./MenuModal";

export default function SignatureMenu() {
  const [active, setActive] = useState<MenuCategory | null>(null);

  const imageHeights = [
  "h-[430px]",
  "h-[500px]",
  "h-[460px]",
  "h-[430px]",
  "h-[500px]",
  "h-[460px]",
];

  return (
    <section id="menu" className="band bg-sand lighting">
      <div className="shell">
        <SectionHeading
          eyebrow="The Menu"
          index="01 / 07"
          title="Six ways to leave here full."
          lead="Every recipe on this list was written in this kitchen. Pick a category — the whole card opens."
        />

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((category, i) => (
            <motion.li
              key={category.id}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: (i % 3) * 0.09 }}
            >
              <button
                type="button"
                onClick={() => setActive(category)}
                data-cursor="Open"
                className="card group block h-full w-full text-left"
                aria-haspopup="dialog"
              >
                <div className="relative h-[520px] overflow-hidden border-b-2 border-navy bg-black">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-navy opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </div>

                <div className="bg-paper px-7 py-8 transition-all duration-500 group-hover:bg-[#fffdf8]">
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ember">
                    {category.kicker}
                  </p>
                 <h3 className="mt-4 font-display text-[2.4rem] leading-none text-navy">{category.label}</h3>
                  <p className="mt-5 text-base leading-8 text-slate-700">
                    {category.blurb}
                  </p>
                  <span className="mt-8 flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-navy">
                    See the card
                    <span className="h-px w-6 bg-navy transition-all duration-500 group-hover:w-10" />
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <MenuModal category={active} onClose={() => setActive(null)} />
    </section>
  );
}
