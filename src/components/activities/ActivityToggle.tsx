"use client";

import { motion } from "framer-motion";
import { PlannedActivity } from "@/types/planner";
import { activityIcons } from "@/lib/activity-icons";

interface ActivityToggleProps {
  activity: PlannedActivity;
  onToggle: () => void;
  onDelete?: () => void;
}

export default function ActivityToggle({
  activity,
  onToggle,
  onDelete,
}: ActivityToggleProps) {
  return (
    <motion.button
      layout
      onClick={onToggle}
      className={`w-full text-left p-3 rounded-lg transition-all flex items-start gap-3 group ${
        activity.selected
          ? "bg-sage-50 ring-1 ring-sage-200"
          : "bg-sand-50 opacity-70 hover:opacity-100"
      }`}
    >
      {/* Checkbox */}
      <div
        className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
          activity.selected
            ? "bg-sage-500 border-sage-500"
            : "border-sand-300"
        }`}
      >
        {activity.selected && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </div>

      {/* Icon */}
      <span className="text-base flex-shrink-0 mt-0.5">
        {activityIcons[activity.icon] || "📍"}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-semibold transition-colors ${
            activity.selected ? "text-sage-800" : "text-sand-600"
          }`}
        >
          {activity.name}
          {activity.source === "custom" && (
            <span className="ml-1.5 text-[10px] font-normal text-sand-400">
              (custom)
            </span>
          )}
        </h4>
        {activity.description && (
          <p className="text-xs text-sand-400 mt-0.5 leading-relaxed">
            {activity.description}
          </p>
        )}
      </div>

      {/* Delete button for custom activities */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 text-sand-300 hover:text-red-400 transition-all p-1"
          aria-label="Delete activity"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.button>
  );
}
