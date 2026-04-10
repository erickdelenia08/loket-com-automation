const clickJoinButton = async (page) => {
  console.log("🎯 Mencari tombol join...");

  await page.waitForFunction(() => {
    const btn = document.querySelector("#join-btn");
    if (btn && !btn.disabled) {
      btn.click();
      return true;
    }
    return false;
  }, { timeout: 0, polling: 100 }); // polling 100ms, timeout 0 = tunggu selamanya

  console.log("🔥 BERHASIL KLIK JOIN");
};

export default clickJoinButton;