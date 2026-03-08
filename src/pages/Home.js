import React from "react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { Package, MapPin, Heart } from "lucide-react";
import "./Home.css";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <main className="main-content">
      <div className="logo-title">
        <Logo />
        <h1 className="brand-title">WellNest</h1>
        <p className="slogan">♡ We've got you covered, period! ♡</p>
      </div>
      <div className="feature-cards">
        <div className="feature-card clickable" onClick={() => navigate('/restock')}>
          <div className="feature-icon" style={{ background: '#fde8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={24} color="#e91e8c" />
          </div>
          <h3>Restock Alerts</h3>
          <p>Verify your inventory status, order products, and check your history.</p>
        </div>

        <div className="feature-card clickable" onClick={() => navigate('/nests')}>
          <div className="feature-icon" style={{ background: '#ede8f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={24} color="#9c27b0" />
          </div>
          <h3>Nest Finder</h3>
          <p>Locate public spaces with free pads and tampons. Never worry about being caught unprepared.</p>
        </div>

        <div className="feature-card clickable" onClick={() => navigate('/wellness')}>
          <div className="feature-icon" style={{ background: '#e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={24} color="#009688" />
          </div>
          <h3>Wellness Tips</h3>
          <p>Get wellness advice, self-care tips, and healthcare insight throughout your cycle.</p>
        </div>
      </div>
    </main>
  );
}