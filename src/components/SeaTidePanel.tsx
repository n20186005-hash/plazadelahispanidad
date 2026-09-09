'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { marineApiUrl, normalizeMarine, type MarineModel } from '@/lib/marine';

const intlLocaleOf = (locale: string) =>
  locale === 'zh' ? 'zh-CN' : locale === 'es' ? 'es' : 'en';

const SD_TZ = 'America/Santo_Domingo';

/** 圣多明各本地时间的“墙钟”部件（避免与用户浏览器时区混淆） */
function sdParts(offsetMs = 0) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: SD_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const map: Record<string, string> = {};
  for (const part of fmt.formatToParts(new Date(Date.now() + offsetMs))) {
    if (part.type !== 'literal') map[part.type] = part.value;
  }
  return map;
}

const sdDate = (offsetMs = 0) => {
  const p = sdParts(offsetMs);
  return `${p.year}-${p.month}-${p.day}`;
};

export default function SeaTidePanel({ marine: initial }: { marine: MarineModel }) {
  const t = useTranslations('sea');
  const locale = useLocale();
  const [marine, setMarine] = useState<MarineModel>(initial);

  // 静默刷新：挂载后及每整点取一次最新值，失败时沿用已有数据
  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(`${marineApiUrl}&ts=${Date.now()}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) return;
        const next = normalizeMarine(await res.json());
        if (!cancelled) setMarine(next);
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

  const now = sdParts();
  const nowHourKey = `${sdDate()}T${String(now.hour ?? '').padStart(2, '0')}:00`;
  const today = sdDate();
  const tomorrow = sdDate(24 * 3600 * 1000);

  const fmtWeekday = new Intl.DateTimeFormat(intlLocaleOf(locale), {
    weekday: 'short',
    timeZone: 'UTC',
  });
  const dayLabel = (isoDay: string) =>
    isoDay === today
      ? t('today')
      : isoDay === tomorrow
        ? t('tomorrow')
        : fmtWeekday.format(new Date(`${isoDay}T00:00:00Z`));

  // 只展示“当前时刻往后”的极值，最多 4 条
  const upcoming = useMemo(
    () => marine.events.filter((e) => e.time >= nowHourKey).slice(0, 4),
    [marine.events, nowHourKey]
  );

  const text = (n: number | null) => (typeof n === 'number' ? n : null);
  const stats = [
    { label: t('seaTemp'), value: text(marine.seaTemp) != null ? `${marine.seaTemp}°C` : null },
    { label: t('waves'), value: text(marine.waveHeight) != null ? `${marine.waveHeight} m` : null },
    { label: t('period'), value: text(marine.wavePeriod) != null ? `${marine.wavePeriod} s` : null },
    {
      label: t('direction'),
      value: text(marine.waveDirection) != null ? `${Math.round(marine.waveDirection!)}°` : null,
    },
    {
      label: t('current'),
      value: text(marine.currentSpeed) != null ? `${marine.currentSpeed} km/h` : null,
    },
  ].filter((s) => s.value !== null);

  const trendUp = marine.trend === 'rising';

  return (
    <section className="section-padding">
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
          {stats.length > 0 || marine.trend ? (
            <>
              {/* 关键海况指标 */}
              {stats.length > 0 && (
                <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</dt>
                      <dd className="mt-0.5 font-semibold text-lg tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* 当前潮汐状态 */}
              {marine.trend && (
                <div
                  className="mt-6 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium"
                  style={{
                    background: trendUp
                      ? 'rgba(38, 139, 148, 0.10)'
                      : 'rgba(58, 122, 141, 0.12)',
                    border: `1px solid ${trendUp ? 'rgba(38,139,148,0.45)' : 'rgba(58,122,141,0.45)'}`,
                    color: trendUp ? '#15737c' : 'var(--water-500, #3a7a8d)',
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {trendUp ? (
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    ) : (
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    )}
                  </svg>
                  {t('tideNowState', { state: trendUp ? t('rising') : t('falling') })}
                </div>
              )}

              {/* 接下来高潮/低潮 */}
              {upcoming.length > 0 && (
                <>
                  <h3 className="font-display text-lg font-semibold mb-4 mt-9" style={{ color: 'var(--text-primary)' }}>
                    {t('eventsTitle')}
                  </h3>
                  <ul>
                    {upcoming.map((e, i) => {
                      const isHigh = e.kind === 'high';
                      const accent = isHigh ? 'var(--accent)' : 'var(--water-500, #3a7a8d)';
                      return (
                        <li
                          key={e.time}
                          className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-sm"
                          style={{
                            borderTop: i === 0 ? '1px solid var(--border-color)' : '1px solid var(--border-color)',
                          }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: accent }}
                          />
                          <span className="font-semibold flex-shrink-0" style={{ color: accent }}>
                            {isHigh ? t('high') : t('low')}
                          </span>
                          <span className="w-16 flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                            {dayLabel(e.time.slice(0, 10))}
                          </span>
                          <span className="font-medium tabular-nums" style={{ color: 'var(--text-primary)' }}>
                            {e.time.slice(11, 16)}
                          </span>
                          <span className="ml-auto tabular-nums text-xs" style={{ color: 'var(--text-muted)' }}>
                            {e.level.toFixed(2)} m
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {t('unavailable')}
            </p>
          )}

          <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('foot')}
          </p>
        </div>
      </div>
    </section>
  );
}
