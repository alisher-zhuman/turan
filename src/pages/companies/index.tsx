import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CompaniesTable } from "@/features/companies/ui/companies-table";
import { CreateCompanyForm } from "@/features/companies/ui/create-company-form";
import { getCompanies, refreshCompanyToken } from "@/shared/api/companies";
import { Loader } from "@/shared/ui/loader";
import { Modal } from "@/shared/ui/modal";
import toast from "react-hot-toast";

const Companies = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const refreshTokenMutation = useMutation({
    mutationFn: (id: number) => refreshCompanyToken(id),
    onSuccess: () => {
      toast.success("API ключ обновлён");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: () => {
      toast.error("Ошибка при обновлении API ключа");
    },
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

        <CompaniesTable
          companies={data}
          onRefreshToken={(id) => refreshTokenMutation.mutate(id)}
        />
      </Box>

      <Modal open={isModalOpen} onClose={toggleModal} title="Создать компанию">
        <CreateCompanyForm onClose={toggleModal} />
      </Modal>
    </>
  );
};

export default Companies;
