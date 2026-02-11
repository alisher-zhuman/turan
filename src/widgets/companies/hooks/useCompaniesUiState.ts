import { useState } from "react";
import type { Company } from "@/entities/companies";

export const useCompaniesUiState = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const openCreateModal = () => {
    setEditingCompany(null);
    setModalOpen(true);
  };

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingCompany(null);
    setModalOpen(false);
  };

  return {
    isModalOpen,
    editingCompany,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
