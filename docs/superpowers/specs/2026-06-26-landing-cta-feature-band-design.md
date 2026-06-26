# Landing CTA and Feature Band Refresh Design

## Context

The repository is a static GitHub Pages marketing site for Fireworks Show Simulator. The current landing page already has a hero, call-to-action buttons, a five-item intro band, trailer, gallery, arsenal sections, and footer. The requested update is limited to the buttons, icons, and short descriptive feature copy so the top of the page feels closer to the provided visual reference.

## Scope

Update only the hero call-to-action cluster and the five-item feature band on `index.html`, with supporting styles in `styles.css`.

Do not add a top navigation bar, rewrite the whole hero layout, change gallery or arsenal behavior, alter footer structure, or introduce a build system.

## Hero CTA Design

The hero will show three buttons in this order:

1. `Wishlist on Steam`
2. `Discord`
3. `YouTube`

`Wishlist on Steam` is the primary CTA and links to:

`https://store.steampowered.com/app/4668450/Fireworks_Show_Simulator`

The Steam button should use a green treatment similar to the reference image and include a Steam-style icon plus a small star accent. The Discord button should use a blue/purple treatment and include the existing Discord icon. The YouTube button should use a red treatment and include the existing play icon.

On desktop, the three buttons sit in one horizontal row when space allows. On mobile, they wrap cleanly without text overflow. Hit targets should remain comfortable and visually consistent.

## Feature Band Design

Keep the existing five feature items:

- `Place`: Place racks, modules, and tubes.
- `Load`: Load shells into your racks.
- `Link`: Connect fuses and firing modules.
- `Save`: Save layouts and firing setups.
- `Watch`: View shows in free camera or fly mode.

Each item will gain a simple line icon above the title. Icons should be visually similar to the reference: gold/yellow, compact, and readable on the dark band. The band remains a dark horizontal section with subtle dividers between items on desktop. On smaller screens, the layout should wrap into fewer columns without cramped text.

## Implementation Notes

Use inline SVG icons directly in `index.html` or CSS-friendly HTML markup. Do not add an icon library for this small update. Keep the existing class naming style and extend it with focused classes such as `.hero-actions`, `.button-steam`, and `.metric-icon` if needed.

No JavaScript changes are expected because these controls are plain links and static feature items.

## Validation

After implementation, run a local static server with:

```sh
python3 -m http.server 8000
```

Verify the homepage at desktop and mobile widths. Confirm the Steam CTA opens the provided Steam URL, Discord and YouTube links still work, button labels do not overflow, and all five feature icons and descriptions remain readable.
