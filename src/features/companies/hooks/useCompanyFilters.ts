import { useState } from "react";

interface Params {
  initialIsArchived?: boolean;
}

export const useCompanyFilters = ({ initialIsArchived = false }: Params = {}) => {
  const [isArchived, setIsArchived] = useState(initialIsArchived);

  return {
    isArchived,
    setIsArchived,
  };
};
