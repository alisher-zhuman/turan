import { useQuery } from "@tanstack/react-query";

import { getReadings, type Reading, readingsKeys } from "@/entities/readings";

import type { ReadingsFilters } from "../types";

const READINGS_QUERY_OPTIONS = {
  staleTime: 5_000,
  retry: 1,
} as const;

interface Params {
  page: number;
  limit: number;
  filters: ReadingsFilters;
}

export const useReadingsQuery = ({ page, limit, filters }: Params) => {
  const { meterId, customerId, client, address, dateFrom, dateTo } = filters;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: readingsKeys.list({
      page,
      limit,
      meterId,
      customerId,
      client,
      address,
      dateFrom,
      dateTo,
    }),
    queryFn: () =>
      getReadings({
        page: page + 1,
        limit,
        meterId,
        customerID: customerId,
        client,
        address,
        dateFrom,
        dateTo,
      }),
    staleTime: READINGS_QUERY_OPTIONS.staleTime,
    retry: READINGS_QUERY_OPTIONS.retry,
  });

  const readings: Reading[] = data?.data ?? [];
  const hasReadings = readings.length > 0;
  const total = data?.total ?? 0;
  const emptyText = "Показания не найдены";

  return {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
