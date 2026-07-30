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
    | "month"
    | "textarea"
    | "select"
    | "selectOther"
    | "areas"
    | "shifts"
    | "consent"
    | "heading"
    | "note"
    | "addresses"
    | "jobs"
    | "gaps";
  options?: string[];
  required?: boolean;
  full?: boolean;
  hint?: string;
  yesno?: boolean;
  yesnoOptions?: string[];
  showIf?: (v: Record<string, string>) => boolean;
};

const SHIFT_OPTIONS = [
  "Morning & Lunch (7am–3pm)",
  "Tea & bed (3pm–10pm)",
  "All day (7am–10pm)",
];

const RELIGION_OPTIONS = [
  "No religion",
  "Christian",
  "Muslim",
  "Hindu",
  "Sikh",
  "Jewish",
  "Buddhist",
  "Prefer not to say",
  "Other (please specify)",
];

const ETHNICITY_OPTIONS = [
  "White – British",
  "White – Irish",
  "White – any other background",
  "Asian – Indian",
  "Asian – Pakistani",
  "Asian – Bangladeshi",
  "Asian – Chinese",
  "Asian – any other background",
  "Black – African",
  "Black – Caribbean",
  "Black – any other background",
  "Mixed / multiple ethnic groups",
  "Arab",
  "Prefer not to say",
  "Other (please specify)",
];

const GENDER_OPTIONS = [
  "Female",
  "Male",
  "Prefer to self-describe",
  "Prefer not to say",
];

const MARITAL_OPTIONS = [
  "Single",
  "Married",
  "Civil partnership",
  "Cohabiting",
  "Divorced",
  "Separated",
  "Widowed",
  "Prefer not to say",
];

const HEARD_OPTIONS = [
  "HG Care website",
  "Indeed",
  "Facebook",
  "Word of mouth",
  "Job Centre",
  "Other (please specify)",
];

// Show a free-text "please specify" box for these choices.
const needsSpecify = (v: string) =>
  /please specify|self-describe/i.test(v || "");

