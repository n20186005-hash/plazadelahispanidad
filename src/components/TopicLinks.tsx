import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { TOPICS, TOPIC_KEYS } from '@/content/topics';
import type { Locale } from '@/lib/seo';

/** 首页内链：把权重导向四个长尾专题页 */
export default function TopicLinks() {
  const t = useTranslations('topicLinks');
  const tNav = useTranslations('topics');
  const locale = useLocale() as Locale;
  const navLabels = tNav.raw('nav') as Record<string, string>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {TOPIC_KEYS.map((key) => (
            <a
              key={key}
              href={`/${locale}/${TOPICS[key].slug[locale]}`}
              className="group rounded-xl p-6 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {navLabels?.[key] ?? key}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {TOPICS[key].content[locale].metaDescription}
              </p>
              <span
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium"
                style={{ color: 'var(--accent)' }}
              >
                {TOPICS[key].content[locale].h1}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
