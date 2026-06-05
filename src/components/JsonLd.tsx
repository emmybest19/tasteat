// Renders a JSON-LD structured-data block. Search engines read this to build
// rich results (business info, products, breadcrumbs).
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static/trusted, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
