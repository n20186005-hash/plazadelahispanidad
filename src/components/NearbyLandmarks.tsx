import { useTranslations, useMessages } from 'next-intl';

/**
 * Landmarks & Attractions Around Plaza de la Hispanidad
 * 语义集群：地标 1/2（Alcázar de Colón / Las Atarazanas Reales）+ 周边兴趣点卡片。
 */
export default function NearbyLandmarks() {
  const t = useTranslations('nearby');
  const messages = useMessages() as any;
  const sections = (messages?.knowledge?.sections || []) as Array<{ title: string; content: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {section.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
