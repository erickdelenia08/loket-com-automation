import connect from "./browser/connect.mjs";
import waitForCloudflare from "./utils/waitForCloudflare.mjs";
import clickJoinButton from "./utils/clickJoinButton.mjs";
import waitForWidgedSpawn from "./utils/waitForWidgetSpawn.mjs";
import { main_url, widget_link_selector } from "./config.mjs";

const page = await connect();

const start = new Date().getTime();

await page.goto(main_url, {
  // waitUntil: "networkidle2",
  waitUntil: "domcontentloaded"
});

await waitForWidgedSpawn(page, widget_link_selector);

await waitForCloudflare(page);

const end = new Date().getTime();
console.log(`Waktu eksekusi: ${end - start} ms`);

await clickJoinButton(page);

console.log("✅✅✅Done");
