import React from "react";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="py-14 bg-gradient-to-r from-purple-300/90 to-purple-600/90 dark:from-gray-900/70 dark:to-purple-900/70 text-gray-900/90 dark:text-gray-300"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 text-center" >
        <h2 className="text-3xl font-bold italic ">Get in Touch</h2>
        <p className="mt-3 font-semibold dark:font-normal text-md">
          Feel free to reach out to me via email or connect with me on LinkedIn.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="mailto:netajibosethesudip@gmail.com"
            className="flex items-center gap-2 text-gray-900/90 dark:text-gray-300 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm16 0l-7 5-7-5h14zm0 2v10H5V7l7 5 7-5z" />
            </svg>
            <span className="text-lg font-medium text-gray-900/90 dark:text-gray-300">
              netajibosethesudip@gmail.com
            </span>
          </a>

          <a
            href="https://linkedin.com/in/sudip-sarkar-267613302"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-900/90 dark:text-gray-300  transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.75 0-5 2.25-5 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5v-14c0-2.75-2.25-5-5-5zm-11 18h-3v-9h3v9zm-1.5-10.3c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2v4.5h-3v-9h3v1.3c.71-1.01 1.87-1.8 3.13-1.8 2.35 0 4.37 2.02 4.37 4.5v5z" />
            </svg>
            <span className="text-lg font-medium text-gray-900/90 dark:text-gray-300">
              https://linkedin.com/in/sudip-sarkar
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};


