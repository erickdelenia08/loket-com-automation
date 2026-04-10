// requests/submit_ticket.mjs
const confirm_choice = async (page, { 
  widget_code, 
  csrf_token, 
  tickets, // { id_group, id_ticket, qty }[]
}) => {

  const result = await page.evaluate(async ({ widget_code, csrf_token, tickets, max_qty_ticket }) => {
    const payload = new URLSearchParams();

    payload.append("max_qty_ticket", '4');
    payload.append("is_same_ticket", "1");
    payload.append("is_same_ticket_lang", "Anda hanya bisa membeli jenis tiket yang sama.");
    payload.append("prefill_data", "");
    payload.append("uid", "");
    payload.append("ref", "");
    payload.append("ref_id", "");
    payload.append("referral_text", `https://widget.loket.com/`);
    payload.append("csrf_token", csrf_token);
    payload.append("utm_source", "N/A");
    payload.append("utm_medium", "N/A");
    payload.append("utm_content", "N/A");
    payload.append("utm_campaign", "N/A");

    // append semua tiket
    for (const { id_group, id_ticket, qty } of tickets) {
      payload.append(`ticket[${id_group}][${id_ticket}]`, qty);
    }

    const res = await fetch(
      `https://widget.loket.com/widget/${widget_code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Origin": "https://widget.loket.com",
          "Referer": "https://widget.loket.com/",
        },
        body: payload.toString(),
        credentials: "include",
        redirect: "follow",
      }
    );

    return {
      status: res.status,
      url: res.url, // kalau redirect ke /register berarti berhasil
    };
  }, { widget_code, csrf_token, tickets });

  return result;
};

export default confirm_choice;