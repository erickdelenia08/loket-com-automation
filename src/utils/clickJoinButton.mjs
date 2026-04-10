const clickJoinButton = async (page) => {
  console.log("🎯 Mencari tombol join...");

  while (true) {
    const clicked = await page.evaluate(() => {
      const btn = document.querySelector("#join-btn");

      if (btn && !btn.disabled) {
        btn.click();
        return true;
      }

      return false;
    });

    if (clicked) {
      console.log("🔥 BERHASIL KLIK JOIN");
      break;
    }

    await new Promise(r => setTimeout(r, 20)); // super cepat
  }
};

export default clickJoinButton