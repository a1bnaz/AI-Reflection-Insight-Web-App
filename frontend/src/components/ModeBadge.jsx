import React from "react";

const ModeBadge = () => {
  const isDev = import.meta.env.DEV;
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = isDev ? "/api" : (apiUrl || "https://ai-reflection-insight-web-app.onrender.com/api");

  const bg = isDev ? "#2563eb" : "#16a34a"; // blue for dev, green for prod

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 50,
        backgroundColor: bg,
        color: "white",
        padding: "6px 10px",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        fontSize: 12,
        lineHeight: 1.2,
      }}
      aria-label={`Environment badge: ${isDev ? "Development" : "Production"}`}
    >
      <div style={{ fontWeight: 600 }}>{isDev ? "Development" : "Production"}</div>
      <div style={{ opacity: 0.9 }}>API: {baseUrl}</div>
    </div>
  );
};

export default ModeBadge;
