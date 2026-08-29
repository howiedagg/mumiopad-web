const CONFIG = {
  githubUrl: 'https://github.com/howiedagg/Mumiopad',
  docUrl: 'https://github.com/howiedagg/Mumiopad/blob/main/README_zh.md',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mumiopad.app',
  // Partner Center 上架後填入 Store listing URL；留白時 EXE 維持主要下載。
  windowsStoreUrl: '',
  // 舊版 release 的相容下載連結；讀到新版資產後會自動切成 MumioServerSetup.exe。
  downloadUrl: 'https://github.com/howiedagg/mumiopad-web/releases/latest/download/MumiopadSetup.exe',
  preferredDownloadAsset: 'MumioServerSetup.exe',
  // 版號來源:讀公開 repo 的 latest release tag(GitHub API 有 CORS 友善標頭,
  // release 資產的直接下載連結沒有,不能從前端 fetch)
  releaseApiUrl: 'https://api.github.com/repos/howiedagg/mumiopad-web/releases/latest'
};

let latestVersion = null;

function updateDirectDownloadUrl(url) {
  const button = document.getElementById('winDownloadBtn');
  if (button && url) button.href = url;
}

function hasWindowsStoreListing() {
  return Boolean(CONFIG.windowsStoreUrl?.trim());
}

// 更新下載按鈕顯示的文字
window.refreshDownloadButtonText = function() {
  const winBtnText = document.getElementById('winBtnText');
  if (!winBtnText) return;

  const translationKey = hasWindowsStoreListing() ? 'directDownloadWin' : 'downloadWin';
  const baseText = translations[currentLang]?.[translationKey] || '';
  winBtnText.innerText = latestVersion ? `${baseText} (v${latestVersion})` : baseText;
};

function configureWindowsDownloadButtons() {
  const storeButton = document.getElementById('windowsStoreBtn');
  const directButton = document.getElementById('winDownloadBtn');
  const hasStore = hasWindowsStoreListing();

  if (storeButton) {
    storeButton.hidden = !hasStore;
    if (hasStore) storeButton.href = CONFIG.windowsStoreUrl;
  }
  if (directButton) {
    directButton.classList.toggle('btn-primary', !hasStore);
    directButton.classList.toggle('btn-secondary', hasStore);
  }
  window.refreshDownloadButtonText();
}

async function fetchLatestVersion() {
  const CACHE_KEY = 'mumiopad_release';
  const CACHE_TTL = 10 * 60 * 1000; // 10 分鐘,避免打爆未認證 API 的 60/hr 限制

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    const fresh = cached && (Date.now() - cached.t) < CACHE_TTL;
    if (fresh) {
      latestVersion = cached.v;
      updateDirectDownloadUrl(cached.u || CONFIG.downloadUrl);
      window.refreshDownloadButtonText();
      return;
    }

    const res = await fetch(CONFIG.releaseApiUrl, { headers: { 'Accept': 'application/vnd.github+json' } });
    if (!res.ok) return;
    const data = await res.json();
    // tag_name 形如 "v0.1.26",去掉前綴 "v"
    const ver = (data.tag_name || '').replace(/^v/, '');
    const preferredAsset = (data.assets || []).find(asset => asset.name === CONFIG.preferredDownloadAsset);
    const downloadUrl = preferredAsset?.browser_download_url || CONFIG.downloadUrl;
    updateDirectDownloadUrl(downloadUrl);
    if (ver) {
      latestVersion = ver;
      localStorage.setItem(CACHE_KEY, JSON.stringify({ v: ver, u: downloadUrl, t: Date.now() }));
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
  configureWindowsDownloadButtons();

  // 3. 更新年份
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.innerText = new Date().getFullYear();

  // 4. 語言按鈕綁定
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.addEventListener('click', toggleLanguage);

  // 5. 抓取版號
  fetchLatestVersion();
});
