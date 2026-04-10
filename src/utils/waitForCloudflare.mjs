const waitForCloudflare = async (page) => {
  const isBlocked = await page.evaluate(() => {
    const text = document.body?.innerText?.toLowerCase() ?? "";

    const textBlocked =
      text.includes("checking your browser") ||
      text.includes("verify you are human") ||
      text.includes("just a moment") ||
      text.includes("enable javascript") ||
      text.includes("security check") ||
      text.includes("cloudflare");

    const elementBlocked =
      !!document.querySelector("#cf-wrapper") ||
      !!document.querySelector(".cf-browser-verification") ||
      !!document.querySelector("input[name='cf_captcha_kind']") ||
      !!document.querySelector("iframe[src*='captcha']");

    return textBlocked || elementBlocked;
  });

  if (!isBlocked) return; // langsung lanjut, tidak perlu log

  console.log("⏳ Menunggu Cloudflare...");
  while (true) {
    await new Promise((r) => setTimeout(r, 1000));

    const stillBlocked = await page.evaluate(() => {
      const text = document.body?.innerText?.toLowerCase() ?? "";
      return (
        text.includes("checking your browser") ||
        text.includes("verify you are human") ||
        text.includes("just a moment") ||
        text.includes("enable javascript") ||
        text.includes("security check") ||
        text.includes("cloudflare") ||
        !!document.querySelector("#cf-wrapper") ||
        !!document.querySelector(".cf-browser-verification") ||
        !!document.querySelector("input[name='cf_captcha_kind']") ||
        !!document.querySelector("iframe[src*='captcha']")
      );
    });

    if (!stillBlocked) {
      console.log("✅ Lolos Cloudflare");
      break;
    }

    console.log("🔄 Masih Cloudflare, tunggu...");
  }
};

export default waitForCloudflare;