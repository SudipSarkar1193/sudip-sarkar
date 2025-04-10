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
import { RiExpandDiagonalFill } from "react-icons/ri";
import { ImShrink2 } from "react-icons/im";

gsap.registerPlugin(ScrollTrigger);

const profilePic = "/icons/sudip01.jpg";
const duration = 0.3;

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState([false, false, false]); // Tracks section animation completion
  const [isVisible, setIsVisible] = useState([false, false, false]); // Controls visibility
  const [hasButtonAnimated, setHasButtonAnimated] = useState([
    false,
    false,
    false,
  ]); // Tracks button animation completion
  const myFullName = "Sudip Sarkar";
  const sectionRefs = useRef([]);
  const buttonRefs = useRef([]);
  const wrapperRefs = useRef([]);

  const aboutParagraphs = [
    "I'm Sudip Sarkar, a third-year Computer Science undergraduate at the Academy of Technology, deeply passionate about backend development and system design.",
    "I specialize in Golang, drawn by its performance and robust concurrency support. I'm also proficient in JavaScript and work extensively with databases such as MongoDB, PostgreSQL, and SQL.\n While I have experience with frontend technologies like React and Tailwind CSS, my primary focus remains on building scalable and efficient backend systems.\n I'm currently exploring AI integration using tools like LangChain to develop intelligent backend solutions.",
    "I'm highly enthusiastic about DSA and problem solving.\n For DSA, I use primarily C++, but I also use Java and Python.",
  ];

  const scrollTriggers = [
    {
      triggerSettings: { start: "top 80%", end: "bottom 20%" },
      animationSettings: {
        from: { x: -100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: duration, ease: "power2.out" },
      },
    },
    {
      triggerSettings: { start: "top 80%", end: "bottom 20%" },
      animationSettings: {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, duration: duration / 4, ease: "power2.out" },
      },
    },
    {
      triggerSettings: { start: "top 80%", end: "bottom 20%" },
      animationSettings: {
        from: { x: 100, opacity: 0 },
        to: { x: 0, opacity: 1, duration: duration, ease: "power2.out" },
      },
    },
  ];

  const addToRefs = (el, index) => {
    if (el && !sectionRefs.current[index]) sectionRefs.current[index] = el;
  };

  const addToButtonRefs = (el, index) => {
    if (el && !buttonRefs.current[index]) buttonRefs.current[index] = el;
  };

  const addToWrapperRefs = (el, index) => {
    if (el && !wrapperRefs.current[index]) wrapperRefs.current[index] = el;
  };

  useEffect(() => {
    const triggers = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section || hasAnimated[index]) return;

      const paragraph = section.querySelector("p");
      const chars = paragraph.querySelectorAll(".char");
      const config = scrollTriggers[index];

      const wordCount = aboutParagraphs[index].split(" ").length;
      const baseTime = 3;
      const timePerWord = 0.2;
      const dynamicDelay = (baseTime + wordCount * timePerWord) * 0.2;

      gsap.set(section, { height: 0, opacity: 0, overflow: "hidden" });
      gsap.set(paragraph, { ...config.animationSettings.from });
      gsap.set(chars, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          setHasAnimated((prev) => {
            const newAnimated = [...prev];
            newAnimated[index] = true;
            return newAnimated;
          });
          gsap.set(section, { display: "none" });
        },
      });

      tl.to(section, {
        height: "auto",
        opacity: 1,
        duration: duration,
        ease: "power2.out",
      })
        .to(paragraph, { ...config.animationSettings.to }, "<")
        .to(
          chars,
          { opacity: 1, stagger: 0.02, duration: 0.6, ease: "power1.out" },
          "<"
        )
        .to(
          section,
          { opacity: 0, duration: 1, ease: "power2.inOut" },
          `+=${dynamicDelay}`
        );

      const trigger = ScrollTrigger.create({
        trigger: section,
        ...config.triggerSettings,
        animation: tl,
        once: true,
      });

      triggers.push(trigger);
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [hasAnimated]);

  useEffect(() => {
    const positionButtons = () => {
      const sections = [
        document.querySelector(".herosection"),
        document.querySelector(".skills"),
        document.querySelector(".projects"),
        document.querySelector(".contact"),
      ];

      buttonRefs.current.forEach((button, index) => {
        if (!button || !sections[index] || !sections[index + 1]) return;

        let targetY;
        if (isVisible[index] && sectionRefs.current[index]) {
          targetY =
            sectionRefs.current[index].getBoundingClientRect().top +
            window.scrollY;
        } else {
          const section1Bottom =
            sections[index].getBoundingClientRect().bottom + window.scrollY;
          const section2Top =
            sections[index + 1].getBoundingClientRect().top + window.scrollY;
          targetY = (section1Bottom + section2Top) / 2;
        }

        button.style.position = "absolute";
        button.style.top = `${targetY}px`;
        button.style.left = "10%";
        button.style.transform = "translate(-10%, -50%)";
        button.style.zIndex = "10";

        // Animate button fade-in only the first time it appears
        if (hasAnimated[index] && !hasButtonAnimated[index]) {
          gsap.set(button, { opacity: 0 });
          gsap.to(button, {
            opacity: 1,
            duration: 1,
            delay: 1.5, // Delay of 1.5 seconds
            ease: "power2.out",
            onComplete: () => {
              setHasButtonAnimated((prev) => {
                const newAnimated = [...prev];
                newAnimated[index] = true;
                return newAnimated;
              });
            },
          });
        }
      });
    };

    if (hasAnimated.some((animated) => animated)) {
      positionButtons();
      window.addEventListener("resize", positionButtons);
      window.addEventListener("scroll", positionButtons);
    }

    return () => {
      window.removeEventListener("resize", positionButtons);
      window.removeEventListener("scroll", positionButtons);
    };
  }, [hasAnimated, isVisible, hasButtonAnimated]);

  const toggleParagraph = (index) => {
    const section = sectionRefs.current[index];
    if (!section) return;

    setIsVisible((prev) => {
      const newVisible = [...prev];
      newVisible[index] = !newVisible[index];
      return newVisible;
    });

    if (isVisible[index]) {
      gsap.to(section, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => gsap.set(section, { display: "none" }),
      });
    } else {
      gsap.set(section, { display: "block" });
      gsap.to(section, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    }
  };

  const renderParagraph = (text, index) => (
    <section
      ref={(el) => addToRefs(el, index)}
      key={index}
      className="overflow-hidden"
      style={{
        display: hasAnimated[index] && !isVisible[index] ? "none" : "block",
      }}
    >
      <div className="mx-auto my-9 px-4 sm:px-6 lg:px-20">
        <p className="reveal-section my-0 text-black font-semibold italic dark:text-gray-300 dark:font-normal text-lg md:text-xl lg:text-2xl text-center leading-relaxed rounded-xl p-6 glow-bg">
          {text.split("\n").map((line, lineIndex) => (
            <span
              key={lineIndex}
              style={{
                display: "block",
                marginBottom:
                  lineIndex < text.split("\n").length - 1 ? "1rem" : "0",
              }}
            >
              {line.split(" ").map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={{ whiteSpace: "nowrap", display: "inline-block" }}
                >
                  {word.split("").map((char, charIndex) => (
                    <span
                      key={charIndex}
                      style={{ display: "inline-block" }}
                      className="char"
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                  {wordIndex < line.split(" ").length - 1 && "\u00A0"}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen overflow-x-hidden font-sans w-screen">
      <Header myFullName={myFullName} />
      <div ref={(el) => addToWrapperRefs(el, 0)} className="herosection">
        <Herosection profilePic={profilePic} />
      </div>

      {hasAnimated[0] && (
        <button
          ref={(el) => addToButtonRefs(el, 0)}
          onClick={() => toggleParagraph(0)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold p-3 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition transform hover:scale-105 animate-pulse glow-bg"
        >
          {isVisible[0] ? (
            <ImShrink2 size={27} />
          ) : (
            <RiExpandDiagonalFill size={30} />
          )}
        </button>
      )}
      {renderParagraph(aboutParagraphs[0], 0)}

      <div ref={(el) => addToWrapperRefs(el, 1)} className="skills">
        <Skills />
      </div>

      {hasAnimated[1] && (
        <button
          ref={(el) => addToButtonRefs(el, 1)}
          onClick={() => toggleParagraph(1)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold p-3 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition transform hover:scale-105 animate-pulse glow-bg"
        >
          {isVisible[1] ? (
            <ImShrink2 size={27} />
          ) : (
            <RiExpandDiagonalFill size={30} />
          )}
        </button>
      )}
      {renderParagraph(aboutParagraphs[1], 1)}

      <div ref={(el) => addToWrapperRefs(el, 2)} className="projects">
        <ProjectsSection />
      </div>

      {hasAnimated[2] && (
        <button
          ref={(el) => addToButtonRefs(el, 2)}
          onClick={() => toggleParagraph(2)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold p-3 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition transform hover:scale-105 animate-pulse glow-bg"
        >
          {isVisible[2] ? (
            <ImShrink2 size={27} />
          ) : (
            <RiExpandDiagonalFill size={30} />
          )}
        </button>
      )}
      {renderParagraph(aboutParagraphs[2], 2)}

      <div ref={(el) => addToWrapperRefs(el, 3)} className="contact">
        <Contact />
      </div>

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
