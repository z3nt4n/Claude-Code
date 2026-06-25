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
| `script.js` | Carousel, form submission, navbar, and scroll-reveal animations |

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#1b2a4a` | Primary colour |
| `--slate` | `#3d5170` | Secondary colour |
| `--gold` | `#c9a84c` | Accent colour |
| `--off-white` | `#f5f4f0` | Page background |

## Running Locally

No build step needed — just open `index.html` in a browser.

## Contact Form

The enquiry form uses [FormSubmit](https://formsubmit.co/) for serverless email delivery.
To activate: replace `REPLACE_WITH_YOUR_EMAIL` in `script.js` with a real address,
submit the form once, then click the activation link in the confirmation email.

## Deployment

Any push to the `main` branch automatically triggers the GitHub Actions workflow
at `.github/workflows/deploy.yml`, which deploys the site to GitHub Pages.
