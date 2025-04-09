import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Home.css";
import Skills from "../Skills/Skills";
import ProjectsSection from "../Projects/ProjectsSection";
import Chat from "../chat/Chat";
import Header from "../Header/Header";
import Herosection from "../Herosection/Herosection";
import { Contact } from "../contact/Contact";

gsap.registerPlugin(ScrollTrigger);

const profilePic = "/icons/sudip01.jpg";
const duration = 0.3;

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const myFullName = "Sudip Sarkar";

  const aboutParagraphs = [
    "I'm Sudip Sarkar, a third-year Computer Science undergraduate at the Academy of Technology, deeply passionate about backend development and system design.",
    "I specialize in Golang, drawn by its performance and robust concurrency support. I'm also proficient in JavaScript and work extensively with databases such as MongoDB, PostgreSQL, and SQL. While I have experience with frontend technologies like React and Tailwind CSS, my primary focus remains on building scalable and efficient backend systems. I'm currently exploring AI integration using tools like LangChain to develop intelligent backend solutions.",
    "I'm highly enthusiastic about Data Structures and Algorithms and enjoy solving complex problems. I code primarily in C++, but I also work with Java and Python.",
  ];

  const scrollTriggers = [
    {
      triggerSettings: {
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      animationSettings: {
        from: { x: -100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: duration, ease: "power2.out" },
      },
    },
    {
      triggerSettings: {
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      animationSettings: {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, duration: duration / 4, ease: "power2.out" },
      },
    },
    {
      triggerSettings: {
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      animationSettings: {
        from: { x: 100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: duration, ease: "power2.out" },
      },
    },
  ];

  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el, index) => {
    if (el && !sectionRefs.current[index]) {
      sectionRefs.current[index] = el;
    }
  };

  useEffect(() => {
    const triggers = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const paragraph = section.querySelector("p");
      const chars = paragraph.querySelectorAll(".char");
      const config = scrollTriggers[index];

      // Calculating dynamic timeout based on word count
      const wordCount = aboutParagraphs[index].split(" ").length;
      const baseTime = 3; // Minimum time in seconds
      const timePerWord = 0.2; // Additional time per word (adjustable)
      const dynamicDelay = baseTime + wordCount * timePerWord;

      // Set initial states
      gsap.set(section, {
        height: 0,
        overflow: "hidden",
      });
      gsap.set(paragraph, { ...config.animationSettings.from });
      gsap.set(chars, { opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to(section, {
        height: "auto",
        duration: duration,
        ease: "power2.out",
      })
        .to(
          paragraph,
          {
            ...config.animationSettings.to,
          },
          "<"
        )
        .to(
          chars,
          {
            opacity: 1,
            stagger: 0.02,
            duration: 0.6,
            ease: "power1.out",
          },
          "<"
        )
        .to(
          section,
          {
            height: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          `+=${dynamicDelay}` 
        )
        .to(
          paragraph,
          {
            ...config.animationSettings.from,
            duration: 1,
          },
          "<"
        )
        .to(
          chars,
          {
            opacity: 0,
            duration: 0.5,
          },
          "<"
        );

      const trigger = ScrollTrigger.create({
        trigger: section,
        ...config.triggerSettings,
        animation: tl,
        onEnter: () => tl.restart(),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const renderParagraph = (text, index) => (
    <section
      ref={(el) => addToRefs(el, index)}
      key={index}
      className="overflow-hidden"
    >
      <div className="mx-auto my-9 px-4 sm:px-6 lg:px-20">
        <p className="reveal-section my-0 text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl lg:text-2xl text-center leading-relaxed rounded-xl p-6 glow-bg">
          {text.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              style={{ whiteSpace: "nowrap", display: "inline-block" }}
            >
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  style={{ opacity: 0, display: "inline-block" }}
                  className="char"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              {wordIndex < text.split(" ").length - 1 && "\u00A0"}
            </span>
          ))}
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen overflow-x-hidden font-sans w-screen">
      <Header myFullName={myFullName} />
      <Herosection profilePic={profilePic} />

      {renderParagraph(aboutParagraphs[0], 0)}
      <Skills />
      {renderParagraph(aboutParagraphs[1], 1)}
      <ProjectsSection />
      {renderParagraph(aboutParagraphs[2], 2)}
      <Contact />

      <div
        className="fixed bottom-6 right-6 bg-blue-500 dark:bg-blue-600 text-white p-4 rounded-full shadow-lg dark:shadow-gray-900/50 cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700 transition z-20 md:z-40"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <p className="text-sm md:text-base">Ask anything about me</p>
      </div>

      {isChatOpen && (
        <Chat setIsChatOpen={setIsChatOpen} isChatOpen={isChatOpen} />
      )}

      <footer className="bg-gradient-to-r from-purple-500/90 to-indigo-600/90 dark:from-indigo-900/70 dark:to-pink-900/70 text-white font-semibold text-md italic dark:text-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 {myFullName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
