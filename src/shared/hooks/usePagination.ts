import { useEffect, useState } from "react";

interface Params {
  initialPage?: number;
  initialLimit?: number;
  resetKey?: string | number;
}

export const usePagination = ({
  initialPage = 0,
  initialLimit = 10,
  resetKey,
}: Params) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    if (resetKey === undefined) return;

    setPage(initialPage);
  }, [resetKey, initialPage]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(initialPage);
  };

  return {
    page,
    limit,
    setPage,
    setLimit: handleLimitChange,
  };
};
