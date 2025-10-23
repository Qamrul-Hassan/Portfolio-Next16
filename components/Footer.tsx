"use client";
import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { motion } from 'framer-motion';

const Footer = () => {
  
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-linear-to-r from-[#1B1B1B] via-[#3F3F3F] to-[#505050] text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <motion.h3
            className="text-2xl font-semibold mb-4 text-pink-500"
            data-aos="fade-up"
          >
            About
          </motion.h3>
          <motion.p
            className="text-gray-300 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            QHSPortfolio is your one-stop <br />
            solution for smart and professional <br />
            web development. We focus on <br />
            delivering unique and creative <br />
            solutions tailored to your needs.
          </motion.p>
        </div>

        {/* Quick Links Section */}
        <div>
          <motion.h3
            className="text-2xl font-semibold mb-4 text-pink-500"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Quick Links
          </motion.h3>
          <ul className="space-y-3">
            <motion.li
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <a href="#home" className="hover:text-pink-400 transition-colors text-gray-300">
                Home
              </a>
            </motion.li>
            <motion.li
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <a href="#about" className="hover:text-pink-400 transition-colors text-gray-300">
                About
              </a>
            </motion.li>
            <motion.li
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <a href="#services" className="hover:text-pink-400 transition-colors text-gray-300">
                Services
              </a>
            </motion.li>
            <motion.li
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <a href="#projects" className="hover:text-pink-400 transition-colors text-gray-300">
                Projects
              </a>
            </motion.li>
            <motion.li
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <a href="#contact" className="hover:text-pink-400 transition-colors text-gray-300">
                Contact
              </a>
            </motion.li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <motion.h3
            className="text-2xl font-semibold mb-4 text-pink-500"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Contact Info
          </motion.h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <motion.div
                className="mr-3 w-7 h-7 text-gray-200 hover:text-pink-400 transition-all transform hover:translate-y-1 hover:animate-bounce"
                whileHover={{ scale: 1.2 }}
                whileTap={{ rotate: 15 }}
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <FaEnvelope />
              </motion.div>
              <motion.a
                href="mailto:your-email@example.com"
                className="hover:text-pink-400 transition-colors"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                mdqamrul74@gmail.com
              </motion.a>
            </div>
            <div className="flex items-center text-gray-300">
              <motion.div
                className="mr-3 w-7 h-7 text-gray-200 hover:text-green-400 transition-all transform hover:translate-y-1 hover:animate-bounce"
                whileHover={{ scale: 1.2 }}
                whileTap={{ rotate: 15 }}
                data-aos="fade-up"
                data-aos-delay="1100"
              >
                <FaPhoneAlt />
              </motion.div>
              <motion.a
                href="tel:+880-1711844948"
                className="hover:text-pink-400 transition-colors"
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                +880 (1711) 844-948
              </motion.a>
            </div>
          </div>
          <div className="mt-4 flex space-x-5">
            <motion.a
              href="https://www.linkedin.com/in/md-qamrul-hassan-303853347"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-transparent border-2 border-gray-500 rounded-full hover:bg-gray-700 transition-all ease-in-out duration-300 transform hover:translate-y-1 hover:animate-bounce"
              whileHover={{ scale: 1.2 }}
              whileTap={{ rotate: 15 }}
            >
              <FaLinkedin className="w-6 h-6 text-gray-200 hover:text-blue-500" />
            </motion.a>
            <motion.a
              href="https://x.com/Shajal1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-transparent border-2 border-gray-500 rounded-full hover:bg-gray-700 transition-all ease-in-out duration-300 transform hover:translate-y-1 hover:animate-bounce"
              whileHover={{ scale: 1.2 }}
              whileTap={{ rotate: 15 }}
            >
              <FaTwitter className="w-6 h-6 text-gray-200 hover:text-blue-400" />
            </motion.a>
            <motion.a
              href="https://github.com/Qamrul-Hassan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-transparent border-2 border-gray-500 rounded-full hover:bg-gray-700 transition-all ease-in-out duration-300 transform hover:translate-y-1 hover:animate-bounce"
              whileHover={{ scale: 1.2 }}
              whileTap={{ rotate: 15 }}
            >
              <FaGithub className="w-6 h-6 text-gray-200 hover:text-blue-400" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        className="mt-12 border-t border-gray-600 pt-6 text-center text-gray-400 text-sm"
        data-aos="fade-up"
        data-aos-delay="1300"
      >
        &copy; {new Date().getFullYear()} Qamrul Hassan Shajal. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
