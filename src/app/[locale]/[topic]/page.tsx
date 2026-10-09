import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { TOPICS, TOPIC_KEYS, findTopic, type TopicKey } from '@/content/topics';
import { buildAlternatesForPaths, LOCALES, type Locale } from '@/lib/seo';
import { SITE, SITE_HERO_IMAGE_URL } from '@/lib/site';
import TopicPage from '@/components/TopicPage';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { locale: string; topic: string }[] = [];
  for (const locale of routing.locales) {
    for (const key of TOPIC_KEYS) {
      params.push({ locale, topic: TOPICS[key].slug[locale as Locale] });
    }
  }
  return params;
}

function pathByLocale(key: TopicKey): Record<Locale, string> {
  const out = {} as Record<Locale, string>;
  for (const l of LOCALES) out[l] = `/${TOPICS[key].slug[l]}`;
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale, topic } = await params;
  const key = findTopic(locale as Locale, topic);
  if (!key) return {};

  const content = TOPICS[key].content[locale as Locale];

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternatesForPaths(locale as Locale, pathByLocale(key)),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${SITE.baseUrl}/${locale}/${
        TOPICS[key].slug[locale as Locale]
      }`,
      siteName: SITE.shortName,
      type: 'article',
      images: [
        {
          url: SITE_HERO_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${SITE.shortName} — ${SITE.city}, ${SITE.country}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function TopicRoute({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale, topic } = await params;
  const key = findTopic(locale as Locale, topic);
  if (!key) notFound();

  setRequestLocale(locale);

  return <TopicPage locale={locale as Locale} topicKey={key} />;
}
