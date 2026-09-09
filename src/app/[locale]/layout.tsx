import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SITE, SITE_HERO_IMAGE_URL } from '@/lib/site';
import PWARegister from '@/components/PWARegister';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const langMap: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
};

const ogLocaleMap: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  es: 'es_ES',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default as any;
  const baseUrl = SITE.baseUrl;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const esUrl = `${baseUrl}/es`;

  let selfUrl = zhUrl;
  if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'es') selfUrl = esUrl;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: zhUrl,
        en: enUrl,
        es: esUrl,
        'x-default': zhUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.meta.ogTitle || messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: SITE.fullName,
      locale: ogLocaleMap[locale] || 'zh_CN',
      type: 'website',
      images: [
        {
          url: SITE_HERO_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: `${SITE.fullName} in ${SITE.city}, ${SITE.country}`,
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
    '@type': 'TouristAttraction',
    '@id': `${SITE.baseUrl}/#attraction`,
    name: SITE.fullName,
    alternateName: [
      SITE.shortName,
      SITE.spanishFullName,
      `${SITE.city} ${SITE.fullName}`,
    ],
    description: messages?.meta?.description || `Comprehensive visitor guide to ${SITE.fullName} in ${SITE.city}, ${SITE.region}, ${SITE.country}.`,
    url: SITE.baseUrl,
    image: [SITE_HERO_IMAGE_URL],
    isAccessibleForFree: true,
    publicAccess: true,
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

  // ---- 结构化数据：FAQPage（与页面正文 FAQ 一致）----
  const faqItems = (messages?.faq?.items || []) as Array<{ name: string; text: string }>;
  const faqLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.text,
      },
    })),
  };

  const themeColor = '#ffffff';
  const darkThemeColor = '#0c1a14';

  return (
    <html lang={langMap[locale] || 'zh-CN'} suppressHydrationWarning>
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

        {/* Structured data: FAQPage */}
        {faqItems.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
          />
        )}

        {/* PWA / Mobile */}
        <meta name="theme-color" content={themeColor} media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content={darkThemeColor} media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={SITE.fullName} />
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
