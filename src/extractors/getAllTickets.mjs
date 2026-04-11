// // extractors/getAllTickets.mjs
// const getAllTickets = async (page, ticketIndex, qty = '1') => {
//   const rawTickets = await page.evaluate(() => {
//     const steppers = document.querySelectorAll('.stepper');
//     return Array.from(steppers).map(stepper => ({
//       id_ticket: stepper.getAttribute('id-ticket'),
//       id_group: stepper.getAttribute('id-group'),
//     }));
//   });

//   const tickets = rawTickets.map((t, i) => ({
//     id_group: t.id_group,
//     id_ticket: t.id_ticket,
//     qty: i === ticketIndex ? qty : '0',
//   }));

//   return tickets;
// };

// export default getAllTickets;

// extractors/getAllTickets.mjs
const getAllTickets = async (page) => {
  const tickets = await page.evaluate(() => {
    const items = document.querySelectorAll(".ticket-item");

    return Array.from(items).map((item) => {
      const stepper = item.querySelector(".stepper");
      const priceSpan = item.querySelector("span[data-id-ticket]");

      const statusTicket = stepper?.getAttribute("status-ticket") ?? "";
      const isSoldOut = statusTicket === "STATUS_SOLDOUT";

      return {
        id_ticket: stepper?.getAttribute("id-ticket") ?? null,
        id_group: stepper?.getAttribute("id-group") ?? null,
        title: item.querySelector("h6")?.innerText?.trim() ?? null,
        harga: stepper?.getAttribute("price")
          ? parseInt(stepper.getAttribute("price"))
          : null,
        stock: isSoldOut ? 0 : 1, // 0 jika
        qty: 0,
      };
    });
  });

  return tickets;
};

export default getAllTickets;