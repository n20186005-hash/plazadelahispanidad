import { setRequestLocale } from 'next-intl/server';
import { buildAlternates, type Locale } from '@/lib/seo';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;

  return {
    title: `${messages.cookieSettings.title} · ${messages.meta.title}`,
    description: messages.meta.description,
    alternates: buildAlternates(locale as Locale, '/cookie-settings'),
    robots: { index: false, follow: true },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
