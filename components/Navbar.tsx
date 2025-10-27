"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import Logo from "../public/Logo-2.webp";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-toggle")
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen]);

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // Hamburger animation
  const topLine = isMenuOpen
    ? "rotate-45 translate-y-2.5"
    : "rotate-0 translate-y-0";
  const middleLine = isMenuOpen ? "opacity-0" : "opacity-100";
  const bottomLine = isMenuOpen
    ? "-rotate-45 -translate-y-2.5"
    : "rotate-0 translate-y-0";

  return (
    <nav className="bg-[#272727cc] bg-opacity-90 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
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
        <ul className="hidden md:flex items-center md:space-x-8 text-lg font-medium">
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

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="menu-toggle md:hidden flex flex-col justify-between w-6 h-6 relative cursor-pointer z-50"
        >
          <span
            className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-300 origin-center ${topLine}`}
          />
          <span
            className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-300 ${middleLine}`}
          />
          <span
            className={`block h-0.5 w-full bg-white rounded-sm transition-all duration-300 origin-center ${bottomLine}`}
          />
        </button>

        {/* Mobile Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="mobile-menu md:hidden fixed top-0 left-0 w-full h-full bg-[#272727] bg-opacity-95 flex flex-col justify-center items-center text-white z-40 "
        >
          <ul className="flex flex-col space-y-10 text-2xl font-semibold text-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
