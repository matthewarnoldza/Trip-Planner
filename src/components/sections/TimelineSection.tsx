"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TripData, Stop } from "@/types/trip";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import { formatDuration } from "@/lib/utils";
import { stopImages } from "@/data/images";

interface TimelineSectionProps {
  trip: TripData;
}

function AccommodationBadge({ type }: { type: Stop["accommodationType"] }) {
  const styles = {
    bnb: "bg-karoo-100 text-karoo-700",
    campsite: "bg-sage-100 text-sage-700",
    travel: "bg-sand-200 text-sand-600",
    activity: "bg-amber-100 text-amber-700",
  };
  const labels = {
    bnb: "B&B / Lodge",
    campsite: "Campsite",
    travel: "Travel Day",
    activity: "Activity",
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}

export default function TimelineSection({ trip }: TimelineSectionProps) {
  return (
    <SectionWrapper
      id="timeline"
      className="py-20 sm:py-28 px-6 bg-sand-50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="text-karoo-500 font-semibold text-sm tracking-[0.15em] uppercase mb-4">
            Day by Day
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-800 mb-4">
            The Itinerary
          </h2>
          <p className="text-sand-500 text-lg max-w-xl mx-auto">
            Every stop, every drive, every adventure planned out
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-sand-200 sm:-translate-x-px" />

          {trip.stops.map((stop, index) => {
            const isLeft = index % 2 === 0;
            const variants = isLeft ? fadeInLeft : fadeInRight;
            const images = stopImages[stop.slug];
            const heroImage = images?.hero;

            return (
              <motion.div
                key={stop.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={variants}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  index % 2 === 0
                    ? "sm:flex-row"
                    : "sm:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 sm:left-1/2 w-4 h-4 -translate-x-1/2 mt-1.5 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-[3px] ${
                      stop.accommodationType === "travel"
                        ? "border-sand-400 bg-sand-100"
                        : stop.accommodationType === "activity"
                          ? "border-amber-500 bg-white"
                          : "border-karoo-500 bg-white"
                    }`}
                  />
                </div>

                {/* Drive info (connecting) */}
                {stop.driveFromPrevious.distanceKm > 0 && (
                  <div
                    className={`hidden sm:block absolute top-6 text-xs text-sand-400 ${
                      isLeft
                        ? "sm:left-[calc(50%+24px)]"
                        : "sm:right-[calc(50%+24px)]"
                    }`}
                  >
                    🚗 {stop.driveFromPrevious.distanceKm} km &middot;{" "}
                    {formatDuration(stop.driveFromPrevious.durationHours)}
                  </div>
                )}

                {/* Card */}
                <div
                  className={`ml-14 sm:ml-0 sm:w-[calc(50%-32px)] ${
                    isLeft ? "sm:pr-8" : "sm:pl-8"
                  }`}
                >
                  <div
                    className={`rounded-xl transition-all overflow-hidden ${
                      stop.accommodationType === "travel"
                        ? "bg-sand-100"
                        : stop.accommodationType === "activity"
                          ? "bg-amber-50 shadow-md hover:shadow-lg ring-1 ring-amber-100"
                          : "bg-white shadow-md hover:shadow-lg ring-1 ring-sand-100"
                    }`}
                  >
                    {/* Thumbnail image for non-travel stops */}
                    {heroImage && stop.accommodationType !== "travel" && (
                      <div className="relative w-full h-32 sm:h-36">
                        <Image
                          src={heroImage}
                          alt={stop.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) calc(100vw - 56px), calc(50vw - 64px)"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                          <span className="w-6 h-6 rounded-full bg-karoo-500 flex items-center justify-center text-white text-[10px] font-bold">
                            {index + 1}
                          </span>
                          <span className="text-white/90 text-xs font-medium">
                            {stop.name}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-karoo-500">
                          {stop.dates}
                        </span>
                        <AccommodationBadge type={stop.accommodationType} />
                      </div>

                      <h3 className="font-serif text-xl font-bold text-sand-800 mb-1">
                        {stop.name}
                      </h3>

                      {stop.accommodation !== "Home" && (
                        <p className="text-sm text-karoo-600 font-medium mb-2">
                          {stop.accommodation}
                        </p>
                      )}

                      <p className="text-sm text-sand-500 leading-relaxed line-clamp-3">
                        {stop.description}
                      </p>

                      {stop.nights > 0 && (
                        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-sand-100">
                          <span className="text-xs text-sand-400">
                            {stop.nights}{" "}
                            {stop.nights === 1 ? "night" : "nights"}
                          </span>
                          {stop.activities.length > 0 && (
                            <span className="text-xs text-sand-400">
                              &middot; {stop.activities.length} activities
                            </span>
                          )}
                          {stop.bookingSource && (
                            <span className="text-xs text-sand-400">
                              &middot; {stop.bookingSource}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Mobile drive info */}
                      {stop.driveFromPrevious.distanceKm > 0 && (
                        <div className="sm:hidden mt-2 text-xs text-sand-400">
                          🚗 {stop.driveFromPrevious.distanceKm} km drive
                          &middot;{" "}
                          {formatDuration(
                            stop.driveFromPrevious.durationHours
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
