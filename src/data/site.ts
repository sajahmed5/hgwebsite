// Central content & configuration for HG Care Services.
// Update business details, services, and copy here in one place.

export const site = {
  name: "HG Care",
  shortName: "HG Care",
  tagline: "Your Helping Hand, When Needed",
  description:
    "HG Care is an accredited home care provider, caring for adults and children since 2002. We deliver compassionate personal, dementia, live-in, palliative and respite care across Manchester, Stockport, Coventry, Trafford, Rochdale and Liverpool. CQC rated Good.",
  phone: "0161 975 5999",
  phoneHref: "tel:01619755999",
  email: "hello@hgcare.co.uk",
  emailHref: "mailto:hello@hgcare.co.uk",
  address: {
    line1: "Unit A1, The Embankment",
    line2: "Vale Rd, Heaton Mersey",
    city: "Stockport",
    postcode: "SK4 3GN",
  },
  founded: 2002,
  yearsCaring: "20+",
  cqcRating: "Good",
  serviceUsers: "500+",
  careWorkers: "150+",
  // Areas served
  areas: [
    "Manchester",
    "Stockport",
    "Coventry",
    "Trafford",
    "Rochdale",
    "Liverpool",
  ],
  areasText: "Manchester, Stockport, Coventry, Trafford, Rochdale & Liverpool",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Unit+A1+The+Embankment+Vale+Rd+Heaton+Mersey+Stockport+SK4+3GN",
  social: {
    instagram: "https://www.instagram.com/hgcareservices",
    linkedin: "https://uk.linkedin.com/company/hg-care-services",
  },
} as const;

// Office locations. The Stockport site is the head office / main contact.
export type Office = {
  name: string;
  org?: string;
  lines: string[];
  city: string;
  postcode: string;
};

export const offices: Office[] = [
  {
    name: "Head Office — Stockport",
    lines: ["Unit A1, The Embankment", "Vale Rd, Heaton Mersey"],
    city: "Stockport",
    postcode: "SK4 3GN",
  },
  {
    name: "Liverpool",
    org: "HG Care Regis",
    lines: ["Liverpool Innovation Park", "360 Edge Ln, Fairfield"],
    city: "Liverpool",
    postcode: "L7 9NJ",
  },
  {
    name: "Rochdale",
    lines: ["160 Oldham Rd"],
    city: "Rochdale",
    postcode: "OL11 1AG",
  },
  {
    name: "Coventry",
    lines: ["69 Albany Road", "Earlsdon"],
    city: "Coventry",
    postcode: "CV5 6JR",
  },
];

// Build a Google Maps directions link from an office's address.
export function officeMapsHref(o: Office): string {
  const q = [o.org, ...o.lines, o.city, o.postcode].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    q
  )}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "What We Do", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string; // emoji used as a lightweight, dependency-free icon
  summary: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "adult-care",
    title: "Personal & Adult Care",
    short: "Support with daily living, in the comfort of home.",
    icon: "🤝",
    summary:
      "Person-centred support that helps adults stay independent at home — from washing, dressing and mobility to medication, meal preparation and day-to-day routines.",
    features: [
      "Personal care — washing, dressing & grooming",
      "Medication prompting and administration",
      "Meal preparation and nutrition support",
      "Mobility assistance and falls prevention",
      "Day care and companionship",
      "Help around the home",
    ],
  },
  {
    slug: "dementia-care",
    title: "Dementia Care",
    short: "Patient, specialist care for memory conditions.",
    icon: "🧠",
    summary:
      "Specialist, compassionate care for people living with dementia or Alzheimer's, with carers trained to provide calm routine, reassurance and dignity at home.",
    features: [
      "Carers trained in dementia best practice",
      "Familiar routines that reduce anxiety",
      "Safe, supervised support at home",
      "Support for families and loved ones",
      "Engaging, meaningful daily activities",
    ],
  },
  {
    slug: "childrens-services",
    title: "Children's Services",
    short: "Specialist, caring support for children & young people.",
    icon: "🧒",
    summary:
      "Caring, DBS-checked support workers providing tailored care for children and young people with disabilities, complex and additional needs — and respite for families.",
    features: [
      "Physical and learning disabilities",
      "Autistic spectrum and sensory impairment",
      "Challenging behaviour support",
      "Complex needs and terminal illness",
      "Technology-dependent and enteral / PN feeding",
      "Befriending and respite for families",
    ],
  },
  {
    slug: "live-in-care",
    title: "Live-in & 24-Hour Care",
    short: "Round-the-clock support, in familiar surroundings.",
    icon: "🏠",
    summary:
      "A dedicated carer in your home providing continuous, one-to-one support — combining the best of domiciliary and residential care so you can stay where you feel safest.",
    features: [
      "One-to-one support, day and night",
      "A genuine alternative to a care home",
      "Stay in your home, keep your routines",
      "Waking and sleeping night care",
      "Companionship and emotional support",
      "Care built around you",
    ],
  },
  {
    slug: "palliative-care",
    title: "Palliative & End-of-Life Care",
    short: "Comfort, dignity and compassion when it matters most.",
    icon: "🕊️",
    summary:
      "Sensitive, dignified care for people with life-limiting conditions — keeping you comfortable and surrounded by the people and places you love, with support for the whole family.",
    features: [
      "Comfort-focused, dignified care",
      "Pain and symptom support",
      "Working alongside GPs and district nurses",
      "Emotional support for the whole family",
      "Care in familiar, comforting surroundings",
    ],
  },
  {
    slug: "respite-care",
    title: "Respite Care",
    short: "A well-earned break for family carers.",
    icon: "💚",
    summary:
      "Short-term and overnight respite that gives family carers a chance to rest, recharge and take care of themselves — knowing their loved one is in safe, caring hands.",
    features: [
      "Planned or short-notice respite",
      "Day, overnight or longer stays",
      "Continuity from carers you trust",
      "Support for adults and children",
      "Peace of mind for the whole family",
    ],
  },
];

