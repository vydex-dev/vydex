# Launchpad — landing page template

A clean product landing you can ship tonight: **hero → features → pricing →
FAQ → footer** in two static files. No frameworks, no build step, no JS.

## Rebrand in 4 lines
Everything themes from four variables at the top of `style.css`:
```css
:root {
  --accent: #6c5ce7;   /* your brand color   */
  --bg: #0e0d12;       /* page background    */
  --surface: #16141d;  /* cards & sections   */
  --fg: #f1effa;       /* text               */
}
```

## What you get
- Sticky blur nav, hero with eyebrow badge + dual CTA
- 6-tile feature grid
- 3-tier pricing with a highlighted plan
- FAQ on native `<details>` (accessible, zero JS)
- Semantic HTML, AA contrast, visible focus states

## Deploy
It's static — drop it on Vercel, Netlify, GitHub Pages or any web server.
Swap the copy in `index.html`, change the variables, done.
