import { useQuery } from "@tanstack/react-query";
import { getReadings, type Reading } from "@/entities/readings";

interface Params {
  page: number;
  limit: number;
}

export const useReadingsQuery = ({ page, limit }: Params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["readings", page, limit],
    queryFn: () => getReadings(page + 1, limit),
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