export const stats = [
  { value: "2002", label: "Caring since" },
  { value: "500+", label: "Service users supported" },
  { value: "150+", label: "Care workers & growing" },
  { value: "Good", label: "CQC rated" },
];

export const values = [
  {
    icon: "❤️",
    title: "Compassion",
    text: "We treat every person with the warmth, patience and kindness we'd want for our own family.",
  },
  {
    icon: "🤲",
    title: "Dignity",
    text: "Care delivered with respect — protecting independence, choice and privacy at every step.",
  },
  {
    icon: "🛡️",
    title: "Trust",
    text: "Fully trained, DBS-checked carers and clear communication families can rely on.",
  },
  {
    icon: "⭐",
    title: "Quality",
    text: "Person-centred care plans, continuous training and CQC-rated 'Good' care.",
  },
];

// Careers — why work with HG Care (from recruitment materials)
export const perks = [
  { icon: "💷", title: "Excellent salary", text: "Competitive pay with enhanced rates for weekends and nights." },
  { icon: "🏅", title: "Living Wage employer", text: "An accredited National Living Wage employer since 2022 — fair pay you can count on." },
  { icon: "🌱", title: "No experience needed", text: "The right attitude matters most — we'll teach you the rest." },
  { icon: "🎓", title: "Full training provided", text: "Paid, accredited training from day one through HG Training." },
  { icon: "📜", title: "Gain qualifications", text: "Work towards recognised NVQ and care qualifications." },
  { icon: "🚗", title: "Transport available", text: "Support to get between visits so you're never left stranded." },
  { icon: "🗓️", title: "Flexible hours", text: "Shifts that fit around your life — full-time, part-time or weekends." },
];

// Local-authority partnerships (years of working together).
export const councils = [
  { name: "Stockport Council", detail: "Adult Social Care", years: 24 },
  { name: "Manchester City Council", years: 18 },
  { name: "Rochdale Council", years: 12 },
  { name: "Trafford Council", years: 9 },
  { name: "Coventry Council", years: 1 },
];

// HG Wellbeing — caring for the whole person
export const wellbeing = [
  { icon: "🧘", title: "Holistic support", text: "Care for mind and body — emotional wellbeing, confidence and a sense of purpose, not just practical tasks." },
  { icon: "🤗", title: "Companionship", text: "Friendly visits and genuine connection to tackle loneliness and keep spirits high." },
  { icon: "🎨", title: "Meaningful activities", text: "Hobbies, gentle exercise and outings tailored to interests, keeping people active and engaged." },
  { icon: "🌳", title: "Community connection", text: "Support to get out and about — to clubs, appointments, places of worship and local life." },
  { icon: "🥗", title: "Healthy living", text: "Encouragement with nutrition, hydration and routines that support long-term health." },
  { icon: "💬", title: "A listening ear", text: "Time, patience and reassurance — for the people we care for and the families who love them." },
];

// HG Training — courses our carers complete
export const trainingCourses = [
  "Care Certificate (the 15 standards)",
  "Safeguarding adults & children",
  "Moving & handling",
  "Medication administration",
  "Dementia awareness & best practice",
  "First aid & basic life support",
  "Infection prevention & control",
  "Mental capacity & dignity in care",
];

