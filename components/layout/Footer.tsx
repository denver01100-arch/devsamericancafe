import Image from "next/image";
import Link from "next/link";
import { formatTime, hours, nav, site } from "@/lib/site";
import { FacebookGlyph, InstagramGlyph } from "@/components/ui/BrandIcons";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-navy bg-navy">
      

      <div className="shell relative pb-12 pt-[clamp(4rem,9vw,7rem)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Image
              src="/images/logo.png"
              alt=""
              width={566}
              height={900}
              className="h-24 w-auto"
            />
            <p className="t-accent mt-8 max-w-[30ch] text-[clamp(1.25rem,2.2vw,1.7rem)] leading-[1.35] text-yellow">
              If it isn&rsquo;t messy, it isn&rsquo;t American.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-meta text-slate">Address</h2>
            <address className="mt-5 not-italic text-[0.92rem] leading-[1.7] text-cream/80">
              {site.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={site.phoneHref}
              className="underline-slide mt-4 inline-block py-2 font-mono text-[0.75rem] tracking-[0.1em] text-cream"
            >
              {site.phone}
            </a>
          </div>

          <div className="lg:col-span-3">
            <h2 className="t-meta text-slate">Opening hours</h2>
            <dl className="mt-5 space-y-2.5">
              {hours.map((day) => (
                <div key={day.label} className="flex justify-between gap-6">
                  <dt className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-cream/70">
                    {day.short}
                  </dt>
                  <dd className="font-mono text-[0.72rem] tracking-[0.06em] text-cream/80 tabular-nums">
                    {day.opens && day.closes
                      ? `${formatTime(day.opens)} – ${formatTime(day.closes)}`
                      : "Closed"}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-2">
            <h2 className="t-meta text-slate">Elsewhere</h2>
            <ul className="mt-4 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="underline-slide inline-block py-1.5 text-[0.92rem] text-cream/80 transition-colors duration-500 hover:text-yellow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/menu"
                  className="underline-slide inline-block py-1.5 text-[0.92rem] text-cream/80 transition-colors duration-500 hover:text-yellow"
                >
                  Full Menu
                </Link>
              </li>
            </ul>

            <div className="mt-8 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors duration-500 hover:border-ember hover:text-yellow"
                aria-label="Dev's American Cafe on Instagram"
              >
                <InstagramGlyph size={16} />
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors duration-500 hover:border-ember hover:text-yellow"
                aria-label="Dev's American Cafe on Facebook"
              >
                <FacebookGlyph size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-cream/25 pt-8">
          <p className="t-meta">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="t-meta text-slate">Sahibzada Ajit Singh Nagar, Punjab</p>
        </div>
      </div>
    </footer>
  );
}
