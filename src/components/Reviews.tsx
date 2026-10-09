import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';

/**
 * 评价板块只展示 Google Maps 公开资料的聚合快照（4.7 / 13,850）。
 * 本站不生成逐条评价，也不把该评分写入 JSON-LD 的 aggregateRating。
 */
export default function Reviews() {
  const t = useTranslations('reviews');

  return (
    <section id="reviews" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-2xl p-6 sm:p-10 text-center"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill={i <= 4.7 ? '#f0b429' : 'var(--border-color)'}
                stroke="none"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>

          <p
            className="font-display text-4xl sm:text-5xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('ratingValue')}
            <span className="text-2xl sm:text-3xl" style={{ color: 'var(--text-muted)' }}>
              {' '}
              / 5
            </span>
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            {t('snapshot')}
          </p>

          <p
            className="text-xs leading-relaxed max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('declaration')} {t('sourceNote')}
          </p>

          <a
            href={SITE.mapsShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{ color: 'var(--accent)', border: '1px solid var(--accent)' }}
          >
            <span>{t('moreReviews')}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
