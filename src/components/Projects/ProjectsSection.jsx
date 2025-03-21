import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "./projects";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-gray-200/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 text-center">
          Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link key={index} to={`/projects/${index}`}>
              <motion.div
                key={project.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-950 p-6 rounded-xl shadow-lg dark:shadow-gray-900/50 flex flex-col items-center text-center transition-all"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-20 h-20 mb-4 object-contain"
                  />
                ) : (
                  <project.icon className="text-5xl  mb-4" /> // Render the icon correctly
                )}
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {project.name}
                </h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300 ">
                  {project.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
