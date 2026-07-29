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
                <div className="relative aspect-square overflow-hidden border-b-2 border-navy">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                  />
                  <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy bg-yellow text-navy opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </span>
                </div>

                <div className="bg-paper p-6 transition-colors duration-500 group-hover:bg-butter">
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ember">
                    {category.kicker}
                  </p>
                  <h3 className="t-h3 mt-3 text-navy">{category.label}</h3>
                  <p className="mt-3 text-[0.88rem] leading-[1.6] text-navy-2">
                    {category.blurb}
                  </p>
                  <span className="mt-5 flex items-center gap-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy">
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
