import React from "react";


const Herosection = ({ profilePic }) => {
  return (
    <section className="pt-24 pb-12 w-full bg-gradient-to-r from-blue-500/90 to-indigo-600/90 dark:from-indigo-900/70 dark:to-blue-900/70 text-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          {/* Left Side - Profile */}
          <div className="md:w-1/3 flex flex-col  justify-center items-start md:items-center">
            <img
              src={profilePic}
              alt="Profile Picture"
              className="w-46 h-46 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg mb-4 md:mb-2"
            />
          </div>

          {/* Right Side - Text */}
          <div className="md:w-2/3 mt-6 md:mt-0 md:pl-12 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Welcome to Sudip-Verse
            </h2>
            <p className="mt-4 text-lg md:text-xl">
              I’m a passionate developer building modern solutions.
            </p>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
