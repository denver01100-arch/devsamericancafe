"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import { openingSummary, site } from "@/lib/site";
import { easeOutExpo } from "@/lib/motion";
import { useIntro } from "@/components/layout/IntroProvider";
import { MagneticLink } from "@/components/ui/Magnetic";

const START = 0.12;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { ready } = useIntro();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-16%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "24%"]);
  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "34%"]);

  const play = ready || Boolean(reduced);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-cream pb-16 pt-[calc(var(--nav-h)+2.5rem)] lg:pb-24"
    >
      {/* Sunlight */}
      <motion.div
        className="sunburst pointer-events-none absolute left-1/2 top-[18%] -z-0 h-[78vmin] w-[78vmin] -translate-x-1/2 rounded-full opacity-70 blur-[2px] lg:left-[64%] lg:h-[68vmin] lg:w-[68vmin]"
        style={{ y: sunY }}
      />

      <div className="shell-wide relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Type */}
          <motion.div className="lg:col-span-6 lg:pt-6" style={{ y: typeY }}>
            <Line play={play} delay={START}>
              <span className="t-eyebrow">Golf Link Market · Mohali</span>
            </Line>

            <h1 className="mt-7">
              <span className="sr-only">
                Dev&rsquo;s American Cafe — {site.tagline}
              </span>
              <span aria-hidden className="block">
                <Line play={play} delay={START + 0.08}>
                  <span className="t-mega block text-navy">DEV&rsquo;S</span>
                </Line>
                <Line play={play} delay={START + 0.18}>
                  <span className="t-mega block text-ember">AMERICAN</span>
                </Line>
                <span className="flex flex-wrap items-end gap-x-6">
                  <Line play={play} delay={START + 0.28}>
                    <span className="t-mega block text-navy">CAFE</span>
                  </Line>
                  <Line play={play} delay={START + 0.4}>
                    <span className="t-accent block pb-[0.55em] text-[clamp(1rem,1.8vw,1.45rem)] text-steel">
                      no back of house
                    </span>
                  </Line>
                </span>
              </span>
            </h1>

            <motion.p
              className="t-lead mt-9 max-w-[44ch]"
              initial={{ opacity: 0, y: 22 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: START + 0.5 }}
            >
              Forty years of American kitchens, on one counter in Mohali. Chef Dev
              cooks in front of you — original recipes, hand-ground patties and a
              helping of cowboy candy under nearly everything.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 22 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: START + 0.6 }}
            >
              <MagneticLink href="/#menu" className="btn btn-solid">
                Explore the menu
              </MagneticLink>
              <MagneticLink href="/#story" className="btn">
                Discover our story
              </MagneticLink>
            </motion.div>

            <motion.dl
              className="mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t-2 border-navy pt-7"
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: START + 0.7 }}
            >
              <div>
                <dt className="t-meta">Open</dt>
                <dd className="mt-1.5 font-mono text-[0.8rem] font-medium tracking-[0.06em] text-navy">
                  {openingSummary}
                </dd>
              </div>
              <div>
                <dt className="t-meta">Call</dt>
                <dd className="mt-1.5">
                  <a
                    href={site.phoneHref}
                    className="underline-slide inline-block py-1.5 font-mono text-[0.8rem] font-medium tracking-[0.06em] text-navy"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </motion.dl>
          </motion.div>

          {/* The burger */}
          <motion.div
            <motion.div
              className="relative lg:col-span-5 lg:ml-10"
              style={{ y: plateY }}
              initial={{ opacity: 0, scale: 0.86, y: 60 }}
              animate={play ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.3, ease: easeOutExpo, delay: START + 0.2 }}
              >
            <div className="relative mx-auto aspect-4/5 w-full max-w-[34rem] overflow-hidden rounded-t-full border-2 border-navy bg-paper-2 graded">
              <Image
                src="/images/hero.jpg"
                alt="A stacked burger being carried to the table at Dev's American Cafe"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </div>

            {/* Chips that orbit the plate */}
            <Chip
              play={play}
              delay={START + 0.85}
              className="left-0 top-[16%] panel-yellow"
              icon
            >
              Cooked in front of you
            </Chip>
            <Chip
              play={play}
              delay={START + 0.95}
              className="-right-1 top-[46%] panel-navy"
            >
              Since 2016
            </Chip>
            <Chip
              play={play}
              delay={START + 1.05}
              className="bottom-[8%] left-[6%] bg-paper text-navy"
            >
              Cowboy candy on everything
            </Chip>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#story"
          className="group mt-12 flex w-fit items-center gap-4"
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: START + 1.15 }}
        >
          <motion.span
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy text-navy transition-colors duration-500 group-hover:bg-yellow"
            animate={reduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={15} strokeWidth={1.8} />
          </motion.span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-navy-3">
            Scroll to meet Dev
          </span>
        </motion.a>
      </div>
    </section>
  );
}

function Chip({
  children,
  className,
  play,
  delay,
  icon = false,
}: {
  children: React.ReactNode;
  className: string;
  play: boolean;
  delay: number;
  icon?: boolean;
}) {
  return (
    <motion.span
      className={`absolute z-10 flex items-center gap-2 rounded-full border-2 border-navy px-4 py-2.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.14em] shadow-[4px_4px_0_rgba(23,28,56,0.16)] ${className}`}
      initial={{ opacity: 0, scale: 0.7, y: 14 }}
      animate={play ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.2, 1.3, 0.4, 1], delay }}
    >
      {icon && <Star size={11} strokeWidth={2.2} />}
      {children}
    </motion.span>
  );
}

function Line({
  children,
  play,
  delay,
}: {
  children: React.ReactNode;
  play: boolean;
  delay: number;
}) {
  return (
    <span className="mask-line">
      <motion.span
        className="block"
        initial={{ y: "130%" }}
        animate={play ? { y: "0%" } : {}}
        transition={{ duration: 1.15, ease: easeOutExpo, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
