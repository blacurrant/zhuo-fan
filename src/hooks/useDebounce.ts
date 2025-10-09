import { useEffect, useState } from 'react';

/**
 * useDebounce
 * Returns a debounced value that updates after the specified delay
 * whenever the input value changes.
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}

/**
 * debounceFn
 * Returns a debounced version of a function.
 * The debounced function delays invoking fn until after delayMs ms
 * have elapsed since the last time the debounced function was invoked.
 */
export function debounceFn<F extends (...args: any[]) => any>(fn: F, delayMs: number = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delayMs);
  };
}
