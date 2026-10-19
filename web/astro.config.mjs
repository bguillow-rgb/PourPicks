import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://pourpicks.app',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  // Invented URL variants of real articles that Google keeps crawling and
  // showing (likely AI-surface citations of slugs that never existed). Static
  // hosting can't send a 301, so Astro emits a meta-refresh page with a
  // canonical to the real article. Mapping from the 2026-09-28 SEO audit.
  // Never add a variant that differs from a real slug only by letter case
  // (e.g. /articles/old-Fashioned-rye-or-bourbon): the site is built on macOS,
  // whose filesystem is case-insensitive, so the redirect page overwrites the
  // real article with a page that redirects to itself.
  redirects: {
    '/articles/how-many-pours-in-a-bourbon-bottle': '/articles/how-many-pours-in-a-bottle-of-bourbon',
    '/articles/how-many-pours-in-a-bourbon': '/articles/how-many-pours-in-a-bottle-of-bourbon',
    '/articles/how-many-pours-is-in-a-bottle-of-bourbon': '/articles/how-many-pours-in-a-bottle-of-bourbon',
    '/articles/bourbon-cellar-apps': '/articles/best-bourbon-cellar-apps',
    '/articles/best-bourbon-cellar-app': '/articles/best-bourbon-cellar-apps',
    '/articles/best-whiskey-tracking-apps-in-2026': '/articles/best-bourbon-cellar-apps',
    '/articles/What-Is-the-Kentucky-Bourbon-Barrel-Tax-A-Collectors-Guide': '/articles/what-is-the-kentucky-bourbon-barrel-tax',
    '/articles/bourbon-age-statement-nas-does-the-number-matter': '/articles/bourbon-age-statement-vs-nas',
    '/articles/bourbon-age-statement-vs-nas-does-age-matter': '/articles/bourbon-age-statement-vs-nas',
    '/articles/pourpicks.app/articles/what-is-a-dsp-number-bourbon': '/articles/what-is-a-dsp-number-bourbon',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    mdx(),
  ],
});
