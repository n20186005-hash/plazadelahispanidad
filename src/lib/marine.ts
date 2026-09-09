/**
 * 近海海况 / 潮汐数据：纯工具函数 + 归一化（免密钥，数据源与天气一致）。
 *
 * 说明：
 * - 数据来自全球海洋模型网格（空间分辨率约 0.08–0.1°），sea_level_height_msl
 *   已经包含天文潮涨落分量，可据此估算高潮/低潮时刻。
 * - 圣多明各为加勒比小型潮汐区，单日潮差通常仅 0.2–0.4 m；
 *   逐小时数据的时刻只具指示意义，不用于航行或专业用途。
 * - 前端界面不出现任何数据来源与鉴权相关字样。
 */

export type TideKind = 'high' | 'low';
export type TideEvent = {
  time: string; // 当地时间 "YYYY-MM-DDTHH:00"（America/Santo_Domingo，无时区后缀）
  kind: TideKind;
  level: number; // 相对平均海平面的高度，单位 m
};

export type MarineModel = {
  seaTemp: number | null; // °C
  waveHeight: number | null; // m
  waveDirection: number | null; // °（浪来的方向）
  wavePeriod: number | null; // s
  currentSpeed: number | null; // km/h
  levelNow: number | null; // m（当前海面高度）
  trend: 'rising' | 'falling' | null;
  events: TideEvent[]; // 按时间升序的极值点（不全在未来，需由客户端按当前时刻过滤）
};

const GEO_LAT = '18.4770613';
const GEO_LNG = '-69.8832443';

const buildQuery = () =>
  new URLSearchParams({
    latitude: GEO_LAT,
    longitude: GEO_LNG,
    current:
      'wave_height,wave_direction,wave_period,sea_surface_temperature,ocean_current_velocity,sea_level_height_msl',
    hourly: 'sea_level_height_msl',
    timezone: 'America/Santo_Domingo',
    forecast_days: '3',
  });

/** 数据接口地址（仅在服务端/客户端代码中调用，不写入任何页面文案） */
export const marineApiUrl = `https://marine-api.open-meteo.com/v1/marine?${buildQuery().toString()}`;

/** 空模型：接口不可用时界面显示“加载/占位”而不是崩溃 */
export const emptyMarine = (): MarineModel => ({
  seaTemp: null,
  waveHeight: null,
  waveDirection: null,
  wavePeriod: null,
  currentSpeed: null,
  levelNow: null,
  trend: null,
  events: [],
});

const num = (v: unknown): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? v : null;
const r1 = (v: number | null) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v: number | null) => (v == null ? null : Math.round(v * 100) / 100);

/** 判断“现在”处于上涨还是回落：比较当前整点与其后一小时 */
function trendOf(currentTime: unknown, times: string[], levels: number[]): MarineModel['trend'] {
  if (typeof currentTime !== 'string' || times.length < 2 || levels.length !== times.length) {
    return null;
  }
  const idx = times.findIndex((t) => t.slice(0, 13) === currentTime.slice(0, 13));
  if (idx < 0 || idx + 1 >= levels.length) return null;
  return levels[idx + 1] > levels[idx] ? 'rising' : 'falling';
}

/** 在逐小时序列中找出高/低水位极值点 */
function detectExtremes(times: string[], levels: number[]): TideEvent[] {
  const MIN_RANGE = 0.01; // 振幅小于该值的抖动忽略
  const MIN_GAP_MS = 6 * 3600 * 1000; // 同类型极值至少间隔 6h

  const cands: TideEvent[] = [];
  for (let i = 1; i < levels.length - 1; i++) {
    const prev = levels[i - 1];
    const cur = levels[i];
    const next = levels[i + 1];
    if (cur > prev && cur >= next && cur - prev >= MIN_RANGE && cur - next >= MIN_RANGE) {
      cands.push({ time: times[i], kind: 'high', level: r2(cur) ?? 0 });
    } else if (cur < prev && cur <= next && prev - cur >= MIN_RANGE && next - cur >= MIN_RANGE) {
      cands.push({ time: times[i], kind: 'low', level: r2(cur) ?? 0 });
    }
  }

  // 合并 6h 内出现的同类型重复峰/谷，保留更极端的那个
  const out: TideEvent[] = [];
  for (const cand of cands) {
    const last = out[out.length - 1];
    if (last && last.kind === cand.kind) {
      const gap = Date.parse(`${cand.time}:00Z`) - Date.parse(`${last.time}:00Z`);
      if (gap <= MIN_GAP_MS) {
        const lastMoreExtreme =
          cand.kind === 'high' ? last.level >= cand.level : last.level <= cand.level;
        if (lastMoreExtreme) continue;
        out[out.length - 1] = cand;
        continue;
      }
    }
    out.push(cand);
  }
  return out;
}

/** 把接口返回的 JSON 归一化为组件可渲染模型 */
export function normalizeMarine(json: any): MarineModel {
  const m = emptyMarine();
  if (!json) return m;

  const c = json.current ?? {};
  m.seaTemp = r1(num(c.sea_surface_temperature));
  m.waveHeight = r1(num(c.wave_height));
  m.waveDirection = num(c.wave_direction);
  m.wavePeriod = r1(num(c.wave_period));
  m.currentSpeed = r1(num(c.ocean_current_velocity));
  m.levelNow = r2(num(c.sea_level_height_msl));

  const times: string[] = Array.isArray(json.hourly?.time) ? json.hourly.time : [];
  const rawLevels: unknown = json.hourly?.sea_level_height_msl;
  if (times.length === 0 || !Array.isArray(rawLevels)) return m;

  const levels = times.map((_, i) => num(rawLevels[i]) ?? Number.NaN);
  if (levels.some(Number.isNaN)) return m;

  m.trend = trendOf(c.time, times, levels);
  m.events = detectExtremes(times, levels);
  return m;
}
