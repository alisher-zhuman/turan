import { useQuery } from "@tanstack/react-query";

import { getReadings, type Reading, readingsKeys } from "@/entities/readings";

const READINGS_QUERY_OPTIONS = {
  staleTime: 5_000,
  retry: 1,
} as const;

interface Params {
  page: number;
  limit: number;
}

export const useReadingsQuery = ({ page, limit }: Params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: readingsKeys.list(page, limit),
    queryFn: () => getReadings(page + 1, limit),
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
