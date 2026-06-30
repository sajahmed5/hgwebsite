# HG Care Services — Website

A modern, fast website for **HG Care Services**, a home care provider in Stockport & Greater Manchester.

Built with **Next.js 15** (App Router), **TypeScript** and **Tailwind CSS v4**.

## Features

- Warm, caring, fully responsive design
- Home, About, Services (+ detail pages), HG Wellbeing, HG Training, Careers, Contact
- Working **enquiry form** and **job-application form** (with validation + spam honeypot)
- SEO ready: per-page metadata, sitemap, robots, Open Graph
- Accessible: skip link, semantic markup, keyboard-friendly nav
- No paid assets — icons and illustrations are inline SVG/emoji

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:3000
npm run build    # production build
npm run start    # run the production build
```

## Editing content

Almost all text and business details live in one file:

**`src/data/site.ts`** — phone, email, address, services, stats, values, nav.

Change it there and it updates across the whole site.

## The forms (enquiry + job application)

Both forms email submissions to **hello@hgcare.co.uk** via [Resend](https://resend.com).
Delivery is controlled by environment variables (see `.env.example`) — no secrets
in the code. **If `RESEND_API_KEY` is not set, the forms still work**; submissions
are logged to the server console instead of emailed, so nothing breaks before setup.

To turn on email delivery:

1. Create a free account at [resend.com](https://resend.com) and make an **API key**.
2. Add these environment variables (locally in `.env.local`, and in your host):
   - `RESEND_API_KEY` — your key
   - `CONTACT_TO_EMAIL` — `hello@hgcare.co.uk` (default)
   - `CONTACT_FROM_EMAIL` — leave blank to use Resend's test sender, or verify the
     `hgcare.co.uk` domain in Resend and set e.g. `HG Care <noreply@hgcare.co.uk>`
     (verifying your domain is what lets emails reliably reach your inbox).

Code lives in `src/lib/email.ts`, used by `src/app/api/contact/route.ts` and
`src/app/api/careers/route.ts`.

## Deploying

Standard Next.js app — easiest path is Vercel (free):

1. Push this folder to a GitHub repo.
2. Import it at [vercel.com](https://vercel.com) → it auto-detects Next.js.
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy, then add **`hgcare.co.uk`** under **Settings → Domains** and update your
   DNS as Vercel instructs.

Netlify and any Node host also work (`npm run build` then `npm run start`).
