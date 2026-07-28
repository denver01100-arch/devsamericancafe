"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InstagramGlyph } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { MagneticLink } from "@/components/ui/Magnetic";
import { RevealWords, Rise } from "@/components/ui/Reveal";

const POSTS = Array.from({ length: 6 }, (_, i) => `/images/instagram-${i + 1}.jpg`);

export default function Instagram() {
  return (
    <section className="band bg-cream lighting">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Rise>
              <span className="t-eyebrow">Follow along</span>
            </Rise>
            <h2 className="t-h2 mt-6 text-navy">
              <RevealWords text={site.instagramHandle} />
            </h2>
          </div>
          <Rise delay={0.1}>
            <MagneticLink href={site.instagram} external className="btn" cursor="Open">
              <InstagramGlyph size={14} />
              Open Instagram
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </MagneticLink>
          </Rise>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {POSTS.map((src, i) => (
            <motion.li
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: (i % 6) * 0.05 }}
            >
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="group relative block aspect-square overflow-hidden bg-paper"
                aria-label={`Dev's American Cafe on Instagram — post ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-cream/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                  <InstagramGlyph size={20} className="text-navy" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
