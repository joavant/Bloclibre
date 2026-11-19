/* Test de fumée reproductible : npm install && npx playwright install chromium.
 * Lancer l’éditeur sur :8000, puis npm test. Aucun projet personnel n’est utilisé.
 */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.BASE_URL || "http://127.0.0.1:8000";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const context = await browser.newContext({
    viewport: { width: 1512, height: 982 },
    acceptDownloads: true,
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  const frame = () => page.frameLocator("#editor-frame");
  const settle = () => page.waitForTimeout(240);
  const pass = (message) => console.log(`✓ ${message}`);
  try {
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForFunction(() => !document.querySelector("#studio-loader"));
    await settle();
    assert.equal(await page.locator(".block-card").count(), 31);
    assert.equal(await frame().locator("h1").count(), 1);
    pass("Démarrage, 31 blocs et portfolio de départ");

    await page.locator('[data-prop="text"]').fill("Mon premier site Studio");
    await settle();
    assert.equal(
      await frame().locator("h1").innerText(),
      "Mon premier site Studio",
    );
    await page.locator("#undo-button").click();
    await settle();
    assert((await frame().locator("h1").innerText()).includes("Curieux"));
    pass("Édition et annulation");

    await page.locator('[data-studio-panel="pages"]').click();
    assert.equal(await page.locator("[data-page-row]").count(), 4);
    await page.locator("[data-studio-create-page]").click();
    await settle();
    assert.equal(await page.locator("[data-page-row]").count(), 5);
    assert.equal(await frame().locator(".bl-navigation").count(), 1);
    pass("Pages et éléments partagés");

    await page.locator('[data-studio-panel="sections"]').click();
    assert.equal(await page.locator("[data-insert-recipe]").count(), 17);
    await page.locator('[data-insert-recipe="features"]').click();
    await settle();
    assert.equal(await frame().locator(".bl-card").count(), 3);
    pass("Insertion d’une section composée");

    await page.locator("#templates-button").click();
    assert.equal(await page.locator(".studio-template-card").count(), 6);
    await page.locator('[data-template="hackathon"]').click();
    await settle();
    assert.equal(
      await page.locator("#project-title").inputValue(),
      "Pulse · Hackathon",
    );
    pass("Modèles et nouveau projet distinct");

    await page.reload({ waitUntil: "networkidle" });
    await page.waitForFunction(() => !document.querySelector("#studio-loader"));
    await settle();
    assert.equal(
      await page.locator("#project-title").inputValue(),
      "Pulse · Hackathon",
    );
    pass("Restauration après rechargement");

    await page.locator("#preview-button").click();
    await settle();
    const preview = page.frameLocator("#preview-frame");
    await preview
      .locator(".bl-nav-links a")
      .filter({ hasText: "L’équipe" })
      .click();
    await settle();
    assert(
      (await preview.locator("h1").innerText()).includes("Quatre regards"),
    );
    await page.locator('[data-preview-device="mobile"]').click();
    await preview.locator("[data-bl-menu]").click();
    assert.equal(
      await preview.locator("[data-bl-menu]").getAttribute("aria-expanded"),
      "true",
    );
    await page.locator("[data-close-modal]").click();
    pass("Aperçu multipage et menu mobile");

    const jsonDownload = page.waitForEvent("download");
    await page.keyboard.press("Control+s");
    const json = await jsonDownload;
    let text = "";
    const stream = await json.createReadStream();
    for await (const chunk of stream) text += chunk.toString("utf8");
    const project = JSON.parse(text);
    assert.equal(project.version, 2);
    assert.equal(project.pages.length, 3);
    pass("Projet JSON portable");

    await page.locator("[data-open-history]").click();
    await page.locator("[data-create-revision]").click();
    await page.waitForTimeout(300);
    assert((await page.locator("[data-restore-revision]").count()) >= 1);
    await page.keyboard.press("Escape");
    pass("Point de restauration local");

    await page.locator("#export-button").click();
    const zipDownload = page.waitForEvent("download");
    await page.locator("[data-export-zip]").click();
    const zip = await zipDownload;
    assert(zip.suggestedFilename().endsWith("-site.zip"));
    const chunks = [];
    for await (const chunk of await zip.createReadStream()) chunks.push(chunk);
    const bytes = Buffer.concat(chunks);
    assert.equal(bytes.readUInt32LE(0), 0x04034b50);
    assert(bytes.includes(Buffer.from("assets/site.js")));
    assert(bytes.includes(Buffer.from("index.html")));
    await page.keyboard.press("Escape");
    pass("ZIP natif avec pages et script partagé");

    const mobile = await context.newPage();
    mobile.on("pageerror", (error) => errors.push(error.message));
    await mobile.setViewportSize({ width: 390, height: 844 });
    await mobile.goto(base, { waitUntil: "networkidle" });
    await mobile.waitForFunction(
      () => !document.querySelector("#studio-loader"),
    );
    assert.equal(await mobile.evaluate(() => document.body.scrollWidth), 390);
    assert.equal(
      await mobile.locator("#canvas-dimensions").textContent(),
      "390 px",
    );
    pass("Éditeur mobile sans débordement");

    assert.deepEqual(errors, []);
    console.log("\n11 scénarios réussis — aucune erreur JavaScript.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
