"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackingItem, StorageCategory } from "@/types/planner";

const categories: { key: StorageCategory; label: string; emoji: string }[] = [
  { key: "fridge", label: "Fridge", emoji: "🧊" },
  { key: "freezer", label: "Freezer", emoji: "❄️" },
  { key: "pantry", label: "Pantry / Dry Goods", emoji: "🫙" },
  { key: "coolerBox", label: "Cooler Box", emoji: "🧳" },
];

interface PackingListProps {
  items: PackingItem[];
  onUpdate: (items: PackingItem[]) => void;
}

function PackingItemRow({
  item,
  onUpdate,
  onDelete,
  autoFocus,
}: {
  item: PackingItem;
  onUpdate: (item: PackingItem) => void;
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
          item.checked ? "text-sand-400 line-through" : "text-sand-700"
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

export default function PackingList({ items, onUpdate }: PackingListProps) {
  const addItem = (category: StorageCategory) => {
    onUpdate([
      ...items,
      {
        id: crypto.randomUUID(),
        name: "",
        category,
        checked: false,
      },
    ]);
  };

  const updateItem = (id: string, updated: PackingItem) => {
    onUpdate(items.map((i) => (i.id === id ? updated : i)));
  };

  const deleteItem = (id: string) => {
    onUpdate(items.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      {categories.map(({ key, label, emoji }) => {
        const categoryItems = items.filter((i) => i.category === key);
        const checkedCount = categoryItems.filter((i) => i.checked).length;

        return (
          <div
            key={key}
            className="bg-white rounded-xl p-5 ring-1 ring-sand-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <h3 className="font-semibold text-sand-700 text-sm">
                  {label}
                </h3>
              </div>
              {categoryItems.length > 0 && (
                <span className="text-xs text-sand-400">
                  {checkedCount}/{categoryItems.length} packed
                </span>
              )}
            </div>

            <div className="space-y-0.5">
              <AnimatePresence initial={false}>
                {categoryItems.map((item) => (
                  <PackingItemRow
                    key={item.id}
                    item={item}
                    onUpdate={(updated) => updateItem(item.id, updated)}
                    onDelete={() => deleteItem(item.id)}
                    autoFocus={
                      item.name === "" &&
                      item.id === categoryItems[categoryItems.length - 1]?.id
                    }
                  />
                ))}
              </AnimatePresence>
            </div>

            <button
              onClick={() => addItem(key)}
              className="mt-2 ml-7 text-xs text-sand-400 hover:text-karoo-500 transition-colors py-1"
            >
              + Add item
            </button>
          </div>
        );
      })}
    </div>
  );
}
