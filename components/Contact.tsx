"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaAt, FaComment } from "react-icons/fa";
import ContactImage from "../public/Contact.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const iconActions = [
    {
      icon: FaPhone,
      onClick: () => window.open("tel:+8801711844948", "_self"),
    },
    {
      icon: FaEnvelope,
      onClick: () => window.open("mailto:mdqamrul74@gmail.com"),
    },
    {
      icon: FaAt,
      onClick: () => window.open("https://portfolio-next16.vercel.app/", "_blank"),
    },
    {
      icon: FaComment,
      onClick: () => alert("Chat feature coming soon!"),
    },
  ];

  const iconVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contact" className="bg-[#CECECE] py-20 px-6 lg:px-16 text-white">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-pink-500">Get</span>
          <span className="text-gray-800"> In Touch</span>
        </h2>
        <motion.p
          className="text-lg md:text-2xl text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Have a project or question? Let's make something amazing together!
        </motion.p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center bg-[#434343] py-16 px-8 rounded-lg shadow-lg space-y-8 lg:space-y-0 lg:space-x-4">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/4 bg-[#b5b5b5] p-8 rounded-lg shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className={`block text-lg font-semibold ${
                formData.name ? "text-pink-500" : "text-gray-700"
              }`}
            >
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className={`block text-lg font-semibold ${
                formData.email ? "text-pink-500" : "text-gray-700"
              }`}
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className={`block text-lg font-semibold ${
                formData.message ? "text-pink-500" : "text-gray-700"
              }`}
            >
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-black bg-neutral-300"
              placeholder="Write your message here"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-400"
          >
            Send Message
          </button>
        </motion.form>

        <motion.div
          className="relative w-full lg:w-2/2 flex justify-center items-center "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src={ContactImage.src}
            alt="Contact Us"
            className="rounded-lg shadow-lg object-cover w-full h-full"
          />
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-8">
            {iconActions.map(({ icon: Icon, onClick }, index) => (
              <motion.div
                key={index}
                onClick={onClick}
                className="cursor-pointer"
                
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
                whileHover={{ scale: 1.2 }}
              >
                <Icon size={30} color="#ffffff" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ToastContainer position="top-center" aria-label={undefined} />
    </section>
  );
};

export default Contact;
