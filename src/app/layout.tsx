import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssistantWidget from "@/components/AssistantWidget";
import JsonLd from "@/components/JsonLd";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const titleDefault = `${siteConfig.name} — ${siteConfig.tagline.trim()}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleDefault,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  category: "food",
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: titleDefault,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_NG",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline.trim()}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

const sameAs = Object.values(siteConfig.socials).filter(Boolean);

// LocalBusiness / Restaurant structured data (sitewide).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${siteConfig.url}/#restaurant`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateNames,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/og.png`,
  logo: `${siteConfig.url}/images/logo-trimmed.png`,
  telephone: `+${siteConfig.whatsappNumber}`,
  email: siteConfig.email,
  servesCuisine: ["Nigerian", "West African", "Breakfast"],
  priceRange: "₦₦",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.location.address,
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  hasMenu: `${siteConfig.url}/products`,
  sameAs,
};

// Organization — ties all the brand-name variants together for Google.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateNames,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo-trimmed.png`,
  image: `${siteConfig.url}/og.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${siteConfig.whatsappNumber}`,
    contactType: "customer service",
    areaServed: "NG",
    availableLanguage: ["en"],
  },
  sameAs,
};

// WebSite — helps Google show your brand name and (potentially) a search box.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  alternateName: siteConfig.alternateNames,
  url: siteConfig.url,
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={businessJsonLd} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AssistantWidget />
      </body>
    </html>
  );
}
