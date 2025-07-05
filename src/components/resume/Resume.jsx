import React, { useRef, useEffect, useState } from "react";

const Resume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const resumeData = {
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "Academy of Technology",
        year: "2022 - 2026",
        description:
          "Third-year undergraduate with focus on Problem Solving & Full-stack Development",
      },
    ],
    experience: [
      {
        role: "Backend Developer",
        company: "Personal Projects",
        year: "2023 - Present",
        description:
          "Developing scalable backend systems using Java, Golang, JavaScript, Python, working with databases and exploring AI integration",
      },
    ],
    skills: [
      {
        category: "Backend",
        items: ["Golang", "Node.js", "Java", "Spring", "REST APIs"],
      },
      {
        category: "Databases",
        items: ["MongoDB", "PostgreSQL", "SQL", "PL/SQL"],
      },
      {
        category: "Frontend",
        items: ["React", "JavaScript", "Tailwind CSS"],
      },
      {
        category: "Programming",
        items: ["C++", "Java", "Python", "DSA"],
      },
      {
        category: "Tools & Others",
        items: [
          "Git",
          "LangChain",
          "Spring",
          "Junit",
          "Mockito",
          "Problem Solving",
        ],
      },
    ],
    achievements: [
      {
        title: "DSA Enthusiast",
        description:
          "Passionate about Data Structures and Algorithms with proficiency in multiple programming languages",
      },
      {
        title: "Full-Stack Development",
        description:
          "Experience in both frontend and backend technologies with focus on scalable systems",
      },
    ],
  };

  const handleDownload = () => {
    const resumeUrl = "/Resume__Sudip_Sarkar_.pdf" ;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Sudip_Sarkar_Resume.pdf" ;
    link.click(); 
  };

  const handleView = () => {
    const resumeUrl = "/Resume__Sudip_Sarkar_.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Resume
          </h2>
          <p
            className={`text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Explore my educational background, professional experience, and
            technical expertise
          </p>
        </div>

        {/* Download/View Buttons */}
        <div
          className={`flex justify-center gap-4 mb-12 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <button
            onClick={handleDownload}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition transform hover:scale-105 flex items-center gap-2"
            style={{
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Resume
          </button>
          <button
            onClick={handleView}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-700 transition transform hover:scale-105 flex items-center gap-2"
            style={{
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            View Resume
          </button>
        </div>

        {/* Resume Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200 dark:border-gray-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{
              transitionDelay: "600ms",
              boxShadow: "0 0 30px rgba(99, 102, 241, 0.1)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full">
                <svg
                  className="text-white w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Education
              </h3>
            </div>
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="border-l-4 border-indigo-500 pl-6 pb-6"
              >
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {edu.degree}
                </h4>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                  {edu.institution}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {edu.year}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200 dark:border-gray-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{
              transitionDelay: "800ms",
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.1)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full">
                <svg
                  className="text-white w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Experience
              </h3>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-4 border-purple-500 pl-6 pb-6"
              >
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {exp.role}
                </h4>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {exp.year}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200 dark:border-gray-700 mb-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{
            transitionDelay: "1000ms",
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.1)",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full">
              <svg
                className="text-white w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Technical Skills
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.skills.map((skillGroup, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white border-b-2 border-indigo-500 pb-2">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 border border-gray-200 dark:border-gray-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{
            transitionDelay: "1200ms",
            boxShadow: "0 0 30px rgba(245, 158, 11, 0.1)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-full">
              <svg
                className="text-white w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Key Highlights
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:scale-105 transition-transform duration-200"
              >
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
