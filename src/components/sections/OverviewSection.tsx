"use client";

import { motion } from "framer-motion";
import { TripData } from "@/types/trip";
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { fadeInUp } from "@/lib/animations";

interface OverviewSectionProps {
  trip: TripData;
}

const stats = [
  { key: "distance", label: "Kilometres", suffix: " km", icon: "🛣️" },
  { key: "days", label: "Days", suffix: "", icon: "📅" },
  { key: "stops", label: "Stops", suffix: "", icon: "📍" },
  { key: "parks", label: "National Parks", suffix: "", icon: "🏞️" },
];

export default function OverviewSection({ trip }: OverviewSectionProps) {
  const statValues: Record<string, number> = {
    distance: trip.totalDistanceKm,
    days: trip.totalDays,
    stops: trip.totalStops,
    parks: 2,
  };

  return (
    <SectionWrapper
      id="overview"
      className="py-24 sm:py-32 px-6 bg-sand-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          variants={fadeInUp}
          className="text-karoo-500 font-semibold text-sm tracking-[0.15em] uppercase mb-4"
        >
          The Journey
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-800 mb-6"
        >
          Into the Heart of the Karoo
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-sand-500 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-16"
        >
          {trip.tagline}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {stats.map((stat) => (
            <div key={stat.key} className="flex flex-col items-center">
              <span className="text-3xl mb-2">{stat.icon}</span>
              <span className="font-serif text-4xl sm:text-5xl font-bold text-sand-800">
                <AnimatedCounter
                  target={statValues[stat.key]}
                  suffix={stat.suffix}
                />
              </span>
              <span className="text-sand-400 text-sm font-medium mt-1 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative divider */}
      <motion.div
        variants={fadeInUp}
        className="flex justify-center mt-20"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-sand-300" />
          <div className="w-2 h-2 rounded-full bg-karoo-400" />
          <div className="w-12 h-px bg-sand-300" />
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
