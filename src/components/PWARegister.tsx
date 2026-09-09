'use client';

import { useEffect } from 'react';

/**
 * 注册 Service Worker，实现基础 PWA（可安装 + 离线静态资源缓存）。
 * 仅在构建产物（生产模式）下注册，避免开发热更新产生缓存干扰。
 */
export default function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // 静默失败：SW 注册失败不影响页面正常使用
      });
    });
  }, []);

  return null;
}
