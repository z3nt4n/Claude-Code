# Sterling & Vale Advisory

A static, single-page marketing website for a fictional investment advisory firm.

## Live Site

[https://z3nt4n.github.io/Claude-Code/](https://z3nt4n.github.io/Claude-Code/)

## Preview

![Sterling & Vale Advisory website preview](Screenshot/z3nt4n%20website.png)

## Tech Stack

- Plain HTML, CSS, and JavaScript — no frameworks or build tools
- Deployed via GitHub Actions to GitHub Pages

## Project Structure

| File | Purpose |
|------|---------|
| `index.html` | All markup: Navbar, Hero, Services, Testimonials, Contact, Footer |
| `styles.css` | All styles and CSS design tokens |
| `script.js` | Carousel, form submission, navbar, scroll-reveal animations, WhatsApp widget |
| `tests/` | Playwright end-to-end tests (form submission, widget, social links) |

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#3b0a0a` | Primary colour (deep red) |
| `--slate` | `#7f1d1d` | Secondary colour (crimson) |
| `--gold` | `#c9a84c` | Accent colour |
| `--off-white` | `#f5f4f0` | Page background |

## Running Locally

No build step needed — just open `index.html` in a browser.

## Contact Form

The enquiry form uses [FormSubmit](https://formsubmit.co/) for serverless email delivery.
The destination address is configured in `script.js`. On first deployment, FormSubmit sends
an activation email — click the link to enable delivery.

## WhatsApp Chat Widget

A floating WhatsApp button (bottom-right) opens a branded panel with suggested topics.
Each chip or custom message opens WhatsApp pre-filled to `+6597977715`.

## Deployment

Any push to the `main` branch automatically triggers the GitHub Actions workflow
at `.github/workflows/deploy.yml`, which deploys the site to GitHub Pages.
