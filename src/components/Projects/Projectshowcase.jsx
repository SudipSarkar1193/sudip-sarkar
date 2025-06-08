import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import projectList from "./projects.json";
import Header from "../Header/Header";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ProjectShowcase = () => {
  const { projectTitle } = useParams();
  const projectData = projectList.find((p) => p.title === projectTitle);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl text-gray-800 dark:text-gray-200">
          Project not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200">
      <Header myFullName={"Sudip Sarkar"} isOnSamepage={false} />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:from-black dark:to-purple-950/70 dark:text-gray-300 pt-20 pb-10 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {projectData.title}
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-2xl mb-8 italic "
          >
            {projectData.tagline}
          </motion.p>
          <motion.button
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 dark:bg-gray-800 dark:text-white"
            onClick={() => {
              window.open(projectData.link, "_blank", "noopener,noreferrer");
            }}
          >
            {`${projectData.liveDemo ? "View Live Demo" : "Github"}`}
          </motion.button>
        </div>
      </motion.section>

      {/* Project Description */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="max-w-4xl mx-auto py-16 px-4"
      >
        <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-6">
          Project Overview
        </motion.h2>
        <motion.p variants={fadeIn} className="leading-relaxed mb-8">
          {projectData.description}
        </motion.p>

        {/* Features */}
        <motion.div variants={staggerChildren}>
          <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
          <ul className="space-y-2">
            {projectData.features.map((feature, index) => (
              <motion.li
                key={index}
                variants={fadeIn}
                className="flex items-center"
              >
                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tech Stack */}
        <motion.div variants={staggerChildren} className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {projectData.techStack.map((tech, index) => (
              <motion.span
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm dark:bg-indigo-700 dark:text-white"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Gallery Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="bg-gray-100 dark:bg-gray-800 py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold mb-8 text-center"
          >
            Project Gallery
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.images.map((img, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={img}
                  alt={`Project screenshot ${index + 1}`}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Explore More Projects</h3>
          <div className="flex justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-gray-300 hover:text-white"
            >
              Previous Project
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-gray-300 hover:text-white"
            >
              Next Project
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectShowcase;
