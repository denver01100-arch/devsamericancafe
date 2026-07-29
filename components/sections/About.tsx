"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { Rise } from "@/components/ui/Reveal";

const MILESTONES = [
  { year: "1965", note: "Born in New Jersey, to an Indian father and an American mother" },
  { year: "1983", note: "First job — dishwasher at his uncle's restaurant, Beverly Hills" },
  { year: "1988", note: "Executive Chef, five years after picking up a scrubber" },
  { year: "1996", note: "Moves to India; works the family farm in Haryana" },
  { year: "2005", note: "Executive Chef, Comedy & Magic Club, Hermosa Beach" },
  { year: "2009", note: "Helps build S4 Restaurant, Chandigarh" },
  { year: "2016", note: "Opens Dev's American Cafe" },
  { year: "2026", note: "A bigger room at Golf Link Market, Mohali" },
];

/**
 * Dev's own account, lightly tightened for the page but otherwise unedited
 * in substance. Every date, place and job title here comes directly from
 * him — nothing in this block is invented.
 */
const BIO = [
  `My name is Devinder S. Mahal. I was born in New Jersey in 1965, to an
   Indian father and an American mother. After my parents divorced, I
   attended Woodstock School in Mussoorie from 1979 to 1981, and later
   graduated with the Class of 1983.`,
  `My culinary journey began that same year, as a dishwasher at my uncle's
   restaurant in Beverly Hills. What started as an entry-level job became
   the foundation of a lifelong career. In 1984 I joined the Bobby McGee's
   restaurant group, a company that invested heavily in its people. Under
   an exceptional mentor, and through years of hard work, I rose from
   dishwasher to Executive Chef within five years — the company also
   sponsored leadership and self-development training that shaped me as
   much as any kitchen did.`,
  `The years after that took me through delicatessens, seafood restaurants
   and fine dining rooms — Denny's, The Boathouse, Rusty Pelican, Chart
   House — training teams, controlling food costs, and running kitchens.`,
  `In 1996 I moved to India for an arranged marriage. It became both a
   personal and a cultural adventure — Hindi, Punjabi, and the traditions
   of a country I grew to love enough to stay in. For a time I worked our
   family farm near Mustafabad, in Haryana.`,
  `In 2005 I was invited to join the Comedy & Magic Club in Hermosa Beach,
   California — a stage associated with Jay Leno, Robin Williams, George
   Carlin and many others. I joined as a Sous Chef and was Executive Chef
   within months. Some of the dishes I wrote there stayed on the menu long
   after I left.`,
  `When my father passed away, I returned to India to manage our
   twenty-eight-acre farm. As a dual citizen of the United States and
   India, I chose to make India my permanent home.`,
  `In 2009 I helped establish S4 Restaurant in Chandigarh — the recipes,
   the menus, the operating systems, the training manuals, all built from
   scratch. It became known for one of Chandigarh's first true salad bars.
   I went on to consult for other hospitality ventures, always with the
   same philosophy: commit completely to the client's success, and deliver
   far beyond what they expect.`,
  `In 2015, a project in Dharampur inspired me to open a small café of my
   own in Dagshai, Himachal Pradesh. It gave me the confidence to call
   myself an entrepreneur, and it led me back to Chandigarh.`,
  `In 2016 I opened Dev's American Cafe, while also running the canteen at
   The British School. I relocated the cafe to Mohali in 2019, and kept
   building it into the kind of place people came back to — not for the
   menu alone, but for the welcome.`,
  `I still run it the same way. I cook live in front of my guests, I
   oversee every part of the experience myself, and I want a table here to
   feel like turning up at a friend's house while he happens to be
   cooking. The café walls carry photographs from four decades on the road
   — American faces, Indian faces, the people I've cooked for and cooked
   beside. Every recipe on the menu is mine.`,
  `In 2026, Dev's American Cafe moved to a larger home at Golf Link Market
   — more seats, a wider menu, and the same kitchen philosophy that's
   carried me for over forty years.`,
];

export default function About() {
  return (
    <section id="story" className="band lighting bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="The Story"
          index="01 / 07"
          title="A kitchen with no back of house."
          lead="Four decades of American kitchens, two countries, and the same pair of hands now working the pass at Golf Link Market."
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Portrait column */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-12 gap-4 md:gap-6 lg:sticky lg:top-28">
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
                  alt="Chef Devinder S. Mahal at Dev's American Cafe"
                  className="aspect-3/4"
                  sizes="(max-width: 1024px) 33vw, 18vw"
                  parallax={14}
                />
                <Rise delay={0.2}>
                  <blockquote className="t-accent text-[clamp(1.05rem,1.5vw,1.4rem)] leading-[1.4] text-navy">
                    &ldquo;I want you to feel like you walked into a friend&rsquo;s
                    house and he happened to be cooking.&rdquo;
                  </blockquote>
                </Rise>
              </div>
            </div>
          </div>

          {/* Full biography, in his own words */}
          <div className="lg:col-span-7">
            <Rise>
              <p className="t-eyebrow">In his own words</p>
            </Rise>

            <div className="mt-6 space-y-6">
              {BIO.map((paragraph, i) => (
                <Rise key={i} delay={Math.min(i * 0.04, 0.4)}>
                  <p className="t-body max-w-[62ch]">
                    {paragraph.replace(/\s+/g, " ").trim()}
                  </p>
                </Rise>
              ))}
            </div>

            <Rise delay={0.3} className="mt-10">
              <p className="font-accent text-[1.4rem] italic leading-none text-ember">
                Devinder S. Mahal
              </p>
              <p className="t-meta mt-3">Founder &amp; Chef, Dev&rsquo;s American Cafe</p>
            </Rise>

            <ol className="mt-14 grid gap-px overflow-hidden border-2 border-navy bg-navy sm:grid-cols-2 lg:grid-cols-4">
              {MILESTONES.map((item, i) => (
                <li key={item.year} className="bg-cream">
                  <Rise delay={i * 0.05} className="h-full p-6">
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
