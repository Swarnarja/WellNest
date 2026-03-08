// /src/pages/Nests.js
import React from "react";
import "./Nests.css";

// For now, hard-code one icon at UBC Life Sciences (use Google Maps link)
const nests = [
  {
    name: "UBC Life Sciences Building",
    lat: 49.2636,
    lng: -123.2449,
    hasPads: true, // Change for demo
  },
  // Add more locations as desired
];

export default function Nests() {
  return (
    <div className="nests-map-page">
      <h2>Nearby Nests</h2>
      <iframe
        title="Nests Map"
        width="100%"
        height="400"
        frameBorder="0"
        src={`https://www.google.com/maps?q=${nests[0].lat},${nests[0].lng}&z=16&output=embed`}
        allowFullScreen
      ></iframe>
      <ul className="nests-list">
        {nests.map((nest, idx) => (
          <li key={idx} className={`nest-item ${nest.hasPads ? "" : "empty"}`}>
            <span>
              {nest.hasPads ? "🩸" : <s>🩸</s>}
              {nest.name}
              {!nest.hasPads && <span className="empty-text"> (empty)</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}