import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import EmailForm, { type Field } from "@/components/EmailForm";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Submit a complaint",
  description: "Something not right with your order? Let TastEat know and we'll make it right.",
};

const fields: Field[] = [
  { name: "name", label: "Your name", required: true, placeholder: "e.g. Ada Obi" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { name: "phone", label: "Phone (optional)", type: "tel", placeholder: "0801 234 5678" },
  { name: "order_ref", label: "Order reference (optional)", placeholder: "Date / item ordered" },
  { name: "message", label: "What went wrong?", type: "textarea", required: true, placeholder: "Tell us what happened so we can make it right." },
];

export default function ComplaintsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Submit a complaint
        </h1>
        <p className="mt-2 text-ink/60">
          We&apos;re sorry something fell short. Tell us what happened and we&apos;ll do our best
          to make it right.
        </p>
      </header>

      <Reveal className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <EmailForm
          templateId={siteConfig.emailjs.complaintTemplateId}
          fields={fields}
          subjectPrefix={`Complaint — ${siteConfig.name}`}
          successMessage="Thank you — your complaint has been received. We'll be in touch shortly."
        />
      </Reveal>
    </div>
  );
}
