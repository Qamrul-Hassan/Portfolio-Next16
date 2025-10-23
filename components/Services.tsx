"use client";
import React from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Front-End Development',
    description:
      'Developing modern and responsive websites using HTML, CSS, JavaScript, React, and Next.js. Ensuring cross-browser compatibility and smooth user experiences.',
    icon: '🌐',
  },
  {
    title: 'Responsive Design',
    description:
      'Crafting adaptive and mobile-first websites with Tailwind CSS and Bootstrap. Ensuring optimal viewing experiences across all devices and screen sizes.',
    icon: '📱',
  },
  {
    title: 'React Development',
    description:
      'Building dynamic web applications with React, ensuring scalability, reusability, and efficient state management for a smooth user experience.',
    icon: '⚡',
  },
  {
    title: 'Next.js Development',
    description:
      'Creating server-side rendered applications and static websites using Next.js, ensuring fast loading times, SEO optimization, and improved user experience.',
    icon: '🚀',
  },
  {
    title: 'Figma to HTML Conversion',
    description:
      'Transforming Figma designs into pixel-perfect, responsive, and semantic HTML, ensuring accurate implementation of design elements.',
    icon: '🎨',
  },
  {
    title: 'Website Customization',
    description:
      'Customizing websites to meet specific client requirements, including design tweaks, feature additions, and layout adjustments.',
    icon: '🛠️',
  },
  {
    title: 'Debugging & Testing',
    description:
      'Identifying and resolving issues across various browsers and devices. Ensuring smooth functionality through rigorous testing and debugging.',
    icon: '🧪',
  },
  {
    title: 'Maintenance & Post-Deployment Support',
    description:
      'Providing ongoing website maintenance, updates, and support to ensure performance and security after deployment.',
    icon: '🔧',
  },
  {
    title: 'Firebase Authentication',
    description:
      'Implementing secure user authentication systems with Firebase, including email, social login, and phone authentication.',
    icon: '🔒',
  },
];

const MyServices = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="services" className="py-16 bg-[#CECECE] text-white">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-5xl font-semibold mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span className="text-pink-500">My</span> <span className="text-gray-800">Services</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-[#434343] p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay={index * 200}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyServices;
