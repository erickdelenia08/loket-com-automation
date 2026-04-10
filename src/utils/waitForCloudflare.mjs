const waitForCloudflare = async (page) => {
  console.log("⏳ Menunggu Cloudflare...");

  while (true) {
    const isBlocked = await page.evaluate(() => {
      const text = document.body.innerText.toLowerCase();

      return (
        text.includes("checking your browser") ||
        text.includes("verify you are human") ||
        text.includes("cloudflare") ||
        document.querySelector("iframe[src*='captcha']")
      );
    });

    if (!isBlocked) {
      console.log("✅ Lolos Cloudflare");
      break;
    }

    await new Promise(r => setTimeout(r, 1000));
  }
};

export default waitForCloudflare