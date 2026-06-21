# Fireworks Play Show Simulator Website

Static one-page promotional site for Fireworks Play Show Simulator.

## Asset Sources

The promotional rack and shell images are copied from the Unity project:

```text
/Users/duynguyen/RiderProjects/fireworks-play-show-simulator/Fireworks Play Show Simulator/Assets/FWPlayShowSimulator/Sprite/Thumbnail/Rack
/Users/duynguyen/RiderProjects/fireworks-play-show-simulator/Fireworks Play Show Simulator/Assets/FWPlayShowSimulator/Sprite/Thumbnail/Shell
```

## Local Preview

Open `index.html` directly, or run a local static server:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## GitHub Pages

This folder is intended for the `gh-pages` branch of:

```sh
git@github.com:duynguyen71/fireworks-play-show-simulator.git
```

Suggested setup:

```sh
git init -b gh-pages
git remote add origin git@github.com:duynguyen71/fireworks-play-show-simulator.git
git add index.html styles.css script.js favicon.svg assets .gitignore .nojekyll README.md
git commit -m "✨ Add promotional website"
git push -u origin gh-pages
```

Do not add `docs/` or `AGENTS.md`; they are intentionally ignored.
