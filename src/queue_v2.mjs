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

// if (!page.url().includes("widget.loket")) {
//   await page.waitForNavigation({ waitUntil: "networkidle2" });
//   const kondisi = await page.evaluate(() => {
//     const elements = [...document.querySelectorAll("#spotlight button")];
//     console.log("ini elemen yang ditemukan");
//     console.log(elements);

//     const target = elements.find((el) =>
//       el.innerText.toLowerCase().trim().includes("beli"),
//     );

//     if (target) {
//       target.click();
//       return true;
//     }

//     return false;
//   });

//   console.log(kondisi);
// }

await waitForCloudflare(page);

await clickJoinButton(page);

console.log("✅✅✅Sudaahhhhhhhhhhhhhhhhhhhhhhhhhhh");
