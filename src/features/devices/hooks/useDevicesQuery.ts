import { useQuery } from "@tanstack/react-query";

import { type Device,devicesKeys, getDevices } from "@/entities/devices";

interface Params {
  page: number;
  limit: number;
  verified: boolean;
}

export const useDevicesQuery = ({ page, limit, verified }: Params) => {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: devicesKeys.list(page, limit, verified),
    queryFn: () => getDevices(page + 1, limit, verified),
  });

  const devices: Device[] = data?.data ?? [];
  const total: number = data?.total ?? 0;
  const hasDevices = devices.length > 0;

  const emptyText = verified
    ? "Нет подтверждённых устройств"
    : "Нет неподтверждённых устройств";

  return {
    devices,
    total,
    hasDevices,
    emptyText,
    isLoading,
    isError,
    isFetching,
  };
};
