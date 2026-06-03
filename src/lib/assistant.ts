// ─────────────────────────────────────────────────────────────────────────
// TastEat assistant "brain".
//
// A lightweight intent matcher over the live product catalog + site map.
// No API key, no network — answers about the menu, prices, categories,
// ordering, contact/complaints, and gives directions around the app.
//
// To make it smarter later (e.g. real Claude AI), swap getAssistantReply for
// an async backend call — the widget already awaits it.
// ─────────────────────────────────────────────────────────────────────────

import {
  products,
  CATEGORIES,
  formatPrice,
  type Product,
} from "@/data/products";
import { siteConfig, whatsappLink } from "@/config/site";

export type AssistantAction = {
  label: string;
  /** navigate = in-app route, external = new tab (e.g. WhatsApp), ask = re-run a query */
  kind: "navigate" | "external" | "ask";
  value: string;
};

export type AssistantReply = {
  text: string;
  actions?: AssistantAction[];
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

const has = (q: string, ...words: string[]) =>
  words.some((w) => q.includes(w));

/** Find products explicitly mentioned in the message. */
function findProducts(q: string): Product[] {
  return products.filter((p) => {
    const tokens = new Set<string>([
      p.name.toLowerCase(),
      ...p.name.toLowerCase().split(/\s+/),
      ...p.slug.split("-"),
    ]);
    return [...tokens].some((t) => t.length > 2 && q.includes(t));
  });
}

function orderAction(p: Product): AssistantAction {
  return {
    label: `Call to order ${p.name}`,
    kind: "external",
    value: whatsappLink(`Hi ${siteConfig.name}! I'd like to order ${p.name}.`),
  };
}

const STARTERS = [
  "See the menu",
  "What's popular?",
  "How do I order?",
  "Show me breakfast",
];

export function getStarters(): string[] {
  return STARTERS;
}

export function getGreeting(): AssistantReply {
  return {
    text: `Hi there! 👋 I'm the ${siteConfig.name} assistant. I can help you explore the menu, suggest a dish, explain how to order, or point you to the right page. What are you in the mood for?`,
    actions: STARTERS.map((s) => ({ label: s, kind: "ask", value: s })),
  };
}

export function getAssistantReply(raw: string): AssistantReply {
  const q = norm(raw).trim();

  if (!q) return getGreeting();

  // ── Greetings ──
  if (has(q, "hello", "hi", "hey", "good morning", "good afternoon", "good evening")) {
    return getGreeting();
  }

  if (has(q, "thank", "thanks", "thx")) {
    return {
      text: "You're most welcome! 😊 Anything else I can help you find?",
      actions: [
        { label: "See the menu", kind: "navigate", value: "/products" },
        { label: "Call on WhatsApp", kind: "external", value: whatsappLink(`Hi ${siteConfig.name}!`) },
      ],
    };
  }

  // ── Specific product(s) mentioned ──
  const mentioned = findProducts(q);
  if (mentioned.length > 0 && !has(q, "menu", "everything", "all")) {
    if (mentioned.length === 1) {
      const p = mentioned[0];
      const priceLine =
        formatPrice(p.price) === "Contact for price"
          ? "Pricing is confirmed when you call us on WhatsApp."
          : `It's ${formatPrice(p.price)}.`;
      return {
        text: `${p.name} — ${p.shortDescription} ${priceLine}`,
        actions: [
          { label: `View ${p.name}`, kind: "navigate", value: `/products/${p.slug}` },
          orderAction(p),
        ],
      };
    }
    return {
      text: `We've got a few of those: ${mentioned.map((p) => p.name).join(", ")}. Which one would you like to see?`,
      actions: mentioned.slice(0, 4).map((p) => ({
        label: p.name,
        kind: "navigate" as const,
        value: `/products/${p.slug}`,
      })),
    };
  }

  // ── Recommendations / suggestions ──
  if (has(q, "recommend", "suggest", "popular", "best", "favorite", "favourite", "hungry", "what should", "tasty", "nice")) {
    const featured = products.filter((p) => p.featured).slice(0, 4);
    return {
      text: "Great picks our customers keep coming back for 👇 Tap one to take a look:",
      actions: featured.map((p) => ({
        label: p.name,
        kind: "navigate" as const,
        value: `/products/${p.slug}`,
      })),
    };
  }

  // ── Spicy ──
  if (has(q, "spicy", "spice", "hot", "pepper", "yaji", "suya")) {
    return {
      text: "Love some heat? 🌶️ Our signature Yaji suya spice blend is smoky, peppery and nutty — sprinkle it on anything. Masa & Soup also brings the spice.",
      actions: [
        { label: "View Yaji", kind: "navigate", value: "/products/yaji" },
        { label: "View Masa & Soup", kind: "navigate", value: "/products/masa-and-soup" },
      ],
    };
  }

  // ── Prices ──
  if (has(q, "price", "cost", "how much", "much is", "expensive", "cheap", "naira")) {
    return {
      text: "You can see every dish on the menu, and final pricing is confirmed when you call us on WhatsApp — quick and easy.",
      actions: [
        { label: "Browse the menu", kind: "navigate", value: "/products" },
        { label: "Call on WhatsApp", kind: "external", value: whatsappLink(`Hi ${siteConfig.name}! I'd like to ask about pricing.`) },
      ],
    };
  }

  // ── Category browsing ──
  for (const cat of CATEGORIES) {
    if (q.includes(cat.toLowerCase()) || (cat === "Snacks & Sides" && has(q, "snack", "side", "fries"))) {
      return {
        text: `Here's our ${cat} selection — tap to browse:`,
        actions: [
          { label: `View ${cat}`, kind: "navigate", value: `/products?category=${encodeURIComponent(cat)}` },
        ],
      };
    }
  }
  if (has(q, "breakfast")) {
    return {
      text: "Our breakfast favorites include Akara, Pap, Moi Moi and Golden Yam. Tap to browse:",
      actions: [{ label: "View Breakfast", kind: "navigate", value: "/products?category=Breakfast" }],
    };
  }

  // ── Menu / what do you sell ──
  if (has(q, "menu", "food", "product", "sell", "offer", "what do you", "what can i", "options", "available", "eat")) {
    return {
      text: `We serve freshly made Nigerian classics across ${CATEGORIES.length} categories: ${CATEGORIES.join(", ")}. Where would you like to start?`,
      actions: [
        { label: "Full menu", kind: "navigate", value: "/products" },
        ...CATEGORIES.slice(0, 3).map((c) => ({
          label: c,
          kind: "navigate" as const,
          value: `/products?category=${encodeURIComponent(c)}`,
        })),
      ],
    };
  }

  // ── How to order ──
  if (has(q, "order", "buy", "purchase", "checkout", "cart", "pay", "delivery", "deliver")) {
    return {
      text: "Ordering is simple: browse the menu, open a dish, pick your quantity/options, then tap “Call to order on WhatsApp” — it opens WhatsApp where you can tap the call icon to talk to us (your order details are prefilled too).",
      actions: [
        { label: "Browse the menu", kind: "navigate", value: "/products" },
        { label: "Call on WhatsApp", kind: "external", value: whatsappLink(`Hi ${siteConfig.name}! I'd like to make an order.`) },
      ],
    };
  }

  // ── Complaints ──
  if (has(q, "complain", "complaint", "problem", "issue", "wrong", "bad", "refund", "unhappy", "disappointed")) {
    return {
      text: "I'm sorry to hear that. You can submit a complaint on our form and we'll make it right as quickly as we can.",
      actions: [
        { label: "Submit a complaint", kind: "navigate", value: "/complaints" },
        { label: "Message us", kind: "external", value: whatsappLink(`Hi ${siteConfig.name}, I have a concern about my order.`) },
      ],
    };
  }

  // ── Contact ──
  if (has(q, "contact", "reach", "phone", "call", "email", "talk", "speak", "whatsapp", "number", "location", "where are you", "address", "open", "hours")) {
    return {
      text: `You can reach us anytime — WhatsApp is fastest, or email ${siteConfig.email}.`,
      actions: [
        { label: "Contact page", kind: "navigate", value: "/contact" },
        { label: "Call on WhatsApp", kind: "external", value: whatsappLink(`Hi ${siteConfig.name}!`) },
      ],
    };
  }

  // ── Navigation / directions ──
  if (has(q, "where", "find", "navigate", "direction", "go to", "page", "home", "back", "how do i get")) {
    return {
      text: "Here's how the site is laid out — tap to jump anywhere:",
      actions: [
        { label: "🏠 Home", kind: "navigate", value: "/" },
        { label: "🍽️ Menu", kind: "navigate", value: "/products" },
        { label: "✉️ Contact", kind: "navigate", value: "/contact" },
        { label: "📝 Complaints", kind: "navigate", value: "/complaints" },
      ],
    };
  }

  // ── Fallback ──
  return {
    text: "I'm not totally sure about that one 🤔 — but I can help you with the menu, suggestions, ordering, or finding your way around. What would you like?",
    actions: STARTERS.map((s) => ({ label: s, kind: "ask" as const, value: s })),
  };
}
