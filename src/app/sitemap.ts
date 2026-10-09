import { MetadataRoute } from 'next';
import { TOPICS, TOPIC_KEYS } from '@/content/topics';
import { LOCALES, HREFLANG, localeUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const push = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly') => {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[HREFLANG[l]] = localeUrl(l, path);
    languages['x-default'] = localeUrl('es', path);

    for (const l of LOCALES) {
      entries.push({
        url: localeUrl(l, path),
        lastModified: new Date('2026-10-09'),
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }
  };

  // 首页
  push('', 1, 'weekly');

  // 四个长尾专题页（各语种 slug 不同）
  for (const key of TOPIC_KEYS) {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[HREFLANG[l]] = localeUrl(l, `/${TOPICS[key].slug[l]}`);
    languages['x-default'] = localeUrl('es', `/${TOPICS[key].slug.es}`);

    for (const l of LOCALES) {
      entries.push({
        url: localeUrl(l, `/${TOPICS[key].slug[l]}`),
        lastModified: new Date('2026-10-09'),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  // 法律页已设 noindex，不纳入 sitemap

  return entries;
}
