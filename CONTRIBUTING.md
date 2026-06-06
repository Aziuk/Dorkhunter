# Contributing to DorkHunter

Thank you for taking the time to contribute! Every improvement — whether a new dork, bug fix, or feature — makes this tool better for the entire cybersecurity community.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Adding a Dork](#adding-a-dork)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

---

## Code of Conduct

Be respectful. This is a security tool shared freely — the community should be welcoming to researchers of all experience levels. Harassment, gatekeeping, or toxic behavior will not be tolerated.

---

## Ways to Contribute

| Type | How |
|---|---|
| 🐛 Bug fix | Open an issue → fork → fix → PR |
| ✨ New feature | Open a feature request issue first → discuss → PR |
| 🎯 New dork | Edit `DEFAULT_DORKS` in `popup.js` → PR |
| 📖 Documentation | Edit `README.md` or add inline comments → PR |
| 🌐 Translation | Open an issue to discuss i18n approach |

---

## Adding a Dork

The easiest way to contribute! Open `dork-extension/popup.js` and find the `DEFAULT_DORKS` array near the top.

### Dork object format

```js
{
  id: 'xx1',              // Unique short ID — use category prefix + number
  name: 'Human-readable name',
  query: 'site:{target} filetype:pdf',   // Use {target} for domain placeholders
  desc: 'What this dork finds, in plain English',
  category: 'File Search',               // Must match an existing category name
  tags: ['pdf', 'filetype', 'documents'],// Lowercase, short, descriptive
  engines: ['google', 'bing'],           // Which engines support this dork
  pinned: false                          // Always false in defaults
}
```

### Rules for dork submissions

- ✅ The dork must actually work and return useful results
- ✅ Write a clear `desc` that explains what it finds — think of beginners
- ✅ Choose the correct `category` — don't create a new one without discussion
- ✅ Add accurate `engines` — don't list Bing/DDG if the operators don't work there
- ✅ Use `{target}` as a placeholder wherever a domain/keyword is needed
- ❌ Do not submit dorks targeting specific companies or individuals
- ❌ Do not submit dorks designed purely for malicious use

---

## Reporting Bugs

1. **Search existing issues** first — it may already be reported
2. Open a new issue using the **Bug Report** template
3. Include:
   - Chrome version
   - Extension version (shown in popup header)
   - Steps to reproduce
   - What you expected vs what happened
   - Console errors if any (right-click extension popup → Inspect)

---

## Suggesting Features

1. Check the [Roadmap in README](README.md#roadmap) — it might already be planned
2. Open a new issue using the **Feature Request** template
3. Describe the use case — *why* does a security researcher need this?

---

## Development Setup

No build system required — this is plain HTML/CSS/JS.

```bash
# 1. Fork this repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/dorkhunter.git
cd dorkhunter

# 2. Load the extension in Chrome
# Go to chrome://extensions → Enable Developer Mode → Load Unpacked → select dork-extension/

# 3. Make your changes to files inside dork-extension/

# 4. Reload the extension after changes
# Go to chrome://extensions → click the reload ↺ button on DorkHunter
```

**To see console logs:**  
Right-click the extension popup → **Inspect** → Console tab

---

## Pull Request Process

1. **Fork** the repository
2. Create a **new branch** with a descriptive name:
   ```bash
   git checkout -b feat/add-jenkins-dorks
   git checkout -b fix/scroll-bug-category-tabs
   git checkout -b docs/improve-install-guide
   ```
3. Make your changes
4. **Test** your changes — load the extension, try all affected features
5. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add 3 Jenkins CI dorks to CMS category"
   git commit -m "fix: category tab scroll not working on narrow screens"
   ```
6. **Push** to your fork:
   ```bash
   git push origin your-branch-name
   ```
7. Open a **Pull Request** against the `main` branch
8. Fill in the PR template — describe what changed and why

### Commit message format

```
type: short description (under 72 chars)

Optional longer explanation if needed.
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

---

## Style Guide

**JavaScript**
- Use `'use strict'`
- Prefer `const` / `let` — no `var`
- Keep functions small and single-purpose
- No external dependencies — vanilla JS only

**CSS**
- Follow existing CSS variable naming (`--acc`, `--bg2`, etc.)
- Mobile-first is not a concern here (extension popup is fixed size)
- Keep selectors flat — no deep nesting

**HTML**
- Semantic elements where appropriate
- All interactive elements need `title` attributes for accessibility

---

*Thank you for helping make DorkHunter the go-to dork toolkit for the security community.* 🖤
