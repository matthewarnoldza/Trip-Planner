"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TripData } from "@/types/trip";
import { ActivityPlan, DayPlan, PlannedActivity } from "@/types/planner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import DayCard from "./DayCard";
import { fadeInUp } from "@/lib/animations";

interface ActivitiesClientProps {
  trip: TripData;
}

export default function ActivitiesClient({ trip }: ActivitiesClientProps) {
  // Version fingerprint — auto-resets localStorage when itinerary changes
  const tripVersion = useMemo(
    () => trip.stops.map((s) => `${s.slug}:${s.activities.length}`).join(","),
    [trip]
  );

  const defaultPlan = useMemo((): ActivityPlan => {
    const days: DayPlan[] = trip.stops
      .filter((stop) => stop.accommodationType !== "travel")
      .map((stop) => ({
        stopSlug: stop.slug,
        stopName: stop.name,
        date: stop.dates,
        activities: stop.activities.map(
          (a): PlannedActivity => ({
            id: crypto.randomUUID(),
            name: a.name,
            description: a.description,
            icon: a.icon,
            source: "suggested",
            selected: false,
          })
        ),
        notes: "",
      }));
    return { days, lastModified: new Date().toISOString() };
  }, [trip]);

  const [plan, setPlan, resetPlan] = useLocalStorage<ActivityPlan>(
    "karoo-activity-plan",
    defaultPlan,
    tripVersion
  );

  const updateDay = (index: number, day: DayPlan) => {
    setPlan((prev) => ({
      ...prev,
      days: prev.days.map((d, i) => (i === index ? day : d)),
      lastModified: new Date().toISOString(),
    }));
  };

  // Stats
  const totalActivities = plan.days.reduce(
    (sum, d) => sum + d.activities.length,
    0
  );
  const selectedActivities = plan.days.reduce(
    (sum, d) => sum + d.activities.filter((a) => a.selected).length,
    0
  );

  // Get nights and accommodation type per day by matching back to trip data
  const stopMap = useMemo(() => {
    const map = new Map<string, { nights: number; accommodationType: string }>();
    for (const stop of trip.stops) {
      map.set(stop.slug, {
        nights: stop.nights,
        accommodationType: stop.accommodationType,
      });
    }
    return map;
  }, [trip]);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-8 pt-4"
      >
        <p className="text-karoo-500 font-semibold text-sm tracking-[0.15em] uppercase mb-3">
          Trip Planning
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-800 mb-2">
          Daily Activities
        </h1>
        <p className="text-sand-500 text-sm max-w-md mx-auto">
          Select activities for each stop and add your own plans
        </p>
      </motion.div>

      {/* Stats + actions */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-4 text-xs text-sand-400">
          <span>
            <strong className="text-sand-600">{selectedActivities}</strong> of{" "}
            {totalActivities} activities selected
          </span>
          <span className="w-1 h-1 rounded-full bg-sand-300" />
          <span>{plan.days.length} stops</span>
        </div>
        <button
          onClick={resetPlan}
          className="px-3 py-2 text-xs font-medium text-sand-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Day cards */}
      <div className="space-y-4">
        {plan.days.map((day, index) => {
          const info = stopMap.get(day.stopSlug);
          return (
            <DayCard
              key={day.stopSlug}
              day={day}
              nights={info?.nights ?? 0}
              accommodationType={info?.accommodationType ?? "bnb"}
              onUpdate={(updated) => updateDay(index, updated)}
            />
          );
        })}
      </div>
    </div>
  );
}