// Careers — the recruitment journey, step by step
export const recruitmentSteps = [
  { icon: "📝", title: "You apply", text: "Send a quick application online — it only takes a few minutes, and no experience is needed." },
  { icon: "💬", title: "Interview", text: "A friendly, relaxed chat so we can get to know you and answer all your questions." },
  { icon: "🎓", title: "Training", text: "Paid induction and the Care Certificate, so you start fully prepared and confident." },
  { icon: "💚", title: "Your first role", text: "Begin making a real difference, with a supportive team beside you every step." },
  { icon: "📈", title: "NVQ & ongoing support", text: "Work towards recognised NVQ qualifications with continued mentoring and development." },
  { icon: "🚀", title: "Grow further", text: "New roles and career opportunities open up as you progress with HG Care." },
];

// Accreditations & affiliations — shown as brand-styled badges (not logo copies).
export type Affiliation = {
  label: string;
  line: string;
  kind: "iso" | "cqc" | "member";
  href?: string;
  soon?: boolean;
  // Official logo filename in /public/logos. Falls back to a styled badge if
  // the file isn't present yet.
  logo?: string;
};

export const affiliations: Affiliation[] = [
  {
    label: "CQC",
    line: "Registered · rated Good",
    kind: "cqc",
    href: "https://www.cqc.org.uk/",
    logo: "cqc.png",
  },
  {
    label: "Living Wage Foundation",
    line: "Accredited employer since 2022",
    kind: "member",
    href: "https://www.livingwage.org.uk/",
    logo: "living-wage.png",
  },
  {
    label: "Homecare Association",
    line: "Member",
    kind: "member",
    href: "https://www.homecareassociation.org.uk/",
    logo: "homecare-association.png",
  },
  {
    label: "Antz",
    line: "Member",
    kind: "member",
    href: "https://antznetwork.com",
    logo: "antz.png",
  },
  { label: "ISO 9001", line: "Quality Management", kind: "iso" },
  { label: "ISO 14001", line: "Environmental Management", kind: "iso" },
  {
    label: "ISO 45001",
    line: "Health & Safety",
    kind: "iso",
    logo: "iso-45001.png",
  },
  { label: "ISO 27001", line: "Information Security", kind: "iso", soon: true },
];

// Testimonials. NOTE: placeholder examples — replace with real client feedback
// (or rely on the linked Google reviews) before going fully public.
export const testimonials = [
  {
    quote:
      "They treat my mum with such kindness and respect. The same friendly carers visit each day and it's a weight off our whole family.",
    author: "Daughter of a client · Stockport",
  },
  {
    quote:
      "Nothing is too much trouble. The team helped dad stay in his own home when we thought that wasn't possible anymore.",
    author: "Son of a client · Manchester",
  },
  {
    quote:
      "Caring, reliable and genuinely lovely people. Knowing they're there gives me real peace of mind.",
    author: "A client · Rochdale",
  },
];

export const faqs = [
  {
    group: "For families",
    items: [
      {
        q: "Which areas do you cover?",
        a: "We provide care across Manchester, Stockport, Coventry, Trafford, Rochdale and Liverpool. If you're nearby and not sure, just ask — we'll happily check.",
      },
      {
        q: "Is the first assessment free?",
        a: "Yes. We arrange a free, no-obligation home visit to understand the support you need, your routines and preferences, before any care begins.",
      },
      {
        q: "How quickly can care start?",
        a: "It depends on your needs, but we can often arrange care quickly. Call us on 0161 975 5999 and we'll talk you through the options.",
      },
      {
        q: "Are your carers trained and checked?",
        a: "Every carer is carefully recruited, fully trained through HG Training and DBS-checked. We're registered with the CQC and rated 'Good'.",
      },
      {
        q: "What types of care do you offer?",
        a: "Personal & adult care, dementia care, children's services, live-in & 24-hour care, palliative care and respite care — all tailored to you.",
      },
    ],
  },
  {
    group: "For carers",
    items: [
      {
        q: "Do I need experience to apply?",
        a: "No — the right attitude matters most. We provide full, paid training including a 2-day induction and the Care Certificate, so you start confident.",
      },
      {
        q: "What training and qualifications will I get?",
        a: "A paid induction, the Care Certificate, and funded NVQ qualifications with ongoing mentoring and specialist training throughout your career.",
      },
      {
        q: "What are the hours like?",
        a: "Flexible — full-time, part-time, nights, weekends and live-in roles are available. We'll find shifts that fit around your life.",
      },
      {
        q: "How do I apply?",
        a: "Complete our online application form — it only takes a little while and you can save your progress as you go through the steps.",
      },
    ],
  },
];
