import { useState } from "react";

export const useDeviceFilters = () => {
  const [verified, setVerified] = useState(false);

  const filtersKey = verified ? "verified" : "unverified";

  return {
    verified,
    setVerified,
    filtersKey,
  };
};
