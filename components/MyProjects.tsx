"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const projects = [
  {
    title: "E-Commerce Website - Hektto",
    description:
      "A modern e-commerce platform built with React and Tailwind CSS, featuring seamless payment integration and a responsive design.",
    link: "https://hektto.vercel.app/",
    tech: "React, Tailwind CSS, Firebase",
    image: "/hektto.jpg",
  },
  {
    title: "Woddy Page",
    description:
      "A visually captivating wood-related website showcasing fine craftsmanship, woodwork projects, and premium wooden products with a sleek design aesthetic.",
    link: "https://woody-two.vercel.app/",
    tech: "HTML, CSS, Tailwind CSS",
    image: "/Woddy.jpg",
  },
  {
    title: "Logistica",
    description:
      "An innovative logistics webpage showcasing streamlined layouts and adaptive designs for modern transportation solutions.",
    link: "https://logisticia.netlify.app/",
    tech: "HTML, Tailwind CSS",
    image: "/Logistica.jpg",
  },
  {
    title: "Oreby E-Commerce",
    description:
      "A modern and feature-rich e-commerce platform built with React and Tailwind CSS, including user authentication and secure checkout.",
    link: "https://oreby-ecommerce-five.vercel.app/",
    tech: "React, Tailwind CSS, Firebase",
    image: "/Oreby.jpg",
  },
  {
    title: "Photography Page",
    description:
      "A sleek photography portfolio built with Next.js, Tailwind CSS, and Motion for smooth animations and optimized performance.",
    link: "https://qhs-photography-page.vercel.app/",
    tech: "Next.js, Tailwind CSS, Motion",
    image: "/Photography.jpg",
  },
  {
    title: "Consult",
    description:
      "A dynamic portfolio website featuring personalized showcases, elegant animations, and a professional touch.",
    link: "#",
    tech: "React, Tailwind CSS",
    image: "/Consult.jpg",
  },
  {
    title: "Dictionary",
    description:
      "Discover word meanings, pronunciations, and examples instantly with our sleek and responsive Dictionary App. Built with Next.js and Tailwind CSS for a fast and seamless experience.",
    link: "https://dictionary-app-nine-ruby.vercel.app/",
    tech: "Next.js, Tailwind CSS",
    image: "/Dictionary.jpg",
  },
  {
    title: "Weather App",
    description:
      "A dynamic Weather App powered by Next.js, Zustand for state management, and Framer Motion for smooth, interactive animations, delivering real-time weather updates.",
    link: "https://weatherapp-qhs.vercel.app/",
    tech: "React, Tailwind CSS, API",
    image: "/Weather.jpg",
  },
  {
    title: "Flash News",
    description:
      "Get real-time news updates with this sleek app built with Next.js, Tailwind CSS, and Zustand. Featuring live API news fetching, smooth animations via Framer Motion, and responsive design for a seamless browsing experience",
    link: "https://flash-news-app.vercel.app/",
    tech: "Next.js, Tailwind CSS, Framer Motion, Swiper, responsive design",
    image: "/News.jpg",
  },
  {
    title: "Recipe Finder",
    description:
      "A dynamic and responsive web app that lets users discover meals 🍽 and cocktails 🍹 in real-time. Built with Next.js, Tailwind CSS, and TypeScript, it fetches live data from public APIs, displays smooth animations using Framer Motion, and adapts seamlessly across devices. Ideal for exploring, saving, and planning recipes with a modern, user-friendly interface.",
    link: "https://recipe-finder-theta-five.vercel.app/",
    tech: "Next.js, Tailwind CSS, Framer Motion, TypeScript, responsive design",
    image: "/Recipe-Finder.jpg",
  },
];

const getSlides = (projectsList: typeof projects, slidesPerView: number) => {
  return projectsList.length < slidesPerView * 2
    ? [...projectsList, ...projectsList]
    : projectsList;
};

