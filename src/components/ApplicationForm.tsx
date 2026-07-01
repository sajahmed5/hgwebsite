"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";

type Field = {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "date"
    | "textarea"
    | "select"
    | "areas"
    | "shifts"
    | "consent"
    | "heading";
  options?: string[];
  required?: boolean;
  full?: boolean;
  hint?: string;
  yesno?: boolean;
  showIf?: (v: Record<string, string>) => boolean;
};

// True if a move-in date is within the last 5 years (i.e. lived there < 5 yrs),
// which means we still need the previous address to cover 5 years of history.
function movedInRecently(dateStr?: string) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  return d > fiveYearsAgo;
}

const SHIFT_OPTIONS = [
  "Morning & Lunch (7am–3pm)",
  "Tea & bed (3pm–10pm)",
  "All day (7am–10pm)",
];

const steps: { title: string; intro?: string; fields: Field[] }[] = [
  {
    title: "About you",
    fields: [
      { name: "title", label: "Title", type: "select", options: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Mx", "Other"] },
      { name: "firstName", label: "First name", required: true },
      { name: "otherNames", label: "Other name(s)" },
      { name: "surname", label: "Surname", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "mobile", label: "Mobile number", type: "tel", required: true },
      { name: "landline", label: "Landline (optional)", type: "tel" },
      { name: "dob", label: "Date of birth", type: "date" },
      { name: "cityOfBirth", label: "City of birth" },
      { name: "countryOfBirth", label: "Country of birth" },
      { name: "nationality", label: "Nationality" },
      { name: "nameChanged", label: "Have you ever changed your name? (marriage, deed poll, etc.)", yesno: true, full: true },
    ],
  },
  {
    title: "Eligibility & role",
    fields: [
      { name: "rightToWork", label: "Do you have the legal right to work in the UK?", yesno: true, required: true },
      { name: "drivingLicence", label: "Do you hold a UK/EU driving licence?", yesno: true },
      { name: "availability", label: "Availability", type: "select", options: ["Full time", "Part time", "Either"] },
      { name: "shifts", label: "Preferred shift hours", type: "shifts", full: true },
      { name: "areas", label: "Preferred areas of work", type: "areas", full: true },
    ],
  },
  {
    title: "Address history",
    intro: "Please give your address history for the last 5 years.",
    fields: [
      { name: "_h1", label: "Current home address", type: "heading", full: true },
      { name: "address1Line1", label: "Address line 1", required: true, full: true },
      { name: "address1Line2", label: "Address line 2", full: true },
      { name: "address1City", label: "Town / City" },
      { name: "address1Postcode", label: "Postcode", required: true },
      { name: "address1Date", label: "Date you moved in", type: "date" },

      { name: "_h2", label: "Previous address", type: "heading", full: true, showIf: (v) => movedInRecently(v.address1Date) },
      { name: "address2Line1", label: "Address line 1", full: true, showIf: (v) => movedInRecently(v.address1Date) },
      { name: "address2Line2", label: "Address line 2", full: true, showIf: (v) => movedInRecently(v.address1Date) },
      { name: "address2City", label: "Town / City", showIf: (v) => movedInRecently(v.address1Date) },
      { name: "address2Postcode", label: "Postcode", showIf: (v) => movedInRecently(v.address1Date) },
      { name: "address2Date", label: "Date you moved in", type: "date", showIf: (v) => movedInRecently(v.address1Date) },

      { name: "_h3", label: "Earlier address", type: "heading", full: true, showIf: (v) => movedInRecently(v.address2Date) },
      { name: "address3Line1", label: "Address line 1", full: true, showIf: (v) => movedInRecently(v.address2Date) },
      { name: "address3Line2", label: "Address line 2", full: true, showIf: (v) => movedInRecently(v.address2Date) },
      { name: "address3City", label: "Town / City", showIf: (v) => movedInRecently(v.address2Date) },
      { name: "address3Postcode", label: "Postcode", showIf: (v) => movedInRecently(v.address2Date) },
      { name: "address3Date", label: "Date you moved in", type: "date", showIf: (v) => movedInRecently(v.address2Date) },
    ],
  },
  {
    title: "Experience & background",
    fields: [
      { name: "careExperience", label: "Previous care experience", type: "textarea", full: true, hint: "It's fine if you have none — just tell us a little about yourself." },
      { name: "whyCarer", label: "Why do you want to become a carer?", type: "textarea", full: true },
      { name: "languages", label: "Languages spoken (and fluency)", full: true },
      { name: "school", label: "School / college" },
      { name: "schoolYears", label: "Years attended", hint: "e.g. 2018–2021" },
      { name: "subjects", label: "Subjects & grades", type: "textarea", full: true },
      { name: "nokName", label: "Next of kin — name" },
      { name: "nokRelationship", label: "Next of kin — relationship" },
      { name: "nokMobile", label: "Next of kin — mobile" },
      { name: "nokAddress", label: "Next of kin — address", type: "textarea", full: true },
    ],
  },
  {
    title: "Employment history",
    intro: "Starting with your most recent job, covering the last 10 years.",
    fields: [
      { name: "empEmployer", label: "Most recent employer" },
      { name: "empRole", label: "Role" },
      { name: "empFrom", label: "Employed from", type: "date" },
      { name: "empTo", label: "Employed to", type: "date" },
      { name: "empDuties", label: "Duties & responsibilities", type: "textarea", full: true },
      { name: "empReason", label: "Reason for leaving", full: true },
      { name: "empPrevious", label: "Earlier employment (last 10 years)", type: "textarea", full: true, hint: "List any other roles, most recent first." },
      { name: "empGaps", label: "Any gaps in employment? Please explain", type: "textarea", full: true },
    ],
  },
  {
    title: "References & declaration",
    intro: "Two referees — one should be your most recent employer.",
    fields: [
      { name: "_r1", label: "Reference 1", type: "heading", full: true },
      { name: "ref1Name", label: "Name", required: true },
      { name: "ref1Position", label: "Position" },
      { name: "ref1Org", label: "Organisation" },
      { name: "ref1Email", label: "Email", type: "email" },
      { name: "ref1Phone", label: "Telephone", type: "tel" },
      { name: "ref1Relationship", label: "Relationship to you" },
      { name: "_r2", label: "Reference 2", type: "heading", full: true },
      { name: "ref2Name", label: "Name" },
      { name: "ref2Position", label: "Position" },
      { name: "ref2Org", label: "Organisation" },
      { name: "ref2Email", label: "Email", type: "email" },
      { name: "ref2Phone", label: "Telephone", type: "tel" },
      { name: "ref2Relationship", label: "Relationship to you" },
      { name: "consent", label: "consent", type: "consent", full: true },
    ],
  },
];

const inputCls =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-brand-900 placeholder-brand-900/40 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

const pillCls = (on: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    on
      ? "bg-brand-600 text-white"
      : "border border-brand-200 bg-white text-brand-800 hover:bg-brand-50"
  }`;

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [areas, setAreas] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);
  const [nameChanges, setNameChanges] = useState([{ name: "", date: "" }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLDivElement>(null);

  const set = (name: string, v: string) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const toTop = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const visibleFields = () =>
    steps[step].fields.filter((f) => !f.showIf || f.showIf(values));

  const validateStep = () => {
    const e: Record<string, string> = {};
    for (const f of visibleFields()) {
      if (f.type === "heading" || f.type === "consent") continue;
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) e[f.name] = "This field is required.";
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        e[f.name] = "Please enter a valid email address.";
    }
    if (step === 5 && values.consent !== "yes")
      e.consent = "Please confirm the declaration to submit.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
      toTop();
    }
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    toTop();
  };

  async function submit() {
    if (!validateStep()) return;
    setStatus("sending");
    const joinAddr = (p: string) =>
      [
        values[`${p}Line1`],
        values[`${p}Line2`],
        values[`${p}City`],
        values[`${p}Postcode`],
      ]
        .filter(Boolean)
        .join(", ");
    const payload = {
      ...values,
      areas: areas.join(", "),
      shiftHours: shifts.join(", "),
      nameChangeDetails:
        values.nameChanged === "Yes"
          ? nameChanges
              .filter((n) => n.name || n.date)
              .map((n) => `${n.name || "—"} (${n.date || "—"})`)
              .join("; ")
          : "",
      address1: joinAddr("address1"),
      address2: joinAddr("address2"),
      address3: joinAddr("address3"),
    };
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        toTop();
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
      <div ref={formRef} className="scroll-mt-28 rounded-2xl border border-brand-200 bg-brand-50 p-10 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-4 text-2xl font-bold text-brand-900">
          Application received!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-brand-900/70">
          Thank you for applying to join HG Care. Our recruitment team will review
          your application and be in touch soon. If anything&apos;s urgent, call us
          on{" "}
          <a href={site.phoneHref} className="font-semibold text-brand-700">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const current = steps[step];
  const pct = Math.round(((step + 1) / steps.length) * 100);

  const renderField = (f: Field) => {
    if (f.showIf && !f.showIf(values)) return null;

    if (f.type === "heading") {
      return (
        <h3 key={f.name} className="sm:col-span-2 border-b border-brand-100 pb-2 text-sm font-bold uppercase tracking-wide text-brand-700">
          {f.label}
        </h3>
      );
    }

    if (f.type === "areas" || f.type === "shifts") {
      const opts = f.type === "areas" ? site.areas : SHIFT_OPTIONS;
      const sel = f.type === "areas" ? areas : shifts;
      const setSel = f.type === "areas" ? setAreas : setShifts;
      return (
        <fieldset key={f.name} className="sm:col-span-2">
          <legend className="text-sm font-semibold text-brand-900">{f.label}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {opts.map((o) => {
              const on = sel.includes(o);
              return (
                <button
                  type="button"
                  key={o}
                  onClick={() =>
                    setSel((prev) => (on ? prev.filter((x) => x !== o) : [...prev, o]))
                  }
                  className={pillCls(on)}
                >
                  {on ? "✓ " : ""}
                  {o}
                </button>
              );
            })}
          </div>
        </fieldset>
      );
    }

    if (f.type === "consent") {
      return (
        <label key={f.name} className="flex cursor-pointer items-start gap-3 rounded-2xl bg-sand p-5 sm:col-span-2">
          <input
            type="checkbox"
            checked={values.consent === "yes"}
            onChange={(e) => set("consent", e.target.checked ? "yes" : "")}
            className="mt-1 h-5 w-5 shrink-0 accent-brand-600"
          />
          <span className="text-sm text-brand-900/80">
            I declare that the information I&apos;ve provided is correct, and I
            consent to HG Care contacting my referees and processing my details for
            recruitment in line with the{" "}
            <Link href="/privacy" className="font-semibold text-brand-700 underline" target="_blank">
              privacy policy
            </Link>
            .
            {errors.consent && (
              <span className="mt-1 block font-semibold text-accent-600">{errors.consent}</span>
            )}
          </span>
        </label>
      );
    }

    if (f.yesno) {
      return (
        <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
          <span className="block text-sm font-semibold text-brand-900">{f.label}</span>
          <div className="mt-2 flex gap-2">
            {["Yes", "No"].map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => set(f.name, opt)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  values[f.name] === opt
                    ? "bg-brand-600 text-white"
                    : "border border-brand-200 bg-white text-brand-800 hover:bg-brand-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors[f.name] && <p className="mt-1 text-sm text-accent-600">{errors[f.name]}</p>}

          {/* Repeatable previous names when "Yes" */}
          {f.name === "nameChanged" && values.nameChanged === "Yes" && (
            <div className="mt-4 space-y-3 rounded-2xl bg-sand p-4">
              <p className="text-sm font-semibold text-brand-900">
                Previous name(s) &amp; date of change
              </p>
              {nameChanges.map((nc, i) => (
                <div key={i} className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={nc.name}
                    onChange={(e) =>
                      setNameChanges((arr) => arr.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                    }
                    placeholder="Previous name"
                    className={inputCls}
                  />
                  <input
                    type="date"
                    value={nc.date}
                    onChange={(e) =>
                      setNameChanges((arr) => arr.map((x, j) => (j === i ? { ...x, date: e.target.value } : x)))
                    }
                    className={`${inputCls} sm:w-48`}
                  />
                  {nameChanges.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setNameChanges((arr) => arr.filter((_, j) => j !== i))}
                      aria-label="Remove"
                      className="shrink-0 rounded-xl border border-brand-200 px-3 text-brand-700 hover:bg-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setNameChanges((arr) => [...arr, { name: "", date: "" }])}
                className="text-sm font-semibold text-brand-700 hover:text-brand-900"
              >
                + Add another name
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
        <label htmlFor={f.name} className="block text-sm font-semibold text-brand-900">
          {f.label} {f.required && <span className="text-accent-600">*</span>}
        </label>
        {f.type === "textarea" ? (
          <textarea id={f.name} rows={3} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`mt-1.5 ${inputCls}`} />
        ) : f.type === "select" ? (
          <select id={f.name} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`mt-1.5 ${inputCls}`}>
            <option value="">Please choose…</option>
            {f.options?.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input id={f.name} type={f.type ?? "text"} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`mt-1.5 ${inputCls}`} />
        )}
        {f.hint && !errors[f.name] && <p className="mt-1 text-xs text-brand-900/50">{f.hint}</p>}
        {errors[f.name] && <p className="mt-1 text-sm text-accent-600">{errors[f.name]}</p>}
      </div>
    );
  };

  return (
    <div ref={formRef} className="scroll-mt-28 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm sm:p-9">
      <div className="mb-7">
        <div className="flex items-center justify-between text-sm font-semibold text-brand-700">
          <span>Step {step + 1} of {steps.length} — {current.title}</span>
          <span>{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100">
          <div className="h-full rounded-full bg-accent-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {current.intro && <p className="mb-5 text-sm text-brand-900/70">{current.intro}</p>}

      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden value={values.company ?? ""} onChange={(e) => set("company", e.target.value)} />

      <div className="grid gap-5 sm:grid-cols-2">{current.fields.map(renderField)}</div>

      {status === "error" && (
        <p className="mt-5 rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
          Sorry — something went wrong submitting your application. Please try again, or email us your CV directly.
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={back} disabled={step === 0} className="rounded-full px-5 py-3 text-sm font-semibold text-brand-700 disabled:opacity-0">
          ← Back
        </button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="rounded-full bg-brand-600 px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700">
            Continue →
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={status === "sending"} className="rounded-full bg-accent-500 px-7 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 disabled:opacity-70">
            {status === "sending" ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>
    </div>
  );
}
