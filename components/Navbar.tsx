"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import Logo from "../public/Logo-2.webp";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Disable scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#272727cc] text-white shadow-lg z-50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center relative">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2">
            <img
              src={Logo.src}
              alt="Logo"
              className="h-14 w-14 object-contain rounded-lg"
            />
            <div className="text-3xl font-bold text-pink-500 hover:text-pink-400 transition cursor-pointer">
              Portfolio
            </div>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8 text-lg font-medium">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth
                  duration={500}
                  offset={-80}
                  className="text-gray-300 hover:bg-pink-500 hover:text-white transition-all duration-300 cursor-pointer px-4 py-2 rounded-md"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle (3 lines → arrow) */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 relative z-50"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="flex flex-col justify-between w-6 h-6"
            >
              {/* Top line - white */}
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-white"
                variants={{
                  closed: { rotate: 0, y: 0, x: 0, backgroundColor: "#ffffff" },
                  open: { rotate: -30, y: 5, x: -2, backgroundColor: "#ffffff" },
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />

              {/* Middle line - pink */}
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-pink-500"
                variants={{
                  closed: { x: 0, backgroundColor: "#ec4899" },
                  open: { x: -3, backgroundColor: "#ec4899" },
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />

              {/* Bottom line - white */}
              <motion.span
                className="block h-0.5 w-full rounded-sm bg-white"
                variants={{
                  closed: { rotate: 0, y: 0, x: 0, backgroundColor: "#ffffff" },
                  open: { rotate: 30, y: -5, x: -2, backgroundColor: "#ffffff" },
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              />
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: isMenuOpen ? 0 : "100vw" }}
        transition={{ type: "tween", duration: 0.35 }}
        className="md:hidden fixed top-0 left-0 w-screen h-screen bg-[#272727] bg-opacity-95 flex flex-col text-white z-40 overflow-y-auto"
      >
        {/* Top section inside mobile menu */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <img
              src={Logo.src}
              alt="Logo"
              className="h-16 w-16 object-contain rounded-lg"
            />
            <div className="text-3xl font-semibold text-pink-500 cursor-pointer hover:text-pink-400">
              Portfolio
            </div>
          </div>

          {/* Close (arrow button) */}
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

        {/* Menu links */}
        <ul className="flex flex-col space-y-8 text-2xl font-semibold text-center px-6 py-10 mt-6 w-full">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-pink-500 transition cursor-pointer"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default Navbar;
