import type { Metadata } from "next";
import { siteConfig, whatsappLink } from "@/config/site";
import EmailForm, { type Field } from "@/components/EmailForm";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with Tami-Vic — message us on WhatsApp, email, or send us a note.",
};

const fields: Field[] = [
  { name: "name", label: "Your name", required: true, placeholder: "e.g. Ada Obi" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone (optional)", type: "tel", placeholder: "0801 234 5678" },
  { name: "message", label: "Message", type: "textarea", required: true, placeholder: "How can we help?" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">Contact us</h1>
        <p className="mt-2 text-ink/60">
          We&apos;d love to hear from you. Reach out any way that suits you.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
        {/* Quick contact */}
        <Reveal className="space-y-4">
          <a
            href={whatsappLink(`Hi ${siteConfig.name}!`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-call"
          >
            
            <span>
              <span className="block font-bold text-ink">Chat us up</span>
              <span className="text-sm text-ink/55">Tap, then hit the call icon</span>
            </span>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-brand-400"
          >
            <span className="text-2xl">✉️</span>
            <span>
              <span className="block font-bold text-ink">Email us</span>
              <span className="text-sm text-ink/55">{siteConfig.email}</span>
            </span>
          </a>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.12} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-ink">Send a message</h2>
          <EmailForm
            templateId={siteConfig.emailjs.contactTemplateId}
            fields={fields}
            subjectPrefix={`Contact — ${siteConfig.name}`}
            successMessage="Thanks for reaching out! We'll get back to you soon."
          />
        </Reveal>
      </div>
    </div>
  );
}
