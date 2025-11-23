import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import { getCompanies } from "@/shared/api/companies";
import { Loader } from "@/shared/ui/loader";
import { CompaniesTable } from "@/features/companies/ui/companies-table";

const Companies = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <Alert severity="error" variant="filled">
        Ошибка при загрузке компаний
      </Alert>
    );

  return <CompaniesTable companies={data} />;
};

export default Companies;
