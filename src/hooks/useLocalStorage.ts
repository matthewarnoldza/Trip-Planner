"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  version?: string
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount, reset if version mismatch
  useEffect(() => {
    try {
      const versionKey = `${key}--version`;
      const storedVersion = localStorage.getItem(versionKey);

      if (version && storedVersion !== version) {
        // Itinerary changed — reset to fresh defaults
        localStorage.removeItem(key);
        localStorage.setItem(versionKey, version);
        setMounted(true);
        return;
      }

      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }

      if (version) {
        localStorage.setItem(versionKey, version);
      }
    } catch {
      // If parsing fails, use initial value
    }
    setMounted(true);
  }, [key, version]);

  // Write to localStorage on change (skip initial mount)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // localStorage full or unavailable
    }
  }, [key, storedValue, mounted]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) =>
        value instanceof Function ? value(prev) : value
      );
    },
    []
  );

  const reset = useCallback(() => {
    localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, reset];
}
