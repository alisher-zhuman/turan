import { useState } from "react";

export const useUserFilters = () => {
  const [isArchived, setIsArchived] = useState(false);

  const filtersKey = isArchived ? "archived" : "active";

  return {
    isArchived,
    setIsArchived,
    filtersKey,
  };
};
