import Link from "next/link";
import { type Product, formatPrice } from "@/data/products";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-900/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductImage
          product={product}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Soft gradient for depth + badge legibility */}
        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1 flex-1 text-sm text-ink/65">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-primary">{formatPrice(product.price)}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 transition-transform duration-300 group-hover:translate-x-0.5">
            View
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
