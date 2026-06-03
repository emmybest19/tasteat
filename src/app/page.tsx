import Link from "next/link";
import { siteConfig, whatsappLink } from "@/config/site";
import { CATEGORIES, getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import LocationMap from "@/components/LocationMap";
import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { IoCall } from "react-icons/io5";
// Hero carousel slides — real photos from /public/images.
const heroSlides: Slide[] = [
  {
    src: "/images/akara.jpeg",
    emoji: "🫘",
    title: "Akara",
    subtitle: "Crispy golden bean cakes",
  },
  {
    src: "/images/pap.jpeg",
    emoji: "🥣",
    title: "Pap",
    subtitle: "Smooth, creamy & comforting",
  },
  {
    src: "/images/masa.jpeg",
    emoji: "🍢",
    title: "Masa & Soup",
    subtitle: "A Northern favorite",
  },
  {
    src: "/images/moi.jpeg",
    emoji: "🍮",
    title: "Moi Moi",
    subtitle: "Savory steamed bean pudding",
  },
  {
    src: "/images/golden-yam.jpeg",
    emoji: "🍠",
    title: "Golden Yam",
    subtitle: "Fried golden with egg",
  },
  {
    src: "/images/friend-yam1.jpeg",
    emoji: "🍟",
    title: "Yam Fries",
    subtitle: "Crispy, fresh & spiced",
  },
  {
    src: "/images/yaji.jpeg",
    emoji: "🌶️",
    title: "Yaji",
    subtitle: "Our signature suya spice",
  },
];

const categoryBlurbs: Record<string, string> = {
  Breakfast: "Akara, pap, moi moi & golden yam",
  Northern: "Masa & soup, the Northern favorite",
  "Snacks & Sides": "Yam, potato & plantain fries",
  Spices: "Our signature yaji blend",
};

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-brand-600 via-brand-700 to-brand-900">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-2 md:items-center">
          <div className="text-white">
            <FadeIn>
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                🇳🇬 Made fresh, the Naija way
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                {siteConfig.tagline}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 max-w-md text-lg text-brand-100">
                From steaming hot pap & golden akara to soft masa and crispy
                fries, Tasteat serves the Nigerian street flavors you crave,
                made fresh daily. Real taste. Real memories. Real Nigerian. At
                Tasteat, we don’t just serve food,we serve comfort, culture, and
                that unmistakable taste of home.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="rounded-full bg-white px-6 py-3.5 font-bold text-brand-700 shadow-sm transition-transform hover:scale-105"
                >
                  Browse the menu
                </Link>
                <a
                  href={whatsappLink(
                    `Hi ${siteConfig.name}! I'd like to make an order.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-call px-6 py-3.5 font-bold text-white shadow-sm transition-colors hover:bg-call-dark flex justify-center items-center gap-2"
                >
                  <span><IoCall /></span> Give us a call
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn
            delay={0.25}
            x={28}
            className="flex justify-center md:justify-end"
          >
            <HeroCarousel slides={heroSlides} />
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-extrabold text-ink">
            Explore by category
          </h2>
          <p className="mt-1 text-ink/60">Pick a craving and dive in.</p>
        </Reveal>
        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <StaggerItem key={cat}>
              <Link
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="block h-full rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-primary">{cat}</h3>
                <p className="mt-1 text-sm text-ink/60">
                  {categoryBlurbs[cat]}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
        <Reveal className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">
              Customer favorites
            </h2>
            <p className="mt-1 text-ink/60">
              The ones everyone keeps coming back for.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-primary hover:underline sm:block"
          >
            See full menu →
          </Link>
        </Reveal>
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="font-semibold text-primary hover:underline"
          >
            See full menu →
          </Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="rounded-3xl bg-accent-600 px-6 py-10 text-center text-white sm:py-12">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Hungry already?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-accent-50/90">
              Give us a call on WhatsApp and your order will be on its way.
            </p>
            <a
              href={whatsappLink(
                `Hi ${siteConfig.name}! I'd like to make an order.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 font-bold text-accent-700 transition-transform hover:scale-105"
            >
              📞 Call us on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* Location map */}
      <Reveal>
        <LocationMap />
      </Reveal>
    </>
  );
}
