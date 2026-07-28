import Link from "next/link";

export default function NotFound() {
  return (
    <section className="lighting relative flex min-h-[100svh] items-center bg-cream">
      <div className="shell relative">
        <span className="t-eyebrow">404</span>
        <h1 className="t-h1 mt-7 max-w-[18ch] text-navy">
          That page never made it onto the menu.
        </h1>
        <p className="t-lead mt-8 max-w-[42ch]">
          The link is off, but the griddle is on. Head back and start again.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-solid">
            Back home
          </Link>
          <Link href="/menu" className="btn">
            See the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
