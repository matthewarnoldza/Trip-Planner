"use client";

import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch {
      // If parsing fails, use initial value
    }
    setMounted(true);
  }, [key]);

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
