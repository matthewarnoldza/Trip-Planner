"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DayMeals, MealType, MealItem } from "@/types/planner";
import { Stop } from "@/types/trip";
import MealSection from "./MealSection";

const mealTypes: MealType[] = ["breakfast", "lunch", "dinner", "snacks"];

interface DayAccordionProps {
  stop: Stop;
  meals: DayMeals;
  isOpen: boolean;
  onToggle: () => void;
  onUpdateMeals: (meals: DayMeals) => void;
  onCopyPrevious?: () => void;
}

export default function DayAccordion({
  stop,
  meals,
  isOpen,
  onToggle,
  onUpdateMeals,
  onCopyPrevious,
}: DayAccordionProps) {
  const totalItems = mealTypes.reduce(
    (sum, type) => sum + meals[type].length,
    0
  );
  const checkedItems = mealTypes.reduce(
    (sum, type) => sum + meals[type].filter((i) => i.checked).length,
    0
  );

  const updateMealItems = (type: MealType, items: MealItem[]) => {
    onUpdateMeals({ ...meals, [type]: items });
  };

  const updateNotes = (notes: string) => {
    onUpdateMeals({ ...meals, notes });
  };

  const typeBadge =
    stop.accommodationType === "campsite"
      ? { label: "Campsite", className: "bg-sage-100 text-sage-700" }
      : stop.accommodationType === "activity"
        ? { label: "Activity", className: "bg-amber-50 text-amber-700" }
        : stop.accommodationType === "travel"
          ? { label: "Travel", className: "bg-sand-100 text-sand-600" }
          : { label: "B&B / Lodge", className: "bg-karoo-50 text-karoo-700" };

  return (
    <div className="bg-white rounded-xl ring-1 ring-sand-100 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-sand-50/50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-karoo-500 flex items-center justify-center text-white text-xs font-bold">
            {stop.id}
          </div>
          <div className="min-w-0">
            <h3 className="font-serif font-bold text-sand-800 text-base sm:text-lg truncate">
              {stop.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-sand-400">{stop.dates}</span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeBadge.className}`}
              >
                {typeBadge.label}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {totalItems > 0 && (
            <span className="text-xs text-sand-400 hidden sm:block">
              {checkedItems}/{totalItems}
            </span>
          )}
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-sand-400"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-sand-100">
              {/* Copy previous button */}
              {onCopyPrevious && (
                <button
                  onClick={onCopyPrevious}
                  className="mb-4 text-xs text-sand-400 hover:text-karoo-500 transition-colors flex items-center gap-1"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  Copy from previous day
                </button>
              )}

              {/* Meal sections */}
              <div className="space-y-5">
                {mealTypes.map((type) => (
                  <MealSection
                    key={type}
                    type={type}
                    items={meals[type]}
                    onUpdate={(items) => updateMealItems(type, items)}
                  />
                ))}
              </div>

              {/* Notes */}
              <div className="mt-5 pt-4 border-t border-sand-50">
                <textarea
                  value={meals.notes}
                  onChange={(e) => updateNotes(e.target.value)}
                  placeholder="Notes for this day..."
                  rows={2}
                  className="w-full bg-sand-50 rounded-lg px-3 py-2 text-sm text-sand-600 placeholder:text-sand-300 outline-none focus:ring-1 focus:ring-karoo-300 resize-none transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
