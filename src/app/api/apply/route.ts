import { NextResponse } from "next/server";
import { sendFormEmail, type EmailField } from "@/lib/email";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Email body layout: section headings + the fields that belong under them.
const LAYOUT: { section: string; fields: [string, string][] }[] = [
  {
    section: "About you",
    fields: [
      ["title", "Title"],
      ["firstName", "First name"],
      ["otherNames", "Other name(s)"],
      ["surname", "Surname"],
      ["email", "Email"],
      ["mobile", "Mobile"],
      ["landline", "Landline"],
      ["dob", "Date of birth"],
      ["cityOfBirth", "City of birth"],
      ["countryOfBirth", "Country of birth"],
      ["nationality", "Nationality"],
      ["nameChanged", "Ever changed name?"],
    ],
  },
  {
    section: "Eligibility & role",
    fields: [
      ["drivingLicence", "UK/EU driving licence"],
      ["rightToWork", "Right to work in UK"],
      ["availability", "Full / part-time"],
      ["shiftHours", "Preferred shift hours"],
      ["areas", "Preferred areas"],
    ],
  },
  {
    section: "Address history (5 years)",
    fields: [
      ["address1", "Current address"],
      ["address1Date", "Date moved in"],
      ["address2", "Previous address 1"],
      ["address2Date", "Date moved in"],
      ["address3", "Previous address 2"],
      ["address3Date", "Date moved in"],
    ],
  },
  {
    section: "Experience & background",
    fields: [
      ["careExperience", "Care experience"],
      ["whyCarer", "Why become a carer"],
      ["languages", "Languages spoken"],
      ["school", "School / college"],
      ["schoolYears", "Years attended"],
      ["subjects", "Subjects & grades"],
      ["nokName", "Next of kin — name"],
      ["nokRelationship", "Next of kin — relationship"],
      ["nokAddress", "Next of kin — address"],
      ["nokMobile", "Next of kin — mobile"],
    ],
  },
  {
    section: "Employment history (10 years)",
    fields: [
      ["empEmployer", "Most recent employer"],
      ["empRole", "Role"],
      ["empFrom", "From"],
      ["empTo", "To"],
      ["empDuties", "Duties & responsibilities"],
      ["empReason", "Reason for leaving"],
      ["empPrevious", "Other previous jobs"],
      ["empGaps", "Employment gaps"],
    ],
  },
  {
    section: "References",
    fields: [
      ["ref1Name", "Reference 1 — name"],
      ["ref1Position", "Reference 1 — position"],
      ["ref1Org", "Reference 1 — organisation"],
      ["ref1Email", "Reference 1 — email"],
      ["ref1Relationship", "Reference 1 — relationship"],
      ["ref2Name", "Reference 2 — name"],
      ["ref2Phone", "Reference 2 — telephone"],
      ["ref2Relationship", "Reference 2 — relationship"],
    ],
  },
  {
    section: "Declaration",
    fields: [
      ["signature", "Signed (typed name)"],
      ["consent", "Consent given"],
    ],
  },
];

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const get = (k: string) => String(data[k] ?? "").trim();

  // Honeypot
  if (get("company")) return NextResponse.json({ ok: true });

  const firstName = get("firstName");
  const surname = get("surname");
  const email = get("email");
  const mobile = get("mobile");

  const errors: Record<string, string> = {};
  if (firstName.length < 2) errors.firstName = "Please enter your first name.";
  if (surname.length < 2) errors.surname = "Please enter your surname.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (mobile.length < 7) errors.mobile = "Please enter a mobile number.";
  if (get("consent") !== "yes")
    errors.consent = "Please confirm the declaration to submit.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // Build the structured email body.
  const fields: EmailField[] = [];
  for (const block of LAYOUT) {
    fields.push({ section: block.section });
    for (const [key, label] of block.fields) {
      fields.push({ label, value: get(key) });
    }
  }

  const { ok } = await sendFormEmail({
    subject: `New job application — ${firstName} ${surname}`,
    replyTo: email,
    fields,
  });

  if (!ok) {
    return NextResponse.json(
      { error: "Could not send right now. Please try again or email us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
