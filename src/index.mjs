import connect from "./browser/connect.mjs";
import { dummy_widget_code, ticket_selector, main_url } from "./config.mjs";
import getCsrf from "./extractors/getCrsf.mjs";
import getInvoice from "./extractors/getInvoice.mjs";
import getWidgetCode from "./extractors/getWidgetCode.mjs";
import check_quantity from "./requests/check_quantity.mjs";
import confirm_choice from "./requests/confirm_choice.mjs";
import register from "./requests/register.mjs";
import submit from "./requests/submit.mjs";
import charge from './requests/charge.mjs'
import getTickets from "./extractors/getTickets.mjs";

const page = await connect();

const link = "https://widget.loket.com/widget/yskj4ewalhd7ujwmy"
await page.goto(link, { waitUntil: "networkidle2" }); // tambah await

const csrf_token = await getCsrf(page);
const widget_code = getWidgetCode(link);

console.log("csrf_token:", csrf_token);
console.log("widget_code:", widget_code);

const ticket_qty = 2;
const TICKET_INDEX=2
const tickets = await getTickets(page, TICKET_INDEX, ticket_qty);
console.log(tickets);

const result = await check_quantity(
  page,
  tickets[TICKET_INDEX].id_group,
  tickets[TICKET_INDEX].id_ticket,
  ticket_qty,
  csrf_token,
  widget_code,
);
console.log(result);

await confirm_choice(page, { widget_code, csrf_token, tickets });

await page.goto(`https://widget.loket.com/widget/${widget_code}/register`, {
  waitUntil: "networkidle2",
}); // tambah await

const result2 = await register(page, {
  widget_code,
  csrf_token, // ambil csrf baru dari halaman /register
  firstname: "erick",
  lastname: "delenia",
  email: "erickdelenia08@gmail.com",
  telephone_code: "62",
  telephone: "81334031474",
  identity_id: "3508070101010006",
  dob_day: "01",
  dob_month: "01",
  dob_year: "2001",
  gender: "1",
  receive_wa_notif: "1",
});

console.log("Register Status:", result2.status);
console.log("Redirect URL:", result2.url);

await page.goto(`https://widget.loket.com/widget/${widget_code}/confirm`, {
  waitUntil: "networkidle2",
});

const payment= await getInvoice(page)

const result3 = await submit(page, {
  widget_code,
  csrf_token, // ambil csrf baru dari halaman /confirm
  id_invoice: payment.id_invoice,
  id_list_payment: "18",
  id_insurance_product_group: payment.id_insurance_product_group,
});

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