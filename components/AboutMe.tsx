
"use client";
import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaBootstrap,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiAxios,
  SiRedux,
  SiRadixui,
  SiTypescript,
  SiFigma,
  SiVite,
} from "react-icons/si";
import { motion } from "framer-motion";

const AboutMe = () => {
  const skills = [
    { Icon: FaHtml5, label: "HTML", color: "text-orange-500" },
    { Icon: FaCss3Alt, label: "CSS", color: "text-blue-500" },
    { Icon: FaJs, label: "JavaScript", color: "text-yellow-500" },
    { Icon: FaReact, label: "React", color: "text-blue-400" },
    { Icon: SiTypescript, label: "TypeScript", color: "text-blue-500" },
    { Icon: SiNextdotjs, label: "Next.js", color: "text-gray-900" },
    { Icon: FaBootstrap, label: "Bootstrap", color: "text-purple-600" },
    { Icon: SiTailwindcss, label: "Tailwind CSS", color: "text-blue-300" },
    { Icon: SiRadixui, label: "shadcn/ui", color: "text-zinc-200" },
    { Icon: SiAxios, label: "Axios", color: "text-purple-400" },
    { Icon: SiRedux, label: "Redux", color: "text-purple-500" },
    { Icon: FaReact, label: "Zustand", color: "text-cyan-300" },
    { Icon: FaReact, label: "State Management", color: "text-cyan-300" },
    { Icon: FaEnvelope, label: "EmailJS", color: "text-pink-400" },
    { Icon: SiFirebase, label: "Firebase", color: "text-yellow-500" },
    { Icon: SiFigma, label: "Figma", color: "text-pink-500" },
    { Icon: SiVite, label: "Vite", color: "text-yellow-400" },
    { Icon: FaGithub, label: "GitHub", color: "text-white" },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 px-6 lg:px-16 text-gray-900"
      id="about"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(229,231,235,0.92) 0%, rgba(243,244,246,0.88) 45%, rgba(251,207,232,0.56) 100%), url('/bg-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.span
          className="absolute -top-12 right-8 hidden h-44 w-44 rotate-12 rounded-3xl border border-white/35 bg-white/18 supports-[backdrop-filter:blur(0px)]:bg-white/12 supports-[backdrop-filter:blur(0px)]:backdrop-blur-[1px] lg:block"
          initial={{ opacity: 0, y: -20, rotate: 18 }}
          whileInView={{ opacity: 1, y: 0, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />
        <motion.span
          className="absolute top-1/2 right-6 hidden h-28 w-28 -translate-y-1/2 rounded-full border-2 border-pink-300/45 lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        />
      </div>
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-pink-600 bg-pink-100/70 border border-pink-200"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Profile
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black mb-3 text-gray-900">
            About <span className="text-pink-500">Me</span>
          </h2>
          <motion.div
            className="h-1 w-28 mx-auto lg:mx-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 112, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <p className="text-xl leading-relaxed mb-6 text-gray-900 font-medium">
            I am{" "}
            <span className="text-pink-500 font-semibold">Qamrul Hassan</span>, a
            frontend developer with a passion for crafting visually appealing
            and responsive web interfaces. With hands-on experience in modern
            tools and technologies, I specialize in transforming ideas into
            functional web solutions. I have a strong foundation in frontend
            development, focusing on creating user-friendly designs and
            maintaining performance. I am eager to grow and embrace challenges
            that enhance my skills and creativity.
          </p>
          <motion.p
            className="text-pink-500 italic text-2xl font-semibold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            "Building engaging and accessible digital experiences."
          </motion.p>
          <motion.a
            href="/CV-Front-End-Web-Development-28-01-2026.pdf"
            download="Qamrul_Hassan_Resume.pdf"
            className="relative inline-flex items-center gap-2 px-9 py-3.5 text-white font-bold rounded-xl overflow-visible border border-pink-300/60 bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaDownload className="relative z-10" />
            <span className="relative z-10">Download Resume</span>
          </motion.a>
        </motion.div>
        <motion.div
          className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {skills.map(({ Icon, label, color }, index) => (
            (() => {
              const mobileShape =
                index % 2 === 0
                  ? "rounded-l-full rounded-r-none"
                  : "rounded-r-full rounded-l-none";
              const desktopShape =
                index % 3 === 0
                  ? "md:rounded-l-full md:rounded-r-none"
                  : index % 3 === 2
                  ? "md:rounded-r-full md:rounded-l-none"
                  : "md:rounded-none";

              return (
            <motion.div
              key={index}
              className={`group relative overflow-hidden flex items-center gap-3 px-4 py-3 ${mobileShape} ${desktopShape} border border-white/10 text-white min-h-[54px] min-w-0 bg-gradient-to-br from-[#222226] via-[#2d2d31] to-[#18181b] shadow-lg`}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="relative z-10 h-9 w-9 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/15 group-hover:bg-white/15 transition">
                <Icon className={`${color} flex-shrink-0`} size={20} />
              </div>
              <span className="text-sm sm:text-base leading-tight break-words whitespace-normal min-w-0 max-w-full">
                {label}
              </span>
            </motion.div>
              );
            })()
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
