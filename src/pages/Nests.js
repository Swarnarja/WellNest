// /src/pages/Nests.js
import React from "react";
import { MapPin } from "lucide-react";

const nests = [
  {
    name: "UBC Life Sciences Building",
    lat: 49.2636,
    lng: -123.2449,
    hasPads: true,
  },
];

export default function Nests({stockStatus}) {
  return (
    <main className="main-content">
      <div className="logo-title">
        <div
          className="feature-icon"
          style={{
            background: "#ede8f5",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            marginBottom: "0.5rem",
          }}
        >
          <MapPin size={28} color="#9c27b0" />
        </div>
        <h1 className="brand-title" style={{ color: "#e91e8c" }}>Nearby Nests</h1>
        <p className="slogan">Find free period supplies near you ♡</p>
      </div>

      <div style={styles.card}>
        <div style={styles.mapWrapper}>
          <iframe
            title="Nests Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://www.google.com/maps?q=${nests[0].lat},${nests[0].lng}&z=16&output=embed`}
            allowFullScreen
            style={{ border: "none", display: "block" }}
          />
        </div>

    <ul style={styles.list}>
      {nests.map((nest, idx) => (
        <li key={idx} style={{ ...styles.nestItem, ...(stockStatus !== "in-stock" ? styles.empty : {}) }}>
          <div style={{
            ...styles.iconBox,
            background: stockStatus === "in-stock" ? "#ede8f5" : "#fde8f0",
          }}>
            <MapPin size={18} color={stockStatus === "in-stock" ? "#9c27b0" : "#e91e8c"} />
          </div>
          <div style={styles.nestInfo}>
            <span style={stockStatus === "in-stock" ? styles.nestName : styles.nestNameEmpty}>
              {nest.name}
            </span>
            <span style={{
              ...styles.status,
              color: stockStatus === "in-stock" ? "#9c27b0" : "#e91e8c",
              fontWeight: stockStatus !== "in-stock" ? "700" : "400",
            }}>
              {stockStatus === "in-stock" ? "✔ Pads available" : "⚠ Out of Stock — needs restock!"}
            </span>
          </div>
        </li>
      ))}
    </ul>
      </div>
    </main>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 2px 16px rgba(156, 39, 176, 0.08)",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "640px",
    margin: "0 auto",
  },
  mapWrapper: {
    borderRadius: "14px",
    overflow: "hidden",
    height: "320px",
    border: "1.5px solid #ede8f5",
    marginBottom: "1.2rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  nestItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "#fafafa",
    border: "1.5px solid #ede8f5",
    borderRadius: "14px",
    padding: "0.9rem 1.1rem",
    marginBottom: "0.75rem",
  },
  empty: {
    border: "1.5px solid #e0e0e0",
    opacity: 0.65,
  },
  iconBox: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  nestInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  nestName: {
    fontWeight: "600",
    color: "#2d1a22",
    fontSize: "0.95rem",
  },
  nestNameEmpty: {
    fontWeight: "600",
    color: "#aaa",
    fontSize: "0.95rem",
    textDecoration: "line-through",
  },
  status: {
    fontSize: "0.8rem",
    color: "#9c27b0",
  },
};