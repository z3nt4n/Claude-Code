# /publish — Security Scan → README → Git Push → GitHub Metadata → Deployment

Execute all five steps below **in order** for the Sterling & Vale Advisory project. Stop and report clearly if any step fails or is blocked. Do not skip steps silently.

---

## Step 1: Security Scan

Scan the working tree for sensitive information **before touching git**. Use Grep on these files: `index.html`, `styles.css`, `script.js`, `README.md`, and everything under `.github/`.

### Blockers — halt and do NOT push if any are found

| Pattern | What to check |
|---------|--------------|
| Real email in FormSubmit URL | In `script.js`, the FormSubmit endpoint must still contain the literal string `REPLACE_WITH_YOUR_EMAIL`. If a real address appears in that URL, block. |
| GitHub tokens | Grep for `ghp_`, `gho_`, `github_pat_`, `ghs_` |
| Generic API keys / secrets | Grep for `sk-`, `Bearer\s`, `api[_-]?key\s*[:=]` (case-insensitive) |
| Private key material | Grep for `-----BEGIN` |
| `.env` files | Check if any `.env` or `.env.*` file exists in the working tree and is not gitignored |
| Hardcoded passwords | Grep for `password\s*[:=]\s*['"][^'"]+['"]` (case-insensitive) |

Report each blocker with the file name and matching line. If any blocker is found, **stop here**.

### Warnings — note but continue

- `console.log` statements left in `script.js` (debug noise, not a blocker)
- Any `localhost` or `127.0.0.1` URL in source files
- The user's personal email address appearing anywhere in committed files

Print a clean scan summary before moving on.

---

## Step 2: Update README

Read the current `README.md`. Check if it is UTF-8 encoded, up-to-date, and complete. Rewrite it (using the Write tool) if any of the following are true:
- The file is UTF-16 / contains null bytes / displays with spaces between every character
- The Live Site link is missing or wrong
- Any of the required sections are absent or stale

**Required sections and content:**

```
# Sterling & Vale Advisory

A static, single-page marketing website for a fictional investment advisory firm.

## Live Site

[https://z3nt4n.github.io/Claude-Code/](https://z3nt4n.github.io/Claude-Code/)

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
```

Keep the README under 80 lines. Write it in UTF-8. If the content matches what is already on disk (and the file is valid UTF-8), skip the write and note "README already up to date".

---

## Step 3: Git Push

Run these commands in sequence. Stop if any command fails.

1. `git status` — show current state
2. `git add -A` — stage all changes
3. `git diff --cached --stat` — confirm what is staged
4. Compose a commit message:
   - If only README changed: `docs: refresh README to UTF-8 with complete sections`
   - If source files changed: write a conventional-commits message summarising what changed (e.g. `feat: add carousel pause on hover`, `fix: form validation error message`)
   - If nothing is staged (clean tree): report "Nothing to commit — working tree is clean" and skip the push
5. `git commit -m "<message>"`
6. `git push origin main`

Show the final push output (branch, commit SHA, remote URL).

---

## Step 4: Update GitHub Repository Metadata

Run this `gh` CLI command to set the repo's About description, homepage, and topics:

```
gh repo edit --description "Static single-page marketing website for a fictional investment advisory firm. Built with plain HTML, CSS, and JavaScript." --homepage "https://z3nt4n.github.io/Claude-Code/" --add-topic "html" --add-topic "css" --add-topic "javascript" --add-topic "github-pages" --add-topic "static-site"
```

If `gh` is not installed or not authenticated, skip this step and print the exact command the user should run manually, along with the link to install GitHub CLI: https://cli.github.com

---

## Step 5: Confirm Deployment

Do not poll or wait. Simply report:

- The GitHub Actions workflow triggers automatically on every push to `main`.
- Watch live progress at: `https://github.com/z3nt4n/Claude-Code/actions`
- Live site (once deployed): `https://z3nt4n.github.io/Claude-Code/`

---

## Final Summary

Print a concise table:

| Step | Result | Details |
|------|--------|---------|
| 1. Security Scan | Pass / BLOCKED | list any issues |
| 2. README | Updated / Already current | encoding fixed if applicable |
| 3. Git Push | Pushed `<sha>` / Nothing to commit / Failed | branch and remote |
| 4. GitHub Metadata | Updated / Skipped (gh not available) | |
| 5. Deployment | Triggered / Not triggered | actions URL |
