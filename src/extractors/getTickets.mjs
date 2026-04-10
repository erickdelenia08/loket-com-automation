// extractors/getTickets.mjs
const getTickets = async (page, ticketIndex, qty = '1') => {
  const rawTickets = await page.evaluate(() => {
    const steppers = document.querySelectorAll('.stepper');
    return Array.from(steppers).map(stepper => ({
      id_ticket: stepper.getAttribute('id-ticket'),
      id_group: stepper.getAttribute('id-group'),
    }));
  });

  const tickets = rawTickets.map((t, i) => ({
    id_group: t.id_group,
    id_ticket: t.id_ticket,
    qty: i === ticketIndex ? qty : '0',
  }));

  return tickets;
};

export default getTickets;