# Pour Picks

The public marketing and content site for [Pour Picks](https://pourpicks.app), a hobby and lifestyle iOS app for adult bourbon collectors.

The iOS app itself is in a separate repository.

## Layout

```
PourPicks/
├── web/        # Astro source (run `npm run dev` here)
└── docs/       # Build output served by GitHub Pages
```

## Deploy

```bash
cd web
npm install      # first time only
npm run build
bash scripts/deploy-to-docs.sh
cd ..
git add docs && git commit -m "publish: <what changed>" && git push
```

GitHub Pages picks up the change and rebuilds in ~60 seconds.

## Pages settings (one-time)

Settings → Pages → Source = "Deploy from a branch", Branch = `main`, Folder = `/docs`. CNAME points to `pourpicks.app`.

See `web/README.md` for site-specific details (SEO, schema, content collections).
