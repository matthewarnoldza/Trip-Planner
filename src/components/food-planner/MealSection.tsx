"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealItem, MealType } from "@/types/planner";

const mealLabels: Record<MealType, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snacks: "Snacks",
};

const mealEmoji: Record<MealType, string> = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙",
  snacks: "🍿",
};

interface MealSectionProps {
  type: MealType;
  items: MealItem[];
  onUpdate: (items: MealItem[]) => void;
}

function MealItemRow({
  item,
  onUpdate,
  onDelete,
  autoFocus,
}: {
  item: MealItem;
  onUpdate: (item: MealItem) => void;
  onDelete: () => void;
  autoFocus?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center gap-2 group"
    >
      <button
        onClick={() => onUpdate({ ...item, checked: !item.checked })}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
          item.checked
            ? "bg-sage-500 border-sage-500"
            : "border-sand-300 hover:border-sage-400"
        }`}
      >
        {item.checked && (
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
      </button>
      <input
        ref={inputRef}
        type="text"
        value={item.name}
        onChange={(e) => onUpdate({ ...item, name: e.target.value })}
        placeholder="Add item..."
        className={`flex-1 bg-transparent text-sm py-1.5 outline-none placeholder:text-sand-300 transition-colors ${
          item.checked
            ? "text-sand-400 line-through"
            : "text-sand-700"
        }`}
      />
      <button
        onClick={onDelete}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 text-sand-300 hover:text-red-400 transition-all p-1"
        aria-label="Delete item"
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
    </motion.div>
  );
}

export default function MealSection({
  type,
  items,
  onUpdate,
}: MealSectionProps) {
  const addItem = () => {
    onUpdate([
      ...items,
      { id: crypto.randomUUID(), name: "", checked: false },
    ]);
  };

  const updateItem = (index: number, item: MealItem) => {
    const next = [...items];
    next[index] = item;
    onUpdate(next);
  };

  const deleteItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{mealEmoji[type]}</span>
        <h4 className="text-xs font-semibold text-sand-500 uppercase tracking-wide">
          {mealLabels[type]}
        </h4>
      </div>
      <div className="space-y-0.5 ml-1">
        <AnimatePresence initial={false}>
          {items.map((item, i) => (
            <MealItemRow
              key={item.id}
              item={item}
              onUpdate={(updated) => updateItem(i, updated)}
              onDelete={() => deleteItem(i)}
              autoFocus={item.name === "" && i === items.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={addItem}
        className="mt-1 ml-7 text-xs text-sand-400 hover:text-karoo-500 transition-colors py-1"
      >
        + Add item
      </button>
    </div>
  );
}
