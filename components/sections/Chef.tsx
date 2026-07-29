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
                  Unlike most restaurants, Dev runs this one hands-on. He cooks live
                  in front of guests, personally oversees every part of the dining
                  experience, and wants the whole thing to feel less like a
                  restaurant and more like turning up at a friend&rsquo;s house while
                  he happens to be cooking.
                </p>
              </Rise>
              <Rise delay={0.07}>
                <p className="t-body">
                  He is the only chef at Dev&rsquo;s American Cafe — the menu, the
                  recipes and the seasoning blends are his alone. Two cooks work the
                  line beside him, but every dish that leaves the pass has passed
                  through his hands first.
                </p>
              </Rise>
              <Rise delay={0.14}>
                <p className="t-body">
                  The menu is built entirely around original recipes, particularly
                  the specialty burgers and sandwiches that reflect his personal
                  style and over four decades of experience across American
                  kitchens. Nothing on it is licensed, franchised or copied.
                </p>
              </Rise>
            </div>

            <Rise delay={0.2} className="mt-14">
              <figure className="border-l-4 border-yellow pl-8">
                <blockquote className="t-accent text-[clamp(1.4rem,3vw,2.15rem)] leading-[1.28] text-navy">
                  &ldquo;I cook live in front of my guests and personally oversee
                  every part of the experience — I want you to feel like you&rsquo;re
                  visiting a friend&rsquo;s home.&rdquo;
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
              <p className="t-lead max-w-[46ch] border-t border-line pt-8">
                Beverly Hills to the Comedy &amp; Magic Club to a farm in Haryana to
                Golf Link Market — the whole story, in his own words, is up in{" "}
                <a href="#story" className="underline-slide inline-block py-1 text-navy">
                  The Story
                </a>
                .
              </p>
            </Rise>
          </div>
        </div>
      </div>
    </section>
  );
}
