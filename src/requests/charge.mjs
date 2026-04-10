// requests/charge.mjs
const charge = async (page, { csrf_token }) => {

  const result = await page.evaluate(async (params) => {
    const payload = new URLSearchParams();

    payload.append("csrf_token", params.csrf_token);
    payload.append("utm_source", "N/A");
    payload.append("utm_medium", "N/A");
    payload.append("utm_content", "N/A");
    payload.append("utm_campaign", "N/A");

    const res = await fetch(
      `https://widget.loket.com/pay/charge`,
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
      url: res.url, // kalau redirect ke /widget/invoice berarti berhasil
    };
  }, { csrf_token });

  return result;
};

export default charge;