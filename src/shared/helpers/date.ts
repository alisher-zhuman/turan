export const formatDateTime = (
  value: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("ru-RU", options);
};
