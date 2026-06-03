import Link from "next/link";
import { siteConfig, whatsappLink } from "@/config/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url);

  return (
    <footer className="mt-16 border-t border-line bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="inline-flex rounded-xl bg-cream p-3 shadow-sm">
            <Logo className="h-14 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-brand-200">{siteConfig.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">Menu</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact us</Link></li>
            <li><Link href="/complaints" className="hover:text-white">Submit a complaint</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-white">Get in touch</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={whatsappLink(`Hi ${siteConfig.name}!`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Call us on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-4 text-sm capitalize">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-brand-800 py-5 text-center text-xs text-brand-300">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
