"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import profileImage from "../public/Portfolio-9.jpg";
import backgroundImage from "../public/bg.png";

const HeroSection: React.FC = () => {
  const welcomeText = "WELCOME TO MY PORTFOLIO";
  const typingTexts = [
    "Passionate FrontEnd Developer.",
    "React Expert with a Focus on UI/UX.",
    "Creative Problem Solver.",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Profile Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="relative rounded-xl overflow-hidden w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 shadow-[0_10px_30px_rgba(0,0,0,0.6)] border-4 border-white/30">
            <Image
              src={profileImage}
              alt="Qamrul Hassan"
              className="object-cover"
              fill
              priority
            />
          </div>
        </motion.div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <motion.p
            className="text-gray-300 text-sm sm:text-lg mb-4 font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {welcomeText}
          </motion.p>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold mb-6 text-white leading-tight whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Hi, I'm <span className="text-pink-500">Qamrul Hassan</span>,
          </motion.h1>

          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white min-h-20 flex items-center justify-center lg:justify-start">
            <Typewriter
              words={typingTexts}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>

          <motion.p
            className="text-gray-300 text-sm sm:text-base mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            I specialize in creating modern, responsive, and visually stunning
            websites. With expertise in HTML, CSS, Tailwind CSS, React, and
            Next.js, I turn creative ideas into functional, professional web
            solutions.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            className="flex justify-center lg:justify-start gap-6 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.a
              href="https://www.linkedin.com/in/md-qamrul-hassan-a44b3835b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 text-2xl md:text-3xl transition-colors"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com/Qamrul-Hassan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400 text-2xl md:text-3xl transition-colors"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://x.com/Shajal1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 text-2xl md:text-3xl transition-colors"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaTwitter />
            </motion.a>
          </motion.div>

          {/* Bouncing Hexagons */}
          <div className="relative flex justify-center gap-8 mt-12">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className={`w-10 h-10 sm:w-16 sm:h-16 bg-linear-to-r ${
                  index === 0
                    ? "from-pink-500 to-purple-600"
                    : index === 1
                    ? "from-blue-500 to-green-500"
                    : "from-yellow-500 to-red-500"
                }`}
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;