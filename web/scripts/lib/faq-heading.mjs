// Single source of truth for "this article body contains its own FAQ section".
//
// The FAQ is rendered once, from frontmatter `faqs`, via FAQ.astro. A body that
// also hand-writes one ships the questions twice on the page and duplicates the
// FAQPage schema. Two places need to agree on what that looks like: the
// generator (which strips it before writing) and the article route (which fails
// the build if one survives). They live in different trees, so they share this
// module rather than each carrying their own copy of the pattern — the daily
// build broke on 2026-10-01 precisely because the generator and the guard had
// different ideas about the body.
//
// Matches `## FAQ`, `### FAQs`, `## Quick FAQ`, `## 5 FAQs`, and the spelled-out
// `## Frequently Asked Questions`. The spelled-out form is the one the model
// actually reaches for, and the original guard did not catch it — 12 articles
// shipped with duplicate FAQs before this was widened.
export const FAQ_HEADING_RE =
  /^#{2,3}[ \t]*(?:\d+[ \t]*)?(?:(?:quick|common)[ \t]+)?(?:faqs?\b|frequently[ \t]+asked)/im;

// Remove every in-body FAQ section: the heading plus everything under it, up to
// the next heading of the same or higher level (or the end of the body).
export function stripInBodyFaq(body) {
  let out = String(body ?? '');
  // An article can carry more than one, so keep going until none are left. Each
  // pass deletes at least the matched heading text, so this always terminates.
  for (;;) {
    const m = FAQ_HEADING_RE.exec(out);
    if (!m) return out;
    const start = m.index;
    const level = (/^#+/.exec(out.slice(start)) || ['##'])[0].length;
    const rest = out.slice(start + m[0].length);
    // The next heading at the same level or shallower ends the FAQ section.
    // `(?!#)` keeps a deeper heading (e.g. #### under a ## FAQ) from ending it.
    const nextIdx = rest.search(new RegExp(`^#{1,${level}}(?!#)`, 'm'));
    out = nextIdx === -1 ? out.slice(0, start) : out.slice(0, start) + rest.slice(nextIdx);
  }
}
