import { useTranslations, useMessages } from 'next-intl';

/**
 * 历史故事与传说（深度科普内容）
 * 以叙事方式呈现广场背后的年代故事，增强专业科普落地页的可读性与知识密度。
 */
export default function StorySection() {
  const t = useTranslations('story');
  const messages = useMessages() as any;
  const sections = (messages?.story?.sections || []) as Array<{
    heading: string;
    body: string;
  }>;
  const facts = (messages?.story?.facts || []) as string[];

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

        <p className="text-lg leading-relaxed mb-12" style={{ color: 'var(--text-secondary)' }}>
          {t('lead')}
        </p>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <article key={i} className="relative pl-6 sm:pl-8">
              <span
                className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-full"
                style={{ background: 'var(--accent)', opacity: 0.5 }}
              />
              <h3 className="font-display text-xl sm:text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                {s.heading}
              </h3>
              <p className="text-base leading-8" style={{ color: 'var(--text-secondary)' }}>
                {s.body}
              </p>
            </article>
          ))}
        </div>

        {facts.length > 0 && (
          <div
            className="mt-12 rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
          >
            <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
              {t('factsTitle')}
            </h3>
            <ul className="space-y-3">
              {facts.map((fact, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 mt-1"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {fact}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
