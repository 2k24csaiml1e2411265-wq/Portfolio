# Yash Kushwaha — Portfolio

A single-page portfolio site, styled around a "model card" theme (dark, teal/amber, monospace data labels) — fitting for an AI/ML portfolio. Plain HTML/CSS/JS, no build step, no framework. Works as-is on GitHub Pages, Netlify, or Vercel.

---
Live Link:
(portfolio)[https://2k24csaiml1e2411265-wq.github.io/Portfolio/]
---

## Structure

```
portfolio/
├── index.html          Main page (all sections: hero, experience, projects, skills, education, contact)
├── css/
│   └── style.css       All styles, incl. mobile nav + contact form
├── js/
│   └── script.js       Scroll-reveal animation, mobile nav toggle, contact form submit
├── assets/
│   ├── favicon.svg     Site icon
│   ├── og-image.jpg    Social share preview image (Open Graph / Twitter Card)
│   └── resume.pdf       One-page resume, downloadable from the hero section
├── robots.txt
├── sitemap.xml
└── README.md
```

## Before you upload — 3 things to finish

1. **Activate the contact form.** It's wired for [Formspree](https://formspree.io) (free, no backend needed):
   - Sign up at formspree.io, create a new form, copy your form ID.
   - In `index.html`, find `<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" ...>` and replace `YOUR_FORM_ID` with your real ID.
   - That's it — submissions land in your inbox. Until you do this, the form will show an error on submit.

2. **Fill in two remaining project descriptions.** In `index.html`, search for `[Add:` — there are two placeholders left, for **DataAnalystEnv** and **Recommendation System** (search `fill` in `css/style.css` to see how they're styled — amber dashed text, easy to spot on the live page too).

3. **Swap the placeholder domain.** Several files assume the URL `https://2k24csaiml1e2411265-wq.github.io/portfolio/` (a guess based on your GitHub username) — update it once you know your real GitHub Pages / Netlify / Vercel URL:
   - `index.html` — `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`
   - `robots.txt` — `Sitemap:` line
   - `sitemap.xml` — `<loc>`

## Deploying

**GitHub Pages (recommended, free):**
1. Create a new repo, e.g. `portfolio`.
2. Upload all files in this folder to the repo root (keep the folder structure — `css/`, `js/`, `assets/` as subfolders).
3. Repo → Settings → Pages → Source: `main` branch, `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

**Netlify / Vercel (also free, and gives you a cleaner URL):**
1. Drag-and-drop this whole folder onto [netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo on either platform.
2. No build command needed — it's static HTML.

## What's already handled

- **Mobile responsive** — nav collapses into a hamburger menu, hero/cards/grids stack to single-column under 760px.
- **Accessibility** — skip-to-content link, semantic landmarks (`nav`/`main`/`section`/`footer`), labelled form fields, visible focus states, `prefers-reduced-motion` respected, content is visible by default even if JavaScript fails to load (progressive enhancement, not a dependency).
- **SEO** — meta description, canonical URL, Open Graph + Twitter Card tags, `robots.txt`, `sitemap.xml`, semantic heading structure.
- **Contact form** — client-side validation, honeypot spam field, inline success/error states, graceful fallback to a normal form POST if JavaScript fails.
- **Resume download** — the "Download resume" button in the hero links to `assets/resume.pdf`, generated from the same content as the page (contact info, experience, projects, skills, certifications) so both stay in sync.

## Updating content later

Everything is plain HTML — open `index.html` in any text editor and edit the text directly. The structure is grouped by section (`<section id="experience">`, `<section id="projects">`, etc.) with comments-free but readable markup. No rebuild step required — just save and refresh.
