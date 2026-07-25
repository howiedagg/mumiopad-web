/**
 * Mumiopad - i18n 100% 完整手勢字典
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
    
    gestureTitle: '直覺手勢，一秒上手',

    // 分類 1：基礎滑鼠操控
    catBasic: '基礎滑鼠操控',
    g1Move: '單指滑動', g1MoveAct: '移動游標',
    g1Tap: '單指輕點', g1TapAct: '滑鼠左鍵點擊',
    g1Drag: '單指長按 (0.3s)', g1DragAct: '鎖定並拖曳選取',
    g2Tap: '雙指同步輕點', g2TapAct: '滑鼠右鍵選單',
    g4Tap: '四指輕點', g4TapAct: '滑鼠中鍵點擊',

    // 分類 2：單指固定 + 第二指輔助
    catHold2nd: '單指固定 + 第二指輔助操作',
    gSecTap: '一指按住 + 第二指輕點', gSecTapAct: '滑鼠左鍵點擊',
    gSecDrag: '一指按住 + 第二指長按', gSecDragAct: '第二指接管拖曳選取',
    gSecScroll: '一指按住 + 第二指上下滑動', gSecScrollAct: '頁面 / 文件滾動',
    gSecSwipe: '一指按住 + 第二指左右刷動', gSecSwipeAct: '瀏覽器 上一頁 / 下一頁',

    // 分類 3：滾動與縮放
    catScroll: '頁面滾動與縮放',
    g2Scroll: '雙指上下滑動', g2ScrollAct: '細密刻度頁面滾動',
    g2Swipe: '雙指左右刷動', g2SwipeAct: '瀏覽器 上一頁 / 下一頁',
    gZoom: '雙指張開 / 捏合', gZoomAct: '畫面放大 / 縮小 (Windows 放大鏡)',

    // 分類 4：系統多工與快捷
    catSystem: '系統多工與快捷控制',
    g3Tap: '三指輕點', g3TapAct: '多工作業檢視',
    g3Vert: '三指上下滑動', g3VertAct: '一鍵顯示 / 還原桌面',
    g3Hori: '三指左右滑動', g3HoriAct: '開啟 / 關閉虛擬鍵盤',
    gVol: '手機實體音量鍵', gVolAct: '直接調整電腦系統音量',

    // FAQ
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
    
    gestureTitle: 'Intuitive Gestures',

    // Cat 1
    catBasic: 'Basic Mouse Control',
    g1Move: '1-Finger Move', g1MoveAct: 'Move Cursor',
    g1Tap: '1-Finger Tap', g1TapAct: 'Left Click',
    g1Drag: '1-Finger Hold (0.3s)', g1DragAct: 'Lock & Drag Selection',
    g2Tap: '2-Finger Tap', g2TapAct: 'Right Click',
    g4Tap: '4-Finger Tap', g4TapAct: 'Middle Click',

    // Cat 2
    catHold2nd: 'Hold 1 Finger + 2nd Finger Actions',
    gSecTap: 'Hold 1 Finger + 2nd Tap', gSecTapAct: 'Left Click',
    gSecDrag: 'Hold 1 Finger + 2nd Hold', gSecDragAct: '2nd Finger Drag Takeover',
    gSecScroll: 'Hold 1 Finger + 2nd Vertical Slide', gSecScrollAct: 'Page / Document Scroll',
    gSecSwipe: 'Hold 1 Finger + 2nd Horizontal Swipe', gSecSwipeAct: 'Browser Back / Forward',

    // Cat 3
    catScroll: 'Scroll & Zoom Navigation',
    g2Scroll: '2-Finger Vertical Slide', g2ScrollAct: 'Haptic Page Scroll',
    g2Swipe: '2-Finger Horizontal Swipe', g2SwipeAct: 'Browser Back / Forward',
    gZoom: 'Pinch / Stretch', gZoomAct: 'Zoom In / Out (Windows Magnifier)',

    // Cat 4
    catSystem: 'Multitasking & Shortcuts',
    g3Tap: '3-Finger Tap', g3TapAct: 'Task View',
    g3Vert: '3-Finger Vertical Slide', g3VertAct: 'Show / Hide Desktop',
    g3Hori: '3-Finger Horizontal Slide', g3HoriAct: 'Toggle Virtual Keyboard',
    gVol: 'Phone Volume Keys', gVolAct: 'Control PC System Volume',

    // FAQ
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
  if (window.refreshDownloadButtonText) {
    window.refreshDownloadButtonText();
  }
}