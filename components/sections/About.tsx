"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { Rise } from "@/components/ui/Reveal";

const MILESTONES = [
  { year: "1983", note: "First kitchen — a dishwashing job in Beverly Hills" },
  { year: "1988", note: "Executive Chef, five years after picking up a scrubber" },
  { year: "2016", note: "Dev's American Cafe opens in Chandigarh" },
  { year: "2026", note: "A bigger room at Golf Links Market, Mohali" },
];

export default function About() {
  return (
    <section id="story" className="band lighting bg-cream">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Story"
              index="01 / 07"
              title="A kitchen with no back of house."
            />

            <div className="mt-12 space-y-6">
              <Rise>
                <p className="t-body">
                  Dev&rsquo;s began the way most good things do — with a man who
                  couldn&rsquo;t stay away from a griddle. Chef Devinder S. Mahal was
                  born in New Jersey in 1965 and started in 1983 washing dishes at his
                  uncle&rsquo;s restaurant in Beverly Hills. Five years later he was
                  running the kitchen.
                </p>
              </Rise>
              <Rise delay={0.08}>
                <p className="t-body">
                  Delicatessens, seafood houses, fine dining rooms, a comedy club on
                  Hermosa Beach — four decades of American kitchens, two countries, and
                  the same pair of hands now working the pass in Sector 118.
                </p>
              </Rise>
              <Rise delay={0.16}>
                <p className="t-body">
                  There is no back of house here. Dev cooks in front of you, plates in
                  front of you, and talks to you while he does it. The ranch, the cowboy
                  candy, the seasoning blends — written in this kitchen, made in this
                  kitchen, bought in from nowhere. Sit close. Expect to be fed the way a
                  friend feeds you.
                </p>
              </Rise>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <ParallaxImage
                src="/images/about.jpg"
                alt="Chef Devinder S. Mahal behind the counter at Dev's American Cafe"
                className="col-span-8 aspect-4/5"
                sizes="(max-width: 1024px) 66vw, 33vw"
                parallax={8}
                cursor="Dev"
              />
              <div className="col-span-4 flex flex-col justify-end gap-4 md:gap-6">
                <ParallaxImage
                  src="/images/chef-2.jpg"
                  alt="Chef Devinder S. Mahal at Devs American Cafe"
                  className="aspect-3/4"
                  sizes="(max-width: 1024px) 33vw, 18vw"
                  parallax={14}
                />
                <Rise delay={0.2}>
                  <blockquote className="t-accent text-[clamp(1.05rem,1.5vw,1.4rem)] leading-[1.4] text-navy">
                    &ldquo;I want you to feel like you walked into a friend&rsquo;s house
                    and he happened to be cooking.&rdquo;
                  </blockquote>
                </Rise>
              </div>
            </div>

            <ol className="mt-14 grid gap-px overflow-hidden border-2 border-navy bg-navy sm:grid-cols-2 lg:grid-cols-4">
              {MILESTONES.map((item, i) => (
                <li key={item.year} className="bg-cream">
                  <Rise delay={i * 0.07} className="h-full p-6">
                    <p className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-ember">
                      {item.year}
                    </p>
                    <p className="mt-3 text-sm leading-[1.55] text-navy-2">{item.note}</p>
                  </Rise>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
