import { siteConfig } from "@/config/site";
import { FaLocationDot } from "react-icons/fa6";

// Embedded Google Map (no API key required). To point it at the exact spot,
// set siteConfig.location.mapQuery to a full street address or "lat,lng".
export default function LocationMap() {
  const { address, mapQuery } = siteConfig.location;
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-ink">Find us</h2>
          <p className="mt-1 flex items-center gap-1.5 text-ink/65">
            <span aria-hidden="true"> <FaLocationDot /> </span> {address}
          </p>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          Get directions →
        </a>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-line shadow-sm">
        <iframe
          title={`Map showing ${siteConfig.name} location`}
          src={embedSrc}
          width="100%"
          height="380"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full border-0"
        />
      </div>
    </section>
  );
}
