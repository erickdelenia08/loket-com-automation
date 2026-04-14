async function getMaxQtyTicket(page) {
  const csrf = await page.evaluate(() => {
    // coba dari input hidden
    const input = document.querySelector('input[name="max_qty_ticket"]');
    if (input) return input.value;

    return null;
  });

  return csrf;
}

export default getMaxQtyTicket