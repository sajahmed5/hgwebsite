"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";

type Field = {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "postcode"
    | "date"
    | "month"
    | "textarea"
    | "select"
    | "selectOther"
    | "areas"
    | "shifts"
    | "languages"
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
  showIf?: (v: Record<string, string>) => boolean;
};

const SHIFT_OPTIONS = [
  "Morning & Lunch (7am–3pm)",
  "Tea & bed (3pm–10pm)",
  "All day (7am–10pm)",
];

const POPULAR_LANGUAGES = [
  "English",
  "Urdu",
  "Punjabi",
  "Bengali",
  "Somali",
  "Arabic",
  "Polish",
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

const needsSpecify = (v: string) =>
  /please specify|self-describe/i.test(v || "");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// UK postcode validation (permissive but genuine format).
const isPostcode = (v: string) =>
  /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(v.trim());

const isValidPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
};

// "YYYY-MM" → months since year 0, for gap maths.
const monthValue = (s?: string) => {
  if (!s) return null;
  const [y, m] = s.split("-").map(Number);
  if (!y || !m) return null;
  return y * 12 + (m - 1);
};
const nowMonth = () => {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
};
const labelMonth = (mv: number) => `${MONTHS[((mv % 12) + 12) % 12]} ${Math.floor(mv / 12)}`;

const tenYearsAgo = () => {
  const t = new Date();
  t.setFullYear(t.getFullYear() - 10);
  return t;
};
const withinTenYears = (dateStr?: string) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) && d > tenYearsAgo();
};

type Job = { employer: string; jobTitle: string; from: string; to: string; stillHere: boolean; duties: string; reason: string };
type PrevAddress = { line1: string; line2: string; city: string; postcode: string; movedIn: string; outside: boolean; country: string };

const emptyJob = (): Job => ({ employer: "", jobTitle: "", from: "", to: "", stillHere: false, duties: "", reason: "" });
const emptyAddress = (): PrevAddress => ({ line1: "", line2: "", city: "", postcode: "", movedIn: "", outside: false, country: "" });

