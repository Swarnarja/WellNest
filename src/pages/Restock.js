import React, { useState, useEffect, useRef } from "react";
import "./Restock.css";

export default function Restock() {
  const [restockHistory, setRestockHistory] = useState([]);
  const [stockStatus, setStockStatus] = useState("in-stock");
  const [isConnected, setIsConnected] = useState(false);
  const [lowStock, setLowStock] = useState(false);
  const stockStatusRef = useRef("in-stock");

  const RESTOCK_THRESHOLD_CM = 70;

  const setStock = (val) => {
    stockStatusRef.current = val;
    setStockStatus(val);
  };

  const triggerRestock = () => {
    if (stockStatusRef.current === "restock") return;
    const now = new Date();
    const newEvent = {
      id: now.getTime(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };
    setRestockHistory((prevHistory) => [newEvent, ...prevHistory]);
    setStock("restock");
  };

  const markAsRestocked = () => {
    setStock("in-stock");
    setLowStock(false);
  };

  const connectToArduino = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      setIsConnected(true);

      const textDecoder = new TextDecoderStream();
      port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) { reader.releaseLock(); break; }

        buffer += value;

        if (buffer.includes("\n")) {
          const lines = buffer.split("\n");
          buffer = lines.pop();

          lines.forEach((line) => {
            const data = line.trim();

            // Check if Arduino is sending a numeric distance value (in cm)
            const distance = parseFloat(data);
            if (!isNaN(distance)) {
              if (distance >= RESTOCK_THRESHOLD_CM) {
                // Pad is 40cm or more away = low stock
                setLowStock(true);
                triggerRestock();
              }
              // Do not auto-clear — user must click Resolved
            } else {
              // Fallback: handle string signals from Arduino
              if (data === "RESTOCK" || data === "FAR" || data === "LOW") {
                setLowStock(true);
                triggerRestock();
              }
              // Do not auto-clear — user must click Resolved
            }
          });
        }
      }
    } catch (error) {
      console.error("Connection failed:", error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connectToArduino();
  }, []);

  return (
    <div className="restock-page" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Inventory Tracker</h1>
      <p>Monitor your inventory levels and view historical data.</p>

      <div style={{ marginBottom: "16px" }}>
        {isConnected ? (
          <span style={{ color: "green", fontWeight: "bold" }}>✅ Sensor Connected & Monitoring</span>
        ) : (
          <span style={{ color: "#999", fontWeight: "bold" }}>⏳ Waiting for sensor connection...</span>
        )}
      </div>

      <h2>Inventory Status</h2>

      {lowStock && (
        <div style={{
          backgroundColor: "#fff8e1",
          border: "2px solid #f9a825",
          borderRadius: "16px",
          padding: "16px 20px",
          marginBottom: "16px",
          maxWidth: "480px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{ backgroundColor: "#f9a825", borderRadius: "8px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>!</div>
          <span style={{ fontWeight: "700", color: "#e65100" }}>⚠️ Low Stock! Pad is {RESTOCK_THRESHOLD_CM}cm or more from sensor — restock soon.</span>
        </div>
      )}

      {stockStatus === "restock" ? (
        <div style={{
          backgroundColor: "white",
          border: "2px solid #e0e0e0",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "20px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          maxWidth: "480px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                backgroundColor: "#c62828",
                borderRadius: "8px",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}>!</div>
              <span style={{ fontWeight: "800", fontSize: "1rem", color: "#222" }}>Restock Needed!</span>
            </div>
            <button
              onClick={markAsRestocked}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#999" }}
            >✕</button>
          </div>
          <p style={{ color: "#666", fontSize: "0.92rem", marginBottom: "16px", paddingLeft: "38px" }}>
            Product level is low — please restock menstrual products soon.
          </p>
          <div style={{ display: "flex", gap: "10px", paddingLeft: "38px" }}>
            <button
              onClick={() => window.open("https://www.amazon.com/s?k=ubykotex&crid=2TDPK8YNINPAE&sprefix=ubykote%2Caps%2C192&ref=nb_sb_noss_2", "_blank")}
              style={{ backgroundColor: "#c62828", color: "white", border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem" }}
            >🛒 Restock Now</button>
            <button
              onClick={markAsRestocked}
              style={{ backgroundColor: "#f5f5f5", color: "#555", border: "none", borderRadius: "10px", padding: "10px 20px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem" }}
            >✅ Resolved</button>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: "#e8f5e9", border: "1px solid #2e7d32", padding: "15px", borderRadius: "8px", marginBottom: "20px", color: "#2e7d32", fontWeight: "bold" }}>
          ✅ In Stock — All levels are good.
        </div>
      )}

      <h2>Restock History</h2>
      {restockHistory.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic" }}>No restock events logged yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#eee", textAlign: "left" }}>
              <th style={{ padding: "10px", borderBottom: "2px solid #ccc" }}>Date</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ccc" }}>Time</th>
              <th style={{ padding: "10px", borderBottom: "2px solid #ccc" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {restockHistory.map((event) => (
              <tr key={event.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{event.date}</td>
                <td style={{ padding: "10px" }}>{event.time}</td>
                <td style={{ padding: "10px", color: "#2e7d32", fontWeight: "bold" }}>✅ Resolved</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
