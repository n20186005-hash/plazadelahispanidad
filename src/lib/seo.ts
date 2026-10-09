import { SITE } from './site';

/**
 * 全站 canonical / hreflang 唯一来源。
 * 站点主语言为西班牙语（defaultLocale = 'es'），因此 x-default 指向西语版本。
 */
export const LOCALES = ['es', 'en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

/** BCP 47 区域码，用于 hreflang */
export const HREFLANG: Record<Locale, string> = {
  es: 'es-DO',
  en: 'en',
  zh: 'zh-CN',
};

/** og:locale */
export const OG_LOCALE: Record<Locale, string> = {
  es: 'es_DO',
  en: 'en_US',
  zh: 'zh_CN',
};

/** 生成带语种前缀的绝对地址，path 需以 / 开头或为空 */
export function localeUrl(locale: Locale, path = ''): string {
  return `${SITE.baseUrl}/${locale}${path}`;
}

/** 输出自引用 canonical + 三语 hreflang + x-default */
export function buildAlternates(
  locale: Locale,
  path = ''
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[HREFLANG[l]] = localeUrl(l, path);
  }
  languages['x-default'] = localeUrl('es', path);
  return {
    canonical: localeUrl(locale, path),
    languages,
  };
}

/** 多语路径（各语种 slug 可不同）下生成 hreflang */
export function buildAlternatesForPaths(
  locale: Locale,
  pathByLocale: Record<Locale, string>
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[HREFLANG[l]] = localeUrl(l, pathByLocale[l]);
  }
  languages['x-default'] = localeUrl('es', pathByLocale.es);
  return {
    canonical: localeUrl(locale, pathByLocale[locale]),
    languages,
  };
}

export function absoluteUrl(path: string): string {
  return `${SITE.baseUrl}${path}`;
}
