import { type UserRow } from "@/entities/users";
import { UserForm } from "@/features/users";
import { Modal } from "@/shared/ui/modal";

interface Props {
  isOpen: boolean;
  editingUser: UserRow | null;
  onClose: () => void;
}

export const UsersModals = ({ isOpen, editingUser, onClose }: Props) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    title={editingUser ? "Редактировать пользователя" : "Создать пользователя"}
  >
    <UserForm onClose={onClose} userToEdit={editingUser} />
  </Modal>
);
