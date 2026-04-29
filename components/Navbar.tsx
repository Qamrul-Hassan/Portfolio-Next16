"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const topbarHeight = 50;
      const scrollY = window.scrollY;
      setIsSticky(scrollY > topbarHeight);
      setScrolled(scrollY > 80);

      const scrollPosition = scrollY + 120;
      let current = "home";
      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id);
        if (section && section.offsetTop <= scrollPosition) {
          current = link.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const offset = 80;
    const targetPosition =
      section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  const navBg = isSticky
    ? scrolled
      ? "rgba(5,13,26,0.97)"
      : "rgba(5,13,26,0.95)"
    : "rgba(5,13,26,0.92)";

  return (
    <>
      <nav
        aria-label="Primary"
        className={`${
          isSticky ? "fixed top-0 left-0 w-full shadow-2xl" : "relative"
        } z-50 transition-all duration-500`}
        style={{
          background: navBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: isSticky
            ? "1px solid rgba(14,165,233,0.12)"
            : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-16">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative block w-12 h-12 rounded-full overflow-hidden ring-2 ring-sky-400 transition-all duration-300 shadow-lg shadow-pink-500/20">
              <Image
                src="/Logo-4.webp"
                alt="Qamrul Hassan Shajal Photography logo"
                fill
                className="object-cover"
              />
            </span>
            <span className="hidden sm:block">
              <span
                className="font-bold text-white text-base"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Qamrul Hassan Shajal
              </span>
              <span className="block text-[10px] tracking-widest text-sky-400 uppercase -mt-0.5">
                Web Developer
              </span>
            </span>
          </motion.button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{ color: isActive ? "#fff" : "#94a3b8" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBg"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "rgba(14,165,233,0.15)",
                          border: "1px solid rgba(14,165,233,0.25)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavUnderline"
                        className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                        style={{
                          background:
                            "linear-gradient(to right, #0EA5E9, #14B8A6)",
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA button (desktop) */}
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)",
              boxShadow: "0 4px 16px rgba(14,165,233,0.3)",
            }}
            whileHover={{ boxShadow: "0 8px 24px rgba(14,165,233,0.45)" }}
            whileTap={{ scale: 0.97 }}
          >
            Hire Me
          </motion.button>

          {/* Mobile burger button — always z-50 via nav, sits above overlay */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative z-[60] flex flex-col gap-1.5 p-2 rounded-lg focus:outline-none"
            style={{ border: "1px solid rgba(14,165,233,0.2)" }}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
              style={{ background: "#0EA5E9" }}
            />
            <span
              className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
              style={{ background: "#0EA5E9" }}
            />
            <span
              className={`block h-0.5 w-5 rounded-full transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
              style={{ background: "#0EA5E9" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{
              background: "rgba(5,13,26,0.98)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button inside overlay */}
            <button
              onClick={toggleMenu}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full text-sky-400 text-2xl font-bold focus:outline-none transition-all duration-300 hover:bg-sky-400/10 hover:scale-110"
              aria-label="Close menu"
            >
              ✕
            </button>

            <div className="flex flex-col items-center justify-center h-full gap-6">
              {NAV_LINKS.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-2xl font-semibold transition-all duration-300"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color:
                      activeSection === link.id ? "#38BDF8" : "#cbd5e1",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.35 }}
                  whileHover={{ x: 8, color: "#38BDF8" }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="mt-4 px-8 py-3 rounded-xl font-bold text-white text-lg"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #14B8A6)",
                  boxShadow: "0 8px 24px rgba(14,165,233,0.3)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileTap={{ scale: 0.97 }}
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
