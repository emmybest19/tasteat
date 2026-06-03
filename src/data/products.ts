// ─────────────────────────────────────────────────────────────────────────
// Product catalog.
//
// To add / edit a product: copy a block below and change the fields.
// • price: in Naira. Set to null to show "Contact for price".
//          (Placeholder prices are in for now — update them with real values.)
// • images: file paths inside /public. Add your photos to /public/products
//           and reference them like "/products/akara.jpg".
//           If left empty, a placeholder graphic is shown automatically.
// • category: must be one of the CATEGORIES below.
// ─────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Breakfast",
  "Northern",
  "Snacks & Sides",
  "Spices",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number | null; // Naira; null => "Contact for price"
  category: Category;
  images: string[];
  featured?: boolean;
  // Optional per-item options the customer can choose (e.g. fries seasoning).
  options?: { label: string; choices: string[] }[];
};

export const products: Product[] = [
  {
    id: "akara",
    slug: "akara",
    name: "Akara",
    shortDescription: "Crispy golden bean cakes — soft inside, crunchy outside.",
    description:
      "Golden, crispy bean cakes fried to perfection. Soft inside, crunchy outside. Best enjoyed hot with pap or bread for that classic Naija breakfast.",
    price: 0,
    category: "Breakfast",
    images: ["/images/akara.jpeg"],
    featured: true,
  },
  {
    id: "pap",
    slug: "pap",
    name: "Pap",
    shortDescription: "Smooth, creamy corn pudding served steaming hot.",
    description:
      "Smooth, creamy corn pudding served steaming hot. Mild and comforting, it's the perfect match for akara, moi moi, or golden yam. Just like mama used to make.",
    price: 0,
    category: "Breakfast",
    images: ["/images/pap.jpeg"],
    featured: true,
  },
  {
    id: "masa-and-soup",
    slug: "masa-and-soup",
    name: "Masa & Soup",
    shortDescription: "Fluffy rice cakes with rich, spicy soup.",
    description:
      "Fluffy rice cakes with a light, spongy bite, served with rich, spicy soup. A Northern Nigerian favorite that fills your belly and warms your soul.",
    price: 0,
    category: "Northern",
    images: ["/images/masa.jpeg"],
    featured: true,
  },
  {
    id: "moi-moi",
    slug: "moi-moi",
    name: "Moi Moi",
    shortDescription: "Savory steamed bean pudding — protein-rich comfort.",
    description:
      "Steamed bean pudding packed with flavor — soft, savory, and melt-in-your-mouth. Loaded with fish, egg, or plain, it's protein-rich comfort in every spoon.",
    price: 0,
    category: "Breakfast",
    images: ["/images/moi.jpeg"],
    options: [{ label: "Style", choices: ["Plain", "Egg", "Fish"] }],
  },
  {
    id: "golden-yam",
    slug: "golden-yam",
    name: "Golden Yam",
    shortDescription: "Fried yam slices with egg — crispy edges, soft center.",
    description:
      "Thick yam slices, lightly seasoned and fried with eggs till golden brown. Crispy edges, soft center. Dip it in sauce or yaji for that extra kick.",
    price: 0,
    category: "Breakfast",
    images: ["/images/golden-yam.jpeg"],
  },
  {
    id: "yaji",
    slug: "yaji",
    name: "Yaji",
    shortDescription: "Our signature suya spice blend — smoky, peppery, nutty.",
    description:
      "Our signature suya spice blend — smoky, peppery, nutty. Sprinkle on masa, yam, or fries and watch the flavor come alive. Naija heat in every pinch.",
    price: 0,
    category: "Spices",
    images: ["/images/yaji.jpeg"],
    featured: true,
  },
  {
    id: "yam-fries",
    slug: "yam-fries",
    name: "Yam Fries",
    shortDescription: "Crispy yam fries — salted, spiced, fried fresh.",
    description:
      "Crispy yam fries, salted and spiced, fried fresh to order. Chop alone or pair with yaji for that extra kick.",
    price: 0,
    category: "Snacks & Sides",
    options: [{ label: "Seasoning", choices: ["Salted", "Spiced", "With Yaji"] }],
    images: ["/images/friend-yam1.jpeg", "/images/fried-yam2.jpeg"],
  },
  {
    id: "potato-fries",
    slug: "potato-fries",
    name: "Potato Fries",
    shortDescription: "Golden potato fries — salted, spiced, fried fresh.",
    description:
      "Golden potato fries, salted and spiced, fried fresh to order. Chop alone or pair with yaji for that extra kick.",
    price: 0,
    category: "Snacks & Sides",
    options: [{ label: "Seasoning", choices: ["Salted", "Spiced", "With Yaji"] }],
    images: [],
  },
  {
    id: "plantain-fries",
    slug: "plantain-fries",
    name: "Plantain Fries",
    shortDescription: "Sweet plantain fries — salted, spiced, fried fresh.",
    description:
      "Sweet plantain fries, fried fresh to order. Salted or spiced, they're the perfect snack on their own or paired with yaji.",
    price: 0,
    category: "Snacks & Sides",
    options: [{ label: "Seasoning", choices: ["Salted", "Spiced", "With Yaji"] }],
    images: [],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/** "₦2,500" or "Contact for price" when price is null. "Contact for price" also for 0 placeholders. */
export function formatPrice(price: number | null): string {
  if (price === null || price === 0) return "Contact for price";
  return `₦${price.toLocaleString("en-NG")}`;
}
