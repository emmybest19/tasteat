import { Suspense } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductCatalog from "@/components/ProductCatalog";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse the full Tami-Vic menu — search, filter by category and order on WhatsApp.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Our Menu</h1>
        <p className="mt-2 text-ink/60">
          Search, pick a category, and order your favorites on meal.
        </p>
      </header>

      <Suspense fallback={<div className="py-20 text-center text-ink/50">Loading menu…</div>}>
        <ProductCatalog products={products} />
      </Suspense>
    </div>
  );
}
