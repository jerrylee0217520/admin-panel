// 定義快取名稱和要快取的檔案
const CACHE_NAME = 'parking-ai-tool-v1';
const urlsToCache = [
  './', // 代表根目錄，通常是 index.html 或您工具的 HTML 檔案
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 安裝 Service Worker 時，快取必要的檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求，優先從快取中讀取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果快取中有對應的回應，就直接回傳
        if (response) {
          return response;
        }
        // 否則，就發出網路請求
        return fetch(event.request);
      }
    )
  );
});
