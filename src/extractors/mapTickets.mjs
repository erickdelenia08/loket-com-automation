const mapTickets = (tickets, keyword, qty) => {
  const lowerKeyword = keyword.toLowerCase();

  // cari yang match keyword
  const matched = tickets.filter(t =>
    t.title.toLowerCase().trim().includes(lowerKeyword)
  );

  let targetId = null;

  if (matched.length > 0) {
    // ✅ ambil HANYA YANG PERTAMA
    targetId = matched[0].id_ticket;
  } else {
    // ❌ fallback kalau tidak ada match

    // const available = tickets.filter(t => t.stock > 0);

    // if (available.length === 0) {
    //   console.log("❌ semua tiket habis");
    //   return [];
    // }

    // cari harga termurah
    const minPrice = Math.min(...tickets.map(t => t.harga));
    // const minPrice = Math.min(...available.map(t => t.harga));

    // ambil semua yang termurah
    // const cheapest = available.filter(t => t.harga === minPrice);
    const cheapest = tickets.filter(t => t.harga === minPrice);

    // random salah satu
    const randomPick =
      cheapest[Math.floor(Math.random() * cheapest.length)];
    
      targetId = randomPick.id_ticket;
  }

  // mapping final
  return tickets.map(t => ({
    id_ticket: t.id_ticket,
    id_group: t.id_group,
    qty: t.id_ticket === targetId ? qty : 0,
  }));
};

export default mapTickets