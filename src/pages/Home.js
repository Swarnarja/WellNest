// /src/pages/Home.js
import React from "react";
import Logo from "../components/Logo";
import "./Home.css";

export default function Home() {
  return (
    <main className="main-content">
      <div className="logo-title">
        <Logo />
        <h1 className="brand-title">WellNest</h1>
      </div>
      <div className="page-cards">
        <section className="find-section">
          <h2 className="find-title">Find a Nest</h2>
          <p className="find-desc">
            Locate nearby places with free menstrual products
          </p>
          <div className="search-row">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or location..."
            />
            <button className="btn quick-action">Near Me</button>
          </div>
        </section>
        <section className="about-card">
          <div className="about-icon">
            <span role="img" aria-label="Nests">🩸</span>
          </div>
          <div>
            <h3>About Nests</h3>
            <p>
              Nests are safe, welcoming spaces that provide free menstrual products. Each location has been verified by our community. Don't see a nest near you? You can help by adding new locations!
            </p>
          </div>
        </section>
        <div className="nests-list-header">
          <div>Found <strong>5 nests</strong> near you</div>
          <a href="/nests" className="btn view-map">View Map</a>
        </div>
      </div>
    </main>
  );
}