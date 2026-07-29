"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { challenge } from "@/lib/menu";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { RevealWords, Rise } from "@/components/ui/Reveal";

const FACTS = [
  { label: "Burger weight", value: challenge.weight },
  { label: "Record to beat", value: challenge.soloRecord },
  { label: "Buy-in", value: challenge.buyIn },
  { label: "Book by", value: "1 day ahead" },
];

export default function Challenge() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-yellow">
      <motion.div className="absolute inset-[-8%] graded" style={{ y }}>
        <Image
          src="/images/challenge.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-100"
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--color-yellow) 30%, rgba(247,181,0,0.72) 52%, transparent 78%)",
        }}
      />

      <div className="shell relative py-[var(--rhythm)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Rise>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.26em] text-navy">The Challenge · 04 / 07</span>
            </Rise>
            <h2 className="t-h1 mt-7 text-navy">
              <RevealWords text="The Empire State Burger Challenge" />
            </h2>
            <Rise delay={0.12} className="mt-8">
              <p className="t-lead max-w-[48ch]">
                Two and a quarter kilograms of burger, taken solo or in tandem. The solo
                record has stood since {challenge.recordDate}. Nobody has ever won the
                tandem.
              </p>
            </Rise>

            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden border-2 border-navy bg-navy sm:grid-cols-4">
              {FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  className="bg-navy p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.07 }}
                >
                  <dt className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-yellow">{fact.label}</dt>
                  <dd className="mt-2.5 font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold leading-none text-cream tabular-nums">
                    {fact.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 lg:pl-6">
            <Rise>
              <div className="border-2 border-navy bg-cream p-8 shadow-[8px_8px_0_var(--color-navy)] lg:p-10">
                <p className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ember">Standing record</p>
                <p className="mt-4 font-display text-[clamp(3rem,7vw,4.6rem)] font-bold leading-none text-navy tabular-nums">
                  {challenge.soloRecord}
                </p>
                <p className="mt-4 text-sm leading-[1.6] text-navy-2">
                  Set by {challenge.recordHolder} in {challenge.recordDate}.
                  <br />
                  {challenge.tandem}
                </p>

                <ul className="mt-9 space-y-4 border-t border-line pt-8">
                  {challenge.rules.map((rule) => (
                    <li key={rule} className="flex gap-4 text-[0.88rem] leading-[1.6] text-navy-2/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-ember" aria-hidden />
                      {rule}
                    </li>
                  ))}
                </ul>

                <p className="mt-9 border-t border-line pt-7 text-sm text-navy">
                  <span className="block font-mono text-[0.72rem] uppercase tracking-[0.12em] text-navy-3">Prize</span>
                  <span className="mt-2 block leading-[1.6]">{challenge.prize}</span>
                </p>
              </div>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
