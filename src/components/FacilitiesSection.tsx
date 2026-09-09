import { useTranslations, useMessages } from 'next-intl';

/**
 * 游客实用设施（WC / 停车 / 餐饮 / 住宿 / 商超 / 加油充电）
 * 中立科普：仅介绍设施类型与通用建议，不指向任何具体商户。
 */
const ICONS = [
  // WC 洗手间
  <svg key="wc" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8.5 8.5v7M15.5 8.5v7M8.5 8.5c0-1.2 1-2.2 2.2-2.2h.3" />
  </svg>,
  // 停车
  <svg key="parking" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M10 17V7h3.6a2.9 2.9 0 0 1 0 5.8H10" />
  </svg>,
  // 餐饮
  <svg key="dining" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3v6a2 2 0 0 0 2 2h.5V21M11 3v6a2 2 0 0 1-2 2" />
    <path d="M17 3c-1.5 0-3 2-3 5v4h3v9" />
  </svg>,
  // 住宿
  <svg key="lodging" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 19v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 19h18M3 15h18" />
    <path d="M7 9V7m0 2h.01" />
  </svg>,
  // 商超
  <svg key="shop" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.5 8h11l1.4 12H5.1z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>,
  // 加油 / 充电
  <svg key="fuel" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 21V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M6 21h10M4 21h14" />
    <path d="M16 10h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0" />
    <path d="M9 9h4" />
  </svg>,
];

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{ name: string; text: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm max-w-3xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full"
                style={{ background: 'var(--card-bg)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
              >
                {ICONS[i % ICONS.length]}
              </span>
              <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-xs leading-relaxed max-w-4xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('note')}
        </p>
      </div>
    </section>
  );
}
