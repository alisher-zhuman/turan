import { useState } from "react";

interface Params {
  initialVerified?: boolean;
}

export const useDeviceFilters = ({ initialVerified = false }: Params = {}) => {
  const [verified, setVerified] = useState(initialVerified);

  const filtersKey = verified ? "verified" : "unverified";

  return {
    verified,
    setVerified,
    filtersKey,
  };
};
