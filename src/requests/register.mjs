// requests/register.mjs
const register = async (page, {
  widget_code,
  csrf_token,
  firstname,
  lastname,
  email,
  telephone_code = '62',
  telephone,
  identity_id,
  dob_day,
  dob_month,
  dob_year,
  gender,
  receive_wa_notif = '1',
}) => {

  const result = await page.evaluate(async (params) => {
    const payload = new URLSearchParams();

    payload.append("csrf_token", params.csrf_token);
    payload.append("firstname", params.firstname);
    payload.append("lastname", params.lastname);
    payload.append("email", params.email);
    payload.append("telephone_code", params.telephone_code);
    payload.append("telephone", params.telephone);
    payload.append("identity_id", params.identity_id);
    payload.append("dob_day", params.dob_day);
    payload.append("dob_month", params.dob_month);
    payload.append("dob_year", params.dob_year);
    payload.append("gender", params.gender);
    payload.append("receive_wa_notif", params.receive_wa_notif);

    const res = await fetch(
      `https://widget.loket.com/widget/${params.widget_code}/register`,
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
      url: res.url, // kalau redirect ke /confirm berarti berhasil
    };
  }, {
    widget_code,
    csrf_token,
    firstname,
    lastname,
    email,
    telephone_code,
    telephone,
    identity_id,
    dob_day,
    dob_month,
    dob_year,
    gender,
    receive_wa_notif,
  });

  return result;
};

export default register;