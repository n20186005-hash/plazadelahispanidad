import { weatherApiUrl, normalizeWeather, type WeatherModel } from '@/lib/weather';
import WeatherPanel from './WeatherPanel';

/**
 * 实时天气 + 未来多日预报（服务端组件）
 * 天气数据在服务端拉取并缓存（构建期 revalidate），
 * 随后交由客户端面板静默续期，前端不展示任何数据源相关字样。
 */
export default async function WeatherSection() {
  let weather: WeatherModel = { current: null, daily: [] };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(weatherApiUrl, {
      next: { revalidate: 1800 },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const json = await res.json();
      const normalized = normalizeWeather(json);
      if (normalized) weather = normalized;
    }
  } catch {
    /* 保持空占位，后续由客户端面板自动拉取 */
  }

  return <WeatherPanel weather={weather} />;
}
