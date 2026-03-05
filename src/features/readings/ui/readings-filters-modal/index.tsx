import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { parsePositiveInt } from "@/shared/helpers";
import { Modal } from "@/shared/ui/modal";

interface Props {
  open: boolean;
  onClose: () => void;
  meterId: number | null;
  onMeterIdChange: (value: number | null) => void;
  customerId: string;
  onCustomerIdChange: (value: string) => void;
  client: string;
  onClientChange: (value: string) => void;
  address: string;
  onAddressChange: (value: string) => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
}

export const ReadingsFiltersModal = ({
  open,
  onClose,
  meterId,
  onMeterIdChange,
  customerId,
  onCustomerIdChange,
  client,
  onClientChange,
  address,
  onAddressChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: Props) => (
  <Modal open={open} onClose={onClose} title="Фильтры">
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        fullWidth
        size="small"
        type="number"
        label="Номер водомера"
        value={meterId ?? ""}
        onChange={(event) =>
          onMeterIdChange(parsePositiveInt(event.target.value || null))
        }
        slotProps={{ htmlInput: { min: 1 } }}
      />

      <TextField
        fullWidth
        size="small"
        label="Лицевой счет"
        value={customerId}
        onChange={(event) => onCustomerIdChange(event.target.value)}
      />

      <TextField
        fullWidth
        size="small"
        label="ФИО"
        value={client}
        onChange={(event) => onClientChange(event.target.value)}
      />

      <TextField
        fullWidth
        size="small"
        label="Адрес"
        value={address}
        onChange={(event) => onAddressChange(event.target.value)}
      />

      <TextField
        fullWidth
        size="small"
        type="date"
        label="Дата от"
        value={dateFrom}
        onChange={(event) => onDateFromChange(event.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { lang: "ru-RU" },
        }}
      />

      <TextField
        fullWidth
        size="small"
        type="date"
        label="Дата до"
        value={dateTo}
        onChange={(event) => onDateToChange(event.target.value)}
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { lang: "ru-RU" },
        }}
      />
    </Box>
  </Modal>
);
