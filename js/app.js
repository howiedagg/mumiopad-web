/**
 * Mumiopad - 主程式腳本
 */
const CONFIG = {
  githubUrl: 'https://github.com/howiedagg/Mumiopad',
  docUrl: 'https://github.com/howiedagg/Mumiopad/blob/main/README_zh.md',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mumiopad.app',
  defaultDownloadUrl: 'https://github.com/howiedagg/mumiopad-web/releases/latest/download/MumiopadSetup.exe',
  versionJsonUrl: './version.json'
};

let latestVersionData = null;

window.refreshDownloadButtonText = function() {
  const winBtnText = document.getElementById('winBtnText');
  if (!winBtnText) return;

  const baseText = translations[currentLang]?.downloadWin || '';
  if (latestVersionData && latestVersionData.version) {
    winBtnText.innerText = `${baseText} (v${latestVersionData.version})`;
  } else {
    winBtnText.innerText = baseText;
  }
};

async function fetchLatestVersion() {
  // 先把按鈕網址預設設為 latest 固定網址
  const winBtn = document.getElementById('winDownloadBtn');
  if (winBtn) winBtn.href = CONFIG.defaultDownloadUrl;

  try {
    const res = await fetch(`${CONFIG.versionJsonUrl}?t=${Date.now()}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.version) {
      latestVersionData = data;
      // 如果 version.json 裡面有特別指定特定的 download_url 就覆蓋，否則繼續用 latest 網址
      if (data.download_url) winBtn.href = data.download_url;
      window.refreshDownloadButtonText();
    }
  } catch (e) {
    console.log('Using fallback latest URL.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 綁定外部連結
  document.querySelectorAll('[data-config-link]').forEach(el => {
    const key = el.getAttribute('data-config-link');
    if (CONFIG[key]) el.href = CONFIG[key];
  });

  updateLanguageUI();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.innerText = new Date().getFullYear();

  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  fetchLatestVersion();
});