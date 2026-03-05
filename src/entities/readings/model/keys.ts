export const readingsKeys = {
  all: ["readings"] as const,
  list: (params: {
    page: number;
    limit: number;
    meterId: number | null;
    customerId: string;
    client: string;
    address: string;
    dateFrom: string;
    dateTo: string;
  }) => [...readingsKeys.all, params] as const,
};
