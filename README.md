# Fireworks Show Simulator Website

Static promotional website for **Fireworks Show Simulator**.

## Structure

- `index.html` - one-page marketing site
- `privacy.html` - privacy policy page
- `styles.css` - layout, responsive design, and visual styling
- `script.js` - gallery slider, rack/shell pagination, and current year
- `assets/` - game screenshots, rack thumbnails, shell thumbnails, and Steam badge

## Local Preview

Run a static server from this folder:

```sh
python3 -m http.server 4173
```

Open:

```text
http://localhost:4173
```

Do not open `index.html` directly with `file://`; the YouTube embed needs an HTTP origin.

## Deployment

The site is designed for GitHub Pages from the repository root on `master`.

Remote:

```text
git@github.com:duynguyen71/fireworks-play-show-simulator.git
```

Do not commit `docs/` or `AGENTS.md`; they are intentionally ignored.
