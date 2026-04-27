"use client";
import React from "react";
import { motion } from "framer-motion";
import HexGridBg from "./HexGridBg";

const services = [
  { title: "Web Development",          description: "Developing modern and responsive websites using HTML, CSS, JavaScript, React, and Next.js. Ensuring cross-browser compatibility and smooth user experiences.", icon: "🌐" },
  { title: "Responsive Design",        description: "Crafting adaptive and mobile-first websites with Tailwind CSS and Bootstrap. Ensuring optimal viewing experiences across all devices and screen sizes.", icon: "📱" },
  { title: "React Development",        description: "Building dynamic web applications with React, ensuring scalability, reusability, and efficient state management for a smooth user experience.", icon: "⚡" },
  { title: "Next.js Development",      description: "Creating server-side rendered applications and static websites using Next.js, ensuring fast loading times, SEO optimisation, and improved user experience.", icon: "🚀" },
  { title: "Figma to HTML Conversion", description: "Transforming Figma designs into pixel-perfect, responsive, and semantic HTML, ensuring accurate implementation of design elements.", icon: "🎨" },
  { title: "Website Customisation",    description: "Customising websites to meet specific client requirements, including design tweaks, feature additions, and layout adjustments.", icon: "🛠️" },
  { title: "Debugging & Testing",      description: "Identifying and resolving issues across various browsers and devices. Ensuring smooth functionality through rigorous testing and debugging.", icon: "🧪" },
  { title: "Maintenance & Support",    description: "Providing ongoing website maintenance, updates, and support to ensure performance and security after deployment.", icon: "🔧" },
  { title: "Firebase Authentication",  description: "Implementing secure user authentication systems with Firebase, including email, social login, and phone authentication.", icon: "🔒" },
];

/**
 * Card shape per column position (0 = left, 1 = centre, 2 = right).
 * Uses border-radius on individual corners so overflow-hidden works correctly
 * and content is never clipped by the pill shape.
 *
 * Left card  → big left pill (top-left + bottom-left are full)
 * Centre     → square (standard rounded-lg)
 * Right card → big right pill
 */
const SHAPES = [
  // left
  { borderRadius: "9999px 12px 12px 9999px", textAlign: "right"  as const },
  // centre
  { borderRadius: "12px",                     textAlign: "center" as const },
  // right
  { borderRadius: "12px 9999px 9999px 12px",  textAlign: "left"  as const },
];

const MyServices = () => (
  <section
    id="services"
    className="relative overflow-hidden py-20 px-6 lg:px-16 text-gray-100"
    style={{ background: "linear-gradient(160deg, #070d1c 0%, #0b1525 50%, #07111f 100%)" }}
  >
    <HexGridBg hexSize={28} frameSkip={1} />

    {/* Corner blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)" }} />
      <div className="absolute -bottom-16 -right-16 h-60 w-60 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.10), transparent 70%)" }} />
    </div>

    <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
      <motion.span
        className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
        style={{ color: "#38BDF8", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)" }}
        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        What I Offer
      </motion.span>

      <motion.h2
        className="text-4xl md:text-5xl font-extrabold mb-3"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <span style={{ background: "linear-gradient(135deg, #38BDF8 0%, #14B8A6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>My</span>{" "}
        <span className="text-white">Services</span>
      </motion.h2>

      <motion.div className="h-1 w-28 mx-auto rounded-full mb-10"
        style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }}
        initial={{ width: 0, opacity: 0 }} whileInView={{ width: 112, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />

      <motion.p className="text-base sm:text-lg text-gray-300 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
        Practical web services focused on speed, clean UI, and maintainable code.
      </motion.p>

      {/* Service cards — 3-column grid with alternating pill shapes */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
        {services.map((service, index) => {
          const shape = SHAPES[index % 3];
          return (
            <motion.div
              key={index}
              className="group relative overflow-hidden p-6 shadow-lg"
              style={{
                background: "linear-gradient(135deg, rgba(15,28,46,0.95) 0%, rgba(20,34,51,0.95) 60%, rgba(13,24,32,0.95) 100%)",
                border: "1px solid rgba(14,165,233,0.15)",
                backdropFilter: "blur(6px)",
                borderRadius: shape.borderRadius,
                textAlign: shape.textAlign,
              }}
              variants={{ hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.03, boxShadow: "0 20px 45px rgba(14,165,233,0.20)" }}>

              {/* Hover glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(14,165,233,0.20), transparent 50%)" }} />

              {/* Icon — centred relative to card text-align */}
              <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl mb-4 group-hover:scale-110 transition-transform
                ${shape.textAlign === "right" ? "ml-auto" : shape.textAlign === "center" ? "mx-auto" : "mr-auto"}`}
                style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}>
                {service.icon}
              </div>

              <h3 className="relative z-10 text-lg font-semibold text-white mb-3 leading-snug">{service.title}</h3>
              <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{service.description}</p>

              {/* Bottom accent line */}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 group-hover:w-1/2 -translate-x-1/2 rounded-full transition-all duration-500 pointer-events-none"
                style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </section>
);

export default MyServices;
