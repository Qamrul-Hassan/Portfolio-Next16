"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../public/Logo-2.webp";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      const topbarHeight = 50;
      setIsSticky(window.scrollY > topbarHeight);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    document.documentElement.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const offset = 80;
    const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <>
      
      <nav className={`${
        isSticky ? "fixed top-0 left-0 w-full shadow-lg backdrop-blur-md z-50" : "relative"
      } bg-[#272727cc] text-white transition-all duration-300`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={Logo.src} alt="Logo" className="h-14 w-14 object-contain rounded-lg" />
            <div className="text-2xl sm:text-3xl font-bold text-pink-500 hover:text-pink-400 transition">
              Portfolio
            </div>
          </div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center space-x-8 text-lg font-medium">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="font-bold text-gray-100 hover:text-pink-500 transition-all duration-300 cursor-pointer px-4 py-2 rounded-md"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="menu-toggle lg:hidden flex items-center justify-center w-10 h-10 relative z-[60]"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="flex flex-col justify-between w-6 h-6"
            >
              
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -30, y: 5, x: -2 },
                }}
                transition={{ duration: 0.35 }}
              />
             
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-pink-500"
                variants={{
                  closed: { x: 0 },
                  open: { x: -3 },
                }}
                transition={{ duration: 0.35 }}
              />
            
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

      
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        className={`fixed top-0 right-0 w-screen h-screen bg-[#272727] bg-opacity-95 flex flex-col text-white z-[60] overflow-hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
       
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <img src={Logo.src} alt="Logo" className="h-12 w-12 object-contain rounded-lg" />
            <div className="text-2xl font-bold text-pink-500">
              Portfolio
            </div>
          </div>
          
          {/* Close Button with animation */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="flex flex-col justify-between w-6 h-6"
            >
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-white"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -30, y: 5, x: -2 },
                }}
                transition={{ duration: 0.35 }}
              />
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-pink-500"
                variants={{
                  closed: { x: 0 },
                  open: { x: -3 },
                }}
                transition={{ duration: 0.35 }}
              />
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

        {/* Menu Links */}
        <div className="flex flex-col space-y-6 text-2xl font-semibold text-center px-6 mt-8 py-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover:text-pink-500 transition cursor-pointer py-3"
            >
              {link.name}
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
