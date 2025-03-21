import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import FloatingIcons from "./components/FloatingIcons/FloatingIcons";
import ProjectShowcase from "./components/Projects/Projectshowcase";



function App() {
  return (
    <div className="min-h-screen overflow-x-hidden ">
      <FloatingIcons />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectId" element={<ProjectShowcase />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
