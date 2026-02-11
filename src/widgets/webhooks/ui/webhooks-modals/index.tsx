import { WebhookForm } from "@/features/webhooks";
import { Modal } from "@/shared/ui/modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const WebhooksModals = ({ isOpen, onClose }: Props) => (
  <Modal open={isOpen} onClose={onClose} title="Создать вебхук">
    <WebhookForm onClose={onClose} />
  </Modal>
);
