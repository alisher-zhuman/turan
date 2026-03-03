import { useCallback, useMemo, useState } from "react";

export interface MeterFilters {
  meterName: string;
  customerId: string;
  status: string;
  isArchived: boolean;
  groupId: number | null;
  valveFilter: "all" | "open" | "closed";
}

const initialFilters: MeterFilters = {
  meterName: "",
  customerId: "",
  status: "all",
  isArchived: false,
  groupId: null,
  valveFilter: "all",
};

interface Params {
  initialGroupId?: number;
}

const getInitialFilters = (initialGroupId?: number): MeterFilters => ({
  ...initialFilters,
  groupId: initialGroupId ?? null,
});

export const useMeterFilters = ({ initialGroupId }: Params = {}) => {
  const [filters, setFilters] = useState<MeterFilters>(() =>
    getInitialFilters(initialGroupId),
  );

  const filtersKey = useMemo(
    () =>
      [
        filters.status,
        filters.isArchived ? "archived" : "active",
        filters.groupId ?? "null",
        filters.customerId,
        filters.meterName,
        filters.valveFilter,
      ].join("|"),
    [filters],
  );

  const updateFilters = useCallback((patch: Partial<MeterFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const setStatus = useCallback(
    (value: string) => updateFilters({ status: value }),
    [updateFilters],
  );
  const setIsArchived = useCallback(
    (value: boolean) => updateFilters({ isArchived: value }),
    [updateFilters],
  );
  const setGroupId = useCallback(
    (value: number | null) => updateFilters({ groupId: value }),
    [updateFilters],
  );
  const setCustomerId = useCallback(
    (value: string) => updateFilters({ customerId: value }),
    [updateFilters],
  );
  const setMeterName = useCallback(
    (value: string) => updateFilters({ meterName: value }),
    [updateFilters],
  );
  const setValveFilter = useCallback(
    (value: "all" | "open" | "closed") => updateFilters({ valveFilter: value }),
    [updateFilters],
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    filtersKey,
    setStatus,
    setIsArchived,
    setGroupId,
    setCustomerId,
    setMeterName,
    setValveFilter,
    resetFilters,
  };
};
