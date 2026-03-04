import { useState } from "react";

interface Params {
  initialIsArchived?: boolean;
}

export const useUserFilters = ({ initialIsArchived = false }: Params = {}) => {
  const [isArchived, setIsArchived] = useState(initialIsArchived);

  const filtersKey = isArchived ? "archived" : "active";

  return {
    isArchived,
    setIsArchived,
    filtersKey,
  };
};
