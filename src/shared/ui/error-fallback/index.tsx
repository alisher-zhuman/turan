import type { CSSProperties } from "react";

interface Props {
  error: Error | null;
  componentStack?: string;
}

const containerStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 16px",
  backgroundColor: "#f8fafc",
};

const cardStyle: CSSProperties = {
  width: "100%",
  maxWidth: "560px",
  padding: "32px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
};

const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "48px",
  height: "48px",
  borderRadius: "999px",
  color: "#b91c1c",
  backgroundColor: "#fee2e2",
  fontSize: "24px",
  lineHeight: 1,
};

const titleStyle: CSSProperties = {
  margin: "0",
  fontSize: "28px",
  fontWeight: 700,
  color: "#0f172a",
};

const descriptionStyle: CSSProperties = {
  margin: "0",
  fontSize: "16px",
  lineHeight: 1.5,
  color: "#475569",
};

const detailsStyle: CSSProperties = {
  margin: 0,
  padding: "16px",
  overflowX: "auto",
  borderRadius: "12px",
  backgroundColor: "#f1f5f9",
  color: "#0f172a",
  fontSize: "13px",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  boxSizing: "border-box",
};

const actionsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
};

const primaryButtonStyle: CSSProperties = {
  border: 0,
  borderRadius: "10px",
  padding: "12px 18px",
  backgroundColor: "#1976d2",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const secondaryButtonStyle: CSSProperties = {
  borderRadius: "10px",
  padding: "12px 18px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#ffffff",
  color: "#0f172a",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

export const ErrorFallback = ({ error, componentStack }: Props) => (
  <div style={containerStyle}>
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "flex-start",
        }}
      >
        <div style={badgeStyle} aria-hidden="true">
          !
        </div>

        <h1 style={titleStyle}>Что-то пошло не так</h1>

        <p style={descriptionStyle}>
          Интерфейс столкнулся с ошибкой. Попробуйте перезагрузить страницу.
        </p>
      </div>

      {import.meta.env.DEV && error ? (
        <pre style={{ ...detailsStyle, marginTop: "24px" }}>
          {[error.message, componentStack].filter(Boolean).join("\n\n")}
        </pre>
      ) : null}

      <div style={{ ...actionsStyle, marginTop: "24px" }}>
        <button
          type="button"
          style={primaryButtonStyle}
          onClick={() => window.location.reload()}
        >
          Обновить страницу
        </button>

        <button
          type="button"
          style={secondaryButtonStyle}
          onClick={() => window.location.assign("/")}
        >
          Перейти на главную
        </button>
      </div>
    </div>
  </div>
);
