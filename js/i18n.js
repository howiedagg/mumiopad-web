/**
 * Mumiopad - i18n 多國語言設定與切換邏輯
 */
const translations = {
  'zh-TW': {
    heroDesc: '低延遲無線電腦觸控板與極簡手勢控制器，支援 Wi-Fi 區域網路與免驅動藍牙 HID。',
    downloadWin: '下載 Windows 版',
    googlePlay: 'Google Play 下載',
    featureTitle: '雙模無線連線',
    wifiTitle: 'Wi-Fi 區域網路模式',
    wifiDesc: '超低延遲極速傳輸、支援地點感知自動綁定預設電腦，同區域網路開啟 App 即連。',
    btTitle: '免驅動藍牙 HID 模式',
    btDesc: '電腦端免安裝任何軟體與驅動，手機直接化身藍牙滑鼠與虛擬鍵盤，配對即用。',
    gestureTitle: '直覺手勢操作指南',
    g1Finger: '單指滑動 / 輕點',
    g1FingerAct: '移動游標 / 滑鼠左鍵點擊',
    g1Hold: '單指長按 (0.3s)',
    g1HoldAct: '震動鎖定並拖曳選取文字或視窗',
    g2Finger: '雙指輕點 / 刷動',
    g2FingerAct: '右鍵選單 / 上下滑動頁面滾動',
    gPinch: '雙指張開 / 捏合',
    gPinchAct: '畫面放大 / 縮小 (Windows 放大鏡)',
    g3Finger: '三指輕點 / 滑動',
    g3FingerAct: 'Win+Tab 多工檢視 / Win+D 顯示桌面',
    g4Finger: '四指輕點',
    g4FingerAct: '滑鼠中鍵點擊',
    faqTitle: '常見問題 FAQ',
    faq1Q: 'Windows 跳出 SmartScreen 阻擋怎麼辦？',
    faq1A: '這是因為獨立開發者未購買昂貴的代碼簽名證書。請點擊彈窗上的「其他資訊」➜ 再點擊「仍要執行」即可正常安裝。',
    faq2Q: '防火牆該如何設定？',
    faq2A: '首次啟動時，若 Windows 防火牆彈出視窗，請務必勾選允許「私人網路」存取，App 才能在同一 Wi-Fi 下搜尋到您的電腦。',
    faq3Q: '藍牙模式連不上該怎麼處理？',
    faq3A: '請先在手機 App 中點擊「開放藍牙配對」，接著打開 Windows 電腦的藍牙設定搜尋並配對您的手機名稱即可。',
    docLink: '說明文件',
    langBtnText: 'English'
  },
  'en': {
    heroDesc: 'Low-latency wireless touchpad & minimal gesture controller for PC. Supports Wi-Fi LAN & Driverless Bluetooth HID.',
    downloadWin: 'Download for Windows',
    googlePlay: 'Get it on Google Play',
    featureTitle: 'Dual-Mode Wireless Connection',
    wifiTitle: 'Wi-Fi LAN Mode',
    wifiDesc: 'Ultra-low latency, location-aware auto-pairing to your default PC on the same Wi-Fi network.',
    btTitle: 'Driverless Bluetooth HID Mode',
    btDesc: 'No PC software or drivers required. Your phone acts directly as a native Bluetooth mouse & keyboard.',
    gestureTitle: 'Intuitive Gesture Guide',
    g1Finger: '1-Finger Move / Tap',
    g1FingerAct: 'Move cursor / Left click',
    g1Hold: '1-Finger Hold (0.3s)',
    g1HoldAct: 'Haptic lock & drag selection',
    g2Finger: '2-Finger Tap / Slide',
    g2FingerAct: 'Right click menu / Page scrolling',
    gPinch: 'Pinch / Stretch',
    gPinchAct: 'Zoom in / out (Windows Magnifier)',
    g3Finger: '3-Finger Tap / Slide',
    g3FingerAct: 'Win+Tab Task View / Win+D Show Desktop',
    g4Finger: '4-Finger Tap',
    g4FingerAct: 'Middle mouse click',
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'What if Windows SmartScreen blocks the installer?',
    faq1A: 'This happens because independent developers do not buy expensive signing certificates. Click "More info" ➜ then "Run anyway" to install.',
    faq2Q: 'How should I configure Windows Firewall?',
    faq2A: 'When Windows Firewall prompts on first launch, make sure to check "Private networks" so the app can discover your PC over Wi-Fi.',
    faq3Q: 'How to pair in Bluetooth mode?',
    faq3A: 'Tap "Make Discoverable" in the phone app first, then search and pair your phone from Windows Bluetooth Settings.',
    docLink: 'Documentation',
    langBtnText: '繁體中文'
  }
};

function detectInitialLanguage() {
  const savedLang = localStorage.getItem('mumiopad_lang');
  if (savedLang) return savedLang;
  const navLang = navigator.language || navigator.userLanguage || '';
  return navLang.toLowerCase().startsWith('zh') ? 'zh-TW' : 'en';
}

let currentLang = detectInitialLanguage();

function updateLanguageUI() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.innerText = t[key];
  });
  const langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.innerText = t.langBtnText;
  document.documentElement.lang = currentLang;
}

function toggleLanguage() {
  currentLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
  localStorage.setItem('mumiopad_lang', currentLang);
  updateLanguageUI();
  // 同步更新動態版號文字
  if (window.refreshDownloadButtonText) {
    window.refreshDownloadButtonText();
  }
}