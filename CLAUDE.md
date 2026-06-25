# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Sterling & Vale Advisory — a static, single-page investment advisory marketing website. No build tools, no frameworks, no package manager. Open `index.html` directly in a browser to run it.

## Architecture

Three files, each with a single responsibility:

- **index.html** — all markup. Sections in order: Navbar → Hero → Services → Testimonials → Contact (form) → Footer.
- **styles.css** — all styles. Design tokens live in `:root` at the top; edit colours and spacing there first before touching individual rules.
- **script.js** — all behaviour, organised as three self-contained IIFEs: carousel, form submission, plus top-level handlers for the navbar and scroll-reveal observer.

## Design tokens (CSS custom properties)

Defined in `:root` in `styles.css`:

| Token | Value |
|---|---|
| `--navy` | `#1b2a4a` (primary) |
| `--slate` | `#3d5170` (secondary) |
| `--gold` | `#c9a84c` (accent) |
| `--off-white` | `#f5f4f0` (page background) |

Fonts: **Playfair Display** (headings, serif) + **Inter** (body, sans-serif) via Google Fonts.

## Form (FormSubmit AJAX)

The enquiry form POSTs JSON to `https://formsubmit.co/ajax/REPLACE_WITH_YOUR_EMAIL` in `script.js`. To activate:

1. Replace `REPLACE_WITH_YOUR_EMAIL` in `script.js` with the real destination address.
2. Submit the form once — FormSubmit emails an activation link to that address.
3. Click the link; all subsequent submissions will deliver normally.

The honeypot field (`name="_honey"`) is hidden via `.honey` in `styles.css` and must stay empty; do not remove it.

## Scroll-reveal animations

Any element with class `reveal` is observed by an `IntersectionObserver` in `script.js`. Adding `.visible` triggers the CSS transition defined on `.reveal`. Stagger delay is controlled per-element via the `--delay` CSS custom property (inline style).
