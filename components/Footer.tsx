"use client";
import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/md-qamrul-hassan-a44b3835b/",
    label: "LinkedIn profile",
    icon: <FaLinkedin className="w-6 h-6 text-gray-100 hover:text-blue-500" />,
  },
  {
    href: "https://x.com/Shajal1",
    label: "X profile",
    icon: <FaTwitter className="w-6 h-6 text-gray-100 hover:text-blue-400" />,
  },
  {
    href: "https://github.com/Qamrul-Hassan",
    label: "GitHub profile",
    icon: <FaGithub className="w-6 h-6 text-gray-100 hover:text-blue-400" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1B1B1B] via-[#3F3F3F] to-[#505050] text-white py-12 w-full">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-16 items-start">
        <div>
          <motion.h3
            className="text-2xl font-semibold mb-4 text-pink-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About
          </motion.h3>
          <motion.p
            className="text-gray-100 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            QHSPortfolio is your one-stop solution for smart and professional web development.
            We focus on delivering unique and creative solutions tailored to your needs.
          </motion.p>
        </div>

        <div>
          <motion.h3
            className="text-2xl font-semibold mb-4 text-pink-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quick Links
          </motion.h3>
          <ul className="space-y-3">
            {["Home", "About", "Services", "Projects", "Contact"].map((link, index) => (
              <motion.li
                key={link}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <a href={`#${link.toLowerCase()}`} className="hover:text-pink-400 transition-colors text-gray-100">
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <motion.h3
            className="text-2xl font-semibold mb-4 text-pink-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Contact Info
          </motion.h3>

          <div className="space-y-3">
            <div className="flex items-center text-gray-100">
              <motion.div
                className="mr-3 w-7 h-7 text-gray-100 hover:text-pink-400 transition-all transform hover:translate-y-1 hover:animate-bounce"
                whileHover={{ scale: 1.2 }}
                whileTap={{ rotate: 15 }}
                aria-hidden="true"
              >
                <FaEnvelope />
              </motion.div>
              <a href="mailto:mdqamrul74@gmail.com" className="hover:text-pink-400 transition-colors">
                mdqamrul74@gmail.com
              </a>
            </div>
            <div className="flex items-center text-gray-100">
              <motion.div
                className="mr-3 w-7 h-7 text-gray-100 hover:text-green-400 transition-all transform hover:translate-y-1 hover:animate-bounce"
                whileHover={{ scale: 1.2 }}
                whileTap={{ rotate: 15 }}
                aria-hidden="true"
              >
                <FaPhoneAlt />
              </motion.div>
              <a href="tel:+8801711844948" className="hover:text-pink-400 transition-colors">
                +880 (1711) 844-948
              </a>
            </div>
          </div>

          <div className="mt-4 flex space-x-5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-4 bg-transparent border-2 border-gray-500 rounded-full hover:bg-gray-700 transition-all ease-in-out duration-300 transform hover:translate-y-1 hover:animate-bounce"
                whileHover={{ scale: 1.2 }}
                whileTap={{ rotate: 15 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="mt-12 border-t border-gray-500 pt-6 text-center text-gray-100 text-sm w-full max-w-7xl mx-auto px-6 lg:px-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        &copy; {new Date().getFullYear()} Qamrul Hassan Shajal. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
