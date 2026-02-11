import { useSelection } from "@/shared/hooks";
import type { Meter } from "@/entities/meters";

interface Params {
  meters: Meter[];
  canManageMetersToGroups: boolean;
  resetKey: string;
}

export const useMeterSelection = ({
  meters,
  canManageMetersToGroups,
  resetKey,
}: Params) => {
  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    clearSelection,
    removeSelected,
  } = useSelection<Meter, number>({
    items: meters,
    getId: (meter) => meter.id,
    enabled: canManageMetersToGroups,
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
    clearSelection,
    removeSelected,
  };
};
