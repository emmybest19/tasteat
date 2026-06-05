import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  getProductBySlug,
  formatPrice,
} from "@/data/products";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import WhatsAppOrderButton from "@/components/WhatsAppOrderButton";
import JsonLd from "@/components/JsonLd";
import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };

  const path = `/products/${product.slug}`;
  const image = product.images[0] ?? "/og.png";
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: `${product.name} · ${siteConfig.name}`,
      description: product.shortDescription,
      url: `${siteConfig.url}${path}`,
      images: [{ url: image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} · ${siteConfig.name}`,
      description: product.shortDescription,
      images: [image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const path = `/products/${product.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: [`${siteConfig.url}${product.images[0] ?? "/og.png"}`],
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.price && product.price > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "NGN",
            price: product.price,
            availability: "https://schema.org/InStock",
            url: `${siteConfig.url}${path}`,
            seller: { "@type": "Restaurant", name: siteConfig.name },
          },
        }
      : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Menu", item: `${siteConfig.url}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteConfig.url}${path}` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-ink/55">
        <Link href="/products" className="hover:text-primary">
          Menu
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/80">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <FadeIn x={-24} className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-surface">
          <ProductImage
            product={product}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full"
          />
        </FadeIn>

        {/* Details + order */}
        <FadeIn x={24} delay={0.1}>
          <span className="inline-block rounded-full bg-surface-active px-3 py-1 text-xs font-semibold text-primary">
            {product.category}
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 leading-relaxed text-ink/70">{product.description}</p>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <WhatsAppOrderButton product={product} />
          </div>
        </FadeIn>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-extrabold text-ink">You might also like</h2>
          </Reveal>
          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </div>
  );
}
