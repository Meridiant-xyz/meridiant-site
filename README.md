# Meridiant website

Single-file HTML landing page for Meridiant — no build step, no framework, no dependencies.
All CSS and JS live inline in `index.html`.

```
meridiant-site/
├── index.html     # everything: markup, styles, scroll-tracking script,
│                  # and the whitepaper request modal
├── assets/
│   └── favicon.svg
├── CNAME          # custom domain for GitHub Pages (meridiant.xyz) — currently removed, see below
└── .nojekyll      # tells GitHub Pages to skip Jekyll processing
```

The page includes a modal (triggered by any "Whitepaper" button in the nav, hero, CTA
strip, or footer) that collects an email address. **It's front-end only right now** — there's
no backend wired up, so submissions aren't actually stored or sent anywhere. Hook it up to a
form service (Formspree, Mailchimp, ConvertKit, etc.) or a small serverless function before
relying on it to capture real signups.

## Preview locally

No build tools needed — just open the file, or serve it so relative paths behave normally:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to GitHub Pages

This repo is already pushed to `https://github.com/Meridiant-xyz/meridiant-site` with GitHub
Pages enabled (**Settings → Pages → Source: Deploy from a branch → `main` / root**). Any push
to `main` redeploys automatically within a minute or two, at:

**`https://meridiant-xyz.github.io/meridiant-site/`**

Occasionally the "Deploy to GitHub Pages" step fails transiently even though the build itself
succeeded (check **Settings → Pages** or the **Actions** tab for a red ✗ if the live site looks
stale after a push). If that happens, just push an empty commit to retrigger it:

```bash
git commit --allow-empty -m "Retrigger Pages deployment"
git push
```

## Connecting meridiant.xyz

A `CNAME` file containing `meridiant.xyz` was previously added and then removed, because
GitHub auto-configures it as the enforced custom domain and forces a redirect from the
`github.io` URL to `meridiant.xyz` — which currently just shows a Namecheap parking page since
DNS isn't pointed at GitHub yet. Once you're ready to go live on the custom domain:

1. Add the file back:
   ```bash
   echo "meridiant.xyz" > CNAME
   git add CNAME && git commit -m "Add CNAME for meridiant.xyz" && git push
   ```
2. At your DNS provider, add either:
   - **Apex domain (`meridiant.xyz`):** four `A` records pointing to GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **`www` subdomain:** a `CNAME` record pointing `www.meridiant.xyz` → `meridiant-xyz.github.io`.
3. On GitHub: **Settings → Pages → Custom domain** → enter `meridiant.xyz` → Save.
4. Wait for DNS to propagate, then enable **Enforce HTTPS** once GitHub shows the cert is ready.

## Editing content

Everything lives in `index.html` — markup, styles (in the `<style>` block), and the small
scroll-tracking script for the sidebar section markers (in the `<script>` block at the
bottom). No build step — edit and refresh.
