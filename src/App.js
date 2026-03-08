// /src/App.js
import React, { useState } from "react";  // ← add useState
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Calendar, MapPin, Heart } from "lucide-react";
import Logo from "./components/Logo";
import Home from "./pages/Home";
import Restock from "./pages/Restock";
import Nests from "./pages/Nests";
import Wellness from "./pages/Wellness";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

export default function App() {
    const [stockStatus, setStockStatus] = useState("in-stock");  // ← add this

  return (
    <Router>
      <nav>
        <div className="nav-links">
          <NavLink to="/" end>
            <span style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#fce4ec", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Calendar size={16} color="#e91e8c" />
            </span>
            Home
          </NavLink>
          <NavLink to="/Restock">
            <span style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#f3e5f5", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Heart size={16} color="#9c27b0" />
            </span>
            Restock
          </NavLink>
          <NavLink to="/nests">
            <span style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#e0f2f1", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin size={16} color="#009688" />
            </span>
            Nests
          </NavLink>
        </div>
        <div className="nav-auth">
          <NavLink to="/signin" className="signin-btn">Sign In</NavLink>
          <NavLink to="/signup" className="signup-btn">Sign Up</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Restock" element={<Restock stockStatus={stockStatus} setStockStatus={setStockStatus} />} />  {/* ← updated */}
        <Route path="/nests" element={<Nests stockStatus={stockStatus} />} />  {/* ← updated */}
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}