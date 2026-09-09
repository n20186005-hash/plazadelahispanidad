import { setRequestLocale } from 'next-intl/server';
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

  return (
    <>
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
        <Reviews />
        <FAQSection />
        <MapEmbed />
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
