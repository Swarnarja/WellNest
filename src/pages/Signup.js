import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Account created! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{ color: "#e75480", textAlign: "center", marginBottom: "8px" }}>Create Account</h1>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "24px" }}>Join WellNest today</p>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            width: "100%", padding: "12px", marginBottom: "16px",
            border: "1.5px solid #ddd", borderRadius: "10px",
            fontSize: "16px", boxSizing: "border-box"
          }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%", padding: "12px", marginBottom: "24px",
            border: "1.5px solid #ddd", borderRadius: "10px",
            fontSize: "16px", boxSizing: "border-box"
          }}
        />
        <button
          onClick={handleSignup}
          style={{
            width: "100%", padding: "14px",
            backgroundColor: "#e75480", color: "white",
            border: "none", borderRadius: "10px",
            fontSize: "16px", fontWeight: "600", cursor: "pointer"
          }}
        >
          Sign Up
        </button>
        {message && (
          <p style={{ textAlign: "center", marginTop: "16px", color: message.includes("created") ? "green" : "red" }}>
            {message}
          </p>
        )}
        <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
          Already have an account?{" "}
          <a href="/signin" style={{ color: "#e75480", fontWeight: "600" }}>Sign In</a>
        </p>
      </div>
    </div>
  );
}