const steps: { title: string; intro?: string; fields: Field[] }[] = [
  {
    title: "About you",
    fields: [
      { name: "title", label: "Title", type: "select", options: ["Mr", "Mrs", "Miss", "Ms", "Dr", "Mx", "Other"], required: true },
      { name: "firstName", label: "First name", required: true },
      { name: "surname", label: "Surname", required: true },
      { name: "otherNames", label: "Any previous names (maiden name / deed poll)", full: true, hint: "Needed for your DBS check — write “None” if this doesn’t apply." },
      { name: "dob", label: "Date of birth", type: "date", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "mobile", label: "Mobile number", type: "tel", required: true, hint: "Numbers only, e.g. 07123 456789" },
      { name: "landline", label: "Home landline (if any)", type: "tel" },
      { name: "cityOfBirth", label: "Town / city of birth", required: true },
      { name: "countryOfBirth", label: "Country of birth", required: true },
      { name: "nationality", label: "Nationality", required: true },
    ],
  },
  {
    title: "Eligibility & availability",
    fields: [
      { name: "rightToWork", label: "Do you have the legal right to work in the UK?", yesno: true, required: true },
      { name: "drivingLicence", label: "Do you hold a UK/EU driving licence?", yesno: true, required: true },
      { name: "availability", label: "Are you applying for…", type: "select", options: ["Full time", "Part time", "Either"], required: true },
      { name: "earliestStart", label: "Earliest date you can start", type: "date", required: true },
      { name: "shifts", label: "Preferred shift hours", type: "shifts", full: true, required: true },
      { name: "areas", label: "Preferred areas of work", type: "areas", full: true, required: true },
    ],
  },
  {
    title: "Address history",
    intro: "We need your addresses covering the last 10 years for your DBS check. Start with where you live now. If you moved in less than 10 years ago, we’ll ask for your previous address too. If you lived abroad, tick “outside the UK” — an overseas address is fine, no UK postcode needed.",
    fields: [
      { name: "_h1", label: "Current home address", type: "heading", full: true },
      { name: "address1Line1", label: "Address line 1", required: true, full: true },
      { name: "address1Line2", label: "Address line 2", full: true },
      { name: "address1City", label: "Town / City", required: true },
      { name: "address1Postcode", label: "Postcode", type: "postcode", required: true },
      { name: "address1Date", label: "Date you moved in", type: "date", required: true, full: true },
      { name: "prevAddresses", label: "Previous addresses", type: "addresses", full: true },
    ],
  },
  {
    title: "Employment history",
    intro: "Start with your most recent job and work backwards, covering the last 10 years. Month & year is fine. If there are any gaps between your jobs, we’ll ask you to explain them below.",
    fields: [
      { name: "jobs", label: "Jobs", type: "jobs", full: true, required: true },
      { name: "gaps", label: "Gaps", type: "gaps", full: true },
    ],
  },
  {
    title: "Care experience",
    fields: [
      { name: "careExperience", label: "Tell us about any previous care experience (paid or unpaid)", type: "textarea", full: true, required: true, hint: "It’s fine if you have none — just tell us a little about yourself." },
      { name: "familyCare", label: "Have you ever cared for a family member or friend, even if unpaid?", yesno: true, full: true, required: true },
      { name: "familyCareDetails", label: "Please tell us a little about the care you gave", type: "textarea", full: true, required: true, showIf: (v) => v.familyCare === "Yes" },
      { name: "whyCarer", label: "Why do you want to work in care?", type: "textarea", full: true, required: true },
    ],
  },
  {
    title: "Qualifications, training & languages",
    intro: "We don’t need your school or college dates — just what’s relevant to care.",
    fields: [
      { name: "mostRecentEducation", label: "Most recent education / qualification", full: true, required: true, hint: "e.g. GCSEs, BTEC, NVQ, degree — whatever your highest / most recent is." },
      { name: "educationCounty", label: "Which county was this completed in?", required: true },
      { name: "qualifications", label: "Relevant qualifications & certificates", type: "textarea", full: true, required: true, hint: "e.g. Care Certificate, NVQ / Diploma in Health & Social Care, first aid, moving & handling. Write “None yet” if you have none." },
      { name: "otherTraining", label: "Any other relevant training", type: "textarea", full: true },
      { name: "languages", label: "Languages you speak", type: "languages", full: true, required: true },
    ],
  },
  {
    title: "References",
    intro: "Please give two referees. Reference 1 must be your current or most recent employer. Reference 2 can be a previous employer — or, if you’ve only ever had one job, someone who knows you well (not a family member).",
    fields: [
      { name: "_r1", label: "Reference 1 — current / most recent employer", type: "heading", full: true },
      { name: "ref1Name", label: "Full name", required: true },
      { name: "ref1Position", label: "Job title / position" },
      { name: "ref1Org", label: "Organisation", required: true },
      { name: "ref1Relationship", label: "Relationship to you", required: true },
      { name: "ref1Email", label: "Email", type: "email", required: true },
      { name: "ref1Phone", label: "Telephone", type: "tel", required: true },
      { name: "_r2", label: "Reference 2 — previous employer, or a character referee", type: "heading", full: true },
      { name: "ref2Name", label: "Full name", required: true },
      { name: "ref2Position", label: "Job title / position" },
      { name: "ref2Org", label: "Organisation" },
      { name: "ref2Relationship", label: "Relationship to you", required: true },
      { name: "ref2Email", label: "Email", type: "email", required: true },
      { name: "ref2Phone", label: "Telephone", type: "tel", required: true },
    ],
  },
  {
    title: "Next of kin",
    intro: "Someone we can contact in an emergency.",
    fields: [
      { name: "nokName", label: "Full name", required: true },
      { name: "nokRelationship", label: "Relationship to you", required: true },
      { name: "nokAddress", label: "Address", type: "textarea", full: true, required: true },
      { name: "nokMobile", label: "Mobile number", type: "tel", required: true },
      { name: "nokEmail", label: "Email", type: "email" },
    ],
  },
  {
    title: "Health declaration",
    intro: "Care work can be physically and emotionally demanding. This helps us make sure you’re supported and any reasonable adjustments are in place.",
    fields: [
      { name: "sickDays", label: "Days absent through sickness in the last 12 months", type: "number", required: true },
      { name: "healthCondition", label: "Do you have any physical or mental health condition that may affect your ability to carry out this role (with reasonable adjustments)?", yesno: true, full: true, required: true },
      { name: "healthDetails", label: "Please give brief details, so we can support you", type: "textarea", full: true, required: true, showIf: (v) => v.healthCondition === "Yes" },
    ],
  },
  {
    title: "Criminal record declaration",
    intro: "This role is exempt from the Rehabilitation of Offenders Act 1974. An Enhanced DBS check (with a check of the barred lists) is required, so you must declare all cautions and convictions — including any that would normally be “spent”. A criminal record will not necessarily bar you from working with us.",
    fields: [
      { name: "convictionCaution", label: "Have you ever been convicted of, or cautioned for, any criminal offence?", yesno: true, full: true, required: true },
      { name: "barredList", label: "Are you on a barred list, or otherwise prohibited from working with children or adults?", yesno: true, full: true, required: true },
      { name: "convictionDetails", label: "If you answered Yes above, please give brief details", type: "textarea", full: true, required: true, showIf: (v) => v.convictionCaution === "Yes" || v.barredList === "Yes" },
      { name: "dbsConsent", label: "Do you consent to an Enhanced DBS check being carried out?", yesno: true, full: true, required: true },
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

const REF_STEP = steps.findIndex((s) => s.fields.some((f) => f.name === "ref1Name"));

const inputCls =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-brand-900 placeholder-brand-900/40 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

const pillCls = (on: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
    on
      ? "bg-brand-600 text-white"
      : "border border-brand-200 bg-white text-brand-800 hover:bg-brand-50"
  }`;

function sanitisePhone(raw: string) {
  const plus = raw.trim().startsWith("+") ? "+" : "";
  return plus + raw.replace(/[^\d]/g, "");
}

const REQUIRED = "This field is required.";

export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [areas, setAreas] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [langInput, setLangInput] = useState("");
  const [prevAddresses, setPrevAddresses] = useState<PrevAddress[]>([emptyAddress()]);
  const [jobs, setJobs] = useState<Job[]>([emptyJob()]);
  const [gapReasons, setGapReasons] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLDivElement>(null);

  const set = (name: string, v: string) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const toTop = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Pre-fill Reference 1's organisation from the most recent job.
  useEffect(() => {
    if (step === REF_STEP && !values.ref1Org && jobs[0]?.employer) {
      set("ref1Org", jobs[0].employer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ——— Address history: how many previous addresses to show (10-year chain) ———
  const visiblePrevCount = () => {
    if (!withinTenYears(values.address1Date)) return 0;
    let n = 1;
    while (n <= prevAddresses.length && withinTenYears(prevAddresses[n - 1]?.movedIn)) n++;
    return n;
  };

  // ——— Employment: work out uncovered periods in the last 10 years ———
  const computeGaps = () => {
    const now = nowMonth();
    const windowStart = now - 120;
    const ivs = jobs
      .map((j) => {
        const f = monthValue(j.from);
        const t = j.stillHere ? now : monthValue(j.to);
        if (f == null || t == null) return null;
        return [Math.min(f, t), Math.max(f, t)] as [number, number];
      })
      .filter((x): x is [number, number] => x !== null && x[1] >= windowStart)
      .sort((a, b) => a[0] - b[0]);

    const gaps: { key: string; label: string }[] = [];
    let cursor = windowStart;
    for (const [a, b] of ivs) {
      if (a - cursor >= 2) {
        gaps.push({ key: `${cursor}-${a}`, label: `Between ${labelMonth(cursor)} and ${labelMonth(a)}` });
      }
      cursor = Math.max(cursor, b);
    }
    if (now - cursor >= 2) {
      gaps.push({ key: `${cursor}-${now}`, label: `Between ${labelMonth(cursor)} and now` });
    }
    return gaps;
  };
  // Only meaningful once the most recent job has real dates.
  const gapsReady = () => jobs.some((j) => monthValue(j.from) != null && (j.stillHere || monthValue(j.to) != null));

  const visibleFields = () =>
    steps[step].fields.filter((f) => !f.showIf || f.showIf(values));

  const validateStep = () => {
    const e: Record<string, string> = {};
    for (const f of visibleFields()) {
      if (f.type === "heading" || f.type === "note" || f.type === "consent" || f.type === "gaps") continue;

      if (f.type === "areas" || f.type === "shifts" || f.type === "languages") {
        const sel = f.type === "areas" ? areas : f.type === "shifts" ? shifts : languages;
        if (f.required && sel.length === 0) e[f.name] = "Please choose at least one.";
        continue;
      }
      if (f.type === "addresses") {
        validateAddresses(e);
        continue;
      }
      if (f.type === "jobs") {
        validateJobs(e);
        continue;
      }

      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) {
        e[f.name] = REQUIRED;
        continue;
      }
      if (!v) continue;
      if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        e[f.name] = "Please enter a valid email address.";
      if (f.type === "postcode" && !isPostcode(v))
        e[f.name] = "Please enter a valid UK postcode.";
      if (f.type === "tel" && !isValidPhone(v))
        e[f.name] = "Please enter a valid phone number (digits only).";
      if (f.type === "number" && !/^\d+$/.test(v))
        e[f.name] = "Please enter a number.";
    }

    if (step === steps.length - 1 && values.consent !== "yes")
      e.consent = "Please confirm the declaration to submit.";

    setErrors(e);
    if (Object.keys(e).length > 0) toTop();
    return Object.keys(e).length === 0;
  };

  const validateAddresses = (e: Record<string, string>) => {
    const shown = visiblePrevCount();
    for (let i = 0; i < shown; i++) {
      const a = prevAddresses[i] ?? emptyAddress();
      if (!a.line1.trim()) e[`prev${i}Line1`] = REQUIRED;
      if (!a.city.trim()) e[`prev${i}City`] = REQUIRED;
      if (a.outside) {
        // Overseas address — postcode is optional and not UK-validated.
        if (!a.country.trim()) e[`prev${i}Country`] = REQUIRED;
      } else {
        if (!a.postcode.trim()) e[`prev${i}Postcode`] = REQUIRED;
        else if (!isPostcode(a.postcode)) e[`prev${i}Postcode`] = "Enter a valid UK postcode.";
      }
      if (!a.movedIn) e[`prev${i}MovedIn`] = REQUIRED;
    }
  };

  const validateJobs = (e: Record<string, string>) => {
    jobs.forEach((j, i) => {
      const filledAny = j.employer || j.jobTitle || j.from || j.to || j.duties || j.reason;
      if (i === 0 || filledAny) {
        if (!j.employer.trim()) e[`job${i}Employer`] = REQUIRED;
        if (!j.jobTitle.trim()) e[`job${i}JobTitle`] = REQUIRED;
        if (!j.from) e[`job${i}From`] = REQUIRED;
        if (!j.stillHere && !j.to) e[`job${i}To`] = REQUIRED;
      }
    });
    if (gapsReady()) {
      for (const g of computeGaps()) {
        if (!(gapReasons[g.key] ?? "").trim()) e[`gap_${g.key}`] = "Please explain this period.";
      }
    }
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

    const shown = visiblePrevCount();
    const prevAddressesText = prevAddresses
      .slice(0, Math.max(shown, prevAddresses.filter((a) => a.line1 || a.postcode || a.country).length))
      .filter((a) => a.line1 || a.postcode || a.country || a.movedIn)
      .map((a) => `${[a.line1, a.line2, a.city, a.postcode, a.outside ? a.country : ""].filter(Boolean).join(", ")} (moved in ${a.movedIn || "?"})`)
      .join("\n");

    const jobsText = jobs
      .filter((j) => j.employer || j.jobTitle || j.duties)
      .map(
        (j, i) =>
          `${i + 1}. ${j.jobTitle || "—"} at ${j.employer || "—"} (${j.from || "?"} → ${j.stillHere ? "present" : j.to || "?"})\n   Duties: ${j.duties || "—"}\n   Reason for leaving: ${j.stillHere ? "Still employed" : j.reason || "—"}`
      )
      .join("\n\n");

    const gapsText = gapsReady()
      ? computeGaps()
          .map((g) => `${g.label}: ${gapReasons[g.key] || "—"}`)
          .join("\n") || "None"
      : "";

    const resolve = (name: string) => {
      const v = values[name] ?? "";
      const other = (values[`${name}Other`] ?? "").trim();
      return needsSpecify(v) && other ? `${v.replace(/\s*\(please specify\)/i, "")}: ${other}` : v;
    };

    const payload = {
      ...values,
      areas: areas.join(", "),
      shiftHours: shifts.join(", "),
      languages: languages.join(", "),
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

  const addLanguage = (lang: string) => {
    const v = lang.trim();
    if (!v) return;
    setLanguages((prev) => (prev.some((l) => l.toLowerCase() === v.toLowerCase()) ? prev : [...prev, v]));
  };

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
    if (f.type === "languages") return renderLanguages(f);

    if (f.type === "areas" || f.type === "shifts") {
      const opts = f.type === "areas" ? site.areas : SHIFT_OPTIONS;
      const sel = f.type === "areas" ? areas : shifts;
      const setSel = f.type === "areas" ? setAreas : setShifts;
      return (
        <fieldset key={f.name} className="sm:col-span-2">
          <legend className="text-sm font-semibold text-brand-900">
            {f.label} {f.required && <span className="text-accent-600">*</span>}
          </legend>
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
          {errors[f.name] && <p className="mt-1.5 text-sm text-accent-600">{errors[f.name]}</p>}
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
        ) : f.type === "number" ? (
          <input
            id={f.name}
            type="text"
            inputMode="numeric"
            value={values[f.name] ?? ""}
            onChange={(e) => set(f.name, e.target.value.replace(/[^\d]/g, ""))}
            className={`mt-1.5 ${inputCls}`}
          />
        ) : (
          <input id={f.name} type={f.type === "postcode" ? "text" : f.type ?? "text"} value={values[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={`mt-1.5 ${inputCls}`} />
        )}
        {f.hint && !errors[f.name] && <p className="mt-1 text-xs text-brand-900/50">{f.hint}</p>}
        {errors[f.name] && <p className="mt-1 text-sm text-accent-600">{errors[f.name]}</p>}
      </div>
    );
  };

  // ——— Repeatable: previous addresses (chained to cover 10 years) ———
  function renderPrevAddresses() {
    const shown = visiblePrevCount();
    if (shown === 0) return null;
    const update = (i: number, key: keyof PrevAddress, val: string | boolean) =>
      setPrevAddresses((arr) => {
        const copy = arr.slice();
        while (copy.length <= i) copy.push(emptyAddress());
        copy[i] = { ...copy[i], [key]: val };
        return copy;
      });
    return (
      <div key="prevAddresses" className="sm:col-span-2 space-y-4">
        <h3 className="border-b border-brand-100 pb-2 text-sm font-bold uppercase tracking-wide text-brand-700">
          Previous addresses
        </h3>
        {Array.from({ length: shown }).map((_, i) => {
          const a = prevAddresses[i] ?? emptyAddress();
          return (
            <div key={i} className="rounded-2xl bg-sand p-4">
              <p className="text-sm font-semibold text-brand-900">Previous address {i + 1}</p>
              <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-800">
                <input
                  type="checkbox"
                  checked={a.outside}
                  onChange={(e) => update(i, "outside", e.target.checked)}
                  className="h-4 w-4 accent-brand-600"
                />
                This address is outside the UK
              </label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <input value={a.line1} onChange={(e) => update(i, "line1", e.target.value)} placeholder="Address line 1 *" className={inputCls} />
                  {errors[`prev${i}Line1`] && <p className="mt-1 text-sm text-accent-600">{errors[`prev${i}Line1`]}</p>}
                </div>
                <input value={a.line2} onChange={(e) => update(i, "line2", e.target.value)} placeholder="Address line 2" className={`sm:col-span-2 ${inputCls}`} />
                <div>
                  <input value={a.city} onChange={(e) => update(i, "city", e.target.value)} placeholder="Town / City *" className={inputCls} />
                  {errors[`prev${i}City`] && <p className="mt-1 text-sm text-accent-600">{errors[`prev${i}City`]}</p>}
                </div>
                <div>
                  <input value={a.postcode} onChange={(e) => update(i, "postcode", e.target.value)} placeholder={a.outside ? "Postal / ZIP code (if any)" : "Postcode *"} className={inputCls} />
                  {errors[`prev${i}Postcode`] && <p className="mt-1 text-sm text-accent-600">{errors[`prev${i}Postcode`]}</p>}
                </div>
                {a.outside && (
                  <div className="sm:col-span-2">
                    <input value={a.country} onChange={(e) => update(i, "country", e.target.value)} placeholder="Country *" className={inputCls} />
                    {errors[`prev${i}Country`] && <p className="mt-1 text-sm text-accent-600">{errors[`prev${i}Country`]}</p>}
                  </div>
                )}
                <label className="text-xs font-semibold text-brand-900/70 sm:col-span-2">
                  Date you moved in *
                  <input type="date" value={a.movedIn} onChange={(e) => update(i, "movedIn", e.target.value)} className={`mt-1 ${inputCls}`} />
                  {errors[`prev${i}MovedIn`] && <p className="mt-1 text-sm text-accent-600">{errors[`prev${i}MovedIn`]}</p>}
                </label>
              </div>
            </div>
          );
        })}
        <p className="text-xs text-brand-900/50">
          Keep going until your addresses reach back at least 10 years. A new address box appears whenever the last move-in date is under 10 years ago.
        </p>
      </div>
    );
  }

  // ——— Repeatable: employment history ———
  function renderJobs() {
    const update = (i: number, key: keyof Job, val: string | boolean) =>
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
              <div>
                <input value={job.employer} onChange={(e) => update(i, "employer", e.target.value)} placeholder="Employer name *" className={inputCls} />
                {errors[`job${i}Employer`] && <p className="mt-1 text-sm text-accent-600">{errors[`job${i}Employer`]}</p>}
              </div>
              <div>
                <input value={job.jobTitle} onChange={(e) => update(i, "jobTitle", e.target.value)} placeholder="Job title *" className={inputCls} />
                {errors[`job${i}JobTitle`] && <p className="mt-1 text-sm text-accent-600">{errors[`job${i}JobTitle`]}</p>}
              </div>
              <label className="text-xs font-semibold text-brand-900/70">
                From (month / year) *
                <input type="month" value={job.from} onChange={(e) => update(i, "from", e.target.value)} className={`mt-1 ${inputCls}`} />
                {errors[`job${i}From`] && <p className="mt-1 text-sm text-accent-600">{errors[`job${i}From`]}</p>}
              </label>
              <label className="text-xs font-semibold text-brand-900/70">
                To (month / year) {!job.stillHere && "*"}
                <input type="month" value={job.to} disabled={job.stillHere} onChange={(e) => update(i, "to", e.target.value)} className={`mt-1 ${inputCls} ${job.stillHere ? "opacity-50" : ""}`} />
                {errors[`job${i}To`] && <p className="mt-1 text-sm text-accent-600">{errors[`job${i}To`]}</p>}
              </label>
            </div>
            <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-800">
              <input
                type="checkbox"
                checked={job.stillHere}
                onChange={(e) => update(i, "stillHere", e.target.checked)}
                className="h-4 w-4 accent-brand-600"
              />
              I still work here
            </label>
            <textarea rows={2} value={job.duties} onChange={(e) => update(i, "duties", e.target.value)} placeholder="Main duties" className={`mt-2 ${inputCls}`} />
            {!job.stillHere && (
              <input value={job.reason} onChange={(e) => update(i, "reason", e.target.value)} placeholder="Reason for leaving" className={`mt-2 ${inputCls}`} />
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setJobs((arr) => [...arr, emptyJob()])}
          className="text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          + Add another job
        </button>
      </div>
    );
  }

  // ——— Auto-detected employment gaps (each needs a reason) ———
  function renderGaps() {
    if (!gapsReady()) return null;
    const gaps = computeGaps();
    return (
      <div key="gaps" className="sm:col-span-2 space-y-3">
        <h3 className="border-b border-brand-100 pb-2 text-sm font-bold uppercase tracking-wide text-brand-700">
          Employment gaps
        </h3>
        {gaps.length === 0 ? (
          <p className="rounded-2xl bg-brand-50 p-4 text-sm text-brand-900/70">
            ✓ Your dates cover the last 10 years with no gaps to explain.
          </p>
        ) : (
          <>
            <p className="text-sm text-brand-900/70">
              We spotted {gaps.length === 1 ? "a period" : "some periods"} when you weren’t in a job. Please tell us why — for example maternity leave, studying, caring for family, travelling, or looking for work.
            </p>
            {gaps.map((g) => (
              <div key={g.key} className="rounded-2xl bg-sand p-4">
                <p className="text-sm font-semibold text-brand-900">{g.label}</p>
                <textarea
                  rows={2}
                  value={gapReasons[g.key] ?? ""}
                  onChange={(e) => setGapReasons((prev) => ({ ...prev, [g.key]: e.target.value }))}
                  placeholder="Why weren’t you working during this time?"
                  className={`mt-2 ${inputCls}`}
                />
                {errors[`gap_${g.key}`] && <p className="mt-1 text-sm text-accent-600">{errors[`gap_${g.key}`]}</p>}
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  // ——— Languages: quick-pick chips + free-text add ———
  function renderLanguages(f: Field) {
    return (
      <div key="languages" className="sm:col-span-2">
        <span className="block text-sm font-semibold text-brand-900">
          {f.label} {f.required && <span className="text-accent-600">*</span>}
        </span>
        <p className="mt-1 text-xs text-brand-900/50">
          Tap the ones you speak, or type another and press Enter to add it.
        </p>

        {languages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {languages.map((l) => (
              <span key={l} className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white">
                {l}
                <button
                  type="button"
                  aria-label={`Remove ${l}`}
                  onClick={() => setLanguages((prev) => prev.filter((x) => x !== l))}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {POPULAR_LANGUAGES.filter((l) => !languages.some((x) => x.toLowerCase() === l.toLowerCase())).map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => addLanguage(l)}
              className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50"
            >
              + {l}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={langInput}
          onChange={(e) => setLangInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addLanguage(langInput);
              setLangInput("");
            }
          }}
          placeholder="Type another language, then press Enter"
          className={`mt-3 ${inputCls}`}
        />
        {errors.languages && <p className="mt-1 text-sm text-accent-600">{errors.languages}</p>}
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
