// requests/confirm.mjs
const submit = async (page, {
  widget_code,
  csrf_token,
  id_invoice,
  id_list_payment,
  id_insurance_product_group,
}) => {

  const result = await page.evaluate(async (params) => {
    const payload = new URLSearchParams();

    payload.append("id_invoice", params.id_invoice);
    payload.append("widget_code", params.widget_code);
    payload.append("id_list_payment", params.id_list_payment);
    payload.append("id_insurance_product_group", params.id_insurance_product_group);
    payload.append("csrf_token", params.csrf_token);

    const res = await fetch(
      `https://widget.loket.com/widget/${params.widget_code}/confirm`,
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
      url: res.url, // kalau redirect ke /checkout berarti berhasil
    };
  }, {
    widget_code,
    csrf_token,
    id_invoice,
    id_list_payment,
    id_insurance_product_group,
  });

  return result;
};

export default submit;