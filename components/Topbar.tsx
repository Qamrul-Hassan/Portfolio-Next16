import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMobileAlt } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-[#333333] text-white py-2 px-6 shadow-md relative z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        {/* Email Section */}
        <div className="flex items-center space-x-4">
          <a
            href="mailto:mdqamrul74@gmail.com"
            className="flex items-center text-xs sm:text-sm hover:text-pink-400 transition duration-300"
          >
            <FaEnvelope className="text-base mr-2" />
            <motion.span
              className="font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              mdqamrul74@gmail.com
            </motion.span>
          </a>
        </div>

        {/* Phone Section */}
        <div className="flex items-center space-x-4">
          <a
            href="tel:+8801711844948"
            className="flex items-center text-xs sm:text-sm hover:text-pink-400 transition duration-300"
          >
            <FaMobileAlt className="text-base mr-2" />
            <motion.span
              className="font-medium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              +8801711844948
            </motion.span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
