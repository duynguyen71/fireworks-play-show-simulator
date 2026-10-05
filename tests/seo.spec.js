const { test, expect } = require("@playwright/test");

// Start python3 -m http.server 8000 before running the vendored Playwright binary.
const baseURL = process.env.SEO_TEST_BASE_URL || "http://127.0.0.1:8000";
const siteURL = "https://fireworksshowsimulator.com";

test("homepage exposes metadata, structured data, and semantic headings", async ({ page }) => {
  await page.goto(baseURL);
  await expect(page).toHaveTitle("Fireworks Show Simulator — 3D Fireworks Show Design Game");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteURL}/`);
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description).toBe("Design professional fireworks displays from a top-down view. Watch your show from any viewpoint in a fully 3D world. Place racks, load shells, connect fuses, and control the firing system.");
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description);
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute("content", description);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h2")).toHaveText(["Trailer", "Gallery", "Shells", "Racks"]);
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(schema["@context"]).toBe("https://schema.org");
  const organization = schema["@graph"].find((item) => item["@type"] === "Organization");
  const game = schema["@graph"].find((item) => item["@type"] === "VideoGame");
  expect(game.name).toBe("Fireworks Show Simulator");
  expect(game.description).toBe(description);
  expect(game.publisher["@id"]).toBe(organization["@id"]);
  expect(game.operatingSystem).toEqual(["Windows", "macOS"]);
});

test("privacy page has unique metadata and a working home link", async ({ page }) => {
  await page.goto(`${baseURL}/privacy.html`);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteURL}/privacy.html`);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `${siteURL}/privacy.html`);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", await page.title());
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page).toHaveURL(`${baseURL}/`);
});

test("crawler files are accessible and sitemap URLs match page canonicals", async ({ request, page }) => {
  const robots = await request.get(`${baseURL}/robots.txt`);
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${siteURL}/sitemap.xml`);
  const sitemap = await request.get(`${baseURL}/sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  const urls = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls).toEqual([`${siteURL}/`, `${siteURL}/privacy.html`]);
  for (const url of urls) {
    const response = await page.goto(url.replace(siteURL, baseURL));
    expect(response.status()).toBe(200);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", url);
  }
});

for (const width of [390, 1440]) {
  test(`headings and existing controls work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(baseURL);
    for (const heading of await page.locator("h2").all()) {
      await expect(heading).toBeVisible();
      const box = await heading.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
    await page.getByRole("button", { name: "Next image", exact: true }).click();
    await expect(page.locator("[data-slider-title]")).toHaveText("Rack layout and fuse wiring");
    await page.getByRole("button", { name: "Show image 1", exact: true }).click();
    await expect(page.locator("[data-slider-title]")).toHaveText("City skyline finale");
    await page.getByRole("button", { name: "Next shells page", exact: true }).click();
    await expect(page.locator('[data-page-summary="shells"]')).toContainText("2 /");
    await expect(page.locator('[data-asset-grid="shells"] .asset-card')).toHaveCount(width < 640 ? 20 : 50);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}
