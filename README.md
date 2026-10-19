# Tasteatfoods

The website for TastEat Foods, a food business in Abuja serving freshly made Nigerian classics such as akara, pap, moi moi, masa, golden yam, fries and yaji. Customers browse the menu and place orders on WhatsApp.

**Live:** https://tasteatfoods.com

## Features

- **Product catalogue** with categories (Breakfast, Northern, Snacks & Sides, Spices) and a page for each product
- **WhatsApp ordering:** customers pick options and quantity, and the site opens WhatsApp with the order message already written
- **Menu assistant widget:** a lightweight, rule-based helper that answers questions about the menu, prices, ordering and contact, and links to the right page. It runs fully in the browser with no API key
- **Contact and complaint forms** sent through EmailJS, with a fallback that opens the visitor's email app when EmailJS is not configured
- **Location map** with an embedded Google Map and a directions link
- **SEO:** metadata, sitemap, robots.txt, web app manifest and JSON-LD structured data
- **Motion:** fade, reveal and stagger animations plus a hero carousel

## Stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4
- Motion for animation
- EmailJS for form delivery
- React Icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

### Environment variables

Create a `.env.local` file. All are optional; the site falls back to defaults in `src/config/site.ts`.

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_MAP_QUERY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE=
NEXT_PUBLIC_EMAILJS_COMPLAINT_TEMPLATE=
GOOGLE_SITE_VERIFICATION=
```

## Project structure

```
src/
  app/
    page.tsx               Home
    products/              Menu and product detail pages ([slug])
    contact/               Contact form
    complaints/            Complaint form
    layout.tsx, template.tsx
    sitemap.ts, robots.ts, manifest.ts
  components/              Navbar, Footer, ProductCatalog, ProductCard,
                           WhatsAppOrderButton, AssistantWidget, EmailForm,
                           LocationMap, HeroCarousel, JsonLd, motion/
  config/site.ts           Business settings (name, WhatsApp, email, location)
  data/products.ts         Product catalogue and categories
  lib/assistant.ts         Menu assistant logic
```

To add or edit a product, update `src/data/products.ts`. Product photos go in `public/products`.
