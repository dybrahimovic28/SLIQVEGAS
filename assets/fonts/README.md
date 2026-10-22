# SLIQ VEGAS — Custom Typography Assets

This directory is designated for the licensed web font files for **SLIQ VEGAS**:

1. **Cianto** (`cianto.woff2`, `cianto.woff`, `cianto.ttf`)
   - **Role:** Primary brand typeface across the entire website.
   - **Usage:** Navigation links, product titles & descriptions, category headings, brand story, lookbook captions, delivery & contact details, buttons/CTAs, form controls, footer, and supporting interface text.
   - **Registered in:** `assets/css/styles.css` via `--font-primary`.

2. **Vantage** (`vantage.woff2`, `vantage.woff`, `vantage.ttf`)
   - **Role:** Signature display typeface exclusively for the homepage hero headline.
   - **Usage:** The hero brand name ("SLIQ VEGAS") and hero campaign statement ("WEAR THE LIFESTYLE.").
   - **Registered in:** `assets/css/styles.css` via `--font-display`.

---

## File Organisation

When adding the licensed font files from the font foundry or owner, place them in this directory using the following recommended filenames:

```
assets/fonts/
├── cianto.woff2            # Primary regular weight
├── cianto-bold.woff2       # Primary bold weight (optional/if separate file)
├── vantage.woff2           # Display headline font
└── README.md               # This guide
```

Supported formats declared in `@font-face`:
- `.woff2` (Recommended — superior compression and modern browser performance)
- `.woff` (Broad fallback for legacy browsers)
- `.ttf` / `.otf` (Raw OpenType/TrueType files)

---

## Licensing & Commercial Verification Notice

> **Important:** Both **Cianto** and **Vantage** must be acquired with appropriate commercial webfont licenses prior to public deployment. Do not extract font files from unverified third-party sources or social media previews without verified licensing rights.

Until the official font files are dropped into this directory, the website is engineered with a high-fidelity streetwear fallback typography stack:
- **Primary Fallback:** Plus Jakarta Sans & system sans-serif hierarchy for maximum legibility and clean proportions.
- **Hero Display Fallback:** Syne & premium modern geometric display sans for commanding visual hierarchy.
Once the `.woff2` files are placed in this folder, the browser will automatically swap to the authentic custom fonts via `font-display: swap;`.
