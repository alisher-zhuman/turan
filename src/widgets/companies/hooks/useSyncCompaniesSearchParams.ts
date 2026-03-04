import { useEffect, useMemo } from "react";

import { useSearchParams } from "react-router";

import {
  type CompaniesSearchState,
  createCompaniesSearchString,
} from "@/features/companies";

export const useSyncCompaniesSearchParams = (state: CompaniesSearchState) => {
  const { isArchived } = state;

  const [searchParams, setSearchParams] = useSearchParams();

  const companiesSearchString = useMemo(
    () =>
      createCompaniesSearchString({
        isArchived,
      }),
    [isArchived],
  );

  const currentSearchString = searchParams.toString();

  useEffect(() => {
    if (currentSearchString === companiesSearchString) {
      return;
    }

    setSearchParams(new URLSearchParams(companiesSearchString), {
      replace: true,
    });
  }, [currentSearchString, companiesSearchString, setSearchParams]);
};
