"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../public/Logo-2.webp";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Disable page scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // Smooth scrolling with easing
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const offset = 80; // Navbar height
    const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // duration in ms
    let startTime: number | null = null;

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#272727cc] text-white shadow-lg z-100 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center relative overflow-visible">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={Logo.src} alt="Logo" className="h-14 w-14 object-contain rounded-lg" />
            <div className="text-3xl font-bold text-pink-500 hover:text-pink-400 transition">
              Portfolio
            </div>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8 text-lg font-medium">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-300 hover:text-pink-500 transition-all duration-300 cursor-pointer px-4 py-2 rounded-md"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="menu-toggle md:hidden flex items-center justify-center w-10 h-10 relative z-110"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="flex flex-col justify-between w-6 h-6"
            >
              {/* Top line - white */}
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -30, y: 5, x: -2 },
                }}
                transition={{ duration: 0.35 }}
              />
              {/* Middle line - pink */}
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-pink-500"
                variants={{
                  closed: { x: 0 },
                  open: { x: -3 },
                }}
                transition={{ duration: 0.35 }}
              />
              {/* Bottom line - white */}
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 30, y: -5, x: -2 },
                }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        className="fixed inset-0 w-screen h-screen bg-[#272727] bg-opacity-95 flex flex-col text-white z-90 overflow-hidden"
      >
        {/* Top Section */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={Logo.src} alt="Logo" className="h-16 w-16 object-contain rounded-lg" />
            <div className="text-3xl font-semibold text-pink-500 hover:text-pink-400">
              Portfolio
            </div>
          </div>

          {/* Close button */}
          <motion.button
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 flex items-center justify-center"
          >
            <motion.div className="flex flex-col justify-between w-6 h-6">
              <motion.span
                className="block h-0.5 w-full bg-white rounded-sm"
                animate={{ rotate: -30, y: 5, x: -2 }}
                transition={{ duration: 0.35 }}
              />
              <motion.span
                className="block h-0.5 w-full bg-pink-500 rounded-sm"
                animate={{ x: -3 }}
                transition={{ duration: 0.35 }}
              />
              <motion.span
                className="block h-0.5 w-full bg-white rounded-sm"
                animate={{ rotate: 30, y: -5, x: -2 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Links */}
        <ul className="flex flex-col space-y-8 text-2xl font-semibold text-center px-6 py-10 mt-6">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="hover:text-pink-500 transition cursor-pointer"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Navbar;
