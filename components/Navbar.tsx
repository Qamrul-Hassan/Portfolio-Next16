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
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    const offset = 80;
    const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className={`${
          isSticky
            ? "fixed top-0 left-0 w-full z-50 shadow-2xl"
            : "relative"
        } transition-all duration-500`}
        style={{
          background: isSticky
            ? scrolled
              ? "linear-gradient(135deg, rgba(20,20,28,0.97) 0%, rgba(39,18,38,0.97) 100%)"
              : "linear-gradient(135deg, rgba(25,25,35,0.95) 0%, rgba(45,20,44,0.95) 100%)"
            : "linear-gradient(135deg, rgba(20,20,28,0.92) 0%, rgba(39,18,38,0.92) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: isSticky ? "1px solid rgba(236,72,153,0.15)" : "none",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            
            {/* Logo Area */}
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 group cursor-pointer"
              aria-label="Go to home"
            >
              {/* Logo image with glow ring */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500" />
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-500/40 group-hover:ring-pink-400/70 transition-all duration-300 shadow-lg shadow-pink-500/20">
                  <Image
                    src="/Logo-4.webp"
                    alt="QHS Logo"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Brand name */}
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-pink-300 transition-colors duration-300">
                  QHS
                  <span className="text-pink-500 group-hover:text-pink-400 transition-colors duration-300">
                    Portfolio
                  </span>
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase group-hover:text-pink-300/60 transition-colors duration-300">
                  Web Developer
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-4 py-2 text-sm font-semibold tracking-wide rounded-lg transition-all duration-300 cursor-pointer group ${
                      activeSection === link.id
                        ? "text-pink-400"
                        : "text-gray-300 hover:text-pink-300"
                    }`}
                  >
                    {/* Hover/active background pill */}
                    <span
                      className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                        activeSection === link.id
                          ? "bg-pink-500/15 shadow-[0_0_12px_rgba(236,72,153,0.2)]"
                          : "bg-transparent group-hover:bg-white/5"
                      }`}
                    />
                    <span className="relative z-10">{link.name}</span>
                    {/* Active underline dot */}
                    {activeSection === link.id && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTA Button + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Hire Me CTA - desktop */}
              <motion.a
                href="mailto:mdqamrul74@gmail.com"
                className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                  boxShadow: "0 4px 20px rgba(236,72,153,0.35)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 6px 28px rgba(236,72,153,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                Hire Me
              </motion.a>

              {/* Hamburger - mobile */}
              <button
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-panel"
                onClick={toggleMenu}
                className="lg:hidden relative z-[60] flex flex-col justify-center items-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <span
                  className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 ml-auto rounded-full bg-pink-500 my-1.5 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 rounded-full bg-white transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[55] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              id="mobile-menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 h-full w-72 z-[60] lg:hidden flex flex-col"
              style={{
                background: "linear-gradient(180deg, rgba(20,14,26,0.99) 0%, rgba(30,10,35,0.99) 100%)",
                borderLeft: "1px solid rgba(236,72,153,0.2)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-pink-500/50 shadow-lg shadow-pink-500/20">
                    <Image
                      src="/Logo-4.webp"
                      alt="QHS Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-base font-black text-white">
                      QHS<span className="text-pink-500">Portfolio</span>
                    </span>
                    <span className="text-[9px] tracking-widest text-gray-500 uppercase">Web Dev</span>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 space-y-1.5">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold transition-all duration-200 cursor-pointer ${
                      activeSection === link.id
                        ? "text-pink-400 bg-pink-500/15 border border-pink-500/30"
                        : "text-gray-200 hover:text-pink-300 hover:bg-white/5 border border-transparent"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {activeSection === link.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
                    )}
                    {link.name}
                  </motion.button>
                ))}
              </nav>

              {/* Hire Me button at bottom */}
              <div className="px-6 pb-8">
                <a
                  href="mailto:mdqamrul74@gmail.com"
                  className="flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                    boxShadow: "0 4px 20px rgba(236,72,153,0.3)",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hire Me ✉
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
