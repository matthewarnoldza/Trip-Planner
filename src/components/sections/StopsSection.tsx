"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TripData, Stop, Activity } from "@/types/trip";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ImageGallery from "@/components/ui/ImageGallery";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { stopImages } from "@/data/images";

interface StopsSectionProps {
  trip: TripData;
}

const activityIcons: Record<string, string> = {
  stars: "✨",
  binoculars: "🔭",
  hiking: "🥾",
  water: "🌊",
  mountain: "⛰️",
  building: "🏛️",
  car: "🚙",
  search: "🔍",
  moon: "🌙",
  cave: "🕳️",
  feather: "🪶",
  eye: "👀",
  paw: "🐾",
  waterfall: "💧",
  wine: "🍷",
  shop: "🛍️",
  zap: "⚡",
  palette: "🎨",
  book: "📖",
  cart: "🛒",
};

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-lg mt-0.5 flex-shrink-0">
        {activityIcons[activity.icon] || "📍"}
      </span>
      <div>
        <h4 className="text-sm font-semibold text-sand-700">
          {activity.name}
        </h4>
        <p className="text-xs text-sand-400 leading-relaxed mt-0.5">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

function formatDurationShort(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m}m`;
}

function StopCard({ stop, index }: { stop: Stop; index: number }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const isEven = index % 2 === 0;
  const images = stopImages[stop.slug];
  const heroImage = images?.hero;
  const galleryImages = images?.gallery || [];

  return (
    <>
      <motion.div
        id={`stop-${stop.id}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="scroll-mt-24"
      >
        <div
          className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12`}
        >
          {/* Image */}
          <div className="lg:w-5/12 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => galleryImages.length > 0 && setGalleryOpen(true)}
            >
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={`${stop.name} - ${stop.accommodation}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-sand-300 to-sand-400" />
              )}

              {/* Overlay with stop info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Stop number + badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-karoo-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {index + 1}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    stop.accommodationType === "campsite"
                      ? "bg-sage-600/80 text-white"
                      : stop.accommodationType === "activity"
                        ? "bg-amber-600/80 text-white"
                        : "bg-karoo-600/80 text-white"
                  }`}
                >
                  {stop.accommodationType === "campsite"
                    ? "Campsite"
                    : stop.accommodationType === "activity"
                      ? "Activity"
                      : "Lodge / B&B"}
                </span>
              </div>

              {/* Gallery button */}
              {galleryImages.length > 1 && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium transition-all group-hover:bg-black/60">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    {galleryImages.length} photos
                  </span>
                </div>
              )}

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {stop.name}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  {stop.dates}
                  {stop.nights > 0 && (
                    <>
                      {" "}&middot; {stop.nights}{" "}
                      {stop.nights === 1 ? "night" : "nights"}
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="lg:w-7/12">
            {/* Accommodation header */}
            <div className="mb-5">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sand-800 mb-1">
                {stop.accommodation}
              </h3>
              <p className="text-sm text-karoo-500 font-medium">
                {stop.bookingSource}
                {stop.bookingUrl && (
                  <>
                    {" "}
                    &middot;{" "}
                    <a
                      href={stop.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-karoo-700 transition-colors"
                    >
                      View booking
                    </a>
                  </>
                )}
              </p>
            </div>

            {/* Description */}
            <p className="text-sand-600 leading-relaxed mb-5">
              {stop.description}
            </p>

            {/* Landscape */}
            {stop.landscapeDescription && (
              <p className="text-sand-400 text-sm leading-relaxed mb-5 pl-4 border-l-2 border-karoo-200 italic">
                {stop.landscapeDescription}
              </p>
            )}

            {/* Features */}
            {stop.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {stop.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-sand-100 text-sand-600 text-xs font-medium rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* Activities */}
            {stop.activities.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-sand-700 uppercase tracking-wide mb-3">
                  Things to Do
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {stop.activities.map((activity) => (
                    <ActivityItem key={activity.name} activity={activity} />
                  ))}
                </div>
              </div>
            )}

            {/* Drive info */}
            {stop.driveFromPrevious.distanceKm > 0 && (
              <div className="mt-6 pt-4 border-t border-sand-100">
                <p className="text-xs text-sand-400">
                  🚗 Getting here: {stop.driveFromPrevious.distanceKm} km drive
                  &middot; ~
                  {formatDurationShort(stop.driveFromPrevious.durationHours)}
                  {stop.driveFromPrevious.description &&
                    ` — ${stop.driveFromPrevious.description}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Gallery Lightbox */}
      <ImageGallery
        images={galleryImages}
        stopName={stop.name}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />
    </>
  );
}

export default function StopsSection({ trip }: StopsSectionProps) {
  const accommodationStops = trip.stops.filter(
    (s) => s.accommodationType !== "travel"
  );

  return (
    <SectionWrapper id="stops" className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p className="text-karoo-500 font-semibold text-sm tracking-[0.15em] uppercase mb-4">
            Where We&apos;re Staying
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-800 mb-4">
            Our Stops Along the Way
          </h2>
          <p className="text-sand-500 text-lg max-w-xl mx-auto">
            From off-grid mountain lodges to historic village cottages — each
            stay is part of the adventure
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col gap-20 sm:gap-28"
        >
          {accommodationStops.map((stop, index) => (
            <StopCard key={stop.id} stop={stop} index={index} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
