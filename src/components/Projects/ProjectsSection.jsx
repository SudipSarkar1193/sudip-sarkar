import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "./projects.json";

export default function ProjectsSection() {
  // Separate personal and group projects
  const personalProjects = projects.filter(
    (project) => project.type.toLowerCase() === "personal"
  );
  const groupProjects = projects.filter(
    (project) => project.type.toLowerCase() === "group"
  );

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 text-center tracking-tight"
        >
          My Projects
        </motion.h3>

        {/* Personal Projects Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h4 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8 text-center">
            Personal Projects
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project, index) => (
              <Link
                key={index}
                to={`/projects/${project.title}`}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-gray-200 to-blue-100 dark:bg-gradient-to-r dark:from-gray-950 dark:to-black p-4 rounded-xl shadow-md dark:shadow-gray-900/50 flex flex-col items-center text-center min-h-[250px] transition-all duration-300 hover:brightness-105 dark:hover:brightness-110"
                >
                  {project.images && project.images.length > 0 ? (
                    <div className="w-full mb-3">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full max-h-[150px] object-contain border-2 border-gray-200 dark:border-gray-700 rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-2xl text-gray-500 dark:text-gray-400">
                      {project.title.charAt(0)}
                    </div>
                  )}
                  <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {project.title}
                  </h5>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {project.tagline}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {project.techStack.join(" • ")}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Group Projects Section */}
        {groupProjects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h4 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-8 text-center">
              Group Projects
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupProjects.map((project, index) => (
                <Link key={index} to={`/projects/${index}`}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-gray-200 to-blue-100 
                    dark:bg-gradient-to-r dark:from-gray-950 dark:to-black 
                    p-6 rounded-xl shadow-md dark:shadow-gray-900/50 
                    flex flex-col items-center text-center 
                    transition-all duration-300 
                    hover:brightness-105 dark:hover:brightness-110"
                  >
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        className="w-24 h-24 mb-4 object-contain rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-4xl text-gray-500 dark:text-gray-400">
                        {project.title.charAt(0)}
                      </div>
                    )}
                    <h5 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {project.title}
                    </h5>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {project.tagline}
                    </p>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {project.techStack.join(" • ")}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
