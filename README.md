# SLIQ VEGAS — Official Streetwear Web Catalogue

**Slogan:** Wear The Lifestyle.  
**Location:** Dzivaresekwa Extension, Harare, Zimbabwe  
**WhatsApp / Call:** [+263 78 871 5684](https://wa.me/263788715684)  
**Socials:** [Instagram](https://www.instagram.com/sliqvegas?dlrf=b2YyN2h3MHkza2l6) • [TikTok](https://www.tiktok.com/@sliqvegas_clothing) • [Facebook](https://www.facebook.com/share/19iHVYkdPZ/)  

---

## 1. Project Overview

This repository contains the complete, production-ready official website and digital fashion catalogue for **SLIQ VEGAS**, a premier contemporary unisex streetwear brand based in Dzivaresekwa Extension, Harare, Zimbabwe.

The website has been transformed into a world-class fashion e-commerce experience inspired by the visual quality, product presentation, and shopping experience of leading global streetwear brands (such as Nike, Fear of God, and Represent), while retaining an original, distinctive visual identity for SLIQ VEGAS.

### Key Architectural & Design Features
- **Visual Rhythm & High-End Editorial Contrast:** Balanced between cinematic dark street sections and crisp light-neutral sections (`#featured` / `.section-light`) so clothing photography pops and reading fatigue is eliminated.
- **Hero Campaign Showcase:** Features the official high-resolution photograph (`images/SLIQVEGAS-hero.png`) showing the model in the all-white tracksuit seated on the concrete cube engraved with the SLIQ VEGAS monogram logo, framed by Vantage typography.
- **5 Curated Streetwear Categories:**
  1. Graphic Tees (`tees`)
  2. Hoodies & Sweats (`hoodies`)
  3. Tracksuit Bottoms (`bottoms`)
  4. Cargo Pants (`cargos`)
  5. Tracksuits and Drip Sets (`sets`)
- **Direct WhatsApp Commerce:** Every product supports live interactive size selection, colour selection, and quantity adjustments. Clicking "Order on WhatsApp" launches a prefilled message directly to `+263 78 871 5684`.
- **Real Harare Photoshoot Integration:** The lookbook and featured drops incorporate genuine client photoshoot photography (`product-pink-hoodie-model.jpg`, `lookbook-gee-door.jpg`, `lookbook-cutiee-glasses.jpg`, `lookbook-girl-display.jpg`, `lookbook-girl-vest.jpg`).
- **Brand Marquee & Social Discovery:** Animated urban marquee banner (*"COMFORT • CONFIDENCE • CULTURE"*) and a multi-platform social discovery feed connecting to Instagram (`@sliqvegas`), TikTok (`@sliqvegas_clothing`), and Facebook.
- **Lightweight & High Performance:** Pure semantic HTML5, modern vanilla CSS, and modular vanilla JavaScript. Zero framework overhead, zero npm build step, and blazing-fast loading speeds on mobile data networks across Zimbabwe.

---

## 2. File & Directory Structure

```text
SLIQ VEGAS/
├── index.html                       # Semantic HTML5 single-page application
├── robots.txt                       # Search engine crawler directives
├── sitemap.xml                      # XML sitemap for SEO discovery
├── test_suite.js                    # Automated test suite (96 automated tests)
├── server.js                        # Lightweight local preview HTTP server
├── README.md                        # Complete documentation & deployment guide
├── assets/
│   ├── css/
│   │   └── styles.css               # Curated streetwear design system & tokens
│   ├── fonts/
│   │   ├── cianto.woff2             # Primary brand typeface (to be added)
│   │   ├── vantage.woff2            # Signature hero display typeface (to be added)
│   │   └── README.md                # Font installation and licensing instructions
│   ├── js/
│   │   ├── products.js              # Single source of truth for catalogue data
│   │   └── main.js                  # Dynamic rendering, filters, modal, and WhatsApp generator
│   └── images/
│       ├── logo-primary.jpg         # Official SV monogram logo
│       ├── artwork-red-crown.jpg    # Official Red Crown graphic drop
│       ├── artwork-pink-drip.jpg    # Official Neon Pink Drip artwork drop
│       ├── product-pink-hoodie-model.jpg # Photoshoot: Model in Pink Drip Hoodie
│       ├── lookbook-gee-door.jpg    # Photoshoot: Harare street series
│       ├── lookbook-cutiee-glasses.jpg # Photoshoot: Signature crest eyewear
│       ├── lookbook-girl-display.jpg# Photoshoot: All-White tracksuit silhouette
│       ├── lookbook-girl-vest.jpg   # Photoshoot: Everyday Harare street drip
│       ├── og-image.jpg             # Open Graph card for social sharing
│       ├── favicon.svg              # SVG vector favicon
│       ├── favicon-32x32.png        # 32x32 PNG browser favicon
│       ├── favicon-192x192.png      # 192x192 mobile home screen icon
│       ├── apple-touch-icon.png     # iOS touch icon
│       ├── placeholder-hoodie.svg
│       ├── placeholder-cargo.svg
│       ├── placeholder-set.svg
│       └── placeholder-tee.svg
└── images/
    ├── SLIQVEGAS-hero.png           # Client campaign hero image
    ├── SLIQVEGAS graphic tees.jpg   # Category card background: Graphic Tees
    ├── SLIQVEGAS Hoodies & Sweats.webp # Category card background: Hoodies & Sweats
    ├── SLIQVEGAS Tracksuits and bottoms.jpg # Category card background: Tracksuit Bottoms
    ├── SLIQVEGAS cargo pants.webp   # Category card background: Cargo Pants
    └── SLIQVEGAS full drip wear.webp # Category card background: Full Drip Sets
```

---

## 3. How the Client Can Easily Update Products & Pricing

All product information is isolated in **[`assets/js/products.js`](file:///c:/Users/dybra/Downloads/SLIQ%20VEGAS/assets/js/products.js)**. Non-technical users or developers can update the catalogue without touching HTML markup.

### To Add a New Product
Open `assets/js/products.js` and add a new item to `SLIQ_PRODUCTS`:
```javascript
{
  id: "sv-tee-04",
  name: "SLIQ VEGAS Harare Night Oversized Tee",
  category: "tees",                       // "tees" | "hoodies" | "bottoms" | "cargos" | "sets"
  categoryLabel: "Graphic Tees",
  badge: "New Drop",
  gender: "Unisex Streetwear",
  image: "assets/images/my-new-photo.jpg",// Place image in assets/images/
  isRealAsset: true,
  price: "Price on request",              // Or e.g. "$25 USD"
  availability: "Available • Confirm on WhatsApp",
  availableSizes: ["S", "M", "L", "XL", "2XL"],
  availableColours: ["Obsidian Black", "Pure White"],
  description: "Description of your new piece...",
  details: [
    "240 GSM Heavyweight Combed Cotton",
    "Screen printed in Harare",
    "Tailored unisex fit"
  ]
}
```

### To Update Prices
Locate the item in `assets/js/products.js` and change `price: "Price on request"` to your confirmed price (e.g., `price: "$25 USD"` or `price: "$35 USD / ZiG equivalent"`).

---

## 4. WhatsApp Ordering Flow

Every product order button dynamically constructs a URL-encoded message formatted as specified:
```text
Hello SLIQ VEGAS! I would like to order the SLIQ VEGAS Neon Pink Drip Streetwear Hoodie. Size: L. Colour: Obsidian Black. Quantity: 1. Please confirm the price and availability. Wear The Lifestyle.
```
Destination: **`https://wa.me/263788715684`**.

No customer accounts or card numbers are required; the flow connects the customer directly to the business in Harare for personal service.

---

## 5. Free Deployment Guide (100% Free Hosting)

The website is a static site and can be deployed with zero hosting costs on modern global edge networks with automatic HTTPS.

### Option A: Netlify Drop (Fastest & Simplest — 2 Minutes)
1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Sign up or log in for a free account.
3. Drag and drop the `SLIQ VEGAS` folder into the Netlify Drop box.
4. Netlify will deploy the site instantly and generate a live URL (e.g., `https://sliq-vegas.netlify.app`).

### Option B: GitHub Pages (Free & Git-Tracked)
1. Create a free repository on [GitHub](https://github.com/) named `sliq-vegas`.
2. Push the project files to the `main` branch.
3. Go to **Settings** > **Pages**.
4. Set source to `Deploy from a branch` -> `main` -> `/ (root)`.
5. Click **Save**. Your site will be live at `https://<your-username>.github.io/sliq-vegas/`.

---

## 6. How to Connect a Custom Domain (e.g. sliqvegas.co.zw)

1. Register `sliqvegas.co.zw` (via a Zimbabwean registrar such as Webdev, TelOne, or ZNIC) or `sliqvegas.com` (via Namecheap or GoDaddy).
2. In Netlify: Go to **Domain Management** > **Add a custom domain**.
3. In your registrar DNS settings:
   - Create a `CNAME` record pointing `www` to your Netlify subdomain (`sliq-vegas.netlify.app`).
   - Create an `A` record pointing `@` to Netlify's IP (`75.2.60.5`).
4. Netlify provisions a free Let's Encrypt SSL certificate automatically.

---

## 7. Status of Client Assets & Fonts

- [x] **Hero Image:** `images/SLIQVEGAS-hero.png` preserved and featured prominently with Vantage headings.
- [x] **Brand Logo:** Official SV monogram logo (`assets/images/logo-primary.jpg`) used in navigation and footer.
- [x] **Photoshoots:** Genuine model photography extracted from client folder and integrated into product cards, featured drops, and lookbook.
- [ ] **Licensed Custom Fonts (Cianto & Vantage):** As noted in `assets/fonts/README.md`, if the client possesses the commercial font files (`.woff2` or `.ttf`), they can place them into `assets/fonts/cianto.woff2` and `vantage.woff2`. The website currently employs high-quality web-safe fallbacks (`Plus Jakarta Sans` and `Syne`) so typography renders crisply and consistently without missing font errors.
