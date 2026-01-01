"use client";

import { useEffect, useState } from "react";

type UseLocalStorageStateOptions<T> = {
  defaultValue: T;
};

export default function useLocalStorageState<T>(
  key: string,
  options: UseLocalStorageStateOptions<T>
) {
  const { defaultValue } = options;
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;
    const stored = window.localStorage.getItem(key);
    if (stored !== null) {
      try {
        return JSON.parse(stored) as T;
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
}
