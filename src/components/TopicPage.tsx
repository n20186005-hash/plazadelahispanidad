import { useTranslations, useMessages } from 'next-intl';
import { TOPICS, TOPIC_KEYS, type TopicKey } from '@/content/topics';
import type { Locale } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { galleryPhotos } from '@/lib/gallery';

type Props = {
  locale: Locale;
  topicKey: TopicKey;
};

/**
 * 长尾专题页渲染组件（historia / como-llegar / que-ver-cerca / fotos）。
 * 输出：面包屑 + H1 + 正文分节 +（fotos 页）图库 + FAQ + 专题互链 + JSON-LD。
 */
export default function TopicPage({ locale, topicKey }: Props) {
  const t = useTranslations('topics');
  const tHeader = useTranslations('header');
  const tGallery = useTranslations('gallery');
  const messages = useMessages() as any;

  const entry = TOPICS[topicKey];
  const content = entry.content[locale];
  const homeHref = `/${locale}`;
  const captions = (messages?.gallery?.captions || []) as string[];
  const navLabels = t.raw('nav') as Record<string, string>;
  const navLabel = (key: string) => navLabels?.[key] ?? key;

  const breadcrumbLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: tHeader('home'),
        item: `${SITE.baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: navLabel(topicKey),
        item: `${SITE.baseUrl}/${locale}/${entry.slug[locale]}`,
      },
    ],
  };

  const faqLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const articleLD = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.h1,
    description: content.metaDescription,
    inLanguage: locale,
    dateModified: '2026-10-09',
    author: { '@type': 'Organization', name: SITE.shortName, url: SITE.baseUrl },
    publisher: { '@type': 'Organization', name: SITE.shortName, url: SITE.baseUrl },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.baseUrl}/${locale}/${entry.slug[locale]}`,
    },
    about: { '@id': `${SITE.baseUrl}/#attraction` },
  };

  const isPhotos = topicKey === 'fotos';
  const photos = isPhotos ? galleryPhotos(captions, SITE.shortName) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }}
      />

      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <nav aria-label="breadcrumb" className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
            <a href={homeHref} className="hover:underline">
              {tHeader('home')}
            </a>
            <span className="mx-2">/</span>
            <span>{navLabel(topicKey)}</span>
          </nav>

          <h1
            className="font-display text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            {content.h1}
          </h1>
          <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

          <p
            className="text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: 'var(--text-secondary)' }}
          >
            {content.lead}
          </p>

          <div className="space-y-10">
            {content.sections.map((section, i) => (
              <section key={i}>
                <h2
                  className="font-display text-xl sm:text-2xl font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {section.heading}
                </h2>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {isPhotos && (
            <section className="mt-14">
              <h2
                className="font-display text-xl sm:text-2xl font-semibold mb-6"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('galleryTitle')}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {photos.map((photo, i) => (
                  <figure key={i}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover rounded-lg"
                      style={{ minHeight: '160px' }}
                      loading="lazy"
                    />
                    <figcaption
                      className="text-xs mt-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="mt-14">
            <h2
              className="font-display text-xl sm:text-2xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('faqTitle')}
            </h2>
            <div className="space-y-4">
              {content.faq.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <h3
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <h2
              className="font-display text-xl sm:text-2xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('relatedTitle')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TOPIC_KEYS.filter((k) => k !== topicKey).map((k) => (
                <a
                  key={k}
                  href={`/${locale}/${TOPICS[k].slug[locale]}`}
                  className="rounded-xl p-5 block transition-shadow hover:shadow-md"
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span
                    className="font-semibold block mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {navLabel(k)}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {TOPICS[k].content[locale].h1}
                  </span>
                </a>
              ))}
              <a
                href={homeHref}
                className="rounded-xl p-5 block transition-shadow hover:shadow-md"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <span
                  className="font-semibold block mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {tHeader('home')}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {SITE.shortName} · {SITE.city}
                </span>
              </a>
            </div>
          </section>

          <p className="text-xs mt-12" style={{ color: 'var(--text-muted)' }}>
            {t('updatedNote')}
          </p>

          <div className="mt-8">
            <a
              href={homeHref}
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: 'var(--accent)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              {tHeader('backToHome')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
