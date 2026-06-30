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
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Wellbeing", href: "/wellbeing" },
  { label: "Training", href: "/training" },
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
  { icon: "🌱", title: "No experience needed", text: "The right attitude matters most — we'll teach you the rest." },
  { icon: "🎓", title: "Full training provided", text: "Paid, accredited training from day one through HG Training." },
  { icon: "📜", title: "Gain qualifications", text: "Work towards recognised NVQ and care qualifications." },
  { icon: "🚗", title: "Transport available", text: "Support to get between visits so you're never left stranded." },
  { icon: "🗓️", title: "Flexible hours", text: "Shifts that fit around your life — full-time, part-time or weekends." },
];
