"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { FacebookGlyph, InstagramGlyph } from "@/components/ui/BrandIcons";
import { formatTime, hours, site } from "@/lib/site";
import ParallaxImage from "@/components/ui/ParallaxImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { Rise } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/Magnetic";

function useOpenState() {
  const [state, setState] = useState<{ open: boolean; today: number } | null>(null);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday
      const index = day === 0 ? 6 : day - 1; // our array starts on Monday
      const entry = hours[index];
      if (!entry?.opens || !entry?.closes) {
        setState({ open: false, today: index });
        return;
      }
      const minutes = now.getHours() * 60 + now.getMinutes();
      const [oh, om] = entry.opens.split(":").map(Number);
      const [ch, cm] = entry.closes.split(":").map(Number);
      setState({
        open: minutes >= oh * 60 + om && minutes < ch * 60 + cm,
        today: index,
      });
    };

    check();
    const timer = setInterval(check, 60_000);
    return () => clearInterval(timer);
  }, []);

  return state;
}

export default function Visit() {
  const state = useOpenState();

  return (
    <section id="visit" className="band bg-sand lighting">
      <div className="shell">
        <SectionHeading
          eyebrow="Visit Us"
          index="Find the room"
          title="Golf Links Market, Sector 118."
          lead="Ground floor, corner showroom. Park outside, walk in, take a seat near the pass."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Rise>
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    state?.open ? "bg-ember-2" : "bg-slate"
                  }`}
                  aria-hidden
                />
                <span className="t-meta text-navy">
                  {state === null
                    ? "Checking the clock"
                    : state.open
                      ? "Open now — until 11:00 PM"
                      : "Closed right now"}
                </span>
              </div>
            </Rise>

            <Rise delay={0.06} className="mt-10">
              <h3 className="t-meta text-slate">Address</h3>
              <address className="mt-4 not-italic">
                {site.addressLines.map((line) => (
                  <span
                    key={line}
                    className="block font-display text-[clamp(1.05rem,1.7vw,1.4rem)] leading-[1.45] text-navy"
                  >
                    {line}
                  </span>
                ))}
              </address>
            </Rise>

            <Rise delay={0.12} className="mt-10">
              <h3 className="t-meta text-slate">Phone</h3>
              <a
                href={site.phoneHref}
                className="underline-slide mt-2 inline-flex items-center gap-3 py-2 font-mono text-sm tracking-[0.1em] text-navy"
              >
                <Phone size={14} strokeWidth={1.5} className="text-ember-2" />
                {site.phone}
              </a>
            </Rise>

            <Rise delay={0.18} className="mt-12 flex flex-wrap gap-4">
              <MagneticLink href={site.mapsPlace} external className="btn btn-solid" cursor="Open">
                <MapPin size={14} strokeWidth={1.5} />
                Open in Google Maps
              </MagneticLink>
              <MagneticLink href={site.instagram} external className="btn" cursor="Open">
                <InstagramGlyph size={14} />
                Instagram
              </MagneticLink>
              <MagneticLink href={site.facebook} external className="btn" cursor="Open">
                <FacebookGlyph size={14} />
                Facebook
              </MagneticLink>
            </Rise>
          </div>

          <div className="lg:col-span-4">
            <Rise>
              <h3 className="t-meta text-slate">Opening hours</h3>
              <dl className="mt-6 border-t border-line">
                {hours.map((day, i) => {
                  const isToday = state?.today === i;
                  return (
                    <div
                      key={day.label}
                      className={`flex items-baseline justify-between gap-6 border-b border-line py-4 transition-colors duration-500 ${
                        isToday ? "text-navy" : "text-navy-2/75"
                      }`}
                    >
                      <dt className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
                        {isToday && (
                          <span className="h-1 w-1 rotate-45 bg-ember-2" aria-hidden />
                        )}
                        {day.label}
                      </dt>
                      <dd className="font-mono text-[0.72rem] tracking-[0.08em] tabular-nums">
                        {day.opens && day.closes
                          ? `${formatTime(day.opens)} – ${formatTime(day.closes)}`
                          : "Closed"}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Rise>
          </div>

          <div className="lg:col-span-3">
            <ParallaxImage
              src="/images/visit.jpg"
              alt="Inside Dev's American Cafe at Golf Links Market"
              className="aspect-3/4"
              sizes="(max-width: 1024px) 100vw, 24vw"
              parallax={10}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
