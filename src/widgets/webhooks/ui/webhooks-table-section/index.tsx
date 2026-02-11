import type { ReactNode } from "react";
import type { Column } from "@/shared/types";
import type { Webhook } from "@/entities/webhooks";
import { DataTable } from "@/shared/ui/data-table";
import { ListSection } from "@/shared/ui/list-section";

interface Props {
  isLoading: boolean;
  isError: boolean;
  hasWebhooks: boolean;
  emptyText: string;
  webhooks: Webhook[];
  columns: Column<Webhook>[];
  toolbar?: ReactNode;
}

export const WebhooksTableSection = ({
  isLoading,
  isError,
  hasWebhooks,
  emptyText,
  webhooks,
  columns,
  toolbar,
}: Props) => (
  <ListSection
    isLoading={isLoading}
    isError={isError}
    errorText="Ошибка при загрузке вебхуков"
    hasItems={hasWebhooks}
    emptyText={emptyText}
    toolbar={toolbar}
  >
    <DataTable rows={webhooks} columns={columns} getRowId={(w) => w.id} />
  </ListSection>
);
