import { useCallback, useMemo, useState } from "react";

import { DEFAULT_READINGS_FILTERS } from "../constants";
import type { ReadingsFilters } from "../types";

interface Params {
  initialFilters?: Partial<ReadingsFilters>;
}

const getInitialFilters = (
  initialFiltersPatch?: Partial<ReadingsFilters>,
): ReadingsFilters => ({
  ...DEFAULT_READINGS_FILTERS,
  ...initialFiltersPatch,
});

export const useReadingsFilters = ({
  initialFilters: initialFiltersPatch,
}: Params = {}) => {
  const [filters, setFilters] = useState<ReadingsFilters>(() =>
    getInitialFilters(initialFiltersPatch),
  );

  const filtersKey = useMemo(
    () =>
      [
        filters.meterId ?? "null",
        filters.customerId,
        filters.client,
        filters.address,
        filters.dateFrom,
        filters.dateTo,
      ].join("|"),
    [filters],
  );

  const updateFilters = useCallback((patch: Partial<ReadingsFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const setMeterId = useCallback(
    (value: number | null) => updateFilters({ meterId: value }),
    [updateFilters],
  );

  const setCustomerId = useCallback(
    (value: string) => updateFilters({ customerId: value }),
    [updateFilters],
  );

  const setClient = useCallback(
    (value: string) => updateFilters({ client: value }),
    [updateFilters],
  );

  const setAddress = useCallback(
    (value: string) => updateFilters({ address: value }),
    [updateFilters],
  );

  const setDateFrom = useCallback(
    (value: string) => updateFilters({ dateFrom: value }),
    [updateFilters],
  );

  const setDateTo = useCallback(
    (value: string) => updateFilters({ dateTo: value }),
    [updateFilters],
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_READINGS_FILTERS);
  }, []);

  return {
    filters,
    filtersKey,
    setMeterId,
    setCustomerId,
    setClient,
    setAddress,
    setDateFrom,
    setDateTo,
    resetFilters,
  };
};
