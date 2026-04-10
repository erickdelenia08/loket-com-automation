async function getCsrf(page) {
  const csrf = await page.evaluate(() => {
    // coba dari input hidden
    const input = document.querySelector('input[name="csrf_token"]');
    if (input) return input.value;

    // fallback ke meta tag
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) return meta.content;

    return null;
  });

  return csrf;
}

export default getCsrf