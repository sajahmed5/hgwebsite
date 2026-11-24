"use client";

import { useEffect, useRef, useState } from "react";

type Errors = Record<string, string>;

const field =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-brand-900 placeholder-brand-900/40 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const label = "block text-sm font-semibold text-brand-900";

// Cloudflare Turnstile site key (safe to expose publicly). When unset, the
// widget is skipped entirely so the form still works in local dev / setup.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "auto" | "light" | "dark";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Errors>({});
  const [token, setToken] = useState("");

  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Load and render the Turnstile widget (only when a site key is configured).
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    function render() {
      if (
        !window.turnstile ||
        !widgetRef.current ||
        widgetIdRef.current !== null
      )
        return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY!,
        theme: "light",
        callback: (t) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    }

    if (window.turnstile) {
      render();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-turnstile]"
    );
    if (existing) {
      existing.addEventListener("load", render);
      return () => existing.removeEventListener("load", render);
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.turnstile = "true";
    script.addEventListener("load", render);
    document.head.appendChild(script);
    return () => script.removeEventListener("load", render);
  }, []);

  function resetWidget() {
    setToken("");
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    if (TURNSTILE_SITE_KEY) payload["turnstileToken"] = token;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        resetWidget();
        return;
      }
      const body = await res.json().catch(() => ({}));
      // A used/expired token can't be reused — reset so they can retry.
      resetWidget();
      if (body.errors) {
        setErrors(body.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      resetWidget();
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <div className="text-4xl">💚</div>
        <h3 className="mt-3 text-xl font-bold text-brand-900">Thank you!</h3>
        <p className="mt-2 text-brand-900/70">
          Your enquiry has been received. A member of our team will be in touch
          very soon. If it&apos;s urgent, please call us on the number above.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full border border-brand-200 px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-white"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const needsVerification = Boolean(TURNSTILE_SITE_KEY);
  const submitDisabled =
    status === "sending" || (needsVerification && !token);

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input id="name" name="name" className={`mt-1.5 ${field}`} placeholder="Jane Smith" />
          {errors.name && <p className="mt-1 text-sm text-accent-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone number
          </label>
          <input id="phone" name="phone" className={`mt-1.5 ${field}`} placeholder="07123 456789" />
          {errors.phone && <p className="mt-1 text-sm text-accent-600">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email address
        </label>
        <input id="email" name="email" type="email" className={`mt-1.5 ${field}`} placeholder="you@example.com" />
        {errors.email && <p className="mt-1 text-sm text-accent-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="enquiryType" className={label}>
          What can we help with?
        </label>
        <select id="enquiryType" name="enquiryType" className={`mt-1.5 ${field}`} defaultValue="Arranging care">
          <option>Arranging care</option>
          <option>Dementia / memory care</option>
          <option>Live-in or 24-hour care</option>
          <option>Children&apos;s services</option>
          <option>HG Wellbeing</option>
          <option>Careers / joining the team</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          How can we help?
        </label>
        <textarea id="message" name="message" rows={5} className={`mt-1.5 ${field}`} placeholder="Tell us a little about the care you're looking for…" />
        {errors.message && <p className="mt-1 text-sm text-accent-600">{errors.message}</p>}
      </div>

      {needsVerification && (
        <div>
          <div ref={widgetRef} className="min-h-[65px]" />
          {errors.turnstile && (
            <p className="mt-1 text-sm text-accent-600">{errors.turnstile}</p>
          )}
        </div>
      )}

      {status === "error" && (
        <p className="rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
          Sorry — something went wrong sending your enquiry. Please try again or
          call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={submitDisabled}
        className="w-full rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-center text-xs text-brand-900/50">
        We&apos;ll only use your details to respond to your enquiry.
      </p>
    </form>
  );
}
