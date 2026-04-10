const waitForWidgedSpawn = async (page, selector) => {
  const RELOAD_INTERVAL = 150;

  console.log("👀 Monitoring container:", selector);

  while (true) {
    const result = await page.evaluate((sel) => {
      const container = document.querySelector(sel);
      if (!container) return { type: "WAITING" };

      // PRIORITAS 1: <a> dengan href valid
      const link = container.querySelector("a[href]");
      if (
        link?.href &&
        !link.href.includes("#") &&
        link.href !== window.location.href
      ) {
        return { type: "LINK", url: link.href };
      }

      // PRIORITAS 2: button tidak disabled
      const btn = container.querySelector("button:not([disabled])");
      if (btn) {
        btn.click();
        return { type: "DONE" };
      }

      // Semua kondisi belum siap, reload
      return { type: "WAITING" };
    }, selector);

    if (result.type === "LINK") {
      console.log("🔥 Link ketemu:", result.url);
      await page.goto(result.url, { waitUntil: "domcontentloaded" });
      break;
    }

    if (result.type === "DONE") {
      console.log("✅ Tombol berhasil diklik");
      break;
    }

    // WAITING — reload terus
    console.log("🔄 Reload...", new Date().toLocaleTimeString());
    await page.reload({ waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, RELOAD_INTERVAL));
  }

  console.log("✅ Selesai, lanjut flow berikutnya...");
};

export default waitForWidgedSpawn;
