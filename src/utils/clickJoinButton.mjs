const clickJoinButton = async (page) => {
  console.log("🎯 Mencari tombol join...");

  await page.waitForFunction(() => {
    const btn = document.querySelector("#join-btn");
    if (!btn) return false;

    const isDisabled = btn.classList.contains("btn-disabled");
    if (!isDisabled) {
      btn.click();
      return true;
    }

    return false;
  }, { timeout: 0, polling: 100 });

  console.log("🔥 BERHASIL KLIK JOIN");
};

export default clickJoinButton;