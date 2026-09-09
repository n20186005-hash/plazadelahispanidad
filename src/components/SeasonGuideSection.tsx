import { useMessages } from 'next-intl';
import { monthClimate, MAX_MONTH_RAIN, type SuitLevel } from '@/lib/climate';

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyDict = Record<string, any>;

interface PeriodItem {
  id: string;
  name: string;
  months: string;
  weather: string;
  sea: string;
  wildlife: string;
  plan: string;
}

const SUIT_META: Record<SuitLevel, { dots: number; color: string }> = {
  best: { dots: 3, color: '#1a7d5f' },
  good: { dots: 2, color: '#15737c' },
  fair: { dots: 1, color: '#9a6a12' },
};

/** 季度总览（四季气候生态窗口）＋ 逐月常年气候速览 */
export default function SeasonGuideSection() {
  const messages = useMessages() as AnyDict;
  const season = messages?.season as AnyDict | undefined;
  if (!season) return null;

  const cols = season.cols as AnyDict;
  const periods = (season.periods as PeriodItem[]) || [];
  const monthNames = (season.monthNames as string[]) || [];
  const metrics = season.metrics as AnyDict;
  const suits = season.suitLevels as AnyDict;
  const tags = (season.tags as AnyDict) || {};

  const colGrid = 'lg:grid-cols-[9.5rem_1.15fr_1fr_1fr_1.35fr]';

  const fieldRows: { key: keyof PeriodItem; label: string }[] = [
    { key: 'weather', label: cols.weather },
    { key: 'sea', label: cols.sea },
    { key: 'wildlife', label: cols.wildlife },
    { key: 'plan', label: cols.plan },
  ];

  const dotsOf = (level: SuitLevel) => {
    const meta = SUIT_META[level];
    return (
      <span className="inline-flex items-center gap-1 text-xs" style={{ color: meta.color }}>
        <span className="tracking-[0.15em] text-sm leading-none" aria-hidden="true">
          {'●'.repeat(meta.dots)}
          <span style={{ color: 'var(--border-color)' }}>{'●'.repeat(3 - meta.dots)}</span>
        </span>
        <span className="font-medium">{suits[level]}</span>
      </span>
    );
  };

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
          <div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {season.title}
            </h2>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              {season.subtitle}
            </p>
          </div>
        </div>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* 季度总览表 */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {season.periodsTitle}
        </h3>
        <div
          className="rounded-2xl px-5 sm:px-7 py-4 sm:py-5"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          {/* 表头（大屏） */}
          <div
            className={`hidden lg:grid ${colGrid} gap-x-6 pb-3 mb-1 text-xs font-semibold uppercase tracking-wide`}
            style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}
          >
            <span>{cols.period}</span>
            {fieldRows.map((f) => (
              <span key={f.key}>{f.label}</span>
            ))}
          </div>

          {periods.map((p, i) => (
            <div
              key={p.id}
              className={`grid ${colGrid} gap-x-6 gap-y-3 py-5 text-sm`}
              style={{
                borderTop: i === 0 ? 'none' : '1px solid var(--border-color)',
              }}
            >
              {/* 时段 */}
              <div>
                <div className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {p.name}
                </div>
                <div className="mt-0.5 text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
                  {p.months}
                </div>
              </div>

              {/* 四列内容 */}
              {fieldRows.map((f) => (
                <div key={f.key}>
                  <div className="lg:hidden mb-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                    {f.label}
                  </div>
                  <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {p[f.key]}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 逐月速览 */}
        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2 mt-12" style={{ color: 'var(--text-primary)' }}>
          {season.monthlyTitle}
        </h3>
        <p className="text-xs mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {season.monthlyHint}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {monthClimate.map((d) => {
            const name = monthNames[d.m - 1];
            return (
              <div
                key={d.m}
                className="rounded-2xl p-4"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {name}
                  </span>
                  {dotsOf(d.suit)}
                </div>

                <dl className="mt-3 space-y-2 text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <dt style={{ color: 'var(--text-muted)' }}>{metrics.highLow}</dt>
                    <dd className="font-semibold tabular-nums whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                      {Math.round(d.hi)} / {Math.round(d.lo)} °C
                    </dd>
                  </div>
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <dt style={{ color: 'var(--text-muted)' }}>{metrics.rain}</dt>
                      <dd className="font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                        {Math.round(d.rainMm)} mm
                      </dd>
                    </div>
                    <div
                      className="mt-1.5 h-1.5 w-full rounded-full overflow-hidden"
                      style={{ background: 'var(--border-color)' }}
                      aria-hidden="true"
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(d.rainMm / MAX_MONTH_RAIN) * 100}%`,
                          background: 'var(--accent)',
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <dt style={{ color: 'var(--text-muted)' }}>{metrics.sea}</dt>
                    <dd className="font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                      {d.seaC} °C
                    </dd>
                  </div>
                </dl>

                {d.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {d.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2 py-0.5 text-[11px] leading-4"
                        style={{
                          background: 'rgba(21, 115, 124, 0.08)',
                          border: '1px solid rgba(21, 115, 124, 0.28)',
                          color: '#15737c',
                        }}
                      >
                        {tags[tag]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {season.foot}
        </p>
      </div>
    </section>
  );
}
