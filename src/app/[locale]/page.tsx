import { setRequestLocale, getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HistoryTimeline from '@/components/HistoryTimeline';
import StorySection from '@/components/StorySection';
import NearbyLandmarks from '@/components/NearbyLandmarks';
import RouteSection from '@/components/RouteSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import WeatherSection from '@/components/WeatherSection';
import SeaTideSection from '@/components/SeaTideSection';
import SeasonGuideSection from '@/components/SeasonGuideSection';
import Gallery from '@/components/Gallery';
import TopicLinks from '@/components/TopicLinks';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as any;
  const faqItems = (messages?.faq?.items || []) as Array<{ name: string; text: string }>;
  const faqLD = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.name,
      acceptedAnswer: { '@type': 'Answer', text: item.text },
    })),
  };

  return (
    <>
      {/* 首页 FAQ 结构化数据（与页面正文 FAQ 一致；专题页各自输出自己的 FAQPage） */}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
        />
      )}
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HistoryTimeline />
        <StorySection />
        <NearbyLandmarks />
        <RouteSection />
        <FacilitiesSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <WeatherSection />
        <SeaTideSection />
        <SeasonGuideSection />
        <Gallery />
        <TopicLinks />
        <Reviews />
        <FAQSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
