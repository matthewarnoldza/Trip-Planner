"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  days,
  preBookings,
  roadConditions,
  DayData,
  TimelineEntry,
  EntryType,
} from "@/data/itinerary";
import { fadeInUp } from "@/lib/animations";

// ── Tag colours ──────────────────────────────────────────
const tagStyles: Record<EntryType, { bg: string; text: string; dot: string }> =
  {
    meal: {
      bg: "bg-sage-50",
      text: "text-sage-700",
      dot: "bg-sage-500",
    },
    activity: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },
    drive: {
      bg: "bg-karoo-50",
      text: "text-karoo-700",
      dot: "bg-karoo-500",
    },
    note: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      dot: "bg-orange-400",
    },
    overnight: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      dot: "bg-purple-500",
    },
    warning: {
      bg: "bg-amber-50",
      text: "text-amber-800",
      dot: "bg-amber-500",
    },
  };

// ── Timeline Row ─────────────────────────────────────────
function TimelineRow({ entry }: { entry: TimelineEntry }) {
  const style = tagStyles[entry.type];
  return (
    <div className="flex gap-0 relative">
      {/* Time column */}
      <div className="w-14 sm:w-16 flex-shrink-0 pt-3 pr-3 text-right">
        {entry.time && (
          <span className="text-[11px] sm:text-xs font-mono text-sand-400 leading-none">
            {entry.time}
          </span>
        )}
      </div>

      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0 w-5">
        <div className="h-3 w-px bg-sand-200" />
        <div
          className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-white ${style.dot}`}
        />
        <div className="flex-1 w-px bg-sand-200" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-4 pt-1 pl-2.5 pr-1 min-w-0">
        <span
          className={`inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${style.bg} ${style.text} mb-1`}
        >
          {entry.tag}
        </span>
        <h4 className="text-[13px] sm:text-sm font-semibold text-sand-800 leading-snug">
          {entry.title}
        </h4>
        {entry.description && (
          <p className="text-xs text-sand-500 leading-relaxed mt-1 whitespace-pre-line">
            {entry.description}
          </p>
        )}
        {entry.detail && (
          <p className="text-[11px] text-sand-400 italic mt-1.5 leading-snug">
            {entry.detail}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Drive Banner ─────────────────────────────────────────
function DriveBanner({
  drive,
}: {
  drive: DayData["drive"];
}) {
  if (!drive) return null;
  return (
    <div className="bg-sand-800 text-white px-4 py-3 flex items-center gap-4 text-xs">
      <span className="text-karoo-400 text-base sm:text-lg font-bold whitespace-nowrap font-mono">
        {drive.depart}
      </span>
      <span className="flex-1 text-sand-300 leading-snug truncate">
        {drive.route}
      </span>
      <span className="text-karoo-400 font-semibold whitespace-nowrap hidden sm:block">
        {drive.distance}
      </span>
    </div>
  );
}

// ── Accommodation Footer ─────────────────────────────────
function AccomFooter({
  accommodation,
}: {
  accommodation?: DayData["accommodation"];
}) {
  if (!accommodation) return null;
  return (
    <div className="bg-sand-50 border-t border-sand-100 px-4 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wider text-sand-400 font-semibold">
          Accommodation
        </p>
        <p className="text-xs sm:text-sm font-semibold text-sand-700 truncate">
          {accommodation.name}
        </p>
        {accommodation.type && (
          <p className="text-[11px] text-sand-400 truncate">
            {accommodation.type}
          </p>
        )}
      </div>
      {accommodation.booking && (
        <span className="text-[11px] text-blue-500 flex-shrink-0">
          {accommodation.booking}
        </span>
      )}
    </div>
  );
}

// ── Day Card ─────────────────────────────────────────────
function DayCard({
  day,
  isOpen,
  onToggle,
}: {
  day: DayData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      id={`day-${day.dayNumber}`}
      className="bg-white rounded-xl ring-1 ring-sand-100 shadow-sm overflow-hidden scroll-mt-28"
    >
      {/* Collapsible header */}
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-sand-50/50 transition-colors active:bg-sand-100/60"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sand-800 flex flex-col items-center justify-center text-white leading-none">
          <span className="text-[10px] uppercase tracking-wider text-karoo-400 font-bold">
            Day
          </span>
          <span className="text-sm font-bold -mt-0.5">
            {day.dayNumber}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-base sm:text-lg font-bold text-sand-800 truncate leading-tight">
            {day.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-sand-400 truncate">
            {day.date} · {day.subtitle}
          </p>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-sand-400 flex-shrink-0"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <DriveBanner drive={day.drive} />
            <div className="pt-1 pb-2">
              {day.timeline.map((entry, i) => (
                <TimelineRow key={i} entry={entry} />
              ))}
            </div>
            <AccomFooter accommodation={day.accommodation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Pre-Bookings ─────────────────────────────────────────
function PreBookings({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-xl ring-1 ring-amber-200 shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-3 bg-amber-50/50 active:bg-amber-50"
      >
        <span className="text-lg">&#9888;&#65039;</span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-amber-800">
            Pre-Bookings Required
          </h3>
          <p className="text-[11px] text-amber-600">
            {preBookings.length} items — do these before departure
          </p>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-amber-400"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {preBookings.map((pb) => (
                <div
                  key={pb.id}
                  className="flex items-start gap-2.5 bg-amber-50/40 rounded-lg p-2.5"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {pb.id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-sand-800 leading-snug">
                      {pb.title}
                    </p>
                    <p className="text-[11px] text-sand-500 leading-snug mt-0.5">
                      {pb.description}
                    </p>
                    {pb.phone && (
                      <a
                        href={`tel:${pb.phone}`}
                        className="inline-block mt-1 text-[11px] text-blue-600 font-semibold underline"
                      >
                        Call {pb.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Road Conditions ──────────────────────────────────────
function RoadConditions({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-sand-800 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-4 py-3 flex items-center gap-3 active:bg-sand-700"
      >
        <span className="text-lg">&#9888;&#65039;</span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">
            Road Conditions to Monitor
          </h3>
          <p className="text-[11px] text-sand-400">
            Check before departure
          </p>
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-sand-500"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {roadConditions.map((rc, i) => (
                <div
                  key={i}
                  className="flex gap-2 text-xs text-sand-300 leading-relaxed"
                >
                  <span className="text-karoo-400 flex-shrink-0 mt-0.5">
                    &#9888;
                  </span>
                  <span>{rc.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Route Summary Table ──────────────────────────────────
const routeSummary = [
  { day: 1, date: "Mon 6", stop: "Luckhoff", accom: "Eco Karoo Mountain Lodge", drive: "520km / 5.5h", depart: "8:00am" },
  { day: 2, date: "Tue 7", stop: "Luckhoff", accom: "Eco Karoo Mountain Lodge", drive: "—", depart: "7:00am" },
  { day: 3, date: "Wed 8", stop: "Camdeboo NP", accom: "Nqweba Campsite", drive: "350km / 4h", depart: "8:30am" },
  { day: 4, date: "Thu 9", stop: "Prince Albert", accom: "Wolvekraal Guest Farm", drive: "200km / 3.5h", depart: "—" },
  { day: 5, date: "Fri 10", stop: "Prince Albert", accom: "Wolvekraal Guest Farm", drive: "—", depart: "10:00am" },
  { day: 6, date: "Sat 11", stop: "Oudtshoorn", accom: "Karoo Lavender", drive: "110km / 1.5h", depart: "—" },
  { day: 7, date: "Sun 12", stop: "Oudtshoorn", accom: "Karoo Lavender", drive: "—", depart: "9:00am" },
  { day: 8, date: "Mon 13", stop: "De Rust", accom: "Aards Guest Farm", drive: "45km / 1h", depart: "—" },
  { day: 9, date: "Tue 14", stop: "De Rust", accom: "Aards Guest Farm", drive: "—", depart: "8:30am" },
  { day: 10, date: "Wed 15", stop: "Baviaanskloof", accom: "Uitspan Campsite", drive: "180km / 3.5h", depart: "8:30am" },
  { day: 11, date: "Thu 16", stop: "Nieu-Bethesda", accom: "Oude Waenhuis", drive: "280km / 4h", depart: "9:00am" },
  { day: 12, date: "Fri 17", stop: "Philippolis", accom: "Die Groenhuis", drive: "200km / 2.5h", depart: "8:00am" },
  { day: 13, date: "Sat 18", stop: "Johannesburg", accom: "Home", drive: "500km / 5.5h", depart: "8:00am" },
];

function RouteSummaryTable() {
  return (
    <div className="bg-white rounded-xl ring-1 ring-sand-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-sand-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-sand-400">
          Route Overview
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-sand-200">
              <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-sand-400 font-semibold">
                Day
              </th>
              <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-sand-400 font-semibold">
                Date
              </th>
              <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-sand-400 font-semibold">
                Stop
              </th>
              <th className="text-right px-3 py-2 text-[10px] uppercase tracking-wider text-sand-400 font-semibold">
                Drive
              </th>
              <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-sand-400 font-semibold">
                Depart
              </th>
            </tr>
          </thead>
          <tbody>
            {routeSummary.map((r, i) => (
              <tr
                key={r.day}
                className={`border-b border-sand-50 ${i % 2 === 1 ? "bg-sand-50/50" : ""}`}
              >
                <td className="px-3 py-2 text-sand-400">{r.day}</td>
                <td className="px-3 py-2 font-mono text-sand-600">
                  {r.date}
                </td>
                <td className="px-3 py-2 font-semibold text-sand-700">
                  {r.stop}
                </td>
                <td className="px-3 py-2 text-right text-sand-400">
                  {r.drive}
                </td>
                <td className="px-3 py-2 text-karoo-500 font-semibold">
                  {r.depart}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────
export default function ItineraryClient() {
  // Determine today's day number (6 Apr = day 1, etc.)
  const getTodayDayNumber = useCallback((): number => {
    const now = new Date();
    const tripStart = new Date(2026, 3, 6); // April 6, 2026
    const diff = Math.floor(
      (now.getTime() - tripStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const dayNum = diff + 1;
    return dayNum >= 1 && dayNum <= 13 ? dayNum : 1;
  }, []);

  const [openDays, setOpenDays] = useState<Set<number>>(
    () => new Set([getTodayDayNumber()])
  );
  const [showPreBookings, setShowPreBookings] = useState(false);
  const [showRoadConditions, setShowRoadConditions] = useState(false);
  const [activeDayInView, setActiveDayInView] = useState(getTodayDayNumber());
  const navRef = useRef<HTMLDivElement>(null);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayNum)) {
        next.delete(dayNum);
      } else {
        next.add(dayNum);
      }
      return next;
    });
  };

  const scrollToDay = (dayNum: number) => {
    const el = document.getElementById(`day-${dayNum}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpenDays((prev) => new Set(prev).add(dayNum));
    }
  };

  // Track which day card is in view for the sticky nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const dayNum = parseInt(
              entry.target.id.replace("day-", ""),
              10
            );
            if (!isNaN(dayNum)) setActiveDayInView(dayNum);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    days.forEach((d) => {
      const el = document.getElementById(`day-${d.dayNumber}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll the sticky nav pill into view
  useEffect(() => {
    if (!navRef.current) return;
    const pill = navRef.current.querySelector(
      `[data-day="${activeDayInView}"]`
    );
    if (pill) {
      pill.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeDayInView]);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center mb-6 pt-4"
      >
        <p className="text-karoo-500 font-semibold text-sm tracking-[0.15em] uppercase mb-3">
          Day-by-Day Guide
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-800 mb-2">
          Detailed Itinerary
        </h1>
        <p className="text-sand-500 text-sm max-w-md mx-auto">
          13 days · 2,850 km · April 6–18, 2026
        </p>
      </motion.div>

      {/* ── Sticky day navigation ── */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-sand-50/90 backdrop-blur-md border-b border-sand-100">
        <div
          ref={navRef}
          className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5"
        >
          {days.map((d) => (
            <button
              key={d.dayNumber}
              data-day={d.dayNumber}
              onClick={() => scrollToDay(d.dayNumber)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeDayInView === d.dayNumber
                  ? "bg-sand-800 text-white shadow-sm"
                  : "bg-white text-sand-500 hover:text-sand-700 ring-1 ring-sand-200"
              }`}
            >
              <span className="hidden sm:inline">{d.date}</span>
              <span className="sm:hidden">D{d.dayNumber}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Pre-bookings & road conditions ── */}
      <div className="space-y-3 mt-4 mb-6">
        <PreBookings
          isOpen={showPreBookings}
          onToggle={() => setShowPreBookings(!showPreBookings)}
        />
        <RoadConditions
          isOpen={showRoadConditions}
          onToggle={() => setShowRoadConditions(!showRoadConditions)}
        />
      </div>

      {/* ── Section label ── */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-[10px] uppercase tracking-[0.15em] text-sand-400 font-bold">
          The Journey
        </h2>
        <div className="flex-1 h-px bg-sand-200" />
      </div>

      {/* ── Day cards ── */}
      <div className="space-y-3 mb-8">
        {days.map((day) => (
          <DayCard
            key={day.dayNumber}
            day={day}
            isOpen={openDays.has(day.dayNumber)}
            onToggle={() => toggleDay(day.dayNumber)}
          />
        ))}
      </div>

      {/* ── Route summary ── */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-[10px] uppercase tracking-[0.15em] text-sand-400 font-bold">
            Route Overview
          </h2>
          <div className="flex-1 h-px bg-sand-200" />
        </div>
        <RouteSummaryTable />
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-sand-300 uppercase tracking-widest mt-8 mb-4">
        Karoo Road Trip · April 2026
      </p>
    </div>
  );
}
