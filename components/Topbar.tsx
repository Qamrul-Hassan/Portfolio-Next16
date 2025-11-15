import React from "react";
import { FaEnvelope, FaMobileAlt } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-[#333333] text-white py-4 px-6 shadow-md relative z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Email Section */}
        <div className="flex items-center space-x-4">
          <a
            href="mailto:mdqamrulhassan74@gmail.com"
            className="flex items-center text-sm hover:text-pink-400 transition duration-300"
          >
            <FaEnvelope className="text-lg mr-2" />
            <span className="font-medium">mdqamrul74@gmail.com</span>
          </a>
        </div>

        {/* Phone Section */}
        <div className="flex items-center space-x-4">
          <a
            href="tel:+8801711844948"
            className="flex items-center text-sm hover:text-pink-400 transition duration-300"
          >
            <FaMobileAlt className="text-lg mr-2" />
            <span className="font-medium">+8801711844948</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;