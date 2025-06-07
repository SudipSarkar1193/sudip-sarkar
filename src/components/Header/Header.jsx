import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = ({ myFullName, isOnSamepage = true }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Function to smoothly scroll to a section
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector("header").offsetHeight; // Get navbar height

      // Get section's position relative to viewport
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      // Scroll to the section with an offset to avoid overlap
      window.scrollTo({
        top: elementPosition - navbarHeight - 5, // Adjust 20px further down
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  return (
    <header className="shadow-md fixed w-full h-16 z-50 border bg-white dark:bg-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black dark:text-gray-100">
          {myFullName}
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {[
            { name: "About", id: "about" },
            { name: "Skills", id: "skills" },
            { name: "Projects", id: "projects" },
            { name: "Contact", id: "contact" },
          ].map((link) => (
            <li key={link.name}>
              <button
                onClick={() => {
                  if (!isOnSamepage) {
                    setTimeout(() => {
                      handleScroll(link.id);
                    }, 1300);
                    navigate("/");
                  } else {
                    handleScroll(link.id);
                  }
                }}
                className="text-gray-950 font-semibold dark:font-normal text-lg  dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-red-700 text-gray-800 dark:text-gray-200 transition flex items-center justify-center"
        >
          {isDarkMode ? (
            <FaSun className="text-xl" />
          ) : (
            <FaMoon className="text-xl" />
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none ml-4"
        >
          {isMenuOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`md:hidden fixed top-0 left-0 h-full w-48 bg-gray-300 dark:bg-gray-900 shadow-md z-20 shadow-lg`}
      >
        <ul className="flex flex-col space-y-8 p-6 mt-16 ">
          {[
            { name: "About", id: "about" },
            { name: "Skills", id: "skills" },
            { name: "Projects", id: "projects" },
            { name: "Contact", id: "contact" },
          ].map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleScroll(link.id)}
                className="text-gray-600 dark:text-gray-300 font-semibold text-2xl hover:text-blue-500 dark:hover:text-blue-400 transition block"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </header>
  );
};

export default Header;
