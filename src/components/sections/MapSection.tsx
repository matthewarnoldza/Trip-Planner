"use client";

import { motion } from "framer-motion";
import { TripData } from "@/types/trip";
import MapWrapper from "@/components/map/MapWrapper";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp } from "@/lib/animations";

interface MapSectionProps {
  trip: TripData;
}

export default function MapSection({ trip }: MapSectionProps) {
  const handleStopClick = (stopId: number) => {
    const el = document.getElementById(`stop-${stopId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <SectionWrapper id="map" className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <p className="text-karoo-500 font-semibold text-sm tracking-[0.15em] uppercase mb-4">
            The Route
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-800 mb-4">
            Our Path Through the Karoo
          </h2>
          <p className="text-sand-500 text-lg max-w-xl mx-auto">
            {trip.totalDistanceKm.toLocaleString()} kilometres through mountain
            passes, fossil valleys, and timeless villages
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-xl ring-1 ring-sand-200"
        >
          <MapWrapper trip={trip} onStopClick={handleStopClick} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
