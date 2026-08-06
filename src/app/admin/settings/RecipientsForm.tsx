"use client";

import { useState } from "react";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function RecipientsForm({ initial }: { initial: string[] }) {
  const [emails, setEmails] = useState<string[]>(initial);
  const [baseline, setBaseline] = useState<string[]>(initial);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  const dirty = JSON.stringify(emails) !== JSON.stringify(baseline);

  const add = () => {
    const v = input.trim();
    if (!v) return;
    if (!isEmail(v)) {
      setError(`“${v}” isn’t a valid email.`);
      return;
    }
    if (emails.some((e) => e.toLowerCase() === v.toLowerCase())) {
      setInput("");
      return;
    }
    setEmails((prev) => [...prev, v]);
    setInput("");
    setError("");
    setStatus("idle");
  };

  const remove = (email: string) => {
    setEmails((prev) => prev.filter((e) => e !== email));
    setStatus("idle");
  };

  async function save() {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/recipients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipients: emails }),
      });
      if (res.ok) {
        setBaseline(emails);
        setStatus("saved");
        return;
      }
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Could not save.");
      setStatus("error");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="mt-5 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm">
      {emails.length === 0 ? (
        <p className="text-sm text-accent-600">Add at least one recipient.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {emails.map((email) => (
            <li
              key={email}
              className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-800"
            >
              {email}
              <button
                type="button"
                aria-label={`Remove ${email}`}
                onClick={() => remove(email)}
                className="text-brand-500 hover:text-accent-600"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder="name@hgcare.co.uk"
          className="w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-brand-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="button"
          onClick={add}
          className="shrink-0 rounded-xl border border-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
        >
          Add
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-accent-600">{error}</p>}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={status === "saving" || emails.length === 0 || !dirty}
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:opacity-50"
        >
          {status === "saving" ? "Saving…" : "Save changes"}
        </button>
        {status === "saved" && !dirty && (
          <span className="text-sm font-semibold text-brand-700">Saved ✓</span>
        )}
      </div>
    </div>
  );
}
