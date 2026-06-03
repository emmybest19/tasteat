// Central place for business-wide settings.
// Replace the placeholder values below with the real ones (or set the matching
// NEXT_PUBLIC_* env vars in .env.local — those take priority).

export const siteConfig = {
  name: "TastEat",
  // tagline: "Breakfast, Akara & More.",
  tagline: "Bite Into Tradition ",
  description:
    "TastEat serves freshly made Nigerian classics — akara, pap, moi moi, masa, golden yam, fries and our signature yaji. Browse the menu and order on WhatsApp.",

  // WhatsApp number in international format: country code + number, digits only.
  // Local 09077227261 -> drop the leading 0, prepend 234 -> "2349077227261"
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2349077227261",

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@tasteat.com",

  // Eatery location — shown on the home page map.
  // address  = the text displayed to customers.
  // mapQuery = what the map searches for: a full address works best, or use
  //            exact coordinates as "latitude,longitude" for a precise pin.
  location: {
    address: "TastEat, Abuja, Nigeria",
    mapQuery: process.env.NEXT_PUBLIC_MAP_QUERY ?? "Abuja, Nigeria",
  },

  // Social / external links (optional — leave empty to hide).
  socials: {
    instagram: "",
    facebook: "",
    tiktok: "",
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
