import Alert from "@mui/material/Alert";
import { ERROR_TEXTS } from "@/shared/constants";
import { MetersActions } from "@/features/meters";

interface Props {
  isError: boolean;
  isAdmin: boolean;
  canManageMetersToGroups: boolean;
  selectedCount: number;
  hasGroups: boolean;
  onOpenFilters: () => void;
  onDeleteSelected: () => void;
  onAddSelectedToGroup: () => void;
  onRemoveSelectedFromGroup: () => void;
  onResetFilters: () => void;
}

export const MetersHeader = ({
  isError,
  isAdmin,
  canManageMetersToGroups,
  selectedCount,
  hasGroups,
  onOpenFilters,
  onDeleteSelected,
  onAddSelectedToGroup,
  onRemoveSelectedFromGroup,
  onResetFilters,
}: Props) => (
  <>
    {isError && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {ERROR_TEXTS.meters}
      </Alert>
    )}

    <MetersActions
      isAdmin={isAdmin}
      canManageMetersToGroups={canManageMetersToGroups}
      selectedCount={selectedCount}
      hasGroups={hasGroups}
      onOpenFilters={onOpenFilters}
      onDeleteSelected={onDeleteSelected}
      onAddSelectedToGroup={onAddSelectedToGroup}
      onRemoveSelectedFromGroup={onRemoveSelectedFromGroup}
      onResetFilters={onResetFilters}
    />
  </>
);
