import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CompaniesTable } from "@/features/companies/ui/companies-table";
import { CreateCompanyForm } from "@/features/companies/ui/create-company-form";
import { getCompanies } from "@/shared/api/companies";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";

const Companies = () => {
  const [isModalOpen, setModalOpen] = useState(false);

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

  const toggleModal = () => setModalOpen((prev) => !prev);

  return (
    <>
      <Box>
        <Box mb={2} display="flex" justifyContent="flex-end">
          <Button onClick={toggleModal} variant="contained" color="primary">
            Создать
          </Button>
        </Box>

        <CompaniesTable companies={data} />
      </Box>

      <Modal open={isModalOpen} onClose={toggleModal} title="Создать компанию">
        <CreateCompanyForm onClose={toggleModal} />
      </Modal>
    </>
  );
};

export default Companies;
