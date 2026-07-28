"use client";

import { RevealWords, Rise } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  /** Section number — only used because the page really is a walk-through in order. */
  index?: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  index,
  lead,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";

  return (
    <header className={`${centered ? "text-center" : ""} ${className}`}>
      <Rise className={`flex items-baseline gap-6 ${centered ? "justify-center" : ""}`}>
        <span className="t-eyebrow">{eyebrow}</span>
        {index && <span className="t-meta text-slate">{index}</span>}
      </Rise>

      <h2 className="t-h1 mt-7 text-navy">
        <RevealWords text={title} />
      </h2>

      {lead && (
        <Rise
          delay={0.12}
          className={`t-lead mt-8 max-w-[46ch] ${centered ? "mx-auto" : ""}`}
        >
          <p>{lead}</p>
        </Rise>
      )}

      <Rise delay={0.2} className="mt-12">
        <span className="block h-px w-full origin-left bg-line" />
      </Rise>
    </header>
  );
}
