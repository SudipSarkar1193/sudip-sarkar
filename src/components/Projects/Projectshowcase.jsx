import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

// Modal animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.2 
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const ProjectShowcase = () => {
  const { projectTitle } = useParams();
  const projectData = projectList.find((p) => p.title === projectTitle);
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const openModal = (image, index) => {
    setSelectedImage({ src: image, index });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = selectedImage.index;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % projectData.images.length;
    } else {
      newIndex = currentIndex === 0 ? projectData.images.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage({
      src: projectData.images[newIndex],
      index: newIndex
    });
  };

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
                className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => openModal(img, index)}
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

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-80"
              onClick={closeModal}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative max-w-4xl max-h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Buttons */}
              {projectData.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={`Project screenshot ${selectedImage.index + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Image Counter */}
              {projectData.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage.index + 1} / {projectData.images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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