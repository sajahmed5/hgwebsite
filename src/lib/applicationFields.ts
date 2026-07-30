// Shared field layout for a job application: section headings + the fields
// (key → human label) that belong under them. Used both to build the
// notification email and to display an application in the admin area.

export const APPLICATION_LAYOUT: { section: string; fields: [string, string][] }[] = [
  {
    section: "About you",
    fields: [
      ["title", "Title"],
      ["firstName", "First name"],
      ["surname", "Surname"],
      ["otherNames", "Previous names (for DBS)"],
      ["dob", "Date of birth"],
      ["email", "Email"],
      ["mobile", "Mobile"],
      ["landline", "Landline"],
      ["cityOfBirth", "Town / city of birth"],
      ["countryOfBirth", "Country of birth"],
      ["nationality", "Nationality"],
    ],
  },
  {
    section: "Eligibility & availability",
    fields: [
      ["rightToWork", "Right to work in UK"],
      ["drivingLicence", "UK/EU driving licence"],
      ["availability", "Full / part-time"],
      ["earliestStart", "Earliest start date"],
      ["shiftHours", "Preferred shift hours"],
      ["areas", "Preferred areas"],
    ],
  },
  {
    section: "Address history (10 years)",
    fields: [
      ["address1", "Current address"],
      ["address1Date", "Date moved in"],
      ["prevAddresses", "Previous addresses"],
    ],
  },
  {
    section: "Employment history (10 years)",
    fields: [
      ["jobs", "Jobs (most recent first)"],
      ["gaps", "Employment gaps & reasons"],
    ],
  },
  {
    section: "Care experience",
    fields: [
      ["careExperience", "Previous care experience"],
      ["familyCare", "Cared for family / friend?"],
      ["familyCareDetails", "Details of that care"],
      ["whyCarer", "Why work in care"],
    ],
  },
  {
    section: "Qualifications, training & languages",
    fields: [
      ["mostRecentEducation", "Most recent education"],
      ["educationCounty", "County completed in"],
      ["qualifications", "Qualifications & certificates"],
      ["otherTraining", "Other relevant training"],
      ["languages", "Languages spoken"],
    ],
  },
  {
    section: "References",
    fields: [
      ["ref1Name", "Reference 1 — name"],
      ["ref1Position", "Reference 1 — position"],
      ["ref1Org", "Reference 1 — organisation"],
      ["ref1Relationship", "Reference 1 — relationship"],
      ["ref1Email", "Reference 1 — email"],
      ["ref1Phone", "Reference 1 — telephone"],
      ["ref2Name", "Reference 2 — name"],
      ["ref2Position", "Reference 2 — position"],
      ["ref2Org", "Reference 2 — organisation"],
      ["ref2Relationship", "Reference 2 — relationship"],
      ["ref2Email", "Reference 2 — email"],
      ["ref2Phone", "Reference 2 — telephone"],
    ],
  },
  {
    section: "Next of kin",
    fields: [
      ["nokName", "Name"],
      ["nokRelationship", "Relationship"],
      ["nokAddress", "Address"],
      ["nokMobile", "Mobile"],
      ["nokEmail", "Email"],
    ],
  },
  {
    section: "Health declaration",
    fields: [
      ["sickDays", "Sick days (last 12 months)"],
      ["healthCondition", "Health condition affecting role?"],
      ["healthDetails", "Details"],
    ],
  },
  {
    section: "Criminal record declaration",
    fields: [
      ["convictionCaution", "Convicted / cautioned?"],
      ["barredList", "On a barred list?"],
      ["convictionDetails", "Details"],
      ["dbsConsent", "Consents to Enhanced DBS"],
    ],
  },
  {
    section: "Equal opportunities (voluntary)",
    fields: [
      ["howHeard", "How they heard about the role"],
      ["ethnicity", "Ethnic origin"],
      ["religion", "Religion or belief"],
      ["gender", "Gender"],
      ["maritalStatus", "Marital status"],
      ["disability", "Considers self disabled?"],
    ],
  },
  {
    section: "Declaration",
    fields: [["consent", "Consent given"]],
  },
];
