import { useState } from "react";
import type { Meter } from "@/entities/meters";
import type { Group } from "@/entities/groups";

interface Params {
  canEdit: boolean;
  canManageMetersToGroups: boolean;
  selectedIds: number[];
  groups: Group[];
  groupId: number | null;
  onAddMetersToGroup: (groupId: number, meterIds: number[]) => void;
  onRemoveMetersFromGroup: (groupId: number, meterIds: number[]) => void;
  onClearSelection: () => void;
}

export const useMetersUiState = ({
  canEdit,
  canManageMetersToGroups,
  selectedIds,
  groups,
  groupId,
  onAddMetersToGroup,
  onRemoveMetersFromGroup,
  onClearSelection,
}: Params) => {
  const [editingMeter, setEditingMeter] = useState<Meter | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [detailsMeter, setDetailsMeter] = useState<Meter | null>(null);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupModalMode, setGroupModalMode] = useState<"add" | "remove">("add");
  const [groupModalGroupId, setGroupModalGroupId] = useState<number | null>(
    null,
  );

  const handleEdit = (meter: Meter) => {
    if (!canEdit) return;
    setEditingMeter(meter);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingMeter(null);
    setEditModalOpen(false);
  };

  const handleView = (meter: Meter) => {
    setDetailsMeter(meter);
    setDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsMeter(null);
    setDetailsOpen(false);
  };

  const openAddToGroupModal = () => {
    if (
      !canManageMetersToGroups ||
      selectedIds.length === 0 ||
      groups.length === 0
    ) {
      return;
    }

    setGroupModalMode("add");
    setGroupModalGroupId(groupId ?? null);
    setGroupModalOpen(true);
  };

  const openRemoveFromGroupModal = () => {
    if (
      !canManageMetersToGroups ||
      selectedIds.length === 0 ||
      groups.length === 0
    ) {
      return;
    }

    setGroupModalMode("remove");
    setGroupModalGroupId(groupId ?? null);
    setGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setGroupModalOpen(false);
    setGroupModalGroupId(null);
  };

  const handleConfirmGroupModal = () => {
    if (!groupModalGroupId || selectedIds.length === 0) return;

    if (groupModalMode === "add") {
      onAddMetersToGroup(groupModalGroupId, selectedIds);
    } else {
      onRemoveMetersFromGroup(groupModalGroupId, selectedIds);
    }

    onClearSelection();
    closeGroupModal();
  };

  return {
    editingMeter,
    isEditModalOpen,
    detailsMeter,
    isDetailsOpen,
    isFiltersOpen,
    groupModalOpen,
    groupModalMode,
    groupModalGroupId,
    setGroupModalGroupId,
    setFiltersOpen,
    handleEdit,
    handleView,
    closeEditModal,
    closeDetailsModal,
    openAddToGroupModal,
    openRemoveFromGroupModal,
    closeGroupModal,
    handleConfirmGroupModal,
  };
};
