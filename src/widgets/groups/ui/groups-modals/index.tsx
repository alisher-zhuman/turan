import { type Group } from "@/entities/groups";
import { GroupForm } from "@/features/groups";
import { Modal } from "@/shared/ui/modal";

interface Props {
  isOpen: boolean;
  editingGroup: Group | null;
  onClose: () => void;
}

export const GroupsModals = ({ isOpen, editingGroup, onClose }: Props) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    title={editingGroup ? "Редактировать группу" : "Создать группу"}
  >
    <GroupForm groupToEdit={editingGroup} onClose={onClose} />
  </Modal>
);
