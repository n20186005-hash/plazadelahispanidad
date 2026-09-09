import { useTranslations, useMessages } from 'next-intl';

/**
 * FAQ 板块：正文可见 Q&A 与 <head> 中 FAQPage JSON-LD 使用同一数据源，
 * 帮助页面抢占 Featured Snippet / AI Overview 卡片。
 */
export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as Array<{ name: string; text: string }>;

  return (
    <section id="faq" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              {...(i === 0 ? { open: true } : {})}
            >
              <summary
                className="flex items-start justify-between gap-4 cursor-pointer list-none p-5 sm:p-6 font-medium select-none"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="pr-4">{item.name}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 mt-1 transition-transform group-open:rotate-180"
                  style={{ color: 'var(--accent)' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div
                className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.text}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
