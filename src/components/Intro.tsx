import { useTranslations, useMessages } from 'next-intl';
import { SITE } from '@/lib/site';

export default function Intro() {
  const t = useTranslations('intro');
  const tB = useTranslations('basicInfo');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        {/* 地理面包屑：景点 → 城市 → 省 → 国家 */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {[SITE.fullName, SITE.city, SITE.region, tB('countryValue')].map((crumb, i, arr) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span style={{ color: 'var(--text-muted)' }}>›</span>}
                <span
                  style={{
                    color: i === arr.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: i === arr.length - 1 ? 600 : 400,
                  }}
                >
                  {crumb}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* 首段等位声明：域名含义 = 官方全称 */}
        <p
          className="text-lg leading-relaxed mb-6 font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('welcome')}
        </p>

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
