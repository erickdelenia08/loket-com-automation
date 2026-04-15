import connect from "./browser/connect.mjs";
import waitForCloudflare from "./utils/waitForCloudflare.mjs";
import clickJoinButton from "./utils/clickJoinButton.mjs";
import waitForWidgedSpawn from "./utils/waitForWidgetSpawn.mjs";
import { main_url, widget_link_selector } from "./config.mjs";

const page = await connect();

await page.goto(main_url, {
  waitUntil: "networkidle2",
});

await waitForWidgedSpawn(page, widget_link_selector);

await waitForCloudflare(page);

await clickJoinButton(page);

console.log("✅✅✅Sudaahhhhhhhhhhhhhhhhhhhhhhhhhhh");
