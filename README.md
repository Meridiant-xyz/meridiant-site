# Meridiant website

Plain HTML/CSS/JS landing page for Meridiant — no build step, no framework, no dependencies.

```
website/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── favicon.svg
├── CNAME          # custom domain for GitHub Pages (meridiant.xyz)
└── .nojekyll      # tells GitHub Pages to skip Jekyll processing
```

## Preview locally

No build tools needed — just open the file, or serve it so relative paths behave normally:

```bash
cd website
python3 -m http.server 8000
# visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Push this `website/` folder as the root of its own GitHub repo (or push the whole
   `promorphic` repo and point Pages at this subfolder — see note below).

   ```bash
   cd website
   git init
   git add .
   git commit -m "Meridiant landing page"
   git branch -M main
   git remote add origin git@github.com:<your-org>/<repo>.git
   git push -u origin main
   ```

2. On GitHub: **Settings → Pages**.
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / `/(root)`
   - Save.

3. GitHub builds and serves the site at `https://<your-org>.github.io/<repo>/` within a
   minute or two. No Actions workflow required since there's no build step.

> **If you keep this inside the monorepo instead of a standalone repo:** GitHub Pages
> "deploy from branch" only serves from the repo root or a `/docs` folder — it can't serve
> an arbitrary subfolder like `meridiant/website`. Either push this folder as its own repo
> (recommended, keeps it simple), or add the small GitHub Actions workflow below that
> uploads `meridiant/website` as the Pages artifact from the monorepo.

<details>
<summary>Optional: GitHub Actions workflow for deploying a subfolder from the monorepo</summary>

Create `.github/workflows/pages.yml` at the repo root:

```yaml
name: Deploy Meridiant site
on:
  push:
    branches: [main]
    paths: ["meridiant/website/**"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: meridiant/website
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then set **Settings → Pages → Source** to `GitHub Actions` instead of "Deploy from a branch".

</details>

## Connecting meridiant.xyz

The `CNAME` file already contains `meridiant.xyz`, which is what GitHub Pages expects for a
custom domain. It won't do anything until DNS points at GitHub, so it's safe to leave in
place now and finish the DNS step whenever you're ready:

1. At your DNS provider, add either:
   - **Apex domain (`meridiant.xyz`):** four `A` records pointing to GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - **`www` subdomain:** a `CNAME` record pointing `www.meridiant.xyz` → `<your-org>.github.io`.
2. Back on GitHub: **Settings → Pages → Custom domain** → enter `meridiant.xyz` → Save.
3. Wait for DNS to propagate, then enable **Enforce HTTPS** once GitHub shows the cert is ready.

## Editing content

Everything lives in `index.html` (content/structure), `styles.css` (theme/layout), and
`script.js` (mobile nav + scroll-reveal). No build step — edit and refresh.
