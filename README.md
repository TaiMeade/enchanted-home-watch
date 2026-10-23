# Enchanted Home Watch

Home watch, security checks and maintenance for second homes in New Mexico's Enchanted Circle
(Taos, Arroyo Seco, Taos Ski Valley, Questa, Red River, Eagle Nest, Angel Fire).

**Live site:** https://taimeade.github.io/enchanted-home-watch/

### Mission statement
Secondary-home security/maintenance business. People who live elsewhere, but have an alternate home in the
Sangre de Cristo mountains area (Enchanted Circle) and want someone to check in periodically. The payment
is subscription-based:
- Gold
- Platinum
- Diamond

### Aesthetics / theme
Gallery of pictures at the top, navbar, hero/title, contact modal, subscription cards, etc. More
information inbound from Ian.

The theme pairs spruce forest (`#173A33`) with aspen gold (`#E3AA45`) on a soft sage mist
(`#F4F6F2`), echoing the Gold / Platinum / Diamond tiers. Gold is reserved for actions and highlights.
Type is Manrope throughout, with tight, heavy headings. Photo and dark sections sit in rounded panels
inset from the page edge, under a floating glass navbar.

---

## Stack

- [Vue 3](https://vuejs.org/) + [Vite](https://vite.dev/)
- [Vuetify 4](https://vuetifyjs.com/) for interactive components (dialog, form fields, buttons, FAQ panels)
- [Tailwind CSS 4](https://tailwindcss.com/) for layout utilities, via PostCSS, **prefixed `tw:`** and
  without its preflight reset so it never clashes with Vuetify
- [vite-ssg](https://github.com/antfu-collective/vite-ssg) to pre-render every page to static HTML (SEO)
- [@unhead/vue](https://unhead.unjs.io/) for titles, meta tags, canonical URLs and JSON-LD
- [EmailJS](https://www.emailjs.com/) (`@emailjs/browser`) for the contact form
- GitHub Pages via GitHub Actions

## Local development

```bash
npm install
cp .env.example .env   # then fill in the EmailJS keys
npm run dev            # http://localhost:5173/enchanted-home-watch/
npm run build          # pre-renders every page into dist/
npm run preview        # serve the built site locally
```

Requires Node 22.12 or newer.

## Editing content

Almost everything a non-developer would change lives in JSON under `src/data/`:

| File | What it controls |
| --- | --- |
| `site.json` | Business name, tagline, site URL, contact email/phone/hours, social links, billing methods and terms, nav links, main call-to-action text |
| `plans.json` | Gold / Platinum / Diamond prices, cadence and features (each tier lists only what it adds, and `includes` points at the tier below), plus one-off add-on services |
| `areas.json` | Towns served (each becomes its own `/service-areas/<slug>/` page and a dot on the map), local concerns, map route |
| `faq.json` | FAQ questions and answers (also published as FAQ structured data) |
| `gallery.json` | Photos in the top gallery, with alt text and captions |
| `process.json` | The "How it works" steps |
| `sample-report.json` | The example visit report on the home page |

Photos live in `src/assets/photos/` as `<slug>-960.webp` (and optionally `<slug>-1600.webp`).
Reference them from data files by slug, e.g. `"image": "snowy-cabin"`.

Brand colors are defined once in `src/theme/palette.js` and exposed to CSS as
`rgb(var(--v-theme-<name>))`.

### Adding a town

Add an entry to `areas.json` with `slug`, `name`, `lat`, `lon`, `elevationFt`, `intro`, `watchFor` and an
`image`. The page, map dot, footer link, sitemap entry and structured data are all generated from it.

## SEO

- Every route is pre-rendered to real HTML, so crawlers see full content without running JavaScript.
- Each page sets a unique title, description, canonical URL and Open Graph/Twitter card.
- JSON-LD: `HomeAndConstructionBusiness` (with offers and service area), `FAQPage`, and per-town
  `Service` + `BreadcrumbList`.
- `sitemap.xml` and `robots.txt` are generated at build time from `site.json` and `areas.json`
  (`scripts/seo-files.js`).
- After launch, submit the sitemap in Google Search Console and set up a Google Business Profile.

## Contact form (EmailJS)

EmailJS is preconfigured with the shared account and template. The three keys are read from
`import.meta.env.VITE_EMAILJS_*` and are **never committed**:

- Locally they come from `.env` (gitignored; see `.env.example`).
- In CI they are injected from GitHub Actions secrets with the same names:
  `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

Only two things are per-site:

1. **`to_email`**: the inbox that receives inquiries. It is `contact.email` in `src/data/site.json`
   (currently a placeholder, so update it before going live).
2. **Allowed Origins**: add `https://taimeade.github.io` in the EmailJS dashboard.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to
GitHub Pages. In the repo settings, **Pages > Source must be set to "GitHub Actions"**. You can also
enable it from the CLI:

```bash
gh api repos/TaiMeade/enchanted-home-watch/pages -X POST -f build_type=workflow
```

After adding or changing the EmailJS secrets, re-run the latest **Deploy to GitHub Pages** workflow
(Actions tab, or `gh workflow run deploy.yml`) so the live build picks them up.

### Moving to a custom domain

Change `url` in `src/data/site.json` (for example `https://enchantedhomewatch.com/`). The Vite base path,
canonical URLs, sitemap and structured data all follow it. Then add a `public/CNAME` file containing the
domain and configure DNS.

## Content to confirm before launch

Prices, plan features, the phone number (a 555 placeholder), social links, the sample report and the copy
are starter content. Review them with Ian and update the JSON files. Gallery photos are free Unsplash
images; replace them with real photos when available.
