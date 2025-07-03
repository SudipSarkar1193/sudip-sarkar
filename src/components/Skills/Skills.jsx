import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaJava,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiC,
  SiCplusplus,
  SiPython,
  SiGo,
  SiMongodb,
  SiMysql,
  SiShell,
} from "react-icons/si";

const pythonImg = "/icons/4518857_python_icon.png";

const skills = [
  { name: "React", icon: <FaReact className="text-blue-500 text-4xl" /> },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-500 text-4xl" />,
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare className="text-yellow-500 text-4xl" />,
  },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-4xl" /> },
  { name: "C", icon: <SiC className="text-blue-600 text-4xl" /> },
  { name: "C++", icon: <SiCplusplus className="text-blue-700 text-4xl" /> },
  { name: "Java", icon: <FaJava className="text-red-600 text-4xl" /> },
  { name: "Python", image: pythonImg },
  { name: "Golang", icon: <SiGo className="text-blue-400 text-4xl" /> },
  { name: "SQL", icon: <SiMysql className="text-indigo-500 text-4xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-4xl" /> },
  {
    name: "Shell Script",
    icon: <SiShell className="text-gray-700 text-4xl" />,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 bg-gray-200/50 dark:bg-gray-900/50 transition-all duration-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 text-center">
          Skills
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill,index) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-950 p-6 rounded-xl shadow-lg dark:shadow-gray-900/50 text-center flex flex-col items-center gap-2 transition-all" 
              style={{ transitionDuration: `${500 + 500 * index}ms` }}
            >
              {skill.image ? (
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                skill.icon
              )}
              <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
