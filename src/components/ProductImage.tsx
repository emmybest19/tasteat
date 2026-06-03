import Image from "next/image";
import type { Product } from "@/data/products";

/**
 * Renders the product photo, or an appetizing branded placeholder when no
 * image has been added yet. Drop real photos into /public/products and list
 * them in the product's `images` array to replace the placeholder.
 */
export default function ProductImage({
  product,
  className = "",
  sizes,
  priority,
}: {
  product: Product;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = product.images[0];

  if (!src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-linear-to-br from-accent-100 via-accent-200 to-accent-300 text-accent-800 ${className}`}
        aria-label={product.name}
      >
        <span className="text-4xl">🍽️</span>
        <span className="mt-1 px-2 text-center text-sm font-bold">{product.name}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={product.name}
      fill
      sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
