"use client";

import { useState } from "react";

type Errors = Record<string, string>;

const field =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-900 placeholder-brand-900/40 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const label = "block text-sm font-semibold text-brand-900";

export default function JobApplicationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      const body = await res.json().catch(() => ({}));
      if (body.errors) {
        setErrors(body.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <div className="text-4xl">🎉</div>
        <h3 className="mt-3 text-xl font-bold text-brand-900">
          Application received!
        </h3>
        <p className="mt-2 text-brand-900/70">
          Thank you for your interest in joining HG Care. Our recruitment team
          will review your application and be in touch soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-white"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ca-name" className={label}>
            Full name
          </label>
          <input id="ca-name" name="name" className={`mt-1.5 ${field}`} placeholder="Jane Smith" />
          {errors.name && <p className="mt-1 text-sm text-accent-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ca-phone" className={label}>
            Phone number
          </label>
          <input id="ca-phone" name="phone" className={`mt-1.5 ${field}`} placeholder="07123 456789" />
          {errors.phone && <p className="mt-1 text-sm text-accent-600">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="ca-email" className={label}>
          Email address
        </label>
        <input id="ca-email" name="email" type="email" className={`mt-1.5 ${field}`} placeholder="you@example.com" />
        {errors.email && <p className="mt-1 text-sm text-accent-600">{errors.email}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ca-role" className={label}>
            Role you&apos;re interested in
          </label>
          <select id="ca-role" name="role" className={`mt-1.5 ${field}`} defaultValue="Care Assistant">
            <option>Care Assistant</option>
            <option>Senior Carer</option>
            <option>Live-in Carer</option>
            <option>Support Worker (Children&apos;s)</option>
            <option>Night Carer</option>
            <option>Other / not sure</option>
          </select>
        </div>
        <div>
          <label htmlFor="ca-exp" className={label}>
            Care experience
          </label>
          <select id="ca-exp" name="experience" className={`mt-1.5 ${field}`} defaultValue="No experience (full training given)">
            <option>No experience (full training given)</option>
            <option>Less than 1 year</option>
            <option>1–3 years</option>
            <option>3+ years</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="ca-message" className={label}>
          Tell us about yourself <span className="font-normal text-brand-900/50">(optional)</span>
        </label>
        <textarea id="ca-message" name="message" rows={4} className={`mt-1.5 ${field}`} placeholder="A little about you and why you'd like to join HG Care…" />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
          Sorry — something went wrong. Please try again or email us your CV
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
