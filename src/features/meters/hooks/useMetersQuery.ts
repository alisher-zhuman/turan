import { useQuery } from "@tanstack/react-query";
import { getMeters, type Meter } from "@/entities/meters";
import type { MeterFilters } from "./useMeterFilters";

interface Params {
  page: number;
  limit: number;
  filters: MeterFilters;
}

export const useMetersQuery = ({ page, limit, filters }: Params) => {
  const {
    meterName,
    customerId,
    status,
    isArchived,
    groupId,
    valveFilter,
  } = filters;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "meters",
      page,
      limit,
      status,
      isArchived,
      groupId,
      customerId,
      meterName,
    ],
    queryFn: () =>
      getMeters(
        page + 1,
        limit,
        isArchived,
        status,
        groupId,
        customerId,
        meterName,
      ),
  });

  const metersRaw: Meter[] = data?.data ?? [];
  const meters: Meter[] = metersRaw.filter((m) => {
    if (valveFilter === "all") {
      return true;
    }
    if (valveFilter === "open") {
      return m.valveStatus === "open";
    }
    if (valveFilter === "closed") {
      return m.valveStatus === "closed";
    }
    return true;
  });

  const total = data?.total ?? 0;
  const hasMeters = meters.length > 0;
  const emptyText = "Счётчики не найдены";

  return {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
