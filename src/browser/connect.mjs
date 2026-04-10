import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const connect = async () => {
  puppeteerExtra.use(StealthPlugin());

  const browser = await puppeteerExtra.connect({
    browserURL: "http://127.0.0.1:9222",
    defaultViewport: null,
  });
  const pages = await browser.pages();
  return pages[0];
};

export default connect