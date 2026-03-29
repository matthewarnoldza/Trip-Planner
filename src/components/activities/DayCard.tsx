"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPlan, PlannedActivity } from "@/types/planner";
import ActivityToggle from "./ActivityToggle";

interface DayCardProps {
  day: DayPlan;
  nights: number;
  accommodationType: string;
  onUpdate: (day: DayPlan) => void;
}

export default function DayCard({
  day,
  nights,
  accommodationType,
  onUpdate,
}: DayCardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showAddForm && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [showAddForm]);

  const toggleActivity = (id: string) => {
    onUpdate({
      ...day,
      activities: day.activities.map((a) =>
        a.id === id ? { ...a, selected: !a.selected } : a
      ),
    });
  };

  const deleteActivity = (id: string) => {
    onUpdate({
      ...day,
      activities: day.activities.filter((a) => a.id !== id),
    });
  };

  const addCustomActivity = () => {
    if (!newName.trim()) return;
    const activity: PlannedActivity = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      description: newDesc.trim(),
      icon: "pin",
      source: "custom",
      selected: true,
    };
    onUpdate({
      ...day,
      activities: [...day.activities, activity],
    });
    setNewName("");
    setNewDesc("");
    setShowAddForm(false);
  };

  const updateNotes = (notes: string) => {
    onUpdate({ ...day, notes });
  };

  const selectedCount = day.activities.filter((a) => a.selected).length;
  const suggested = day.activities.filter((a) => a.source === "suggested");
  const custom = day.activities.filter((a) => a.source === "custom");

  const typeBadge =
    accommodationType === "campsite"
      ? { label: "Campsite", className: "bg-sage-100 text-sage-700" }
      : accommodationType === "activity"
        ? { label: "Activity", className: "bg-amber-50 text-amber-700" }
        : accommodationType === "travel"
          ? { label: "Travel", className: "bg-sand-100 text-sand-600" }
          : { label: "B&B / Lodge", className: "bg-karoo-50 text-karoo-700" };

  return (
    <div className="bg-white rounded-xl ring-1 ring-sand-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-sand-800 text-lg sm:text-xl">
              {day.stopName}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-sand-400">{day.date}</span>
              {nights > 0 && (
                <span className="text-xs text-sand-400">
                  &middot; {nights} {nights === 1 ? "night" : "nights"}
                </span>
              )}
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeBadge.className}`}
              >
                {typeBadge.label}
              </span>
            </div>
          </div>
          {day.activities.length > 0 && (
            <span className="text-xs text-sand-400 flex-shrink-0 mt-1">
              {selectedCount} selected
            </span>
          )}
        </div>
      </div>

      {/* Activities */}
      <div className="px-4 sm:px-5 pb-5 space-y-4">
        {/* Suggested activities */}
        {suggested.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-sand-400 uppercase tracking-wide mb-2">
              Suggested Activities
            </h4>
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {suggested.map((activity) => (
                  <ActivityToggle
                    key={activity.id}
                    activity={activity}
                    onToggle={() => toggleActivity(activity.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Custom activities */}
        {custom.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-sand-400 uppercase tracking-wide mb-2">
              Custom Activities
            </h4>
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {custom.map((activity) => (
                  <ActivityToggle
                    key={activity.id}
                    activity={activity}
                    onToggle={() => toggleActivity(activity.id)}
                    onDelete={() => deleteActivity(activity.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Add custom activity */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-sand-50 rounded-lg p-3 space-y-2">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Activity name..."
                  className="w-full bg-white rounded-md px-3 py-2 text-sm outline-none ring-1 ring-sand-200 focus:ring-karoo-300 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addCustomActivity();
                    if (e.key === "Escape") setShowAddForm(false);
                  }}
                />
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Description (optional)..."
                  className="w-full bg-white rounded-md px-3 py-2 text-sm outline-none ring-1 ring-sand-200 focus:ring-karoo-300 transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addCustomActivity();
                    if (e.key === "Escape") setShowAddForm(false);
                  }}
                />
                <div className="flex gap-2">
                  <button
                    onClick={addCustomActivity}
                    className="px-3 py-1.5 bg-karoo-500 text-white text-xs font-medium rounded-md hover:bg-karoo-600 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1.5 text-sand-500 text-xs font-medium rounded-md hover:bg-sand-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="text-xs text-sand-400 hover:text-karoo-500 transition-colors py-1"
          >
            + Add custom activity
          </button>
        )}

        {/* Notes */}
        <div className="pt-3 border-t border-sand-50">
          <textarea
            value={day.notes}
            onChange={(e) => updateNotes(e.target.value)}
            placeholder="Notes for this day..."
            rows={2}
            className="w-full bg-sand-50 rounded-lg px-3 py-2 text-sm text-sand-600 placeholder:text-sand-300 outline-none focus:ring-1 focus:ring-karoo-300 resize-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
