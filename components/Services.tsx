"use client";
import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Front-End Development",
    description:
      "Developing modern and responsive websites using HTML, CSS, JavaScript, React, and Next.js. Ensuring cross-browser compatibility and smooth user experiences.",
    icon: "🌐",
  },
  {
    title: "Responsive Design",
    description:
      "Crafting adaptive and mobile-first websites with Tailwind CSS and Bootstrap. Ensuring optimal viewing experiences across all devices and screen sizes.",
    icon: "📱",
  },
  {
    title: "React Development",
    description:
      "Building dynamic web applications with React, ensuring scalability, reusability, and efficient state management for a smooth user experience.",
    icon: "⚡",
  },
  {
    title: "Next.js Development",
    description:
      "Creating server-side rendered applications and static websites using Next.js, ensuring fast loading times, SEO optimization, and improved user experience.",
    icon: "🚀",
  },
  {
    title: "Figma to HTML Conversion",
    description:
      "Transforming Figma designs into pixel-perfect, responsive, and semantic HTML, ensuring accurate implementation of design elements.",
    icon: "🎨",
  },
  {
    title: "Website Customization",
    description:
      "Customizing websites to meet specific client requirements, including design tweaks, feature additions, and layout adjustments.",
    icon: "🛠️",
  },
  {
    title: "Debugging & Testing",
    description:
      "Identifying and resolving issues across various browsers and devices. Ensuring smooth functionality through rigorous testing and debugging.",
    icon: "🧪",
  },
  {
    title: "Maintenance & Post-Deployment Support",
    description:
      "Providing ongoing website maintenance, updates, and support to ensure performance and security after deployment.",
    icon: "🔧",
  },
  {
    title: "Firebase Authentication",
    description:
      "Implementing secure user authentication systems with Firebase, including email, social login, and phone authentication.",
    icon: "🔒",
  },
];

const MyServices = () => {
  return (
    <section id="services" className="py-16 px-6 lg:px-16 bg-[#CECECE] text-gray-900">
      <div className="w-full max-w-7xl mx-auto text-center">
        <motion.span
          className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-pink-600 bg-pink-100/70 border border-pink-200"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What I Offer
        </motion.span>
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span className="text-pink-500">My</span>{" "}
          <span className="text-gray-800">Services</span>
        </motion.h2>
        <motion.div
          className="h-1 w-28 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 mb-10"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 112, opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
        <motion.p
          className="text-base sm:text-lg text-gray-700 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Practical frontend services focused on speed, clean UI, and maintainable code.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden p-6 rounded-2xl shadow-lg border border-white/10 bg-gradient-to-br from-[#3f3f3f] via-[#474747] to-[#2f2f2f]"
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{
                y: -6,
                scale: 1.03,
                rotateX: 2,
                boxShadow: "0 18px 42px rgba(236, 72, 153, 0.22)",
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.25),transparent_45%)]" />
              <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 ring-1 ring-white/15 text-2xl mb-4 group-hover:bg-white/15 transition">
                {service.icon}
              </div>
              <h3 className="relative z-10 text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="relative z-10 text-gray-100">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MyServices;
