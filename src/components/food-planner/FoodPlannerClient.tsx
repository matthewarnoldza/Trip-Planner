"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TripData } from "@/types/trip";
import {
  FoodPlan,
  DayMeals,
  MealType,
  PackingItem,
  StorageCategory,
} from "@/types/planner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getDefaultMeals } from "@/data/food-templates";
import DayAccordion from "./DayAccordion";
import PackingList from "./PackingList";
import { fadeInUp } from "@/lib/animations";

type Tab = "meals" | "packing";

const mealTypes: MealType[] = ["breakfast", "lunch", "dinner", "snacks"];

// Simple keyword mapping for auto-generating packing list
const categoryKeywords: Record<string, StorageCategory> = {
  milk: "fridge",
  cheese: "fridge",
  butter: "fridge",
  yoghurt: "fridge",
  eggs: "fridge",
  juice: "fridge",
  cream: "fridge",
  bacon: "fridge",
  salad: "fridge",
  dip: "fridge",
  meat: "freezer",
  mince: "freezer",
  chicken: "freezer",
  wors: "freezer",
  steak: "freezer",
  sausage: "freezer",
  ice: "freezer",
  bread: "pantry",
  rolls: "pantry",
  rusks: "pantry",
  coffee: "pantry",
  tea: "pantry",
  sugar: "pantry",
  pasta: "pantry",
  rice: "pantry",
  oil: "pantry",
  salt: "pantry",
  pepper: "pantry",
  spice: "pantry",
  cereal: "pantry",
  crisps: "pantry",
  biltong: "pantry",
  nuts: "pantry",
  fruit: "pantry",
  marshmallow: "pantry",
  water: "coolerBox",
  beer: "coolerBox",
  wine: "coolerBox",
  drinks: "coolerBox",
  cooldrink: "coolerBox",
};

function guessCategory(name: string): StorageCategory {
  const lower = name.toLowerCase();
  for (const [keyword, category] of Object.entries(categoryKeywords)) {
    if (lower.includes(keyword)) return category;
  }
  return "pantry";
}

interface FoodPlannerClientProps {
  trip: TripData;
}

export default function FoodPlannerClient({ trip }: FoodPlannerClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("meals");
  const [openDays, setOpenDays] = useState<Set<string>>(
    new Set([trip.stops[0]?.slug])
  );

  const defaultPlan = useMemo((): FoodPlan => {
    const days: Record<string, DayMeals> = {};
    for (const stop of trip.stops) {
      days[stop.slug] = getDefaultMeals(stop.accommodationType);
    }
    return { days, packingList: [], lastModified: new Date().toISOString() };
  }, [trip]);

  const [plan, setPlan, resetPlan] = useLocalStorage<FoodPlan>(
    "karoo-food-plan",
    defaultPlan
  );

  const toggleDay = (slug: string) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const updateDayMeals = (slug: string, meals: DayMeals) => {
    setPlan((prev) => ({
      ...prev,
      days: { ...prev.days, [slug]: meals },
      lastModified: new Date().toISOString(),
    }));
  };

  const copyPreviousDay = (currentSlug: string) => {
    const stopIndex = trip.stops.findIndex((s) => s.slug === currentSlug);
    if (stopIndex <= 0) return;
    const prevSlug = trip.stops[stopIndex - 1].slug;
    const prevMeals = plan.days[prevSlug];
    if (!prevMeals) return;

    // Deep clone with new IDs
    const cloned: DayMeals = {
      breakfast: prevMeals.breakfast.map((i) => ({
        ...i,
        id: crypto.randomUUID(),
        checked: false,
      })),
      lunch: prevMeals.lunch.map((i) => ({
        ...i,
        id: crypto.randomUUID(),
        checked: false,
      })),
      dinner: prevMeals.dinner.map((i) => ({
        ...i,
        id: crypto.randomUUID(),
        checked: false,
      })),
      snacks: prevMeals.snacks.map((i) => ({
        ...i,
        id: crypto.randomUUID(),
        checked: false,
      })),
      notes: prevMeals.notes,
    };
    updateDayMeals(currentSlug, cloned);
  };

  const updatePackingList = (items: PackingItem[]) => {
    setPlan((prev) => ({
      ...prev,
      packingList: items,
      lastModified: new Date().toISOString(),
    }));
  };

  const autoGeneratePackingList = () => {
    const allItems = new Set<string>();
    for (const dayMeals of Object.values(plan.days)) {
      for (const type of mealTypes) {
        for (const item of dayMeals[type]) {
          if (item.name.trim()) {
            allItems.add(item.name.trim());
          }
        }
      }
    }

    const existingNames = new Set(
      plan.packingList.map((i) => i.name.toLowerCase())
    );
    const newItems: PackingItem[] = [];

    for (const name of allItems) {
      if (!existingNames.has(name.toLowerCase())) {
        newItems.push({
          id: crypto.randomUUID(),
          name,
          category: guessCategory(name),
          checked: false,
        });
      }
    }

    if (newItems.length > 0) {
      updatePackingList([...plan.packingList, ...newItems]);
    }
  };

  // Stats
  const totalMealItems = trip.stops.reduce((sum, stop) => {
    const dayMeals = plan.days[stop.slug];
    if (!dayMeals) return sum;
    return (
      sum + mealTypes.reduce((s, type) => s + dayMeals[type].length, 0)
    );
  }, 0);
  const packedItems = plan.packingList.filter((i) => i.checked).length;

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
          Food Planner
        </h1>
        <p className="text-sand-500 text-sm max-w-md mx-auto">
          Plan meals for each day and build your packing list
        </p>
      </motion.div>

      {/* Tabs + actions */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex bg-sand-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("meals")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "meals"
                ? "bg-white text-sand-800 shadow-sm"
                : "text-sand-500 hover:text-sand-700"
            }`}
          >
            Daily Menus
          </button>
          <button
            onClick={() => setActiveTab("packing")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "packing"
                ? "bg-white text-sand-800 shadow-sm"
                : "text-sand-500 hover:text-sand-700"
            }`}
          >
            Packing List
            {plan.packingList.length > 0 && (
              <span className="ml-1.5 text-xs text-sand-400">
                ({packedItems}/{plan.packingList.length})
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "packing" && (
            <button
              onClick={autoGeneratePackingList}
              className="px-3 py-2 text-xs font-medium text-karoo-600 hover:bg-karoo-50 rounded-lg transition-colors"
            >
              Auto-generate from meals
            </button>
          )}
          <button
            onClick={resetPlan}
            className="px-3 py-2 text-xs font-medium text-sand-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            Reset all
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-xs text-sand-400 mb-6 px-1">
        <span>{totalMealItems} meal items planned</span>
        <span className="w-1 h-1 rounded-full bg-sand-300" />
        <span>{plan.packingList.length} packing items</span>
      </div>

      {/* Content */}
      {activeTab === "meals" ? (
        <div className="space-y-3">
          {trip.stops.map((stop, index) => (
            <DayAccordion
              key={stop.slug}
              stop={stop}
              meals={
                plan.days[stop.slug] ||
                getDefaultMeals(stop.accommodationType)
              }
              isOpen={openDays.has(stop.slug)}
              onToggle={() => toggleDay(stop.slug)}
              onUpdateMeals={(meals) => updateDayMeals(stop.slug, meals)}
              onCopyPrevious={
                index > 0 ? () => copyPreviousDay(stop.slug) : undefined
              }
            />
          ))}
        </div>
      ) : (
        <PackingList
          items={plan.packingList}
          onUpdate={updatePackingList}
        />
      )}
    </div>
  );
}
