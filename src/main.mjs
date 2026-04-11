import connect from "./browser/connect.mjs";
// import { dummy_widget_code, ticket_selector, main_url } from "./config.mjs";
import getCsrf from "./extractors/getCrsf.mjs";
import getInvoice from "./extractors/getInvoice.mjs";
import getWidgetCode from "./extractors/getWidgetCode.mjs";
import check_quantity from "./requests/check_quantity.mjs";
import confirm_choice from "./requests/confirm_choice.mjs";
import register from "./requests/register.mjs";
import submit from "./requests/submit.mjs";
import charge from "./requests/charge.mjs";
import getAllTickets from "./extractors/getAllTickets.mjs";
import "dotenv/config";
import getLastUrlSegment from "./extractors/getLastUrlSegment.mjs";
import mapTickets from "./extractors/mapTickets.mjs";

const page = await connect();

const csrf_token = await getCsrf(page);
const widget_code = getWidgetCode(page.url());

console.log("csrf_token:", csrf_token);
console.log("widget_code:", widget_code);

const ticket_qty = 1;
const TICKET_NAME = 'anj';

const tickets = await getAllTickets(page, TICKET_NAME, ticket_qty);
const ticket= mapTickets(tickets,TICKET_NAME,ticket_qty)
// console.log(tickets);
console.log(ticket);


// const result = await check_quantity(
//   page,
//   tickets[TICKET_INDEX].id_group,
//   tickets[TICKET_INDEX].id_ticket,
//   ticket_qty,
//   csrf_token,
//   widget_code,
// );

// if (result.error) process.exit(0);
// console.log(result);

await confirm_choice(page, { widget_code, csrf_token, tickets });

await page.goto(`https://widget.loket.com/widget/${widget_code}/register`, {
  waitUntil: "networkidle2",
}); // tambah await

const result2 = await register(page, {
  widget_code,
  csrf_token, // ambil csrf baru dari halaman /register
  firstname: process.env.firstname,
  lastname: process.env.lastname,
  email: process.env.email,
  telephone_code: "62",
  telephone: process.env.telephone,
  identity_id: process.env.identity_id,
  dob_day: process.env.dob_day,
  dob_month: process.env.dob_month,
  dob_year: process.env.dob_year,
  gender: process.env.gender, // 2:perempuan 1: laki
  receive_wa_notif: "0", // 0:no 1: yes
});


if (getLastUrlSegment(result2.url) != "confirm") process.exit(0);

console.log("Register Status:", result2.status);
console.log("Redirect URL:", result2.url);

await page.goto(`https://widget.loket.com/widget/${widget_code}/confirm`, {
  waitUntil: "networkidle2",
});

const payment = await getInvoice(page);

const result3 = await submit(page, {
  widget_code,
  csrf_token, // ambil csrf baru dari halaman /confirm
  id_invoice: payment.id_invoice,
  id_list_payment: "18",
  id_insurance_product_group: payment.id_insurance_product_group,
});

if (getLastUrlSegment(result3.url) != "checkout") process.exit(0);
console.log("Confirmation Status:", result3.status);
console.log("Redirect URL:", result3.url);

await page.goto(`https://widget.loket.com/widget/${widget_code}/checkout`, {
  waitUntil: "networkidle2",
});

const result4 = await charge(page, { csrf_token }); // csrf dari halaman /checkout

console.log("Charge Status:", result4.status);
console.log("Redirect URL:", result4.url);

await page.goto(`https://widget.loket.com/widget/invoice/${widget_code}`, {
  waitUntil: "networkidle2",
});
