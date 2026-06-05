// Site-wide constants. Single source of truth for the Astro site.
// Update these as the project evolves; everything else (schema, footer,
// social cards, llms.txt) reads from here.

export const SITE = {
  name: 'Pour Picks',
  // Legal operating entity behind the app/site. Surfaced in the footer and
  // Organization schema (legalName) for brand-entity consistency, and mirrors
  // the App Store developer display name.
  legalEntity: 'Timberline Ventures LLC',
  tagline: 'The Bourbon Collector\u2019s Cellar',
  description:
    'Pour Picks is a hobby and lifestyle iOS app for adult bourbon collectors. Catalog your cellar, scan bottles to identify what you own, track collection value, and journal every pour in one private reference.',
  url: 'https://pourpicks.app',
  locale: 'en-US',
  supportEmail: 'support@pourpicks.app',
  // Live on the App Store since 2026-05-09. Apple app ID is 6764040132 (the
  // ASC App Apple ID, also used in eas.json submit.production.ascAppId).
  appStoreUrl: 'https://apps.apple.com/us/app/pour-picks/id6764040132',
  bundleId: 'com.pourpicks.app',
  appleTeamId: 'ZNS5TNLB2D',
  // Founder / publisher \u2014 used for Person and Organization schema. The
  // /about page is the canonical entity anchor.
  founder: {
    name: 'Bob Guillow',
    role: 'Founder',
    sameAs: [
      // Add LinkedIn / X / GitHub when ready. Empty entries are filtered out
      // before rendering so it\u2019s safe to leave them blank.
      'https://twitter.com/pourpicks',
    ],
  },
  // Organization-level sameAs \u2014 canonical social and store profiles for the
  // brand entity. Used in OrganizationSchema.
  orgSameAs: [
    'https://apps.apple.com/us/app/pour-picks/id6764040132',
    'https://twitter.com/pourpicks',
    'https://www.instagram.com/pourpicksapp',
  ],
  // Analytics + tracking. All values come from env vars at build time so
  // local builds and forks don't fire analytics.
  analytics: {
    // Google Analytics 4 Measurement ID, e.g. 'G-XXXXXXXXXX'. Set via
    // PUBLIC_GA4_ID at build time. Empty string disables analytics.
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '',
    // Google Search Console verification token (the meta tag content
    // value). Set via PUBLIC_GSC_VERIFICATION at build time.
    gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? '',
    // IndexNow key. Public by design \u2014 it's verified by serving the
    // matching <key>.txt file at site root. See public/.
    indexNowKey: import.meta.env.PUBLIC_INDEXNOW_KEY ?? '',
  },
  // Cask Club aesthetic \u2014 oxblood + antique brass on espresso black.
  // Mirrors the in-app theme in pour-picks/src/constants/theme.ts so the
  // marketing site and the app feel like the same product.
  theme: {
    bg: '#0F0B09',
    card: '#241914',
    text: '#EDE4D3',
    muted: '#A89B82',
    accent: '#B08D57',
    border: 'rgba(176, 141, 87, 0.20)',
  },
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Blog', href: '/articles' },
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Support', href: '/support' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
