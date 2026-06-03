"use client";

import { useState } from "react";
import { type Product, formatPrice } from "@/data/products";
import { siteConfig, whatsappLink } from "@/config/site";

/**
 * Order control for a product detail page. Lets the customer pick a quantity
 * and any product options, then opens WhatsApp with a prefilled order message.
 */
export default function WhatsAppOrderButton({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries((product.options ?? []).map((o) => [o.label, o.choices[0]])),
  );

  const optionText = Object.entries(selected)
    .map(([label, choice]) => `${label}: ${choice}`)
    .join(", ");

  const message =
    `Hi ${siteConfig.name}! I'd like to order:\n` +
    `• ${product.name}${optionText ? ` (${optionText})` : ""} ×${qty}\n` +
    `Price: ${formatPrice(product.price)}`;

  return (
    <div className="space-y-5">
      {(product.options ?? []).map((opt) => (
        <div key={opt.label}>
          <label className="mb-2 block text-sm font-semibold text-ink">{opt.label}</label>
          <div className="flex flex-wrap gap-2">
            {opt.choices.map((choice) => {
              const active = selected[opt.label] === choice;
              return (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setSelected((s) => ({ ...s, [opt.label]: choice }))}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line bg-surface text-ink/80 hover:border-brand-400"
                  }`}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">Quantity</label>
        <div className="inline-flex items-center rounded-full border border-line bg-surface">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center text-xl font-bold text-primary disabled:opacity-40"
            disabled={qty <= 1}
          >
            −
          </button>
          <span className="w-10 text-center text-lg font-bold">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="grid h-11 w-11 place-items-center text-xl font-bold text-primary"
          >
            +
          </button>
        </div>
      </div>

      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-call px-6 py-4 text-lg font-bold text-white shadow-sm transition-colors hover:bg-call-dark"
      >
        Order now
      </a>
      {/* <p className="text-center text-xs text-ink/50">
        Opens WhatsApp — tap the call icon to talk to us (your order details are
        prefilled too).
      </p> */}
    </div>
  );
}
