'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import {
  weatherApiUrl,
  normalizeWeather,
  weatherGroup,
  type WeatherModel,
  type WeatherGroup,
} from '@/lib/weather';
import { dailyAdvice, uvLevelLabel, type AdviceGroup } from '@/lib/weatherAdvice';

const intlLocaleOf = (locale: string) =>
  locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es' : 'en';

/** 按天气分组渲染一套中性的线性图标 */
function WeatherIcon({ group, size = 40 }: { group: WeatherGroup; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (group) {
    case 'clear':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="12" />
          <path d="M32 8v6M32 50v6M8 32h6M50 32h6M14.9 14.9l4.2 4.2M44.9 44.9l4.2 4.2M49.1 14.9l-4.2 4.2M19.1 44.9l-4.2 4.2" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...common}>
          <path d="M42 28a14 14 0 0 0-26.9-5A10 10 0 0 0 18 43h20" />
          <path d="M42 28c1 0 2 0 3 .3A10 10 0 0 1 44 47" />
        </svg>
      );
    case 'overcast':
      return (
        <svg {...common}>
          <path d="M18 46h26a11 11 0 0 0 .4-22 16 16 0 0 0-31-1A10 10 0 0 0 18 46z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...common}>
          <path d="M22 34h18a9 9 0 1 0-3-17.4A14 14 0 0 0 14 34z" />
          <path d="M14 42h34M14 48h34" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...common}>
          <path d="M24 30h18a9 9 0 1 0-3-17.4A13 13 0 0 0 14 30z" />
          <path d="M24 40v6M32 40v6" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...common}>
          <path d="M22 28h20a10 10 0 1 0-3.4-19.4A14 14 0 0 0 16 28z" />
          <path d="M20 40v8M28 40v8M36 40v8M44 40v4" />
        </svg>
      );
    case 'showers':
      return (
        <svg {...common}>
          <path d="M22 26h22a10 10 0 1 0-3.4-19.4A15 15 0 0 0 18 26z" />
          <path d="M18 40v10M28 36v12" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...common}>
          <path d="M24 30h18a9 9 0 1 0-3-17.4A13 13 0 0 0 14 30z" />
          <path d="M18 42h6M34 42h6M26 46l-4 4M32 42l6 6M38 46l4 4" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...common}>
          <path d="M24 30h18a9 9 0 1 0-3-17.4A13 13 0 0 0 14 30z" />
          <polygon points="28 44 24 56 36 48 30 52 34 42" />
        </svg>
      );
  }
}

