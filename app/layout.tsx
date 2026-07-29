import type { Metadata, Viewport } from "next";
import "./globals.css";
import { hours, site, siteUrl } from "@/lib/site";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { IntroProvider } from "@/components/layout/IntroProvider";
import Preloader from "@/components/layout/Preloader";
import Cursor from "@/components/layout/Cursor";
import { GrainOverlay, ScrollProgress } from "@/components/layout/Chrome";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,200..700;1,200..700&family=JetBrains+Mono:wght@300..600&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Burgers & American Classics in Mohali`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Dev's American Cafe",
    "burgers Mohali",
    "American cafe Mohali",
    "Golf Link Market restaurant",
    "best burgers Chandigarh",
    "Sector 118 TDI City",
    "pulled pork sandwich Mohali",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Burgers & American Classics in Mohali`,
    description: site.description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "A signature sandwich at Dev's American Cafe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Burgers & American Classics in Mohali`,
    description: site.description,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#fff9ec",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteUrl}/#restaurant`,
  name: site.name,
  description: site.description,
  url: siteUrl,
  image: `${siteUrl}/images/og.jpg`,
  logo: `${siteUrl}/images/logo.png`,
  telephone: site.phone,
  priceRange: site.priceRange,
  servesCuisine: ["American", "Burgers", "Sandwiches"],
  currenciesAccepted: "INR",
  foundingDate: site.founded,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.locality,
    addressRegion: site.region,
    postalCode: site.postalCode,
    addressCountry: site.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  hasMap: site.maps,
  sameAs: [site.instagram, site.facebook],
  hasMenu: `${siteUrl}/menu`,
  founder: {
    "@type": "Person",
    name: "Devinder S. Mahal",
    jobTitle: "Founder & Chef",
  },
  openingHoursSpecification: hours
    .filter((day) => day.opens && day.closes)
    .map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day.schemaDay}`,
      opens: day.opens,
      closes: day.closes,
    })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <a
          href="#story"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-ember focus:px-6 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-navy"
        >
          Skip to content
        </a>

        <IntroProvider>
          <SmoothScroll>
            <Preloader />
            <Cursor />
            <ScrollProgress />
            <GrainOverlay />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </IntroProvider>
      </body>
    </html>
  );
}
