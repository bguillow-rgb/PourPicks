#!/usr/bin/env bash
# Build the Astro site and replace the contents of ../docs with the build.
# GitHub Pages on this repo is configured to serve /docs from the main
# branch, so this is the publish step.
#
# Run from web/:  bash scripts/deploy-to-docs.sh
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Building Astro site"
npm run build

# Guard: the build must still contain the GA4 tag before we publish it.
#
# GA4 is env-gated on PUBLIC_GA4_ID (see src/components/Analytics.astro).
# Build without that variable set and the tag is silently omitted from
# EVERY page — no error, no warning, just a build that looks fine. This
# script then does `rm -rf ../docs`, so the regression ships. That very
# nearly happened on 2026-08-11 on the perfumepicks.app repo, where a
# build ran from a git worktree that had no env file and quietly dropped
# analytics from all 65 pages.
#
# Fail here, before the destructive step, rather than in production.
REQUIRED_GA4="G-TQEWNVLRZY"
if ! grep -q "$REQUIRED_GA4" dist/index.html; then
  cat >&2 <<EOF
ERROR: GA4 tag $REQUIRED_GA4 is missing from dist/index.html.

PUBLIC_GA4_ID was not set at build time, so the analytics snippet was
left out of every page. Refusing to publish and wipe ../docs.

Fix: make sure web/.env (or web/.env.local) contains
  PUBLIC_GA4_ID=$REQUIRED_GA4
then re-run this script. If you are building from a git worktree, note
that env files are untracked and do NOT come with the worktree.
EOF
  exit 1
fi
echo "==> GA4 tag present ($REQUIRED_GA4)"

DOCS_DIR="../docs"

echo "==> Replacing $DOCS_DIR with fresh build"
# Preserve nothing — public/CNAME is rebuilt into dist by Astro and copied
# below. This is intentionally destructive: if you have manual files in
# /docs that aren't in /web, move them into /web first.
rm -rf "$DOCS_DIR"
mkdir -p "$DOCS_DIR"
cp -R dist/. "$DOCS_DIR"/

echo "==> /docs now contains:"
ls "$DOCS_DIR"

echo ""
echo "Done. Commit the changes in /docs and push to publish."
