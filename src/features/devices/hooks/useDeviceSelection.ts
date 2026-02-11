import { useSelection } from "@/shared/hooks";
import type { Device } from "@/entities/devices";

interface Params {
  devices: Device[];
  resetKey: string;
}

export const useDeviceSelection = ({ devices, resetKey }: Params) => {
  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    removeSelected,
  } = useSelection<Device, number>({
    items: devices,
    getId: (device) => device.id,
    resetKey,
  });

  const handleToggleAll = (checked: boolean) => {
    toggleAll(checked);
  };

  const handleToggleOne = (id: number) => {
    toggleOne(id);
  };

  return {
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    removeSelected,
  };
};
