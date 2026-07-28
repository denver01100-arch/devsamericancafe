"use client";

import ParallaxImage from "@/components/ui/ParallaxImage";
import { RevealWords, Rise } from "@/components/ui/Reveal";

export default function Chef() {
  return (
    <section id="chef" className="band bg-sand lighting">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <ParallaxImage
              src="/images/chef.jpg"
              alt="Chef Devinder S. Mahal, founder of Dev's American Cafe"
              className="aspect-4/5 lg:sticky lg:top-28"
              sizes="(max-width: 1024px) 100vw, 40vw"
              parallax={9}
              cursor="Dev"
            />
          </div>

          <div className="lg:col-span-7">
            <Rise>
              <span className="t-eyebrow">The Chef · 05 / 07</span>
            </Rise>

            <h2 className="t-h1 mt-7 text-navy">
              <RevealWords text="Chef Devinder S. Mahal" />
            </h2>

            <Rise delay={0.1} className="mt-4">
              <p className="t-accent text-[clamp(1.1rem,2vw,1.6rem)] text-steel">
                Founder. Still on the line.
              </p>
            </Rise>

            <div className="mt-12 space-y-6">
              <Rise>
                <p className="t-body">
                  Born in New Jersey in 1965 to an Indian father and an American mother,
                  schooled at Woodstock in Mussoorie, and put to work in 1983 washing
                  dishes at his uncle&rsquo;s restaurant in Beverly Hills. He used the
                  job as a training ground and never really left the kitchen.
                </p>
              </Rise>
              <Rise delay={0.07}>
                <p className="t-body">
                  Five years later he was an Executive Chef. The decades that followed
                  took him through delicatessens, seafood houses and fine dining rooms —
                  The Boathouse, Rusty Pelican, Chart House — and on to the Comedy &amp;
                  Magic Club in Hermosa Beach, where he arrived as a Sous Chef and was
                  running the kitchen within months. Dishes he wrote there outlasted him
                  on the menu.
                </p>
              </Rise>
              <Rise delay={0.14}>
                <p className="t-body">
                  He moved to India in 1996, farmed for a while near Mustafabad, helped
                  build S4 in Chandigarh in 2009 and consulted for years before opening a
                  place of his own in 2016. Dual citizen, permanent resident of the
                  griddle.
                </p>
              </Rise>
            </div>

            <Rise delay={0.2} className="mt-14">
              <figure className="border-l-4 border-yellow pl-8">
                <blockquote className="t-accent text-[clamp(1.4rem,3vw,2.15rem)] leading-[1.28] text-navy">
                  &ldquo;I have no employees. I cook in front of my guests, and I&rsquo;d
                  rather do every part of it myself.&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <span
                    className="block font-accent text-[clamp(2.2rem,4.4vw,3rem)] italic leading-none text-ember"
                    aria-hidden
                  >
                    Dev
                  </span>
                  <span className="t-meta mt-3 block">
                    Devinder S. Mahal — Founder &amp; Chef
                  </span>
                </figcaption>
              </figure>
            </Rise>

            <Rise delay={0.26} className="mt-14">
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-8">
                <p className="t-meta text-slate">Also on the line</p>
                <p className="text-[0.95rem] text-navy">
                  Chef Priyam
                  <span className="ml-3 text-navy-2/70">Kitchen</span>
                </p>
              </div>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
