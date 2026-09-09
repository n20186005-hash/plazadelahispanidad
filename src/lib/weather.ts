/**
 * 天气数据：纯工具函数 + 数据归一化。
 * 具体拉取动作分别发生在服务端组件（构建/SSR）与客户端组件（静默刷新）中，
 * 前端界面不会出现任何数据来源与鉴权相关字样。
 */

export type WeatherGroup =
  | 'clear'
  | 'partly'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'showers'
  | 'snow'
  | 'storm';

export type CurrentWeather = {
  temp: number;
  feels: number;
  humidity: number;
  wind: number; // km/h
  code: number;
  isDay: boolean;
};

export type DailyForecast = {
  date: string; // YYYY-MM-DD
  code: number;
  max: number;
  min: number;
  precip: number | null; // % 或 null
};

export type WeatherModel = {
  current: CurrentWeather | null;
  daily: DailyForecast[];
};

const GEO_LAT = '18.4770613';
const GEO_LNG = '-69.8832443';

const buildQuery = () =>
  new URLSearchParams({
    latitude: GEO_LAT,
    longitude: GEO_LNG,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'America/Santo_Domingo',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
  });

/** 数据接口地址（仅在服务端/客户端代码中调用，不写入任何页面文案） */
export const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?${buildQuery().toString()}`;

/** 将 WMO 天气代码归并为界面所需的小类 */
export function weatherGroup(code: number): WeatherGroup {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || code === 77) return 'rain';
  if (code >= 71 && code <= 76) return 'snow';
  if (code >= 80 && code <= 82) return 'showers';
  if (code >= 95) return 'storm';
  return 'partly';
}

const num = (v: unknown): number | null =>
  typeof v === 'number' && Number.isFinite(v) ? v : null;

/** 把接口返回的 JSON 归一化为组件可渲染模型 */
export function normalizeWeather(json: any): WeatherModel | null {
  if (!json || !json.current || !json.daily) return null;

  const c = json.current;
  const d = json.daily;

  const current: CurrentWeather = {
    temp: Math.round(num(c.temperature_2m) ?? 0),
    feels: Math.round(num(c.apparent_temperature) ?? 0),
    humidity: Math.round(num(c.relative_humidity_2m) ?? 0),
    wind: Math.round(num(c.wind_speed_10m) ?? 0),
    code: typeof c.weather_code === 'number' ? c.weather_code : 0,
    isDay: c.is_day !== 0,
  };

  const times: string[] = Array.isArray(d.time) ? d.time : [];
  const daily: DailyForecast[] = times.map((date, i) => ({
    date,
    code: typeof d.weather_code?.[i] === 'number' ? d.weather_code[i] : 0,
    max: Math.round(num(d.temperature_2m_max?.[i]) ?? 0),
    min: Math.round(num(d.temperature_2m_min?.[i]) ?? 0),
    precip:
      typeof d.precipitation_probability_max?.[i] === 'number'
        ? Math.round(d.precipitation_probability_max[i])
        : null,
  }));

  return { current, daily };
}
