import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaJava,
  FaDatabase,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiC,
  SiCplusplus,
  SiGo,
  SiMongodb,
  SiMysql,
  SiShell,
} from "react-icons/si";

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
  { name: "Python", icon: <FaPython className="text-yellow-400 text-4xl" /> },
  { name: "Golang", icon: <SiGo className="text-blue-400 text-4xl" /> },
  { name: "SQL", icon: <SiMysql className="text-indigo-500 text-4xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-4xl" /> },
  {
    name: "Shell Script",
    icon: <SiShell className="text-gray-700 text-4xl" />,
  },
];

const directions = [
  { x: -50, y: 0 }, // from left
  { x: 50, y: 0 }, // from right
  { x: 0, y: -50 }, // from top
  { x: 0, y: 50 }, // from bottom
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Increased threshold for better timing
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="skills"
      className="py-16 bg-gray-200/50 dark:bg-gray-900/50 transition-colors duration-900"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Skills
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const dir = directions[index % directions.length];

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: dir.x, y: dir.y }}
                animate={isVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dir.x, y: dir.y }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: isVisible ? index * 0.1 : 0, // Staggered animation
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.1 },
                }}
                className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 shadow-lg dark:shadow-gray-900/50 p-6 rounded-xl text-center flex flex-col items-center gap-2 transition-colors cursor-pointer"
                style={{
                  transitionDuration: `${300 + index * 150}ms`, // Each card transitions at different speed
                }}
              >
                {skill.icon}
                <p className="font-semibold text-lg">{skill.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}