const steps: { title: string; intro?: string; fields: Field[] }[] = [
  {
    title: "About you",
    fields: [
      { name: "title", label: "Title", type: "select", options: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Mx", "Other"] },
      { name: "firstName", label: "First name", required: true },
      { name: "surname", label: "Surname", required: true },
      { name: "otherNames", label: "Any previous names (maiden name / deed poll)", full: true, hint: "Needed for your DBS check — write “None” if this doesn’t apply." },
      { name: "dob", label: "Date of birth", type: "date" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "mobile", label: "Mobile number", type: "tel", required: true, hint: "Numbers only, e.g. 07123 456789" },
      { name: "landline", label: "Home landline (if any)", type: "tel" },
      { name: "cityOfBirth", label: "Town / city of birth" },
      { name: "countryOfBirth", label: "Country of birth" },
      { name: "nationality", label: "Nationality" },
    ],
  },
  {
    title: "Eligibility & availability",
    fields: [
      { name: "rightToWork", label: "Do you have the legal right to work in the UK?", yesno: true, required: true },
      { name: "drivingLicence", label: "Do you hold a UK/EU driving licence?", yesno: true },
      { name: "availability", label: "Are you applying for…", type: "select", options: ["Full time", "Part time", "Either"] },
      { name: "earliestStart", label: "Earliest date you can start", type: "date" },
      { name: "shifts", label: "Preferred shift hours", type: "shifts", full: true },
      { name: "areas", label: "Preferred areas of work", type: "areas", full: true },
    ],
  },
  {
    title: "Address history",
    intro: "We need your addresses covering the last 10 years for your DBS check. Start with where you live now.",
    fields: [
      { name: "_h1", label: "Current home address", type: "heading", full: true },
      { name: "address1Line1", label: "Address line 1", required: true, full: true },
      { name: "address1Line2", label: "Address line 2", full: true },
      { name: "address1City", label: "Town / City" },
      { name: "address1Postcode", label: "Postcode", required: true },
      { name: "address1Date", label: "Date you moved in", type: "month" },
      { name: "prevAddresses", label: "Previous addresses", type: "addresses", full: true },
    ],
  },
  {
    title: "Employment history",
    intro: "Start with your most recent job and work backwards, covering the last 10 years. Month & year is fine — you don’t need exact days.",
    fields: [
      { name: "jobs", label: "Jobs", type: "jobs", full: true },
      { name: "_gapsHead", label: "Employment gaps (last 10 years)", type: "heading", full: true },
      { name: "_gapsNote", label: "Please explain any period in the last 10 years when you were not working — for example caring for a family member, raising children, travel, illness, study or unemployment. Add “None” if this doesn’t apply.", type: "note", full: true },
      { name: "gaps", label: "Gaps", type: "gaps", full: true },
    ],
  },
  {
    title: "Care experience",
    fields: [
      { name: "careExperience", label: "Tell us about any previous care experience (paid or unpaid)", type: "textarea", full: true, hint: "It’s fine if you have none — just tell us a little about yourself." },
      { name: "familyCare", label: "Have you ever cared for a family member or friend, even if unpaid?", yesno: true, full: true },
      { name: "familyCareDetails", label: "Please tell us a little about the care you gave", type: "textarea", full: true, showIf: (v) => v.familyCare === "Yes" },
      { name: "whyCarer", label: "Why do you want to work in care?", type: "textarea", full: true },
    ],
  },
  {
    title: "Qualifications, training & languages",
    intro: "We don’t need your school or college dates — just what’s relevant to care.",
    fields: [
      { name: "mostRecentEducation", label: "Most recent education / qualification", full: true, hint: "e.g. GCSEs, BTEC, NVQ, degree — whatever your highest / most recent is." },
      { name: "educationCounty", label: "Which county was this completed in?" },
      { name: "qualifications", label: "Relevant qualifications & certificates", type: "textarea", full: true, hint: "e.g. Care Certificate, NVQ / Diploma in Health & Social Care, first aid, moving & handling." },
      { name: "otherTraining", label: "Any other relevant training", type: "textarea", full: true },
      { name: "languages", label: "Languages you speak", full: true, hint: "Please say whether fluent or conversational." },
    ],
  },
  {
    title: "References",
    intro: "Please give two referees. Reference 1 must be your current or most recent employer. Reference 2 can be a previous employer — or, if you’ve only ever had one job, someone who knows you well (not a family member).",
    fields: [
      { name: "_r1", label: "Reference 1 — current / most recent employer", type: "heading", full: true },
      { name: "ref1Name", label: "Full name", required: true },
      { name: "ref1Position", label: "Job title / position" },
      { name: "ref1Org", label: "Organisation" },
      { name: "ref1Relationship", label: "Relationship to you" },
      { name: "ref1Email", label: "Email", type: "email" },
      { name: "ref1Phone", label: "Telephone", type: "tel" },
      { name: "_r2", label: "Reference 2 — previous employer, or a character referee", type: "heading", full: true },
      { name: "ref2Name", label: "Full name" },
      { name: "ref2Position", label: "Job title / position" },
      { name: "ref2Org", label: "Organisation" },
      { name: "ref2Relationship", label: "Relationship to you" },
      { name: "ref2Email", label: "Email", type: "email" },
      { name: "ref2Phone", label: "Telephone", type: "tel" },
    ],
  },
  {
    title: "Next of kin",
    intro: "Someone we can contact in an emergency.",
    fields: [
      { name: "nokName", label: "Full name" },
      { name: "nokRelationship", label: "Relationship to you" },
      { name: "nokAddress", label: "Address", type: "textarea", full: true },
      { name: "nokMobile", label: "Mobile number", type: "tel" },
      { name: "nokEmail", label: "Email", type: "email" },
    ],
  },
  {
    title: "Health declaration",
    intro: "Care work can be physically and emotionally demanding. This helps us make sure you’re supported and any reasonable adjustments are in place.",
    fields: [
      { name: "sickDays", label: "Days absent through sickness in the last 12 months", type: "tel" },
      { name: "healthCondition", label: "Do you have any physical or mental health condition that may affect your ability to carry out this role (with reasonable adjustments)?", yesno: true, full: true },
      { name: "healthDetails", label: "Please give brief details, so we can support you", type: "textarea", full: true, showIf: (v) => v.healthCondition === "Yes" },
    ],
  },
  {
    title: "Criminal record declaration",
    intro: "This role is exempt from the Rehabilitation of Offenders Act 1974. An Enhanced DBS check (with a check of the barred lists) is required, so you must declare all cautions and convictions — including any that would normally be “spent”. A criminal record will not necessarily bar you from working with us.",
    fields: [
      { name: "convictionCaution", label: "Have you ever been convicted of, or cautioned for, any criminal offence?", yesno: true, full: true },
      { name: "barredList", label: "Are you on a barred list, or otherwise prohibited from working with children or adults?", yesno: true, full: true },
      { name: "convictionDetails", label: "If you answered Yes above, please give brief details", type: "textarea", full: true, showIf: (v) => v.convictionCaution === "Yes" || v.barredList === "Yes" },
      { name: "dbsConsent", label: "Do you consent to an Enhanced DBS check being carried out?", yesno: true, full: true },
    ],
  },
  {
    title: "Equal opportunities (voluntary)",
    intro: "This part is voluntary and is kept separate from the selection process. It simply helps us check we’re being a fair and inclusive employer — it plays no part in whether you’re offered the role.",
    fields: [
      { name: "howHeard", label: "How did you hear about this role?", type: "selectOther", options: HEARD_OPTIONS, full: true },
      { name: "ethnicity", label: "Ethnic origin", type: "selectOther", options: ETHNICITY_OPTIONS, full: true },
      { name: "religion", label: "Religion or belief", type: "selectOther", options: RELIGION_OPTIONS, full: true },
      { name: "gender", label: "Gender", type: "selectOther", options: GENDER_OPTIONS },
      { name: "maritalStatus", label: "Marital status", type: "select", options: MARITAL_OPTIONS },
      { name: "disability", label: "Do you consider yourself to have a disability?", type: "select", options: ["No", "Yes", "Prefer not to say"], full: true },
    ],
  },
  {
    title: "Declaration",
    fields: [{ name: "consent", label: "consent", type: "consent", full: true }],
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

// Keep only characters valid in a phone number: digits, spaces, and a leading +.
function sanitisePhone(raw: string) {
  const plus = raw.trim().startsWith("+") ? "+" : "";
  return plus + raw.replace(/[^\d]/g, "");
}

// A UK-ish sanity check: 10–13 digits once symbols are stripped.
function isValidPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

type Job = { employer: string; jobTitle: string; from: string; to: string; duties: string; reason: string };
type PrevAddress = { address: string; from: string; to: string };
type Gap = { from: string; to: string; reason: string };

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [areas, setAreas] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);
  const [prevAddresses, setPrevAddresses] = useState<PrevAddress[]>([
    { address: "", from: "", to: "" },
  ]);
  const [jobs, setJobs] = useState<Job[]>([
    { employer: "", jobTitle: "", from: "", to: "", duties: "", reason: "" },
  ]);
  const [gaps, setGaps] = useState<Gap[]>([{ from: "", to: "", reason: "" }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLDivElement>(null);

  const set = (name: string, v: string) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const toTop = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const visibleFields = () =>
    steps[step].fields.filter((f) => !f.showIf || f.showIf(values));

  const skipValidation = new Set([
    "heading",
    "note",
    "consent",
    "areas",
    "shifts",
    "addresses",
    "jobs",
    "gaps",
  ]);

  const validateStep = () => {
    const e: Record<string, string> = {};
    for (const f of visibleFields()) {
      if (f.type && skipValidation.has(f.type)) continue;
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) e[f.name] = "This field is required.";
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        e[f.name] = "Please enter a valid email address.";
      if (f.name === "mobile" && v && !isValidPhone(v))
        e[f.name] = "Please enter a valid mobile number (digits only).";
    }
    if (step === steps.length - 1 && values.consent !== "yes")
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

    const currentAddress = [
      values.address1Line1,
      values.address1Line2,
      values.address1City,
      values.address1Postcode,
    ]
      .filter(Boolean)
      .join(", ");

    const prevAddressesText = prevAddresses
      .filter((a) => a.address || a.from || a.to)
      .map((a) => `${a.address || "—"} (${a.from || "?"} → ${a.to || "?"})`)
      .join("\n");

    const jobsText = jobs
      .filter((j) => j.employer || j.jobTitle || j.duties)
      .map(
        (j, i) =>
          `${i + 1}. ${j.jobTitle || "—"} at ${j.employer || "—"} (${j.from || "?"} → ${j.to || "present"})\n   Duties: ${j.duties || "—"}\n   Reason for leaving: ${j.reason || "—"}`
      )
      .join("\n\n");

    const gapsText = gaps
      .filter((g) => g.from || g.to || g.reason)
      .map((g) => `${g.from || "?"} → ${g.to || "?"}: ${g.reason || "—"}`)
      .join("\n");

    // Resolve "Other (please specify)" style choices to their free-text value.
    const resolve = (name: string) => {
      const v = values[name] ?? "";
      const other = (values[`${name}Other`] ?? "").trim();
      return needsSpecify(v) && other ? `${v.replace(/\s*\(please specify\)/i, "")}: ${other}` : v;
    };

    const payload = {
      ...values,
      areas: areas.join(", "),
      shiftHours: shifts.join(", "),
      address1: currentAddress,
      prevAddresses: prevAddressesText,
      jobs: jobsText,
      gaps: gapsText,
      howHeard: resolve("howHeard"),
      ethnicity: resolve("ethnicity"),
      religion: resolve("religion"),
      gender: resolve("gender"),
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

    if (f.type === "note") {
      return (
        <p key={f.name} className="sm:col-span-2 text-sm text-brand-900/70">
          {f.label}
        </p>
      );
    }

    if (f.type === "addresses") return renderPrevAddresses();
    if (f.type === "jobs") return renderJobs();
    if (f.type === "gaps") return renderGaps();

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
            I declare that the information I&apos;ve given is true and complete to the
            best of my knowledge. I understand that giving false or misleading
            information may lead to my application being rejected or, if employed, to
            dismissal. I consent to HG Care contacting my referees and carrying out
            the checks described above (including an Enhanced DBS check), and to my
            details being processed for recruitment in line with the{" "}
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
          <span className="block text-sm font-semibold text-brand-900">
            {f.label} {f.required && <span className="text-accent-600">*</span>}
          </span>
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
        </div>
      );
    }

    if (f.type === "selectOther") {
      const v = values[f.name] ?? "";
      return (
        <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
          <label htmlFor={f.name} className="block text-sm font-semibold text-brand-900">
            {f.label}
          </label>
          <select
            id={f.name}
            value={v}
            onChange={(e) => set(f.name, e.target.value)}
            className={`mt-1.5 ${inputCls}`}
          >
            <option value="">Please choose…</option>
            {f.options?.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {needsSpecify(v) && (
            <input
              type="text"
              aria-label={`${f.label} — please specify`}
              placeholder="Please specify"
              value={values[`${f.name}Other`] ?? ""}
              onChange={(e) => set(`${f.name}Other`, e.target.value)}
              className={`mt-2 ${inputCls}`}
            />
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
        ) : f.type === "tel" ? (
          <input
            id={f.name}
            type="tel"
            inputMode="numeric"
            autoComplete={f.name === "mobile" ? "tel" : "off"}
            value={values[f.name] ?? ""}
            onChange={(e) => set(f.name, sanitisePhone(e.target.value))}
            className={`mt-1.5 ${inputCls}`}
          />
        ) : (
          <input id={f.name} type={f.type ?? "text"} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`mt-1.5 ${inputCls}`} />
        )}
        {f.hint && !errors[f.name] && <p className="mt-1 text-xs text-brand-900/50">{f.hint}</p>}
        {errors[f.name] && <p className="mt-1 text-sm text-accent-600">{errors[f.name]}</p>}
      </div>
    );
  };

  // ——— Repeatable: previous addresses (10-year history) ———
  function renderPrevAddresses() {
    const update = (i: number, key: keyof PrevAddress, val: string) =>
      setPrevAddresses((arr) => arr.map((x, j) => (j === i ? { ...x, [key]: val } : x)));
    return (
      <div key="prevAddresses" className="sm:col-span-2 space-y-4">
        {prevAddresses.map((a, i) => (
          <div key={i} className="rounded-2xl bg-sand p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-900">Previous address {i + 1}</p>
              {prevAddresses.length > 1 && (
                <button type="button" onClick={() => setPrevAddresses((arr) => arr.filter((_, j) => j !== i))} className="text-sm font-semibold text-brand-700 hover:text-brand-900">
                  Remove
                </button>
              )}
            </div>
            <textarea
              rows={2}
              value={a.address}
              onChange={(e) => update(i, "address", e.target.value)}
              placeholder="Address & postcode"
              className={`mt-2 ${inputCls}`}
            />
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-semibold text-brand-900/70">
                From
                <input type="month" value={a.from} onChange={(e) => update(i, "from", e.target.value)} className={`mt-1 ${inputCls}`} />
              </label>
              <label className="text-xs font-semibold text-brand-900/70">
                To
                <input type="month" value={a.to} onChange={(e) => update(i, "to", e.target.value)} className={`mt-1 ${inputCls}`} />
              </label>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setPrevAddresses((arr) => [...arr, { address: "", from: "", to: "" }])}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          + Add another address
        </button>
      </div>
    );
  }

  // ——— Repeatable: employment history ———
  function renderJobs() {
    const update = (i: number, key: keyof Job, val: string) =>
      setJobs((arr) => arr.map((x, j) => (j === i ? { ...x, [key]: val } : x)));
    return (
      <div key="jobs" className="sm:col-span-2 space-y-4">
        {jobs.map((job, i) => (
          <div key={i} className="rounded-2xl bg-sand p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-900">
                {i === 0 ? "Most recent job" : `Job ${i + 1}`}
              </p>
              {jobs.length > 1 && (
                <button type="button" onClick={() => setJobs((arr) => arr.filter((_, j) => j !== i))} className="text-sm font-semibold text-brand-700 hover:text-brand-900">
                  Remove
                </button>
              )}
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <input value={job.employer} onChange={(e) => update(i, "employer", e.target.value)} placeholder="Employer name" className={inputCls} />
              <input value={job.jobTitle} onChange={(e) => update(i, "jobTitle", e.target.value)} placeholder="Job title" className={inputCls} />
              <label className="text-xs font-semibold text-brand-900/70">
                From
                <input type="month" value={job.from} onChange={(e) => update(i, "from", e.target.value)} className={`mt-1 ${inputCls}`} />
              </label>
              <label className="text-xs font-semibold text-brand-900/70">
                To
                <input type="month" value={job.to} onChange={(e) => update(i, "to", e.target.value)} className={`mt-1 ${inputCls}`} />
              </label>
            </div>
            <textarea rows={2} value={job.duties} onChange={(e) => update(i, "duties", e.target.value)} placeholder="Main duties" className={`mt-2 ${inputCls}`} />
            <input value={job.reason} onChange={(e) => update(i, "reason", e.target.value)} placeholder="Reason for leaving" className={`mt-2 ${inputCls}`} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setJobs((arr) => [...arr, { employer: "", jobTitle: "", from: "", to: "", duties: "", reason: "" }])}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          + Add another job
        </button>
      </div>
    );
  }

  // ——— Repeatable: employment gaps ———
  function renderGaps() {
    const update = (i: number, key: keyof Gap, val: string) =>
      setGaps((arr) => arr.map((x, j) => (j === i ? { ...x, [key]: val } : x)));
    return (
      <div key="gaps" className="sm:col-span-2 space-y-4">
        {gaps.map((g, i) => (
          <div key={i} className="rounded-2xl bg-sand p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-brand-900">Gap {i + 1}</p>
              {gaps.length > 1 && (
                <button type="button" onClick={() => setGaps((arr) => arr.filter((_, j) => j !== i))} className="text-sm font-semibold text-brand-700 hover:text-brand-900">
                  Remove
                </button>
              )}
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="text-xs font-semibold text-brand-900/70">
                From
                <input type="month" value={g.from} onChange={(e) => update(i, "from", e.target.value)} className={`mt-1 ${inputCls}`} />
              </label>
              <label className="text-xs font-semibold text-brand-900/70">
                To
                <input type="month" value={g.to} onChange={(e) => update(i, "to", e.target.value)} className={`mt-1 ${inputCls}`} />
              </label>
            </div>
            <textarea rows={2} value={g.reason} onChange={(e) => update(i, "reason", e.target.value)} placeholder="Why were you not working at this time? (e.g. caring for family, travel, illness, study)" className={`mt-2 ${inputCls}`} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setGaps((arr) => [...arr, { from: "", to: "", reason: "" }])}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          + Add another gap
        </button>
      </div>
    );
  }

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
