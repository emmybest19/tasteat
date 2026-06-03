"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, type Product } from "@/data/products";
import ProductCard from "./ProductCard";

import { IoSearchOutline } from "react-icons/io5";
type SortKey = "default" | "name" | "price-asc" | "price-desc";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "name", label: "Name (A–Z)" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ALL = "All";

export default function ProductCatalog({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Category seeds from the URL (?category=Breakfast) so links from the
  // home page land pre-filtered. Search & sort live in local state.
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState<string>(
    initialCategory && (CATEGORIES as readonly string[]).includes(initialCategory)
      ? initialCategory
      : ALL,
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  function selectCategory(cat: string) {
    setCategory(cat);
    // Keep the URL in sync so the filtered view is shareable / bookmarkable.
    const params = new URLSearchParams(searchParams.toString());
    if (cat === ALL) params.delete("category");
    else params.set("category", cat);
    const qs = params.toString();
    router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = category === ALL || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    const priceOf = (p: Product) => (p.price === null ? Infinity : p.price);
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return priceOf(a) - priceOf(b);
        case "price-desc":
          return priceOf(b) - priceOf(a);
        default:
          return Number(!!b.featured) - Number(!!a.featured);
      }
    });
    return list;
  }, [products, category, query, sort]);

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink/40">
          <IoSearchOutline />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a meal…"
          className="w-full rounded-full border border-line bg-surface py-3.5 pl-12 pr-4 text-base text-ink shadow-sm outline-none transition-colors placeholder:text-ink/40 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
      </div>

      {/* Category pills + sort */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {[ALL, ...CATEGORIES].map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                    : "border-line bg-surface text-ink/70 hover:border-brand-400 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <label className="flex shrink-0 items-center gap-2 text-sm text-ink/70">
          <span className="font-semibold">Sort:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-line bg-surface px-3 py-2 text-sm font-semibold text-ink outline-none focus:border-brand-500"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Results count */}
      <p className="mt-5 text-sm text-ink/55">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
        {category !== ALL && ` in ${category}`}
        {query && ` matching "${query}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div layout className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-surface py-16 text-center">
          <p className="text-4xl">🍽️</p>
          <p className="mt-3 font-semibold text-ink">No meals match your search.</p>
          <p className="mt-1 text-sm text-ink/55">Try a different word or category.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              selectCategory(ALL);
              setSort("default");
            }}
            className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
