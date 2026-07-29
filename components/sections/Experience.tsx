"use client";

import { motion } from "framer-motion";
import {
  Flame,
  NotebookPen,
  Clock3,
  Users,
  CakeSlice,
  Heart,
} from "lucide-react";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ITEMS = [
  {
    icon: Flame,
    title: "Cooked in front of you",
    body: "No back of house, no pass-through window. Your burger is built an arm's length from where you're sitting.",
  },
  {
    icon: NotebookPen,
    title: "Original recipes",
    body: "The ranch, the cowboy candy, the spice blends. Written here, made here, and found on no other menu.",
  },
  {
    icon: Clock3,
    title: "Forty years on the line",
    body: "Beverly Hills to Hermosa Beach to Sector 118. Four decades of American kitchens land on one plate.",
  },
  {
    icon: Heart,
    title: "Named after guests",
    body: "Order the Smashterpiece or the Diva. Both are named for the regulars who dreamt them up first.",
  },
  {
    icon: Users,
    title: "Built for a full table",
    body: "The new room at Golf Link Market seats the whole group. Come loud, come hungry, stay late.",
  },
  {
    icon: CakeSlice,
    title: "Desserts made by hand",
    body: "An original cheesecake, artisanal cupcakes and a banana split that refuses to be rushed.",
  },
];

export default function Experience() {
  return (
    <section className="band bg-cream lighting">
      <div className="shell">
        <SectionHeading
          eyebrow="The Experience"
          index="03 / 07"
          title="What a table here actually gets you."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <ul className="mt-16 grid gap-px overflow-hidden border-2 border-navy bg-navy md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.title}
              className="group relative bg-cream p-9 transition-colors duration-700 hover:bg-butter lg:p-11"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: (i % 3) * 0.08 }}
            >
              <span className="absolute right-8 top-8 font-mono text-[0.6rem] tracking-[0.2em] text-slate/60">
                {String(i + 1).padStart(2, "0")}
              </span>

              <item.icon
                size={22}
                strokeWidth={1.2}
                className="text-ember transition-transform duration-700 group-hover:-translate-y-1"
                aria-hidden
              />
              <h3 className="t-h3 mt-7 text-navy">{item.title}</h3>
              <p className="mt-4 max-w-[38ch] text-[0.94rem] leading-[1.68] text-navy-2/85">
                {item.body}
              </p>

              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-ember transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
