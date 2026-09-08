# NKRF (NKE Group)

**URL:** https://nkegroup.com/
**Role on this project:** full-stack
**Engagement:** [ADD: confirm whether this was via Wysbrix, Deedbee, or another engagement — not specified]

## What it is
NKRF is India's premier manufacturer of RF (radio frequency) and microwave cable assemblies for aerospace and space applications — described on the site as India's sole CEMILAC-qualified manufacturer of airworthy RF cable assemblies, with deployments on fighters, helicopters, and munitions. Clients include HAL, ISRO, DRDO, Tata Advanced Systems, the Indian Air Force, and the Indian Navy. The company has 40+ years of experience and claims 1M+ interconnects delivered across 100+ programs, with CEMILAC (2016), ISRO (2022), and AS9100D certifications.

## Site sections / key features observed
- About Us, Sectors, What We Do, Career, and Contact Us navigation
- Manufacturing capability and certification showcases (CEMILAC, ISRO, AS9100D)
- Client/partner credibility section (HAL, ISRO, DRDO, Tata Advanced Systems, IAF, Navy)
- Inquiry/contact flow for defense and aerospace procurement audiences

## My contribution

This public marketing site is separate from the actual project: NKRF's **internal costing, pricing, and quotation platform** (a T3-stack app — Next.js 14, tRPC, Drizzle ORM, PostgreSQL — with ~115 tables covering compliance, costing, pricing, quotations, work orders, and packing lists). This is the system now featured as the top case study on the portfolio (slug `nkegroup` in `src/data/projects.ts`), not the public site linked above.

As a full-stack developer on that platform: worked across the tRPC API layer, the Drizzle schema, and the pricing/quotation domain (including the sanitization boundary that strips vendor-internal cost data from customer-facing quotes and the role/permission-gated pricing mutations), plus the PDF generation pipeline (three parallel rendering paths — cached Puppeteer/EJS, a Python/WeasyPrint microservice for compliance docs, and a standalone per-request route). Also diagnosed and fixed a production incident where un-closed Puppeteer browser instances were leaking Chromium temp profiles and filling server disk.

See the full case study in `src/data/projects.ts` (slug `nkegroup`) for the write-up used on the site.

## Screenshots
Drop images for this project into `public/projects/nkegroup/` — they'll get wired into the site once available.
