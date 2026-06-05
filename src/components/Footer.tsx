import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { siteConfig, whatsappLink } from "@/config/site";
import Logo from "./Logo";

const socialMeta: Record<string, { label: string; Icon: IconType }> = {
  instagram: { label: "Instagram", Icon: FaInstagram },
  facebook: { label: "Facebook", Icon: FaFacebookF },
  tiktok: { label: "TikTok", Icon: FaTiktok },
  x: { label: "X", Icon: FaXTwitter },
  youtube: { label: "YouTube", Icon: FaYoutube },
};

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.socials).filter(
    ([name, url]) => url && socialMeta[name],
  );

  return (
    <footer className="mt-16 border-t border-line bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="inline-flex rounded-xl bg-cream p-3 shadow-sm">
            <Logo className="h-14 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-brand-200">{siteConfig.tagline}</p>
          <p className="mt-2 max-w-xs text-xs text-brand-300">
            TastEat Foods — authentic Nigerian comfort food (akara, pap, moi moi,
            masa, golden yam &amp; yaji) freshly made in Abuja.
          </p>

          {socials.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                Follow us
              </h3>
              <ul className="mt-3 flex flex-wrap gap-3">
                {socials.map(([name, url]) => {
                  const { label, Icon } = socialMeta[name];
                  return (
                    <li key={name}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="grid h-10 w-10 place-items-center rounded-full bg-brand-800 text-brand-100 transition-colors hover:bg-accent-500 hover:text-white"
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
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
        </div>
      </div>

      <div className="border-t border-brand-800 py-5 text-center text-xs text-brand-300">
        © {year} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
