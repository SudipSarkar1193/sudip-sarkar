import { useState, useEffect } from "react";
import "./Home.css";
import Skills from "../Skills/Skills";
import ProjectsSection from "../Projects/ProjectsSection";
import Chat from "../chat/Chat";

import Header from "../Header/Header";
import Herosection from "../Herosection/Herosection";
import About from "../About/About";
import ContactSection from "../contact/contactSection";

const profilePic = "/icons/sudip01.jpg";
function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const myFullName = "Sudip Sarkar";

  return (
    <div className="min-h-screen overflow-x-hidden font-sans w-screen">
      {/* Header */}
      <Header myFullName={myFullName} />

      {/* Hero Section */}

      <Herosection profilePic={profilePic} />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Project Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Chat Bubble */}
      <div
        className="fixed  bottom-6 right-6 bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-full shadow-lg dark:shadow-gray-900/50 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 transition md:z-40 z-30"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <p className="text-sm md:text-base">Ask anything about me</p>
      </div>

      {/* Chat Overlay */}
      {isChatOpen && (
        <Chat setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-500/90 to-indigo-600/90 dark:from-indigo-900/70 dark:to-pink-900/70 text-white font-semibold text-md italic dark:text-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>`© 2025 {myFullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
