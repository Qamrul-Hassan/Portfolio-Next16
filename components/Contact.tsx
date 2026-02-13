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
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
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
  const handleCaptchaExpired = () => setCaptchaToken(null);

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
      setShowSuccessAnim(true);
      setTimeout(() => setShowSuccessAnim(false), 5000);
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
    <section id="contact" className="relative bg-[#CECECE] py-8 px-6 lg:px-16 text-gray-900 overflow-hidden">
      <span className="pointer-events-none absolute z-[1] -top-8 right-10 h-32 w-32 lg:h-44 lg:w-44 xl:h-52 xl:w-52 rounded-3xl border-2 border-pink-300/70 bg-pink-100/15 rotate-12 shadow-[0_0_28px_rgba(236,72,153,0.28)]" />
      <span className="pointer-events-none absolute z-[1] bottom-10 left-10 h-20 w-20 lg:h-28 lg:w-28 xl:h-32 xl:w-32 rounded-full border-2 border-rose-300/75 bg-rose-200/20 shadow-[0_0_24px_rgba(244,114,182,0.3)]" />
      <span className="pointer-events-none absolute z-[1] top-1/2 left-8 h-20 w-20 lg:h-28 lg:w-28 xl:h-32 xl:w-32 -translate-y-1/2 rotate-12 border-2 border-cyan-200/70 bg-cyan-100/15 shadow-[0_0_22px_rgba(103,232,249,0.2)]" />
      <span className="pointer-events-none absolute z-[1] bottom-16 right-24 h-24 w-24 lg:h-36 lg:w-36 xl:h-40 xl:w-40 rounded-2xl border-[2.5px] border-orange-100/90 bg-orange-100/10 ring-1 ring-orange-200/70 shadow-[0_0_24px_rgba(251,146,60,0.24)] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0%_50%)]" />
      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.span
          className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-pink-600 bg-pink-100/70 border border-pink-200"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let's Connect
        </motion.span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
          <span className="text-pink-500">Get</span> <span className="text-gray-800">In Touch</span>
        </h2>
        <motion.div
          className="h-1 w-28 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 mb-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 112, opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
        <motion.p
          className="text-base sm:text-lg md:text-2xl text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Have a project or question? Let's make something amazing together!
        </motion.p>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center bg-gradient-to-br from-[#3e3e3e] via-[#454545] to-[#303030] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 rounded-2xl shadow-xl border border-white/10 gap-6 lg:gap-8 overflow-hidden">
        <span className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_40%)]" />
        {/* LEFT: Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative z-10 w-full lg:w-2/5 bg-gradient-to-br from-[#c1c1c1] via-[#b9b9b9] to-[#aeaeae] p-4 sm:p-6 md:p-8 rounded-2xl lg:rounded-l-[64px] lg:rounded-r-none shadow-xl border border-white/40 flex flex-col gap-4 text-left lg:text-right"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div>
            <label htmlFor="name" className={`block text-base sm:text-lg font-semibold ${formData.name ? "text-pink-500" : "text-gray-700"}`}>Your Name</label>
            <input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange} className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300 text-sm sm:text-base text-left lg:text-right placeholder:text-left lg:placeholder:text-right" placeholder="Enter your full name" />
          </div>
          <div>
            <label htmlFor="email" className={`block text-base sm:text-lg font-semibold ${formData.email ? "text-pink-500" : "text-gray-700"}`}>Your Email</label>
            <input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300 text-sm sm:text-base text-left lg:text-right placeholder:text-left lg:placeholder:text-right" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="message" className={`block text-base sm:text-lg font-semibold ${formData.message ? "text-pink-500" : "text-gray-700"}`}>Your Message</label>
            <textarea name="message" id="message" autoComplete="off" rows={4} value={formData.message} onChange={handleChange} className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300 text-sm sm:text-base text-left lg:text-right placeholder:text-left lg:placeholder:text-right" placeholder="Write your message here"></textarea>
          </div>

          {/* reCAPTCHA */}
          {showCaptcha && (
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="scale-75 sm:scale-90 md:scale-100 transform origin-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleCaptcha}
                  onExpired={handleCaptchaExpired}
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

          {showSuccessAnim && (
            <div className="relative w-full h-14 mt-3 overflow-hidden rounded-full bg-gradient-to-r from-[#1c1f2e] via-[#23283b] to-[#1c1f2e] border border-white/10 shadow-inner">
              {/* Progress glow */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-pink-500/20 blur-md"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.2, ease: "easeInOut" }}
              />

              {/* Envelope starts */}
              <motion.div
                className="absolute left-3 top-1/2 -translate-y-1/2"
                initial={{ x: 0, opacity: 1, scale: 1 }}
                animate={{ x: [0, 60, 120], opacity: [1, 1, 0], scale: [1, 0.95, 0.8] }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              >
                <div className="w-6 h-4 bg-yellow-300 rounded-sm shadow-sm relative">
                  <div className="absolute inset-x-0 top-0 h-0 border-l-[12px] border-r-[12px] border-t-[8px] border-transparent border-t-yellow-200" />
                </div>
              </motion.div>

              {/* Courier vehicle */}
              <motion.div
                className="absolute left-16 top-1/2 -translate-y-1/2"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: [0, 0, 240], opacity: [1, 1, 0] }}
                transition={{ duration: 5, ease: "easeInOut" }}
              >
                <div className="relative w-20 h-9">
                  {/* Cargo box */}
                  <div className="absolute left-0 top-0 w-14 h-9 rounded-sm bg-gradient-to-b from-white to-gray-200 shadow-md" />
                  <div className="absolute left-1 top-2 w-8 h-[2px] bg-gray-300/80 rounded-full" />
                  {/* Door close */}
                  <motion.div
                    className="absolute left-0 top-0 h-9 bg-white"
                    initial={{ width: 12 }}
                    animate={{ width: [12, 12, 0] }}
                    transition={{ duration: 0.7, ease: "easeInOut", delay: 2.1 }}
                  />
                  {/* Cab */}
                  <div className="absolute right-0 top-1 w-6 h-7 bg-pink-500 rounded-sm shadow-md" />
                  <div className="absolute right-1 top-2 w-3 h-2 bg-cyan-100/80 rounded-sm" />
                  <div className="absolute right-0 top-4 w-1 h-3 bg-red-600 rounded-sm" />
                  {/* Bumper */}
                  <div className="absolute right-0 bottom-0 w-2 h-2 bg-gray-800 rounded-sm" />
                  {/* Wheels */}
                  <div className="absolute left-3 bottom-[-2px] w-4 h-4 bg-gray-900 rounded-full shadow">
                    <div className="absolute inset-1 bg-gray-500 rounded-full" />
                  </div>
                  <div className="absolute right-3 bottom-[-2px] w-4 h-4 bg-gray-900 rounded-full shadow">
                    <div className="absolute inset-1 bg-gray-500 rounded-full" />
                  </div>
                  {/* Headlight beam */}
                  <motion.div
                    className="absolute right-[-14px] top-3 w-5 h-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1] }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: 3.6 }}
                  >
                    <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[14px] border-transparent border-l-yellow-300 opacity-80" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Success text */}
              <motion.div
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-white/90 font-semibold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 0, 1], x: [-20, -20, 0] }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 5.2 }}
              >
                Message sent successfully
              </motion.div>
            </div>
          )}
        </motion.form>

        {/* RIGHT: Image with Icons */}
        <motion.div
          className="relative z-10 w-full lg:w-3/5 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image 
            src={ContactImage} 
            alt="Contact Us" 
            className="rounded-2xl lg:rounded-r-[64px] lg:rounded-l-none shadow-xl border border-white/10 object-cover w-full h-[280px] sm:h-[420px] md:h-[520px] lg:h-[498px]" 
            loading="lazy"
          />
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 sm:space-x-6 md:space-x-8">
            {iconActions.map(({ icon: Icon, onClick }, index) => (
              <motion.div
                key={index}
                onClick={onClick}
                className="cursor-pointer w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/35 supports-[backdrop-filter:blur(0px)]:bg-white/10 border border-white/25 supports-[backdrop-filter:blur(0px)]:backdrop-blur-md flex items-center justify-center shadow-lg"
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                whileHover={{ scale: 1.15, y: -2, backgroundColor: "rgba(244, 114, 182, 0.28)" }}
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
