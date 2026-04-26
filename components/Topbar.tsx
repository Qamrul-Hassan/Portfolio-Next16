import React from "react";
import { FaEnvelope, FaMobileAlt } from "react-icons/fa";

// Static component — no "use client", no Framer Motion.
// Framer Motion on mount-only animations (opacity/x slide-in) blocks the
// main thread during LCP. Pure CSS handles this at zero cost.
const Topbar = () => {
  return (
    <div
      className="text-white py-2 px-6 shadow-md relative z-50"
      style={{ background: "linear-gradient(to right, #050d1a, #071525, #050d1a)", borderBottom: "1px solid rgba(14,165,233,0.12)" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
        <a
          href="mailto:mdqamrul74@gmail.com"
          className="flex items-center text-xs sm:text-sm text-slate-400 hover:text-sky-400 transition duration-300"
        >
          <FaEnvelope className="text-sky-400 mr-2" />
          <span className="font-medium">mdqamrul74@gmail.com</span>
        </a>

        <a
          href="tel:+8801711844948"
          className="flex items-center text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition duration-300"
        >
          <FaMobileAlt className="text-teal-400 mr-2" />
          <span className="font-medium">+880 1711-844948</span>
        </a>
      </div>
    </div>
  );
};

export default Topbar;
