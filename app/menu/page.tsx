import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Leaf, Star } from "lucide-react";
import { formatPrice, inspirations, menu } from "@/lib/menu";
import { openingSummary, site } from "@/lib/site";
import { Rise } from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";

export const metadata: Metadata = {
  title: "The Full Menu",
  description:
    "Burgers, sandwiches, hot dogs, salads, finger foods, coffee and desserts at Dev's American Cafe, Golf Links Market, Mohali. Every recipe written in house.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pb-16 pt-[calc(var(--nav-h)+clamp(3rem,8vw,6rem))] lighting">
        <div className="shell relative">
          <Link
            href="/"
            className="underline-slide inline-flex items-center gap-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-navy-2"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back home
          </Link>

          <h1 className="t-h1 mt-12 text-navy">The Full Menu</h1>
          <p className="t-lead mt-8 max-w-[52ch]">
            Original recipes, hand-ground patties and a jar of cowboy candy under nearly
            everything. Cooked in front of you at Golf Links Market.
          </p>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8">
            <p className="t-meta">{openingSummary}</p>
            <p className="t-meta text-navy-2">Prices in ₹ · subject to change</p>
            <p className="t-meta text-navy-2 flex items-center gap-2">
              <Leaf size={12} strokeWidth={1.6} className="text-steel" /> Vegetarian
              <Star size={11} strokeWidth={1.6} className="ml-4 text-ember-2" /> Signature
            </p>
          </div>
        </div>
      </section>

      {menu.map((category, ci) => (
        <section
          key={category.id}
          id={category.id}
          className={`band ${ci % 2 === 0 ? "bg-sand" : "bg-cream"} lighting`}
          style={{ paddingBlock: "clamp(4rem,8vw,7rem)" }}
        >
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <Rise>
                    <span className="t-eyebrow">{category.kicker}</span>
                    <h2 className="t-h1 mt-6 text-[clamp(2.2rem,5vw,3.6rem)] text-navy">
                      {category.title}
                    </h2>
                    <p className="t-body mt-7 max-w-[40ch]">{category.blurb}</p>
                  </Rise>

                  <ParallaxImage
                    src={category.image}
                    alt={category.title}
                    className="mt-10 aspect-4/5 hidden lg:block"
                    sizes="32vw"
                    parallax={8}
                  />
                </div>
              </div>

              <div className="lg:col-span-8">
                {category.groups.map((group, gi) => (
                  <div key={group.title} className={gi > 0 ? "mt-16" : ""}>
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-ember-2">
                        {group.title}
                      </h3>
                      <span className="h-px flex-1 bg-line" />
                    </div>
                    {group.note && (
                      <p className="mt-3 text-sm italic text-slate">{group.note}</p>
                    )}

                    <ul className="mt-7">
                      {group.items.map((item) => (
                        <li
                          key={item.name}
                          className="border-b border-line/60 py-6 last:border-0"
                        >
                          <Rise>
                            <div className="flex items-baseline gap-4">
                              <h4 className="t-h3 flex items-center gap-2.5 text-navy">
                                {item.name}
                                {item.veg && (
                                  <Leaf
                                    size={13}
                                    strokeWidth={1.6}
                                    className="text-steel"
                                    aria-label="Vegetarian"
                                  />
                                )}
                                {item.signature && (
                                  <Star
                                    size={12}
                                    strokeWidth={1.6}
                                    className="text-ember-2"
                                    aria-label="Signature dish"
                                  />
                                )}
                              </h4>
                              <span
                                className="h-px flex-1 self-end"
                                style={{
                                  backgroundImage:
                                    "repeating-linear-gradient(90deg, var(--color-line) 0 4px, transparent 4px 9px)",
                                }}
                                aria-hidden
                              />
                              <span className="whitespace-nowrap font-mono text-sm text-navy tabular-nums">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                            {(item.description || item.priceNote) && (
                              <p className="mt-2.5 max-w-[64ch] text-[0.92rem] leading-[1.65] text-navy-2/85">
                                {item.description}
                                {item.priceNote && (
                                  <span className="ml-1 text-slate">
                                    ({item.priceNote})
                                  </span>
                                )}
                              </p>
                            )}
                          </Rise>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* The board that no other restaurant site has */}
      <section className="band bg-sand lighting">
        <div className="shell">
          <Rise>
            <span className="t-eyebrow">Inspiration</span>
            <h2 className="t-h1 mt-6 max-w-[20ch] text-navy">
              Some of this menu was ordered into existence.
            </h2>
            <p className="t-lead mt-8 max-w-[50ch]">
              Regulars asked for something that wasn&rsquo;t on the card. It worked. It
              stayed. Their names stayed with it.
            </p>
          </Rise>

          <ul className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {inspirations.map((entry, i) => (
              <li key={entry.name} className="bg-sand">
                <Rise delay={(i % 3) * 0.06} className="h-full p-8">
                  <p className="font-display text-[1.15rem] font-semibold leading-tight text-navy">
                    {entry.name}
                  </p>
                  <p className="mt-2 text-[0.9rem] leading-[1.6] text-navy-2/85">
                    and {entry.dish}
                  </p>
                </Rise>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band bg-cream lighting">
        <div className="shell text-center">
          <h2 className="t-h2 mx-auto max-w-[22ch] text-navy">
            Come and eat it in the room it was written for.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={site.mapsPlace} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Open in Google Maps
            </a>
            <Link href="/#visit" className="btn">
              Opening hours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
