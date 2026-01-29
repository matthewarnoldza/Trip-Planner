import { TRIP_DATA } from "@/data/trip";
import HeroSection from "@/components/sections/HeroSection";
import OverviewSection from "@/components/sections/OverviewSection";
import MapSection from "@/components/sections/MapSection";
import TimelineSection from "@/components/sections/TimelineSection";
import StopsSection from "@/components/sections/StopsSection";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection trip={TRIP_DATA} />
        <OverviewSection trip={TRIP_DATA} />
        <MapSection trip={TRIP_DATA} />
        <TimelineSection trip={TRIP_DATA} />
        <StopsSection trip={TRIP_DATA} />
      </main>
      <FooterSection />
    </>
  );
}
