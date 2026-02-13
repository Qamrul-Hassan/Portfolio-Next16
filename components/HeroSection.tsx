"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import profileImage from "../public/Portfolio-9.jpg";
import backgroundImage from "../public/banner.jpg";

const HeroSection: React.FC = () => {
  const welcomeText = "WELCOME TO MY PORTFOLIO";
  const typingTexts = [
    "Passionate Frontend Developer.",
    "React Expert with a Focus on UI/UX.",
    "Creative Problem Solver.",
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[86svh] items-center justify-center overflow-hidden py-14 sm:min-h-[100svh] sm:py-28 lg:py-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70"></div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:gap-10 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-16">
        {/* Profile Image */}
        <motion.div
          className="flex w-full justify-center lg:w-1/2 lg:justify-start"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="relative h-[min(64vw,16rem)] w-[min(64vw,16rem)] sm:h-[24rem] sm:w-[24rem] md:h-[27rem] md:w-[27rem] lg:h-[29rem] lg:w-[29rem]"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <span className="absolute -inset-4 rounded-[2rem] bg-pink-500/20 blur-2xl opacity-60" />
            <span className="absolute -inset-2 rounded-[1.7rem] border border-white/20 bg-white/15 supports-[backdrop-filter:blur(0px)]:bg-white/5 supports-[backdrop-filter:blur(0px)]:backdrop-blur-[1px]" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white/30 shadow-[0_14px_36px_rgba(0,0,0,0.5)]">
              <Image
                src={profileImage}
                alt="Qamrul Hassan"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 464px, (min-width: 768px) 432px, (min-width: 640px) 384px, 64vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Section */}
        <div className="flex w-full max-w-2xl flex-col justify-center space-y-2 text-center sm:space-y-5 lg:w-1/2 lg:max-w-none lg:text-left">
          <motion.p
            className="mb-1 text-[11px] font-semibold tracking-[0.16em] text-gray-100 uppercase sm:text-sm md:text-base"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {welcomeText}
          </motion.p>

          <motion.h1
            className="mb-1 text-[1.95rem] leading-[1.12] font-extrabold text-white sm:mb-2 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Hi, I'm <span className="text-pink-500 whitespace-nowrap">Qamrul Hassan</span>,
          </motion.h1>

          <div className="flex min-h-12 items-center justify-center text-sm font-medium text-white sm:min-h-16 sm:text-lg md:text-xl lg:justify-start lg:text-2xl">
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
            className="mx-auto mb-2 max-w-[34ch] px-1 text-[0.95rem] leading-relaxed text-gray-100 sm:mb-3 sm:max-w-xl sm:px-0 sm:text-base lg:mx-0"
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
            className="mt-2 flex justify-center gap-5 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.a
              href="https://www.linkedin.com/in/md-qamrul-hassan-a44b3835b/"
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
          <div className="relative mt-3 flex justify-center gap-2 sm:mt-8 sm:gap-6 lg:justify-start">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                className={`h-7 w-7 sm:h-16 sm:w-16 rounded-xl bg-gradient-to-r ${
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
