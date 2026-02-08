import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const NotFoundWidget = () => {
  const [seconds, setSeconds] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    if (seconds === 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      textAlign="center"
    >
      <Typography variant="h1" component="h1" fontWeight={700}>
        404
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Похоже, вы свернули не туда. Страница не найдена.
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Перенаправление на главную через {seconds} секунд
        {seconds > 1 ? "ы" : ""}.
      </Typography>

      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Вернуться назад
      </Button>
    </Box>
  );
};
