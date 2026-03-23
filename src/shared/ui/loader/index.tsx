export const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minHeight: "160px",
    }}
  >
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "999px",
        border: "3px solid #cbd5e1",
        borderTopColor: "#1976d2",
        animation: "loader-spin 0.8s linear infinite",
      }}
    />

    <style>
      {`@keyframes loader-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
    </style>
  </div>
);
