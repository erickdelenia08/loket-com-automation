const waitForWidgedSpawn = async (page, selector) => {
  let lastReload = Date.now();

  console.log("👀 Monitoring container:", selector);

  while (true) {
    const result = await page.evaluate((sel) => {
      const container = document.querySelector(sel);
      if (!container) return { type: "NO_CONTAINER" };

      // PRIORITAS 1: <a href> valid
      const link = container.querySelector("a[href]");
      if (
        link?.href &&
        !link.href.includes("#") &&
        link.href !== window.location.href
      ) {
        return { type: "LINK", url: link.href };
      }

      // PRIORITAS 2: button enabled
      const btn = container.querySelector("button:not([disabled])");
      if (btn) {
        btn.click();
        return { type: "BUTTON_CLICK" };
      }

      // PRIORITAS 3: <a> tanpa href valid (SPA style)
      const anchor = container.querySelector("a");
      if (anchor) {
        anchor.click();
        return { type: "ANCHOR_CLICK" };
      }

      return { type: "WAITING" };
    }, selector);

    // --- Handle result ---
    if (result.type === "NO_CONTAINER") {
      console.log("⚠️  Container tidak ditemukan, cek selector...");
    }

    if (result.type === "LINK") {
      console.log("🔥 Link ketemu:", result.url);
      await page.goto(result.url, { waitUntil: "domcontentloaded" });
      break;
    }

    if (result.type === "BUTTON_CLICK" || result.type === "ANCHOR_CLICK") {
      console.log("🔥 Klik berhasil:", result.type);
      // Tunggu navigasi setelah klik
      try {
        await page.waitForNavigation({
          waitUntil: "domcontentloaded",
          timeout: 3000,
        });
        console.log("✅ Navigasi ke:", page.url());
      } catch {
        console.log(
          "⚠️  Tidak ada navigasi setelah klik, lanjut monitoring...",
        );
        continue; // kembali loop kalau ternyata belum navigasi
      }
      break;
    }

    // Reload berkala kalau masih WAITING
    if (result.type === "WAITING") {
      if (Date.now() - lastReload > 100) {
        console.log("🔄 Reload...", new Date().toLocaleTimeString());
        await page.reload({ waitUntil: "domcontentloaded" });
        lastReload = Date.now();
      }
      await new Promise((r) => setTimeout(r, 20)); // cek tiap 100ms
    }
  }
};

export default waitForWidgedSpawn;
