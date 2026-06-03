import Image from "next/image";

// The official TastEat logo (transparent PNG lockup: wordmark + tagline).
// Control size via the `className` height, e.g. "h-10 w-auto".
export default function Logo({
  className = "h-10 w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo-trimmed.png"
      alt="TastEat — Breakfast, Akara & More"
      width={448}
      height={138}
      priority={priority}
      className={className}
    />
  );
}
