import { useEffect, useState } from "react";

interface Options {
  delay?: number;
}

export const useDebouncedValue = <T>(
  value: T,
  { delay = 400 }: Options = {},
) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
