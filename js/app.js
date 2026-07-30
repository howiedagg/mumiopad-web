const CONFIG = {
  githubUrl: 'https://github.com/howiedagg/Mumiopad',
  docUrl: 'https://github.com/howiedagg/Mumiopad/blob/main/README_zh.md',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mumiopad.app',
  // 固定最新下載連結
  downloadUrl: 'https://github.com/howiedagg/mumiopad-web/releases/latest/download/MumiopadSetup.exe',
  // 版號來源:公開 repo latest release 的 version.json(版號單一來源)
  versionJsonUrl: 'https://github.com/howiedagg/mumiopad-web/releases/latest/download/version.json'
};

let latestVersion = null;

// 更新下載按鈕顯示的文字
window.refreshDownloadButtonText = function() {
  const winBtnText = document.getElementById('winBtnText');
  if (!winBtnText) return;

  const baseText = translations[currentLang]?.downloadWin || '';
  winBtnText.innerText = latestVersion ? `${baseText} (v${latestVersion})` : baseText;
};

async function fetchLatestVersion() {
  try {
    const res = await fetch(`${CONFIG.versionJsonUrl}?t=${Date.now()}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.version) {
      latestVersion = data.version;
      window.refreshDownloadButtonText();
    }
  } catch (e) {
    console.log('無法取得 version.json，保持預設按鈕文字。');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. 綁定所有靜態連結 (包含下載按鈕直接指向 latest 網址)
  document.querySelectorAll('[data-config-link]').forEach(el => {
    const key = el.getAttribute('data-config-link');
    if (CONFIG[key]) el.href = CONFIG[key];
  });

  // 2. 初始化語系UI
  updateLanguageUI();

  // 3. 更新年份
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.innerText = new Date().getFullYear();

  // 4. 語言按鈕綁定
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  // 5. 抓取版號
  fetchLatestVersion();
});