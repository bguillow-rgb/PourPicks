# Pour Picks — Marketing & Content Site

The public-facing site at https://pourpicks.app. Built with Astro, deployed
through GitHub Pages from `/docs`.

## Local development

```bash
cd web
npm install
npm run dev    # http://localhost:4321
```

## Build

```bash
npm run build
```

Output is in `web/dist`.

## Deploy

GitHub Pages serves `/docs` from `main`. Day-to-day deploy is one
script + one push:

```bash
cd web
npm run build
bash scripts/deploy-to-docs.sh
cd ..
git add docs && git commit -m "publish: <what changed>" && git push
```

GitHub Pages picks up the change and rebuilds in ~60 sec.

The repo must be **public** OR on a paid GitHub plan for Pages to
work. After the first publish, verify Pages is configured at:
Settings → Pages → Source = "Deploy from a branch", Branch = `main`,
Folder = `/docs`.

(Optional, after publishing new articles) ping IndexNow so search
engines re-crawl quickly:

```bash
PUBLIC_INDEXNOW_KEY=<your-key> bash scripts/indexnow-ping.sh
```

## Structure

```
web/
├── public/                 # static assets copied verbatim to dist/
│   ├── CNAME
│   ├── robots.txt          # allows AI crawlers explicitly
│   ├── llms.txt            # canonical content index for LLMs
│   ├── favicon.png
│   └── icon-512.png
├── src/
│   ├── consts.ts           # single source of truth for SITE config
│   ├── content/
│   │   ├── config.ts       # collection schemas (articles, pillar)
│   │   ├── articles/       # detail-tier posts (markdown/MDX)
│   │   └── pillar/         # pillar pages (markdown/MDX)
│   ├── components/
│   │   ├── schema/         # JSON-LD components per schema type
│   │   ├── QuickAnswer.astro
│   │   ├── FAQ.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── support.astro
│       ├── privacy.astro
│       ├── terms.astro
│       ├── delete-account.astro
│       ├── 404.astro
│       └── articles/
│           ├── index.astro
│           └── [...slug].astro
└── astro.config.mjs        # sitemap + MDX integrations
```

## SEO / AEO infrastructure

This site is set up against the SEO/Content/ASO playbook in `~/.claude/CLAUDE.md`.

- **Schema** — JSON-LD on every page: `Organization` + `WebSite` (global),
  `SoftwareApplication` (homepage), `AboutPage` + `Person` (about page),
  `Article` + `Speakable` (articles), `BreadcrumbList`, `FAQPage`.
- **AEO** — `llms.txt` at root, `robots.txt` allows AI crawlers, every page
  has a Quick Answer block (id="quick-answer") that Speakable schema points
  at, FAQ at the bottom of content pages with `FAQPage` schema.
- **E-E-A-T** — `/about` is the entity anchor with founder bio and editorial
  standards. Articles are bylined and dated.
- **Sitemap** — generated automatically on each build by `@astrojs/sitemap`.

## Adding a new article

```bash
# Create a markdown file under src/content/articles/
# Frontmatter is enforced by src/content/config.ts.
```

```markdown
---
title: "Does bourbon get better in the bottle?"
description: "The short answer is no — bourbon is non-living once bottled. Here's what actually changes when air hits an opened bottle."
targetQuery: "does bourbon age in the bottle"
relatedQueries:
  - "bourbon oxidation in bottle"
  - "bourbon shoulder pour"
quickAnswer: "Bourbon does not age in a sealed bottle. Aging happens in the barrel — oak, char, and oxygen interaction in wood are what shape the spirit. Once bottled the proof and flavor are essentially fixed. After opening, oxygen begins to alter the spirit, but this is oxidation rather than maturation, and it accelerates as the bottle empties."
publishedAt: "2026-05-01"
author: "Bob Guillow"
relatedSlugs:
  - "bourbon-bottle-oxidation"
faqs:
  - q: "How long does an opened bourbon bottle stay good?"
    a: "An opened bottle above the shoulder will hold its character for many months. Below the shoulder, oxidation accelerates — most collectors notice meaningful flavor drift within a few weeks of the bottle dropping below halfway."
---

Body content here. Use H2 questions like "What happens after a year above the shoulder?" — these
become AI extraction targets.
```
