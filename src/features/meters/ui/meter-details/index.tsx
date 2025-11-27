import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Field } from "../field";
import type { Meter } from "../../interfaces";
import { STATUS_LABELS, VALVE_LABELS } from "../../utils/constants";

interface Props {
  meter: Meter;
}

export const MeterDetails = ({ meter }: Props) => (
  <Box display="flex" flexDirection="column" gap={1}>
    <Typography variant="subtitle1" fontWeight={600}>
      Счётчик #{meter.id} — {meter.name}
    </Typography>

    <Divider sx={{ my: 1 }} />

    <Field label="ID" value={meter.id} />
    <Field label="Номер счётчика" value={meter.name} />
    <Field label="Пароль" value={meter.password} />
    <Field label="Customer ID" value={meter.customerID} />
    <Field label="Клиент" value={meter.client} />
    <Field label="Адрес" value={meter.address} />
    <Field label="Описание" value={meter.descriptions} />
    <Field
      label="Клапан"
      value={
        meter.valveStatus &&
        (VALVE_LABELS[meter.valveStatus] || meter.valveStatus)
      }
    />
    <Field
      label="Изменение клапана"
      value={
        meter.valveStatusChange
          ? new Date(meter.valveStatusChange).toLocaleString("ru-RU")
          : null
      }
    />
    <Field label="Статус батареи" value={meter.batteryStatus} />
    <Field label="Последнее показание" value={meter.lastReading} />
    <Field label="Ожидаемая команда" value={meter.pendingCommand} />
    <Field label="Статус" value={STATUS_LABELS[meter.status] || meter.status} />
    <Field label="Сообщение об ошибке" value={meter.errorMessage} />
    <Field label="В архиве" value={meter.isArchived ? "Да" : "Нет"} />
    <Field
      label="Создан"
      value={new Date(meter.createdAt).toLocaleString("ru-RU")}
    />
    <Field
      label="Обновлён"
      value={new Date(meter.updatedAt).toLocaleString("ru-RU")}
    />
  </Box>
);


