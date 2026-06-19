# Sonnos — Music & Sound Design

Redesigned website for **Sonnos**, a music and sound design studio based in Andorra specialising in games, TV series and cinematic media.

Live site: [sonnos-redesign on Netlify](#) <!-- update with real URL after deploy -->

---

## About

Sonnos was founded in 2010 by Pere Revert. The studio delivers bespoke audio for interactive media, film, broadcast and live events. Credits include Raid: Shadow Legends (Plarium), MoMonsters (RTVE), the Warhammer 40,000 franchise, and the opening ceremony of the Games of the Small States of Europe.

---

## Tech stack

- Pure HTML5, CSS3, vanilla JavaScript
- No frameworks, no build step — opens directly in a browser
- CSS custom properties for theming
- CSS multi-column masonry for the credits grid
- Web Animations API for the hero waveform
- IntersectionObserver for scroll fade-ins
- Infinite CSS marquee for the studio photo strip

---

## Project structure

```
sonnos-redesign/
├── index.html          # Single-page site
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Waveform, nav, mobile menu, modal, fade-in, contact form
└── images/
    ├── credits/        # Project cover images (35 images)
    └── team/           # Team portraits + studio photos
```

---

## Running locally

No build step required. Just open `index.html` in a browser:

```bash
open index.html
```

Or serve it with any static server:

```bash
npx serve .
# or
python3 -m http.server
```

---

## Deploying

The site is deployed via Netlify from this repository. Any push to `main` triggers an automatic redeploy.

To deploy manually:
1. Push changes to `main`
2. Netlify picks them up automatically (no build command, publish directory is `/`)

---

## Pending

- [ ] Replace Listen section placeholders with real SoundCloud / YouTube embeds
- [ ] Replace `YOUR_FORM_ID` in the contact form with a real [Formspree](https://formspree.io) ID

---

## Team

| Name | Role |
|------|------|
| Pere Revert | Founder, Producer, Sound Designer, Mixing & Mastering |
| Carlos Lozano | Composer, Guitarist, Producer |
| Miguel 'Moe' Espinosa | Composer, Producer, Keys & Vocals |

---

© Sonnos. All rights reserved.
