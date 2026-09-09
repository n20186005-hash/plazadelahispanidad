import { useTranslations, useMessages } from 'next-intl';

/**
 * Sources & References（资料来源板块）：通过权威 .gob.do 官方来源增强 E-E-A-T，
 * 同时说明图片产权归属原摄影者。
 */
export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const officialLinksObj = (messages?.footer?.officialLinks || {}) as Record<
    string,
    { name: string; url: string }
  >;
  const officialLinks = Object.values(officialLinksObj);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div
          className="rounded-xl p-6 sm:p-8"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <h3 className="font-display text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {t('officialTitle')}
          </h3>
          <ul className="space-y-3">
            {officialLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-6 rounded-xl p-5 flex items-start gap-4"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            className="flex-shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}
