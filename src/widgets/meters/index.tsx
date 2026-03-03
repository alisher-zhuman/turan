import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router";

import Box from "@mui/material/Box";

import { useGroupActions, useGroupsQuery } from "@/features/groups";
import { createMeterColumns, useMeters } from "@/features/meters";

import { ERROR_TEXTS, ROWS_PER_PAGE_LABELS } from "@/shared/constants";
import { TableSection } from "@/shared/ui/table-section";

import { useMetersUiState } from "./hooks/useMetersUiState";
import { MetersHeader } from "./ui/meters-header";
import { MetersModals } from "./ui/meters-modals";

type ValveFilter = "all" | "open" | "closed";

interface MeterSearchState {
  page: number;
  limit: number;
  filters: {
    status: string;
    isArchived: boolean;
    groupId: number | null;
    customerId: string;
    meterName: string;
    valveFilter: ValveFilter;
  };
}

const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 10;
const DEFAULT_STATUS = "all";
const DEFAULT_VALVE_FILTER: ValveFilter = "all";
const VALID_STATUSES = new Set(["all", "normal", "warning", "error"]);
const VALID_VALVE_FILTERS = new Set<ValveFilter>(["all", "open", "closed"]);

const parsePositiveInt = (value: string | null): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const parseMeterSearchState = (params: URLSearchParams): MeterSearchState => {
  const page = parsePositiveInt(params.get("page"));
  const limit = parsePositiveInt(params.get("limit"));
  const groupId = parsePositiveInt(params.get("groupId"));

  const statusRaw = params.get("status")?.trim() ?? DEFAULT_STATUS;
  const status = VALID_STATUSES.has(statusRaw) ? statusRaw : DEFAULT_STATUS;

  const archivedRaw = params.get("archived");
  const isArchived = archivedRaw === "1" || archivedRaw === "true";

  const valveRaw = params.get("valve") as ValveFilter | null;
  const valveFilter = VALID_VALVE_FILTERS.has(
    valveRaw ?? DEFAULT_VALVE_FILTER,
  )
    ? (valveRaw ?? DEFAULT_VALVE_FILTER)
    : DEFAULT_VALVE_FILTER;

  return {
    page: page ? page - 1 : DEFAULT_PAGE,
    limit: limit ?? DEFAULT_LIMIT,
    filters: {
      status,
      isArchived,
      groupId,
      customerId: params.get("customerId")?.trim() ?? "",
      meterName: params.get("meterName")?.trim() ?? "",
      valveFilter,
    },
  };
};

const createMetersSearchString = ({
  page,
  limit,
  status,
  isArchived,
  groupId,
  customerId,
  meterName,
  valveFilter,
}: {
  page: number;
  limit: number;
  status: string;
  isArchived: boolean;
  groupId: number | null;
  customerId: string;
  meterName: string;
  valveFilter: ValveFilter;
}) => {
  const params = new URLSearchParams();

  if (page > DEFAULT_PAGE) {
    params.set("page", String(page + 1));
  }

  if (limit !== DEFAULT_LIMIT) {
    params.set("limit", String(limit));
  }

  if (status !== DEFAULT_STATUS) {
    params.set("status", status);
  }

  if (isArchived) {
    params.set("archived", "1");
  }

  if (groupId !== null) {
    params.set("groupId", String(groupId));
  }

  const normalizedCustomerId = customerId.trim();
  const normalizedMeterName = meterName.trim();

  if (normalizedCustomerId) {
    params.set("customerId", normalizedCustomerId);
  }

  if (normalizedMeterName) {
    params.set("meterName", normalizedMeterName);
  }

  if (valveFilter !== DEFAULT_VALVE_FILTER) {
    params.set("valve", valveFilter);
  }

  return params.toString();
};

