import { api } from ".";

export const getCompanies = async () => {
  const { data } = await api.get("/companies", {
    headers: {
      "ngrok-skip-browser-warning": "1",
    },
  });

  return data.data;
};
