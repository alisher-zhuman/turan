import { useEffect, useState } from "react";

interface Params {
  initialPage?: number;
  initialLimit?: number;
  resetPage?: number;
  resetKey?: string | number;
}

export const usePagination = ({
  initialPage = 0,
  initialLimit = 10,
  resetPage,
  resetKey,
}: Params) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const pageToReset = resetPage ?? initialPage;

  useEffect(() => {
    if (resetKey === undefined) return;

    setPage(pageToReset);
  }, [resetKey, pageToReset]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(pageToReset);
  };

  return {
    page,
    limit,
    setPage,
    setLimit: handleLimitChange,
  };
};
