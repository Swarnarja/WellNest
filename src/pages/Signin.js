import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      navigate("/");
    } else {
      setError(data.error);
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
        <h1 style={{ color: "#e75480", textAlign: "center", marginBottom: "8px" }}>Welcome Back</h1>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "24px" }}>Sign in to WellNest</p>

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
          onClick={handleLogin}
          style={{
            width: "100%", padding: "14px",
            backgroundColor: "#e75480", color: "white",
            border: "none", borderRadius: "10px",
            fontSize: "16px", fontWeight: "600", cursor: "pointer"
          }}
        >
          Sign In
        </button>
        {error && <p style={{ textAlign: "center", marginTop: "16px", color: "red" }}>{error}</p>}
        <p style={{ textAlign: "center", marginTop: "20px", color: "#888" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#e75480", fontWeight: "600" }}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}