# Dejan Rajkovic

Personal site for a Senior MLOps Engineer. Static HTML, CSS, and JavaScript, served from GitHub Pages at [dejan992.github.io/about-me](https://dejan992.github.io/about-me). Custom domain is deferred.

## Local preview

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## GitHub Pages

This repo is a project site. GitHub Pages should deploy from the `main` branch, site root (`/`). `.nojekyll` is in the root so GitHub does not run Jekyll.

Relative links are used throughout so the site works both at `/about-me/` and on `localhost`.

## Pathdelta

Production marketing page for **Pathdelta** (custom academy from role × person × team; ramp ~90 days → ~3): [dejan992.github.io/about-me/pathdelta/](https://dejan992.github.io/about-me/pathdelta/). Demo data is labeled: Alex Chen, Jordan Lee, acme payments team.

## Latch

Production marketing page for **Latch** (decision control plane): [dejan992.github.io/about-me/latch/](https://dejan992.github.io/about-me/latch/).

A dedicated public repo (`Dejan992/latch`) is the intended home. This GitHub App token cannot `createRepository`, so the live page ships here until that repo exists. Copy `latch/` to the dedicated repo root when it does.

## Pages

- `index.html`: home (name-first hero, About, Skills, Projects, Contact). Uses `home.css`.
- `projects/`: AI infrastructure, Agent Memory, Agent Observability, Platform SDK (contributions). Uses `styles.css`.
- `writing/`: notes index and stub posts
- `speaking/`: talk abstracts and engagements (empty until real dates exist)
- `pathdelta/`: product page for Pathdelta (role × person × team academy, 3-day curriculum demo)
- `latch/`: production marketing page for Latch
- `404.html`: GitHub Pages not-found page
- `sitemap.xml` and `robots.txt`: crawl hints for the Pages URL

## Adding a note

1. Create `writing/your-slug/index.html`.
2. Link it from `writing/index.html` with a date and one-line summary.
3. Keep CSS and JS paths relative (`../../styles.css` from a nested note).

No CMS and no build step. One HTML file per note is enough.

## Contact

- Email: [dan.rajkovic@icloud.com](mailto:dan.rajkovic@icloud.com)
- LinkedIn: [/in/dejan-rajkovic](https://www.linkedin.com/in/dejan-rajkovic)
- GitHub: [@Dejan992](https://github.com/Dejan992)
