# Fireworks Show Simulator

![Fireworks Show Simulator](assets/main_capsule.png)

Design professional fireworks displays from a top-down view. Watch your show from
any viewpoint in a fully 3D world. Place racks, load shells, connect fuses, and
control the firing system.

[Visit the Website](https://fireworksshowsimulator.com) |
[Available on Steam!](https://store.steampowered.com/app/4668450/Fireworks_Show_Simulator)

## Build Your Show

- **Place** racks, modules, and tubes to create your layout.
- **Load** shells and combine different firework effects.
- **Link** fuses and firing modules to connect your display.
- **Save** layouts and firing setups.
- **Watch** your show in free camera or fly mode.

## Explore the Website

Watch the trailer, browse gameplay screenshots, and explore the rack and shell
catalogs. Discover different rack configurations and effects, from comets and
mines to rings, brocades, peonies, and multi-break shells.

![Fireworks Show Simulator gameplay](assets/gallery-01-city-fan.webp)

## Follow Simplay Studio

[YouTube](https://www.youtube.com/@simplaystudio) |
[TikTok](https://www.tiktok.com/@fireworksplayofficial) |
[Discord](https://discord.gg/2XXRJAEUtp)

Contact: [contact@simplaystudio.com](mailto:contact@simplaystudio.com)

## SEO Verification

Start the static site from the repository root:

```sh
python3 -m http.server 8000
```

In another terminal, run the focused browser checks using the vendored Playwright
binary (no `npm install` is needed):

```sh
./node_modules/.bin/playwright test tests/seo.spec.js --workers=1
```

For a different server address, set `SEO_TEST_BASE_URL`. The checks cover metadata,
structured data, sitemap URLs, privacy navigation, and desktop/mobile controls.

`robots.txt` and `sitemap.xml` must be included in the deployment workflow's file
allowlist. After merging, submit the sitemap in Google Search Console. HTTP to
HTTPS redirection is configured separately in Cloudflare under SSL/TLS → Edge
Certificates → Always Use HTTPS; it cannot be enabled by these static files.