/** 建议分组的线性图标 */
function AdviceGlyph({ group, size = 18 }: { group: AdviceGroup; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (group) {
    case 'risk':
      return (
        <svg {...common}>
          <path d="M12 3 2.5 20h19z" />
          <path d="M12 9.5v4.5M12 16.6v.1" />
        </svg>
      );
    case 'outfit':
      return (
        <svg {...common}>
          <path d="M12 4c1.6 0 3 1.4 4 2.6L20 9l-2 2-1.6-1.3V20H7.6V9.7L6 11 4 9l4-2.4C9 5.4 10.4 4 12 4z" />
        </svg>
      );
    case 'play':
      return (
        <svg {...common}>
          <circle cx="12" cy="13.5" r="3.5" />
          <path d="M12 6V3M5.3 8.3 3.2 6.2M18.7 8.3l2.1-2.1M3 17h4M17 17h4M8 20h8" />
        </svg>
      );
    case 'items':
      return (
        <svg {...common}>
          <path d="M5 9h14v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
          <path d="M9 9V7a3 3 0 0 1 6 0v2M8 13h8" />
        </svg>
      );
  }
}

export default function WeatherPanel({ weather: initial }: { weather: WeatherModel }) {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [weather, setWeather] = useState<WeatherModel>(initial);

  // 静默刷新：挂载后及每整点取一次最新值，失败时沿用已有数据
  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`${weatherApiUrl}&ts=${Date.now()}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) return;
        const next = normalizeWeather(await res.json());
        if (next && !cancelled) setWeather(next);
      } catch {
        /* 保持已有数据 */
      }
    };

    refresh();
    const id = setInterval(refresh, 60 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const fmtWeekday = new Intl.DateTimeFormat(intlLocaleOf(locale), {
    weekday: 'short',
    timeZone: 'UTC',
  });
  const dayLabel = (date: string, index: number) =>
    index === 0 ? t('today') : fmtWeekday.format(new Date(`${date}T12:00:00Z`));

  const cur = weather.current;
  const daily = weather.daily;
  const today = daily[0] ?? null;
  const humidity = cur?.humidity ?? null;

  // 游客智能建议（规则引擎，动态返回、有才显示）
  const advice = useMemo(
    () => (today ? dailyAdvice(today, humidity) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [today, humidity]
  );

  const risk = advice.filter((a) => a.group === 'risk');
  const outfit = advice.filter((a) => a.group === 'outfit');
  const play = advice.filter((a) => a.group === 'play');
  const items = advice.filter((a) => a.group === 'items');

  const todayPrecip = today?.precip ?? null;
  const todayUv = today?.uvMax ?? null;
  const todayTemp =
    today && typeof today.max === 'number' ? t('tempToday', { max: today.max, min: today.min }) : null;
  const humidHeavy =
    cur && typeof humidity === 'number' && typeof today?.max === 'number' && today.max >= 27 && humidity >= 78;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
          <div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('title')}
            </h2>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          {/* 当前天气 */}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mb-6">
            {cur ? (
              <>
                <div className="flex items-center gap-4">
                  <span style={{ color: 'var(--accent)' }}>
                    <WeatherIcon group={weatherGroup(cur.code)} size={56} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>
                        {cur.temp}
                      </span>
                      <span className="text-2xl" style={{ color: 'var(--text-secondary)' }}>
                        °C
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-medium" style={{ color: 'var(--accent)' }}>
                      {t(`conditions.${weatherGroup(cur.code)}`)}
                    </div>
                  </div>
                </div>

                <dl className="grid grid-cols-3 gap-x-8 gap-y-4 text-sm flex-1 min-w-[240px]">
                  <div>
                    <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</dt>
                    <dd className="mt-0.5 font-medium" style={{ color: 'var(--text-primary)' }}>
                      {cur.feels}°C
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('precipToday')}</dt>
                    <dd className="mt-0.5 font-medium" style={{ color: 'var(--text-primary)' }}>
                      {typeof todayPrecip === 'number' ? `${todayPrecip}%` : '—'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{t('wind')}</dt>
                    <dd className="mt-0.5 font-medium" style={{ color: 'var(--text-primary)' }}>
                      {cur.wind} {t('windUnit')}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('unavailable')}
              </div>
            )}
          </div>

          {/* 今日一句话概览 */}
          {todayTemp && (
            <div className="flex flex-wrap items-center gap-2 mb-8 text-sm">
              {cur && (
                <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {t(`conditions.${weatherGroup(cur.code)}`)}
                </span>
              )}
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {todayTemp}
              </span>
              {typeof todayPrecip === 'number' && (
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {t('rainProb', { v: todayPrecip })}
                </span>
              )}
              {typeof todayUv === 'number' && todayUv >= 5 && (
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--accent)' }}>
                  {t('uvNow', { level: t(`uvLevels.${uvLevelLabel(todayUv)}`) })}
                </span>
              )}
              {humidHeavy && (
                <span className="px-2.5 py-1 rounded-full text-xs" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  {t('humidHigh')}
                </span>
              )}
            </div>
          )}

          {/* 智能建议 */}
          {today && (risk.length > 0 || outfit.length > 0 || play.length > 0 || items.length > 0) && (
            <>
              <h3 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {t('adviceSectionTitle')}
              </h3>

              {risk.length > 0 && (
                <div
                  className="flex items-start gap-3 rounded-xl px-4 py-3.5 mb-4"
                  style={{
                    background: 'rgba(192, 71, 59, 0.08)',
                    border: '1px solid rgba(192, 71, 59, 0.35)',
                    color: '#b03a2e',
                  }}
                >
                  <span className="flex-shrink-0 mt-0.5">
                    <AdviceGlyph group="risk" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold mb-1">{t('riskTitle')}</p>
                    <ul className="space-y-1">
                      {risk.map((a) => (
                        <li key={a.key} className="text-sm leading-relaxed">
                          {t(`advice.${a.key}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {(outfit.length > 0 || play.length > 0) && (
                <div className="flex flex-wrap gap-4 mb-4">
                  {outfit.length > 0 && (
                    <div
                      className="flex-1 min-w-[240px] rounded-xl px-4 py-4"
                      style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                        <AdviceGlyph group="outfit" />
                        {t('outfitTitle')}
                      </p>
                      <ul className="space-y-1.5">
                        {outfit.map((a) => (
                          <li key={a.key} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {t(`advice.${a.key}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {play.length > 0 && (
                    <div
                      className="flex-1 min-w-[240px] rounded-xl px-4 py-4"
                      style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                        <AdviceGlyph group="play" />
                        {t('playTitle')}
                      </p>
                      <ul className="space-y-1.5">
                        {play.map((a) => (
                          <li key={a.key} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {t(`advice.${a.key}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {items.length > 0 && (
                <div
                  className="rounded-xl px-4 py-4"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  <p className="flex items-center gap-2 text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                    <AdviceGlyph group="items" />
                    {t('itemsTitle')}
                  </p>
                  <ul className="space-y-1.5">
                    {items.map((a) => (
                      <li key={a.key} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {t(`advice.${a.key}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {today && risk.length === 0 && outfit.length === 0 && play.length === 0 && items.length === 0 && (
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              {t('noAdvice')}
            </p>
          )}

          {/* 未来数日 */}
          {daily.length > 0 && (
            <>
              <h3 className="font-display text-lg font-semibold mb-4 mt-8" style={{ color: 'var(--text-primary)' }}>
                {t('forecastTitle')}
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {daily.map((day, i) => (
                  <div
                    key={day.date}
                    className="flex-shrink-0 w-[86px] sm:w-[104px] rounded-xl px-3 py-4 flex flex-col items-center gap-2"
                    style={{
                      background: i === 0 ? 'var(--card-bg)' : 'transparent',
                      border: i === 0 ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                    }}
                  >
                    <span className="text-xs" style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {dayLabel(day.date, i)}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      <WeatherIcon group={weatherGroup(day.code)} size={34} />
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {day.max}°<span className="font-normal" style={{ color: 'var(--text-muted)' }}> / {day.min}°</span>
                    </span>
                    {typeof day.precip === 'number' && (
                      <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--water-500, #3a7a8d)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2s6 7 6 12a6 6 0 1 1-12 0c0-5 6-12 6-12z" />
                        </svg>
                        {day.precip}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('foot')}
          </p>
        </div>
      </div>
    </section>
  );
}
