import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { getReadings, type Reading, readingsKeys } from "@/entities/readings";

import { getApiErrorMessage } from "@/shared/helpers";

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

  const { data, isLoading, isError, isFetching, error } = useQuery({
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
    retry: (failureCount, queryError) => {
      const axiosError = queryError as AxiosError<{ statusCode?: number }> | null;
      const statusCode =
        axiosError?.response?.status ?? axiosError?.response?.data?.statusCode;

      if (statusCode === 404) {
        return false;
      }

      return failureCount < READINGS_QUERY_OPTIONS.retry;
    },
  });

  const readings: Reading[] = data?.data ?? [];
  const axiosError = error as AxiosError<{ message?: string; statusCode?: number }> | null;
  const statusCode =
    axiosError?.response?.status ?? axiosError?.response?.data?.statusCode;
  const isMeterNotFoundByFilter = statusCode === 404 && meterId !== null;

  const hasReadings = readings.length > 0 && !isMeterNotFoundByFilter;
  const total = data?.total ?? 0;
  const emptyText = isMeterNotFoundByFilter
    ? getApiErrorMessage(error, "Счётчик не найден")
    : "Показания не найдены";
  const errorText = getApiErrorMessage(
    error,
    "Ошибка при загрузке показаний счётчиков",
  );

  return {
    readings,
    total,
    hasReadings,
    emptyText,
    isLoading,
    isError: isError && !isMeterNotFoundByFilter,
    isFetching,
    errorText,
  };
};
