import {
  MeterDetails,
  MeterForm,
  MeterGroupModal,
  MetersFiltersModal,
} from "@/features/meters";

import { type Group } from "@/entities/groups";
import { type Meter } from "@/entities/meters";

import { Modal } from "@/shared/ui/modal";

interface Props {
  editOpen: boolean;
  editingMeter: Meter | null;
  onCloseEdit: () => void;
  canArchive: boolean;
  detailsOpen: boolean;
  detailsMeter: Meter | null;
  onCloseDetails: () => void;
  groupModalOpen: boolean;
  groupModalMode: "add" | "remove";
  groups: Group[];
  selectedCount: number;
  selectedGroupId: number | null;
  onChangeGroup: (groupId: number | null) => void;
  onCloseGroupModal: () => void;
  onConfirmGroupModal: () => void;
  filtersOpen: boolean;
  onCloseFilters: () => void;
  status: string;
  onStatusChange: (value: string) => void;
  valveFilter: "all" | "open" | "closed";
  onValveFilterChange: (value: "all" | "open" | "closed") => void;
  isArchived: boolean;
  onArchivedChange: (value: boolean) => void;
  groupId: number | null;
  onGroupChange: (id: number | null) => void;
  customerId: string;
  onCustomerIdChange: (value: string) => void;
  meterName: string;
  onMeterNameChange: (value: string) => void;
}

export const MetersModals = ({
  editOpen,
  editingMeter,
  onCloseEdit,
  canArchive,
  detailsOpen,
  detailsMeter,
  onCloseDetails,
  groupModalOpen,
  groupModalMode,
  groups,
  selectedCount,
  selectedGroupId,
  onChangeGroup,
  onCloseGroupModal,
  onConfirmGroupModal,
  filtersOpen,
  onCloseFilters,
  status,
  onStatusChange,
  valveFilter,
  onValveFilterChange,
  isArchived,
  onArchivedChange,
  groupId,
  onGroupChange,
  customerId,
  onCustomerIdChange,
  meterName,
  onMeterNameChange,
}: Props) => (
  <>
    <Modal
      open={editOpen}
      onClose={onCloseEdit}
      title="Редактировать счётчик"
    >
      <MeterForm
        meterToEdit={editingMeter}
        onClose={onCloseEdit}
        canArchive={canArchive}
      />
    </Modal>

    <Modal
      open={detailsOpen}
      onClose={onCloseDetails}
      title="Детальная информация по счётчику"
    >
      {detailsMeter && <MeterDetails meter={detailsMeter} />}
    </Modal>

    <MeterGroupModal
      open={groupModalOpen}
      mode={groupModalMode}
      groups={groups}
      selectedCount={selectedCount}
      selectedGroupId={selectedGroupId}
      onChangeGroup={onChangeGroup}
      onClose={onCloseGroupModal}
      onConfirm={onConfirmGroupModal}
    />

    <MetersFiltersModal
      open={filtersOpen}
      onClose={onCloseFilters}
      status={status}
      onStatusChange={onStatusChange}
      valveFilter={valveFilter}
      onValveFilterChange={onValveFilterChange}
      isArchived={isArchived}
      onArchivedChange={onArchivedChange}
      groupId={groupId}
      onGroupChange={onGroupChange}
      groups={groups}
      customerId={customerId}
      onCustomerIdChange={onCustomerIdChange}
      meterName={meterName}
      onMeterNameChange={onMeterNameChange}
    />
  </>
);
