import { useState } from "react";
import type { UserRow } from "@/entities/users";

export const useUsersUiState = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);

  const openCreateModal = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const openEditModal = (user: UserRow) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  return {
    isModalOpen,
    editingUser,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
