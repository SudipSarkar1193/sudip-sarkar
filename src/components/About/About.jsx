import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Text split component for animation
const SplitText = ({ children }) => {
  const words = children.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40, // Increased initial movement
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 1.2,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
        duration: 1.5,
      },
    },
  };

  return (
    <motion.section
      id="about"
      className="py-16 bg-gray-200/50 dark:bg-gray-900/50 flex items-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <motion.h3
          className="text-4xl md:text-5xl font-bold mb-8 dark:text-gray-100 text-center bg-clip-text text-transparent bg-black"
          variants={titleVariants}
        >
          About Me
        </motion.h3>

        <motion.p
          className="text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl text-center leading-relaxed"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.5, delay: 0.3 },
            },
          }}
        >
          <SplitText>
            Hi, I’m Sudip Sarkar, a third-year Computer Science undergraduate at
            Academy of Technology.
          </SplitText>
        </motion.p>

        <motion.p
          className="text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl text-center leading-relaxed mt-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.5, delay: 0.5 },
            },
          }}
        >
          <SplitText>
            I specialize in backend development, where I truly enjoy
            architecting robust and scalable systems. While I can build frontend
            applications using React and Tailwind CSS, my expertise lies in
            backend technologies. For backend development, I work with
            JavaScript and Golang, with a strong preference for Golang due to
            its performance and efficiency. I also have experience working with
            MongoDB, PostgreSQL, and SQL for database management.
          </SplitText>
        </motion.p>

        <motion.p
          className="text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl text-center leading-relaxed mt-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.5, delay: 0.7 },
            },
          }}
        >
          <SplitText>
            Beyond web development, I am a DSA enthusiast, primarily solving
            problems in C++, though I also use Python for DSA. I believe C++ is
            the best language for practicing DSA due to its efficiency.
            Additionally, I have knowledge of Java, where I have explored
            concepts like OOPs and multithreading. I’m always eager to learn,
            build, and optimize systems, and I enjoy solving complex problems
            through efficient and scalable solutions.
          </SplitText>
        </motion.p>
      </div>
    </motion.section>
  );
};

export default About;
