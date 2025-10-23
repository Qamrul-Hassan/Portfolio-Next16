
"use client";
import React, { use } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaBootstrap,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFirebase } from "react-icons/si";
import { motion } from "framer-motion";

const AboutMe = () => {
  const skills = [
    { Icon: FaHtml5, label: "HTML", color: "text-orange-500" },
    { Icon: FaCss3Alt, label: "CSS", color: "text-blue-500" },
    { Icon: FaJs, label: "JavaScript", color: "text-yellow-500" },
    { Icon: FaReact, label: "React", color: "text-blue-400" },
    { Icon: SiNextdotjs, label: "Next.js", color: "text-gray-900" },
    { Icon: FaBootstrap, label: "Bootstrap", color: "text-purple-600" },
    { Icon: SiTailwindcss, label: "Tailwind CSS", color: "text-blue-300" },
    { Icon: SiFirebase, label: "Firebase", color: "text-yellow-500" },
    { Icon: FaGithub, label: "GitHub", color: "text-white" },
  ];

  return (
    <section className="relative py-16 px-6 text-white bg-gray-200" id="about">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800">
            About <span className="text-pink-500">Me</span>
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-gray-800">
            I am{" "}
            <span className="text-pink-500 font-semibold">Qamrul Hassan</span>,
            a frontend developer with a passion for crafting visually appealing
            and responsive web interfaces. With hands-on experience in modern
            tools and technologies, I specialize in transforming ideas into
            functional web solutions.
            
            I have a strong foundation in frontend development, focusing on creating user-friendly designs and maintaining performance. I am eager to grow and embrace challenges that enhance my skills and creativity.
          </p>
          <motion.p
            className="text-pink-400 italic text-xl font-medium mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            "Building engaging and accessible digital experiences."
          </motion.p>
          <motion.a
            href="/QamrulCV.pdf"
            download="Qamrul_Hassan_Resume.pdf"
            className="inline-block px-8 py-3 bg-pink-500 text-white font-semibold rounded shadow hover:bg-pink-600 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Download Resume
          </motion.a>
        </motion.div>
        <motion.div
          className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-6 text-lg"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {skills.map(({ Icon, label, color }, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded shadow-md"
            >
              <Icon className={`${color}`} size={24} />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