export const MetersWidget = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialSearchState] = useState(() => parseMeterSearchState(searchParams));

  const {
    meters,
    total,
    hasMeters,
    emptyText,
    isLoading,
    isError,
    page,
    limit,
    setPage,
    setLimit,
    status,
    setStatus,
    isArchived,
    setIsArchived,
    valveFilter,
    setValveFilter,
    groupId,
    setGroupId,
    customerId,
    setCustomerId,
    meterName,
    setMeterName,
    isAdmin,
    canEdit,
    canManageMetersToGroups,
    selectedIds,
    allSelected,
    isIndeterminate,
    handleToggleAll,
    handleToggleOne,
    handleDeleteOne,
    handleDeleteSelected,
    handleCommand,
    handleResetFilters,
    clearSelection,
  } = useMeters({
    initialFilters: initialSearchState.filters,
    initialPage: initialSearchState.page,
    initialLimit: initialSearchState.limit,
  });

  const metersSearchString = useMemo(
    () =>
      createMetersSearchString({
        page,
        limit,
        status,
        isArchived,
        groupId,
        customerId,
        meterName,
        valveFilter,
      }),
    [page, limit, status, isArchived, groupId, customerId, meterName, valveFilter],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === metersSearchString) {
      return;
    }

    setSearchParams(new URLSearchParams(metersSearchString), { replace: true });
  }, [currentSearchString, metersSearchString, setSearchParams]);

  const { groups } = useGroupsQuery({
    page: 0,
    limit: 0,
    forFilter: true,
  });

  const { handleAddMetersToGroup, handleRemoveMetersFromGroup } =
    useGroupActions({
      isAdmin,
      canManageMetersToGroups,
    });

  const {
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
  } = useMetersUiState({
    canEdit,
    canManageMetersToGroups,
    selectedIds,
    groups,
    groupId,
    onAddMetersToGroup: handleAddMetersToGroup,
    onRemoveMetersFromGroup: handleRemoveMetersFromGroup,
    onClearSelection: clearSelection,
  });

  const columns = useMemo(
    () =>
      createMeterColumns({
        isAdmin,
        canEdit,
        canManageMetersToGroups,
        selectedIds,
        allSelected,
        isIndeterminate,
        onToggleAll: handleToggleAll,
        onToggleOne: handleToggleOne,
        onEdit: handleEdit,
        onDeleteOne: handleDeleteOne,
        onCommand: handleCommand,
        onView: handleView,
      }),
    [
      isAdmin,
      canEdit,
      canManageMetersToGroups,
      selectedIds,
      allSelected,
      isIndeterminate,
      handleToggleAll,
      handleToggleOne,
      handleEdit,
      handleDeleteOne,
      handleCommand,
      handleView,
    ],
  );

  return (
    <>
      <Box>
        <MetersHeader
          isAdmin={isAdmin}
          canManageMetersToGroups={canManageMetersToGroups}
          selectedCount={selectedIds.length}
          hasGroups={groups.length > 0}
          onOpenFilters={() => setFiltersOpen(true)}
          onDeleteSelected={handleDeleteSelected}
          onAddSelectedToGroup={openAddToGroupModal}
          onRemoveSelectedFromGroup={openRemoveFromGroupModal}
          onResetFilters={handleResetFilters}
        />

        <TableSection
          isLoading={isLoading}
          isError={isError}
          errorText={ERROR_TEXTS.meters}
          hasItems={hasMeters}
          emptyText={emptyText}
          rows={meters}
          columns={columns}
          getRowId={(m) => m.id}
          pagination={{
            page,
            limit,
            total,
            onPageChange: setPage,
            labelRowsPerPage: ROWS_PER_PAGE_LABELS.meters,
            onLimitChange: setLimit,
          }}
        />
      </Box>

      <MetersModals
        editOpen={isEditModalOpen}
        editingMeter={editingMeter}
        onCloseEdit={closeEditModal}
        canArchive={isAdmin}
        detailsOpen={isDetailsOpen}
        detailsMeter={detailsMeter}
        onCloseDetails={closeDetailsModal}
        groupModalOpen={groupModalOpen}
        groupModalMode={groupModalMode}
        groups={groups}
        selectedCount={selectedIds.length}
        selectedGroupId={groupModalGroupId}
        onChangeGroup={setGroupModalGroupId}
        onCloseGroupModal={closeGroupModal}
        onConfirmGroupModal={handleConfirmGroupModal}
        filtersOpen={isFiltersOpen}
        onCloseFilters={() => setFiltersOpen(false)}
        status={status}
        onStatusChange={setStatus}
        valveFilter={valveFilter}
        onValveFilterChange={setValveFilter}
        isArchived={isArchived}
        onArchivedChange={setIsArchived}
        groupId={groupId}
        onGroupChange={setGroupId}
        customerId={customerId}
        onCustomerIdChange={setCustomerId}
        meterName={meterName}
        onMeterNameChange={setMeterName}
      />
    </>
  );
};
