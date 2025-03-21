import React from "react";
import { useRef, useEffect, useState } from "react";
import "./About.css";

const SplitText = ({ children, delay = 0 }) => {
  const words = children.split(" ");

  return (
    <span className="inline-block">
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block mr-1 animate-word-rise"
          style={{ animationDelay: `${index * 0.05 + delay}s` }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

const About = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "-100px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="py-16 bg-gray-200/50 dark:bg-gray-900/50 flex items-center"
      ref={ref}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <h3
          className={`text-4xl md:text-5xl font-bold mb-8 dark:text-gray-100 text-center bg-clip-text text-transparent bg-black ${
            isVisible ? "animate-title-slide" : "opacity-0"
          }`}
        >
          About Me
        </h3>

        <div
          className={`${
            isVisible ? "animate-container-fade" : "opacity-0 scale-95"
          }`}
        >
          <p className="text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl text-center leading-relaxed">
            <SplitText delay={0}>
              Hi, I’m Sudip Sarkar, a third-year Computer Science undergraduate
              at Academy of Technology.
            </SplitText>
          </p>

          <p className="text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl text-center leading-relaxed mt-4">
            <SplitText delay={1.5}>
              I specialize in backend development, where I truly enjoy
              architecting robust and scalable systems. While I can build
              frontend applications using React and Tailwind CSS, my expertise
              lies in backend technologies. For backend development, I work with
              JavaScript and Golang, with a strong preference for Golang due to
              its performance and efficiency. I also have experience working
              with MongoDB, PostgreSQL, and SQL for database management.
            </SplitText>
          </p>

          <p className="text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl text-center leading-relaxed mt-4">
            <SplitText delay={3}>
              Beyond web development, I am a DSA enthusiast, primarily solving
              problems in C++, though I also use Python for DSA. I believe C++
              is the best language for practicing DSA due to its efficiency.
              Additionally, I have knowledge of Java, where I have explored
              concepts like OOPs and multithreading. I’m always eager to learn,
              build, and optimize systems, and I enjoy solving complex problems
              through efficient and scalable solutions.
            </SplitText>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
