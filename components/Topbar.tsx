import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMobileAlt } from "react-icons/fa";

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
          <motion.span
            className="font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            mdqamrul74@gmail.com
          </motion.span>
        </a>

        <a
          href="tel:+8801711844948"
          className="flex items-center text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition duration-300"
        >
          <FaMobileAlt className="text-teal-400 mr-2" />
          <motion.span
            className="font-medium"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            +880 1711-844948
          </motion.span>
        </a>
      </div>
    </div>
  );
};

export default Topbar;
