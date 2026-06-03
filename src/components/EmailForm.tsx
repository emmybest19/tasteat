"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { siteConfig } from "@/config/site";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
};

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Generic contact/complaint form.
 * Sends through EmailJS when configured; otherwise gracefully falls back to
 * opening the visitor's email client with the message prefilled, so the form
 * is never a dead end even before EmailJS keys are added.
 */
export default function EmailForm({
  templateId,
  fields,
  subjectPrefix,
  successMessage,
}: {
  templateId: string;
  fields: Field[];
  subjectPrefix: string;
  successMessage: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { serviceId, publicKey } = siteConfig.emailjs;
  const configured = Boolean(serviceId && publicKey && templateId);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!configured) {
      // Fallback: build a mailto link from the field values.
      const lines = fields.map((f) => `${f.label}: ${data.get(f.name) ?? ""}`);
      const body = encodeURIComponent(lines.join("\n"));
      const subject = encodeURIComponent(subjectPrefix);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      form.reset();
      return;
    }

    try {
      setStatus("sending");
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent-500/30 bg-accent-500/10 p-8 text-center">
        <p className="text-4xl">✅</p>
        <p className="mt-3 text-lg font-bold text-ink">{successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="mb-1.5 block text-sm font-semibold text-ink">
            {f.label}
            {f.required && <span className="text-brand-600"> *</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea
              id={f.name}
              name={f.name}
              required={f.required}
              placeholder={f.placeholder}
              rows={5}
              className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          ) : (
            <input
              id={f.name}
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          )}
        </div>
      ))}

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Couldn&apos;t send: {errorMsg}. Please try again or reach us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      {/* {!configured && (
        <p className="text-center text-xs text-ink/45">
          Submitting will open your email app. (Add EmailJS keys to send directly from the site.)
        </p>
      )} */}
    </form>
  );
}
