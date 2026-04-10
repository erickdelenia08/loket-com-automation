// requests/check_quantity.mjs
const check_quantity = async (page, id_group, id_ticket, ticket_qty, csrf_token, widget_code) => {
  
  const result = await page.evaluate(async ({ id_group, id_ticket, ticket_qty, csrf_token, widget_code }) => {
    const payload = new URLSearchParams();
    payload.append("id_group", id_group);
    payload.append("id_ticket", id_ticket);
    payload.append("ticket_qty", ticket_qty);
    payload.append("csrf_token", csrf_token);
    payload.append("widget_code", widget_code);
    payload.append("ticket_sum", ticket_qty);
    payload.append("event_type", "0");

    const res = await fetch(
      `https://widget.loket.com/widget/${widget_code}/check_quantity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
        },
        body: payload.toString(),
        credentials: "include",
      }
    );

    return await res.json();
  }, { id_group, id_ticket, ticket_qty, csrf_token, widget_code });

  return result;
};

export default check_quantity;