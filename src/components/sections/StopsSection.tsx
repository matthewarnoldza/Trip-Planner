"use client";

import { motion } from "framer-motion";
import { TripData, Stop, Activity } from "@/types/trip";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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

function StopCard({ stop, index }: { stop: Stop; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={`stop-${stop.id}`}
      variants={fadeInUp}
      className="scroll-mt-24"
    >
      <div
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12`}
      >
        {/* Image / Visual placeholder */}
        <div className="lg:w-5/12 flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Gradient placeholder representing landscape */}
            <div
              className="absolute inset-0"
              style={{
                background: getStopGradient(stop.slug),
              }}
            />
            {/* Overlay with stop info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-full bg-karoo-500 flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    stop.accommodationType === "campsite"
                      ? "bg-sage-500/80 text-white"
                      : "bg-karoo-500/80 text-white"
                  }`}
                >
                  {stop.accommodationType === "campsite"
                    ? "Campsite"
                    : "Lodge / B&B"}
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {stop.name}
              </h3>
              <p className="text-white/70 text-sm mt-1">
                {stop.dates} &middot; {stop.nights}{" "}
                {stop.nights === 1 ? "night" : "nights"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="lg:w-7/12">
          {/* Accommodation header */}
          <div className="mb-6">
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
          <p className="text-sand-500 leading-relaxed mb-6">
            {stop.description}
          </p>

          {/* Landscape */}
          {stop.landscapeDescription && (
            <p className="text-sand-400 text-sm leading-relaxed mb-6 italic">
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

          {/* Drive info to next stop */}
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
  );
}

function formatDurationShort(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m}m`;
}

function getStopGradient(slug: string): string {
  const gradients: Record<string, string> = {
    luckhoff:
      "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #6b2f5b 60%, #c2553d 80%, #e8854a 100%)",
    camdeboo:
      "linear-gradient(135deg, #8b6914 0%, #c4923b 30%, #d4a574 50%, #a67b5b 70%, #6b4e37 100%)",
    "karoo-national-park":
      "linear-gradient(135deg, #5a4a3a 0%, #8b7355 30%, #b89b72 50%, #d4a574 70%, #8b6914 100%)",
    oudtshoorn:
      "linear-gradient(135deg, #6B7F58 0%, #879B73 30%, #A5B296 50%, #C8D0BE 70%, #d4a574 100%)",
    "de-rust":
      "linear-gradient(135deg, #7C2D12 0%, #9A3412 30%, #C2410C 50%, #EA580C 70%, #FB923C 100%)",
    baviaanskloof:
      "linear-gradient(135deg, #2F3528 0%, #424E36 30%, #546544 50%, #6B7F58 70%, #879B73 100%)",
    "nieu-bethesda":
      "linear-gradient(135deg, #44403C 0%, #78716C 30%, #A8A29E 50%, #D6D3D1 70%, #F5F5F4 100%)",
    philippolis:
      "linear-gradient(135deg, #9A3412 0%, #C2410C 20%, #F97316 40%, #FDBA74 60%, #FFF7ED 100%)",
  };
  return (
    gradients[slug] ||
    "linear-gradient(135deg, #5a4a3a 0%, #8b7355 50%, #d4a574 100%)"
  );
}

export default function StopsSection({ trip }: StopsSectionProps) {
  // Filter out travel-only stops
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
