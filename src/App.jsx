import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import FloatingIcons from "./components/FloatingIcons/FloatingIcons";
import ProjectShowcase from "./components/Projects/Projectshowcase";
import { chatServer } from "./components/chat/chatServer";

function App() {
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const res = await fetch(`${chatServer}/health`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log("Server Health Check Response:", await res.text());
      } catch (error) {
        console.error("Health check failed:", error);
      }
    };

    checkServerHealth();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden ">
      <FloatingIcons />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectTitle" element={<ProjectShowcase />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
