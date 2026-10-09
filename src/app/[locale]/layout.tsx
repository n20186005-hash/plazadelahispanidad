import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE, SITE_HERO_IMAGE_URL } from '@/lib/site';
import { buildAlternates, OG_LOCALE, type Locale } from '@/lib/seo';
import PWARegister from '@/components/PWARegister';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const langMap: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  es: 'es-DO',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;

  const alternates = buildAlternates(locale as Locale, '');

  return {
    metadataBase: new URL(SITE.baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates,
    openGraph: {
      title: messages.meta.ogTitle || messages.meta.title,
      description: messages.meta.description,
      url: alternates.canonical,
      siteName: SITE.shortName,
      locale: OG_LOCALE[locale as Locale] || 'es_DO',
      type: 'website',
      images: [
        {
          url: SITE_HERO_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${SITE.shortName} — ${SITE.city}, ${SITE.country}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.ogTitle || messages.meta.title,
      description: messages.meta.description,
      images: [SITE_HERO_IMAGE_URL],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
      },
    },
    icons: {
      icon: [
        { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' }],
    },
    manifest: '/manifest.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await getMessages()) as any;

  // ---- 结构化数据：TouristAttraction（含 @id / image / geo / address）----
  const touristAttractionLD = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Place'],
    '@id': `${SITE.baseUrl}/#attraction`,
    name: 'Plaza de España',
    alternateName: [
      'Plaza de la Hispanidad',
      SITE.spanishFullName,
      SITE.fullName,
      'Plaza de España Santo Domingo',
      'Plaza de la Hispanidad Santo Domingo',
    ],
    description:
      messages?.meta?.description ||
      `Visitor guide to Plaza de España (Plaza de la Hispanidad) in the Colonial Zone of ${SITE.city}, ${SITE.country}.`,
    url: SITE.baseUrl,
    image: [SITE_HERO_IMAGE_URL],
    isAccessibleForFree: true,
    publicAccess: true,
    touristType: ['History and heritage', 'Architecture', 'City walks', 'Food and nightlife'],
    availableLanguage: ['es', 'en', 'zh'],
    containedInPlace: {
      '@type': 'TouristDestination',
      name: `Zona Colonial de ${SITE.city}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.countryCode,
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.mapsShareUrl,
    sameAs: [
      SITE.mapsShareUrl,
      SITE.govTourismUrl,
      SITE.govCityUrl,
    ],
  };

  const themeColor = '#ffffff';
  const darkThemeColor = '#0c1a14';

  return (
    <html lang={langMap[locale] || 'es-DO'} suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 - G-HXM22WWPKP */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${SITE.gaId}');`,
          }}
        />

        {/* Structured data: TouristAttraction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttractionLD) }}
        />

        {/* PWA / Mobile */}
        <meta name="theme-color" content={themeColor} media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content={darkThemeColor} media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE.shortName} />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Theme init (avoid FOUC) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <PWARegister />
      </body>
    </html>
  );
}
