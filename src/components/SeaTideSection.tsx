import { marineApiUrl, normalizeMarine, emptyMarine, type MarineModel } from '@/lib/marine';
import SeaTidePanel from './SeaTidePanel';

/**
 * 近海潮汐 / 海况（服务端组件）
 * 数据在服务端拉取并缓存（构建期 revalidate），随后交由客户端面板静默续期，
 * 前端不展示任何数据来源相关字样。
 */
export default async function SeaTideSection() {
  let marine: MarineModel = emptyMarine();

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(marineApiUrl, {
      next: { revalidate: 1800 },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const json = await res.json();
      marine = normalizeMarine(json);
    }
  } catch {
    /* 保持空占位，后续由客户端面板自动拉取 */
  }

  return <SeaTidePanel marine={marine} />;
}
