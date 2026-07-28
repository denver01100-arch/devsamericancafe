export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://devsamericancafe.com";

export const site = {
  name: "Dev's American Cafe",
  shortName: "Dev's",
  tagline: "American kitchens, cooked in front of you.",
  description:
    "Dev's American Cafe in Mohali — original burgers, sandwiches and American classics built on the pass by Chef Devinder S. Mahal. Golf Links Market, Sector 118, TDI City.",
  url: siteUrl,
  locality: "Sahibzada Ajit Singh Nagar",
  region: "Punjab",
  country: "IN",
  postalCode: "160055",
  street: "Ground Floor, Golf Links Market, SCO 1249, Corner Showroom, Sector 118, TDI City",
  addressLines: [
    "Ground Floor, Golf Links Market",
    "SCO 1249, Corner Showroom",
    "Sector 118, TDI City",
    "Sahibzada Ajit Singh Nagar",
    "Punjab 160055",
  ],
  phone: "+91 98131 12995",
  phoneHref: "tel:+919813112995",
  email: "hello@devsamericancafe.com",
  instagram: "https://www.instagram.com/devswithlove/",
  instagramHandle: "@devswithlove",
  facebook: "https://www.facebook.com/devswithlove/",
  maps: "https://maps.app.goo.gl/?q=Dev%27s+American+Cafe",
  mapsPlace:
    "https://www.google.com/maps/place/Dev's+American+Cafe/@30.7367605,76.679928,17.09z/data=!4m6!3m5!1s0x390fefc475777d17:0x8efaf8b9d84d3619!8m2!3d30.7367806!4d76.6824996!16s%2Fg%2F11h7z16vn_",
  mapsEmbed:
    "https://www.google.com/maps?q=30.7367806,76.6824996&z=17&output=embed",
  placeId: "ChIJF313dcTvDzkRGTZN2Ln4-o4",
  geo: { lat: 30.7367806, lng: 76.6824996 },
  priceRange: "₹₹",
  founded: "2016",
} as const;

export type Day = {
  label: string;
  short: string;
  /** 24h opening, or null when closed. */
  opens: string | null;
  closes: string | null;
  schemaDay: string;
};

export const hours: Day[] = [
  { label: "Monday", short: "Mon", opens: null, closes: null, schemaDay: "Monday" },
  { label: "Tuesday", short: "Tue", opens: null, closes: null, schemaDay: "Tuesday" },
  { label: "Wednesday", short: "Wed", opens: "14:00", closes: "23:00", schemaDay: "Wednesday" },
  { label: "Thursday", short: "Thu", opens: "14:00", closes: "23:00", schemaDay: "Thursday" },
  { label: "Friday", short: "Fri", opens: "14:00", closes: "23:00", schemaDay: "Friday" },
  { label: "Saturday", short: "Sat", opens: "14:00", closes: "23:00", schemaDay: "Saturday" },
  { label: "Sunday", short: "Sun", opens: "14:00", closes: "23:00", schemaDay: "Sunday" },
];

export const openingSummary = "Wednesday – Sunday · 2:00 PM – 11:00 PM";

export const nav = [
  { label: "Story", href: "/#story" },
  { label: "Menu", href: "/#menu" },
  { label: "Chef", href: "/#chef" },
  { label: "Gallery", href: "/#gallery" },
  { label: "The Wall", href: "/#wall" },
  { label: "Visit", href: "/#visit" },
] as const;

export function formatTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}
