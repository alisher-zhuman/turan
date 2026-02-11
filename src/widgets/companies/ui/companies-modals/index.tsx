import { type Company } from "@/entities/companies";
import { CompanyForm } from "@/features/companies";
import { Modal } from "@/shared/ui/modal";

interface Props {
  isOpen: boolean;
  editingCompany: Company | null;
  onClose: () => void;
}

export const CompaniesModals = ({
  isOpen,
  editingCompany,
  onClose,
}: Props) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    title={editingCompany ? "Редактировать компанию" : "Создать компанию"}
  >
    <CompanyForm company={editingCompany} onClose={onClose} />
  </Modal>
);
