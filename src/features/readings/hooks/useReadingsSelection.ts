import { useSelection } from "@/shared/hooks";
import type { Reading } from "@/entities/readings";

interface Params {
  readings: Reading[];
  isAdmin: boolean;
  resetKey: string;
}

export const useReadingsSelection = ({
  readings,
  isAdmin,
  resetKey,
}: Params) => {
  const {
    selectedIds,
    allSelected,
    isIndeterminate,
    toggleAll,
    toggleOne,
    removeSelected,
  } = useSelection<Reading, string>({
    items: readings,
    getId: (reading) => reading.id,
    enabled: isAdmin,
    resetKey,
  });

  const handleToggleAll = (checked: boolean) => {
    toggleAll(checked);
  };

  const handleToggleOne = (id: string) => {
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
