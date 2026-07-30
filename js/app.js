const CONFIG = {
  githubUrl: 'https://github.com/howiedagg/Mumiopad',
  docUrl: 'https://github.com/howiedagg/Mumiopad/blob/main/README_zh.md',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mumiopad.app',
  // 固定最新下載連結
  downloadUrl: 'https://github.com/howiedagg/mumiopad-web/releases/latest/download/MumiopadSetup.exe',
  // 版號來源:讀公開 repo 的 latest release tag(GitHub API 有 CORS 友善標頭,
  // release 資產的直接下載連結沒有,不能從前端 fetch)
  releaseApiUrl: 'https://api.github.com/repos/howiedagg/mumiopad-web/releases/latest'
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
  const CACHE_KEY = 'mumiopad_release';
  const CACHE_TTL = 10 * 60 * 1000; // 10 分鐘,避免打爆未認證 API 的 60/hr 限制

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    const fresh = cached && (Date.now() - cached.t) < CACHE_TTL;
    if (fresh) {
      latestVersion = cached.v;
      window.refreshDownloadButtonText();
      return;
    }

    const res = await fetch(CONFIG.releaseApiUrl, { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!res.ok) return;
    const data = await res.json();
    // tag_name 形如 "v0.1.26",去掉前綴 "v"
    const ver = (data.tag_name || '').replace(/^v/, '');
    if (ver) {
      latestVersion = ver;
      localStorage.setItem(CACHE_KEY, JSON.stringify({ v: ver, t: Date.now() }));
      window.refreshDownloadButtonText();
    }
  } catch (e) {
    console.log('無法取得最新版號，保持預設按鈕文字。');
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