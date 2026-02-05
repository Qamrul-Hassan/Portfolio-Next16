"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaAt, FaComment } from "react-icons/fa";
import Image from "next/image";
import ContactImage from "../public/Contact.jpg";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptcha = (token: string | null) => setCaptchaToken(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required.");
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const ownerTemplateID = process.env.NEXT_PUBLIC_EMAILJS_OWNER_TEMPLATE_ID!;
    const userTemplateID = process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
      to_email: process.env.OWNER_EMAIL!,
      "g-recaptcha-response": captchaToken,
    };

    try {
      await emailjs.send(serviceID, ownerTemplateID, templateParams, publicKey);
      await emailjs.send(serviceID, userTemplateID, { ...templateParams, to_email: formData.email }, publicKey);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const iconActions = [
    { icon: FaPhone, onClick: () => window.open("tel:+8801711844948", "_self") },
    { icon: FaEnvelope, onClick: () => window.open("mailto:mdqamrul74@gmail.com") },
    { icon: FaAt, onClick: () => window.open("https://portfolio-next16.vercel.app/", "_blank") },
    { icon: FaComment, onClick: () => alert("Chat feature coming soon!") },
  ];

  const iconVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } };

  // Show reCAPTCHA only when all fields are filled
  const showCaptcha = formData.name && formData.email && formData.message;

  return (
    <section id="contact" className="bg-[#CECECE] py-8 px-6 lg:px-16 text-gray-900">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="text-pink-500">Get</span> <span className="text-gray-800">In Touch</span>
        </h2>
        <motion.p
          className="text-base sm:text-lg md:text-2xl text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Have a project or question? Let's make something amazing together!
        </motion.p>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center bg-[#434343] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 rounded-lg shadow-lg gap-6 lg:gap-8">
        {/* LEFT: Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/5 bg-[#b5b5b5] p-4 sm:p-6 md:p-8 rounded-lg shadow-xl flex flex-col gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div>
            <label htmlFor="name" className={`block text-base sm:text-lg font-semibold ${formData.name ? "text-pink-500" : "text-gray-700"}`}>Your Name</label>
            <input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange} className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300 text-sm sm:text-base" placeholder="Enter your full name" />
          </div>
          <div>
            <label htmlFor="email" className={`block text-base sm:text-lg font-semibold ${formData.email ? "text-pink-500" : "text-gray-700"}`}>Your Email</label>
            <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300 text-sm sm:text-base" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="message" className={`block text-base sm:text-lg font-semibold ${formData.message ? "text-pink-500" : "text-gray-700"}`}>Your Message</label>
            <textarea name="message" id="message" autoComplete="off" rows={4} value={formData.message} onChange={handleChange} className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300 text-sm sm:text-base" placeholder="Write your message here"></textarea>
          </div>

          {/* reCAPTCHA */}
          {showCaptcha && (
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="scale-75 sm:scale-90 md:scale-100 transform origin-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleCaptcha}
                  size={isMobile ? "compact" : "normal"}
                />
              </div>
            </div>
          )}

          {captchaToken && (
            <div className="text-center mb-3 sm:mb-4">
              <p className="text-xs text-gray-600 px-4">
                Protected by reCAPTCHA - <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Privacy</a> & <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Terms</a>
              </p>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 sm:py-3 px-4 sm:px-6 bg-pink-500 text-white font-semibold rounded-lg transition duration-300 text-sm sm:text-base
              ${!captchaToken ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-400"}`}
            disabled={!captchaToken}
          >
            Send Message
          </button>
        </motion.form>

        {/* RIGHT: Image with Icons */}
        <motion.div
          className="relative w-full lg:w-3/5 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image 
            src={ContactImage} 
            alt="Contact Us" 
            className="rounded-lg shadow-lg object-cover w-full h-[400px] sm:h-[480px] md:h-[520px] lg:h-[498px]" 
            loading="lazy"
          />
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 sm:space-x-6 md:space-x-8">
            {iconActions.map(({ icon: Icon, onClick }, index) => (
              <motion.div
                key={index}
                onClick={onClick}
                className="cursor-pointer"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                whileHover={{ scale: 1.2 }}
              >
                <Icon size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-center" />
    </section>
  );
};

export default Contact;
