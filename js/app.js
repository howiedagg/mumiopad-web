/**
 * Mumiopad - 全域集中配置 (連結、路徑統一管理，拒絕硬編碼)
 */
const CONFIG = {
  githubUrl: 'https://github.com/howiedagg/Mumiopad',
  docUrl: 'https://github.com/howiedagg/Mumiopad/blob/main/README_zh.md',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mumiopad.app',
  versionJsonUrl: './version.json'
};

let latestVersionData = null;

// 動態更新 Windows 下載按鈕文案
window.refreshDownloadButtonText = function() {
  const winBtnText = document.getElementById('winBtnText');
  if (!winBtnText) return;

  // 1. 100% 調用 i18n 字典，絕無硬編碼文字
  const baseText = translations[currentLang]?.downloadWin || '';

  // 2. 若抓到動態版號則附加版號，否則顯示基礎文案
  if (latestVersionData && latestVersionData.version) {
    winBtnText.innerText = `${baseText} (v${latestVersionData.version})`;
  } else {
    winBtnText.innerText = baseText;
  }
};

// 抓取線上最新的 version.json
async function fetchLatestVersion() {
  try {
    const res = await fetch(`${CONFIG.versionJsonUrl}?t=${Date.now()}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data.version && data.download_url) {
      latestVersionData = data;
      const winBtn = document.getElementById('winDownloadBtn');
      if (winBtn) winBtn.href = data.download_url;
      window.refreshDownloadButtonText();
    }
  } catch (e) {
    console.log('Using default static download URL.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. 動態綁定所有全域外部連結 (如 GitHub, Play Store, 文件)
  document.querySelectorAll('[data-config-link]').forEach(el => {
    const key = el.getAttribute('data-config-link');
    if (CONFIG[key]) el.href = CONFIG[key];
  });

  // 2. 初始化多國語言介面
  updateLanguageUI();

  // 3. 動態取得與更新年份
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.innerText = new Date().getFullYear();

  // 4. 綁定語言切換按鈕事件
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  // 5. 抓取遠端最新版號
  fetchLatestVersion();
});