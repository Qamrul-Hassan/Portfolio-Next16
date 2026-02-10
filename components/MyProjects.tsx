"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

const projects = [
  {
    title: "Chess Board",
    description:
      "A simple, clean live chess-board layout built with HTML, CSS, and JavaScript.",
    link: "https://chess-board-ufj9.onrender.com/",
    tech: "HTML, CSS, JavaScript",
    image: "/Grandmaster Chess Board.jpg",
  },
  {
    title: "Ethereum Explorer",
    description:
      "A feature-rich crypto explorer with wallet balances, transactions, NFTs, and live prices powered by Alchemy, Etherscan, and CoinGecko APIs with server-side proxies.",
    link: "https://ethereum-explorer-sepia.vercel.app/",
    tech: "Next.js, TypeScript, Tailwind CSS, shadcn/ui, Axios, Alchemy API, Etherscan API, CoinGecko API",
    image: "/etherium-explorer.jpg",
  },
  {
    title: "Countries Dashboard",
    description:
      "A modern dashboard for searching, filtering, and sorting countries with SSR + CSR architecture and accessible UI components.",
    link: "https://countries-dashboard-gamma.vercel.app/",
    tech: "Next.js (App Router), TypeScript, REST Countries API",
    image: "/countries-dashboard.jpg",
  },
  {
    title: "Job Board",
    description:
      "A responsive job board using public REST APIs, built with modern Next.js tooling and a clean UI.",
    link: "https://job-board-liart-two.vercel.app/",
    tech: "Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Axios",
    image: "/Job-board.jpg",
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
    title: "Movie Hub",
    description:
      "A responsive movie discovery app to browse trending films, search titles, and explore detailed movie information with a clean UI.",
    link: "#",
    tech: "Next.js, TypeScript, Tailwind CSS, API integration",
    image: "/Movie-Hub.jpg",
  },
  {
    title: "Weather App",
    description:
      "A dynamic Weather App powered by Next.js, Zustand for state management, and Framer Motion for smooth, interactive animations, delivering real-time weather updates.",
    link: "https://weather-app-zeta-seven-71.vercel.app/",
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
      "A dynamic and responsive web app that lets users discover meals ðŸ½ and cocktails ðŸ¹ in real-time. Built with Next.js, Tailwind CSS, and TypeScript, it fetches live data from public APIs, displays smooth animations using Framer Motion, and adapts seamlessly across devices. Ideal for exploring, saving, and planning recipes with a modern, user-friendly interface.",
    link: "https://recipe-finder-theta-five.vercel.app/",
    tech: "Next.js, Tailwind CSS, Framer Motion, TypeScript, responsive design",
    image: "/Recipe-Finder.jpg",
  },
  {
    title: "E-Commerce Website - Hektto",
    description:
      "A modern e-commerce platform built with React and Tailwind CSS, featuring seamless payment integration and a responsive design.",
    link: "https://hektto.vercel.app/",
    tech: "React, Tailwind CSS, Firebase",
    image: "/hektto.jpg",
  },
  {
    title: "Small E-Commerce Landing Page",
    description:
      "A compact, conversion-focused e-commerce landing page built with HTML and CSS.",
    link: "https://small-e-commerce-page.vercel.app/",
    tech: "HTML, CSS",
    image: "/small-e-commerce-page.jpg",
  },
  {
    title: "Justice Law Firm Landing",
    description:
      "A responsive law-firm landing page crafted with Tailwind CSS v4 and a professional layout.",
    link: "https://justice-pi-liart.vercel.app/",
    tech: "Tailwind CSS v4, HTML",
    image: "/justice.jpg",
  },
  {
    title: "AgriCulture Template",
    description:
      "A fully responsive agriculture template built with HTML, CSS, and Bootstrap.",
    link: "https://agri-culture-template.vercel.app/",
    tech: "HTML, CSS, Bootstrap",
    image: "/Agriculture.jpg",
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
];

const getSlides = (projectsList: typeof projects, slidesPerView: number) => {
  return projectsList.length < slidesPerView * 2
    ? [...projectsList, ...projectsList]
    : projectsList;
};

const MyProjects: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<any | null>(null);

  // Pagination state (responsive counts)
  const [buttonsPerSet, setButtonsPerSet] = useState(5);
  const [currentPageSet, setCurrentPageSet] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateButtons = () => {
      setButtonsPerSet(window.innerWidth >= 1024 ? 7 : 5);
    };
    updateButtons();
    window.addEventListener("resize", updateButtons);
    return () => window.removeEventListener("resize", updateButtons);
  }, []);

  const totalSets = Math.ceil(projects.length / buttonsPerSet);

  useEffect(() => {
    if (currentPageSet > totalSets - 1) {
      setCurrentPageSet(Math.max(totalSets - 1, 0));
    }
  }, [buttonsPerSet, totalSets, currentPageSet]);

  const handlePrevSet = () => {
    if (currentPageSet > 0) setCurrentPageSet(currentPageSet - 1);
  };

  const handleNextSet = () => {
    if (currentPageSet < totalSets - 1) setCurrentPageSet(currentPageSet + 1);
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
    <section id="projects" className="bg-[#CECECE] py-20 px-6 lg:px-16 text-gray-900">
      <motion.div
        className="text-center mb-12 max-w-7xl mx-auto"
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
          Portfolio Work
        </motion.span>
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <span className="text-pink-500">My</span>{" "}
          <span className="text-gray-800">Projects</span>
        </motion.h2>
        <motion.div
          className="h-1 w-28 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 mb-10"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 112, opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
        <p className="text-xl mt-4 max-w-2xl mx-auto px-4 py-2 text-gray-800 text-center md:text-2xl">
          I'm a passionate Frontend Developer with expertise in modern web technologies.
        </p>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={2.5}
          centeredSlides={true}
          loop={projects.length >= 6}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={false}
          pagination={false}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 10,
            depth: 220,
            modifier: 1.6,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1.05, spaceBetween: 12 },
            640: { slidesPerView: 1.6, spaceBetween: 18 },
            1024: { slidesPerView: 2.5, spaceBetween: 30 },
          }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={(swiper) => {
            const index = swiper.realIndex;
            setActiveIndex(index);
            const newPageSet = Math.floor(index / buttonsPerSet);
            if (newPageSet !== currentPageSet) setCurrentPageSet(newPageSet);
          }}
          className="mySwiper projectsSwiper"
        >
          {getSlides(projects, 2.3).map((project, index) => (
            <SwiperSlide key={index} className="h-full">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#434343] rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl h-full flex flex-col"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.03 }}
                onMouseEnter={() => swiperInstance?.autoplay?.stop()}
                onMouseLeave={() => swiperInstance?.autoplay?.start()}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-4/3 object-cover object-center rounded-xl shadow-md"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="p-4 sm:p-5 md:p-6 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-pink-500 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-100 mb-2 text-sm sm:text-base min-h-[72px]">
                    {project.description}
                  </p>
                  <p className="text-gray-200 text-xs sm:text-sm">
                    Tech: {project.tech}
                  </p>
                </div>
              </motion.a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom pagination (1-10 with arrows) */}
      <div className="mobile-pagination mt-6 flex items-center justify-center gap-4">
        <button
          onClick={handlePrevSet}
          aria-label="Previous"
          className="h-11 min-w-11 rounded-full px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          disabled={currentPageSet === 0}
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
          {visibleNumbers.map((_, idx) => {
            const slideIndex = currentPageSet * buttonsPerSet + idx;
            const isActive = slideIndex === activeIndex;
            return (
              <button
                key={slideIndex}
                onClick={() => goTo(slideIndex)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 scale-110 shadow-lg shadow-pink-500/35"
                    : "bg-white/70 text-gray-800 border-white hover:bg-white hover:-translate-y-0.5"
                }`}
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  WebkitClipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
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
          className="h-11 min-w-11 rounded-full px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          disabled={currentPageSet === totalSets - 1}
        >
          Next
        </button>
      </div>

      <style>
        {`
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
          .projectsSwiper .swiper-slide {
            opacity: 0.35;
            transform: scale(0.88);
            filter: grayscale(0.7);
            transition: opacity 350ms ease, transform 350ms ease, filter 350ms ease;
          }
          .projectsSwiper .swiper-slide-prev,
          .projectsSwiper .swiper-slide-next {
            opacity: 0.6;
            transform: scale(0.94);
            filter: grayscale(0.35);
          }
          .projectsSwiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
            filter: grayscale(0);
          }
          .projectsSwiper .swiper-slide-active a {
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
          }
        `}
      </style>
    </section>
  );
};

export default MyProjects;

