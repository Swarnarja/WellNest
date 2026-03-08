// /src/components/Logo.js
import React from "react";
import "./Logo.css"; // You may need to create this if you want logo-specific styles

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <img
        src="/logo.png"
        alt="WellNest Logo"
        className="logo"
      />
    </div>
  );
}