const MyProjects: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<any | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Mobile pagination state
  const buttonsPerSet = 5; // show 5 numbers per set
  const totalSets = Math.ceil(projects.length / buttonsPerSet);
  const [currentPageSet, setCurrentPageSet] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handlePrevSet = () => {
    if (currentPageSet > 0) setCurrentPageSet(currentPageSet - 1);
  };

  const handleNextSet = () => {
    if (currentPageSet < totalSets - 1) setCurrentPageSet(currentPageSet + 1);
  };

  const handlePrev = () => {
    if (!swiperInstance) return;
    swiperInstance.slidePrev();
  };

  const handleNext = () => {
    if (!swiperInstance) return;
    swiperInstance.slideNext();
  };

  const goTo = (index: number) => {
    if (!swiperInstance) return;
    if (typeof swiperInstance.slideToLoop === "function") {
      swiperInstance.slideToLoop(index);
    } else {
      swiperInstance.slideTo(index);
    }
  };

  const visibleNumbers = projects.slice(
    currentPageSet * buttonsPerSet,
    currentPageSet * buttonsPerSet + buttonsPerSet
  );

  return (
    <section id="projects" className="bg-[#CECECE] py-20 px-6 lg:px-16 text-white">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span className="text-pink-500">My</span>{" "}
          <span className="text-gray-800">Projects</span>
        </motion.h2>
        <p className="text-xl mt-4 max-w-2xl mx-auto px-4 py-2 text-gray-800 text-center md:text-2xl">
          I'm a passionate Frontend Developer with expertise in modern web technologies.
        </p>
      </motion.div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={2.5}
        centeredSlides={true}
        loop={projects.length >= 6}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        navigation={false}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className}">${index + 1}</span>`;
          },
        }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 2.5, spaceBetween: 30 },
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => {
          if (!isMobile) return;
          const index = swiper.realIndex;
          setActiveIndex(index);
          const newPageSet = Math.floor(index / buttonsPerSet);
          if (newPageSet !== currentPageSet) setCurrentPageSet(newPageSet);
        }}
        className="mySwiper"
      >
        {getSlides(projects, 2.5).map((project, index) => (
          <SwiperSlide key={index}>
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#434343] rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: index * 0.03 }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-[350px] object-cover object-top rounded-xl shadow-md"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-pink-500 mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <p className="text-gray-400 text-xs">Tech: {project.tech}</p>
              </div>
            </motion.a>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination swiper-pagination" aria-hidden={isMobile ? "true" : "false"} />

      {/* Mobile custom controls */}
      <div className="mobile-pagination mt-6 hidden items-center justify-center gap-4">
        <button
          onClick={handlePrevSet}
          aria-label="Previous"
          className="px-3 py-1 text-white hover:text-pink-400 transition text-2xl"
          disabled={currentPageSet === 0}
        >
          &lt;
        </button>

        <div className="flex items-center gap-2">
          {visibleNumbers.map((_, idx) => {
            const slideIndex = currentPageSet * buttonsPerSet + idx;
            const isActive = slideIndex === activeIndex;
            return (
              <button
                key={slideIndex}
                onClick={() => goTo(slideIndex)}
                className="w-10 h-10 flex items-center justify-center text-sm font-bold text-white transition"
                style={{
                  background: isActive ? "#ff4d6d" : "#ff6f91",
                  border: "2px solid #ff4d6d",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                {slideIndex + 1}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNextSet}
          aria-label="Next"
          className="px-3 py-1 text-white hover:text-pink-400 transition text-2xl"
          disabled={currentPageSet === totalSets - 1}
        >
          &gt;
        </button>
      </div>

      <style>
        {`
          .swiper-pagination {
            position: relative;
            margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .swiper-pagination-bullet {
            width: 40px;
            height: 40px;
            background: #ff6f91;
            border: 2px solid #ff4d6d;
            border-radius: 0;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            font-weight: bold;
            margin: 0 8px;
            cursor: pointer;
            transition: transform 0.3s ease, background 0.3s ease;
          }
          .swiper-pagination-bullet:hover {
            transform: scale(1.1);
            background: #ff4d6d;
          }
          .swiper-pagination-bullet-active {
            background: #ff4d6d;
            border: 2px solid #ff6f91;
            transform: scale(1.1);
          }
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
          @media (max-width: 639px) {
            .swiper-pagination { display: none !important; }
            .mobile-pagination { display: flex !important; }
          }
          @media (min-width: 640px) {
            .mobile-pagination { display: none !important; }
          }
        `}
      </style>
    </section>
  );
};

export default MyProjects;
