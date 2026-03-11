import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Props {
  error: Error | null;
  componentStack?: string;
}

export const ErrorFallback = ({ error, componentStack }: Props) => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: 2,
      py: 4,
      backgroundColor: "background.default",
    }}
  >
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 560,
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={1.5} alignItems="flex-start">
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "50%",
              color: "error.main",
              backgroundColor: "error.light",
            }}
          >
            <ErrorOutlineIcon />
          </Box>

          <Typography variant="h5" component="h1" fontWeight={700}>
            Что-то пошло не так
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Интерфейс столкнулся с ошибкой. Попробуйте перезагрузить страницу.
          </Typography>
        </Stack>

        {import.meta.env.DEV && error ? (
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 2,
              overflowX: "auto",
              borderRadius: 2,
              backgroundColor: "grey.100",
              color: "text.primary",
              fontSize: 13,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {[error.message, componentStack].filter(Boolean).join("\n\n")}
          </Box>
        ) : null}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>

          <Button variant="outlined" onClick={() => window.location.assign("/")}>
            Перейти на главную
          </Button>
        </Stack>
      </Stack>
    </Paper>
  </Box>
);
