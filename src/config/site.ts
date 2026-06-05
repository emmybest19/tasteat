// Central place for business-wide settings.
// Replace the placeholder values below with the real ones (or set the matching
// NEXT_PUBLIC_* env vars in .env.local — those take priority).

export const siteConfig = {
  name: "TastEat",
  // tagline: "Breakfast, Akara & More.",
  tagline: "Bite Into Tradition ",
  description:
    "TastEat Foods serves freshly made Nigerian classics in Abuja — akara, pap, moi moi, masa, golden yam, fries and our signature yaji. Browse the menu and order on WhatsApp.",

  // Public site URL (used for SEO: canonical links, sitemap, social previews).
  // Any trailing slash is stripped so generated URLs never double up ("//").
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tasteatfoods.com").replace(
    /\/+$/,
    "",
  ),

  // Other names people might search for this brand (helps Google connect them).
  alternateNames: [
    "TastEat Foods",
    "Tasteat",
    "Tasteat Foods",
    "Taste Eat",
    "TastEat Nigeria",
    "TastEat Abuja",
  ],

  // Google Search Console verification token (the value from the
  // "HTML tag" method). Set GOOGLE_SITE_VERIFICATION in your env.
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? "",

  // Keywords help describe the business (used in metadata).
  keywords: [
    "TastEat",
    "TastEat Foods",
    "TastEatFoods",
    "Tasteat",
    "Taste Eat",
    "tasteatfoods",
    "TastEat Abuja",
    "Nigerian food",
    "Nigerian breakfast",
    "akara",
    "pap",
    "moi moi",
    "masa",
    "golden yam",
    "yam fries",
    "yaji",
    "suya spice",
    "Naija breakfast",
    "Abuja food",
    "food delivery Abuja",
    "order food on WhatsApp",
  ],

  // WhatsApp number in international format: country code + number, digits only.
  // Local 09077227261 -> drop the leading 0, prepend 234 -> "2349077227261"
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2349077227261",

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "tamivikc@gmail.com",

  // Eatery location — shown on the home page map.
  // address  = the text displayed to customers.
  // mapQuery = what the map searches for: a full address works best, or use
  //            exact coordinates as "latitude,longitude" for a precise pin.
  location: {
    address: "TastEat, Abuja, Nigeria",
    mapQuery: process.env.NEXT_PUBLIC_MAP_QUERY ?? "Abuja, Nigeria",
  },

  // Social media links — paste your full profile URLs here.
  // Leave any platform as "" and its icon simply won't show.
  socials: {
    instagram: "https://www.instagram.com/tasteat.akara?igsh=MzY1MzlodDB6dmpx&utm_source=qr", // e.g. "https://instagram.com/tasteat"
    facebook: "", // e.g. "https://facebook.com/tasteat"
    tiktok: "", // e.g. "https://tiktok.com/@tasteat"
    x: "", // e.g. "https://x.com/tasteat"
    youtube: "", // e.g. "https://youtube.com/@tasteat"
  },

  // EmailJS — used by the contact & complaint forms.
  // Get these from https://dashboard.emailjs.com
  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    contactTemplateId: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE ?? "",
    complaintTemplateId:
      process.env.NEXT_PUBLIC_EMAILJS_COMPLAINT_TEMPLATE ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  },
} as const;

/** Build a WhatsApp deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
