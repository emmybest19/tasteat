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
import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

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
  return {
    title: product.name,
    description: product.shortDescription,
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
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
