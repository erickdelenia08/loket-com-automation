const getInvoice = async (page) => {
  const data = await page.evaluate(() => {
    const form = document.querySelector('#form-register');
    return {
      id_invoice: form.querySelector('[name="id_invoice"]').value,
      id_insurance_product_group: form.querySelector('[name="id_insurance_product_group"]').value,
    };
  });

  return data;
};

export default getInvoice;