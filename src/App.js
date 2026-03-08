// Directory structure:
// /public/logo.png                (put any logo image here as placeholder)
// /src/components/Logo.js
// /src/pages/Home.js
// /src/pages/Tracker.js
// /src/pages/Nests.js
// /src/App.js
// /src/index.js
// /src/index.css
// /src/App.css

// Here's the code for the main app and all three pages:

// /src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Logo from "./components/Logo";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";
import Nests from "./pages/Nests";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tracker">Tracker</Link>
        <Link to="/nests">Nests</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/nests" element={<Nests />} />
      </Routes>
    </Router>
  );
}