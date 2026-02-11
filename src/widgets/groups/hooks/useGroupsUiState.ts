import { useState } from "react";
import type { Group } from "@/entities/groups";

export const useGroupsUiState = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);

  const openCreateModal = () => {
    setEditingGroup(null);
    setModalOpen(true);
  };

  const openEditModal = (group: Group) => {
    setEditingGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingGroup(null);
    setModalOpen(false);
  };

  return {
    isModalOpen,
    editingGroup,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
