"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

type Project = {
  title: string;
  description: string;
  link: string;
  tech: string;
  image: string;
  featured?: boolean;
  outcome?: string;
};

const projects: Project[] = [
  {
    title: "Chess Board",
    description:
      "A simple, clean live chess-board layout built with HTML, CSS, and JavaScript.",
    link: "https://chess-board-ufj9.onrender.com/",
    tech: "HTML, CSS, JavaScript",
    image: "/grandmaster-chess-board.jpg",
  },
  {
    title: "Ethereum Explorer",
    description:
      "Built with Next.js, shadcn/ui, and Axios, this feature-rich crypto explorer shows wallet balances, transactions, NFTs, and live prices using Alchemy, Etherscan, and CoinGecko APIs with server-side proxies.",
    link: "https://ethereum-explorer-sepia.vercel.app/",
    tech: "Next.js, TypeScript, Tailwind CSS, shadcn/ui, Axios, Alchemy API, Etherscan API, CoinGecko API",
    image: "/etherium-explorer.jpg",
    featured: true,
    outcome: "Built with shadcn/ui and Axios to aggregate balances, transfers, NFTs, and live pricing in one dashboard.",
  },
  {
    title: "Countries Dashboard",
    description:
      "A modern countries dashboard built with Next.js 16, React 19, Axios, Radix Slot, CVA, and Tailwind CSS v4 for fast searching, filtering, sorting, and accessible UI patterns.",
    link: "https://countries-dashboard-gamma.vercel.app/",
    tech: "Next.js 16.1.6, React 19.2.3, TypeScript 5, Axios, @radix-ui/react-slot, class-variance-authority, clsx, lucide-react, tailwind-merge, Tailwind CSS v4, tw-animate-css",
    image: "/countries-dashboard.jpg",
    featured: true,
    outcome: "Delivers fast country search/filter UX with a typed, reusable component architecture.",
  },
  {
    title: "Job Board",
    description:
      "A responsive job board using public REST APIs, built with modern Next.js tooling and a clean UI.",
    link: "https://job-board-liart-two.vercel.app/",
    tech: "Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Axios",
    image: "/Job-board.jpg",
    featured: true,
    outcome: "Search-driven job discovery flow with responsive, accessible UI patterns.",
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
    link: "https://movie-hub-kappa-five.vercel.app/",
    tech: "Next.js, TypeScript, Tailwind CSS, API integration",
    image: "/Movie-Hub.jpg",
  },
  {
    title: "Weather App",
    description:
      "A dynamic weather app powered by Next.js, Zustand for state management, and Framer Motion for smooth, interactive animations, delivering real-time weather updates.",
    link: "https://weather-app-zeta-seven-71.vercel.app/",
    tech: "React, Tailwind CSS, API",
    image: "/Weather.jpg",
  },
  {
    title: "Flash News",
    description:
      "Get real-time news updates with this sleek app built with Next.js, Tailwind CSS, and Zustand. It features live API news fetching, smooth animations via Framer Motion, and responsive design for seamless browsing.",
    link: "https://flash-news-app.vercel.app/",
    tech: "Next.js, Tailwind CSS, Framer Motion, Swiper, responsive design",
    image: "/News.jpg",
  },
  {
    title: "Recipe Finder",
    description:
      "A dynamic and responsive web app that helps users discover meals and cocktails in real-time. Built with Next.js, Tailwind CSS, and TypeScript, it fetches live data from public APIs and adapts cleanly across devices.",
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

const getSlides = (projectsList: Project[], slidesPerView: number) => {
  return projectsList.length < slidesPerView * 2
    ? [...projectsList, ...projectsList]
    : projectsList;
};

const MyProjects: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<import("swiper").Swiper | null>(null);

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

  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const getFeaturedCardRadius = (index: number) => {
    if (index === 0) return "md:rounded-l-full md:rounded-r-none";
    if (index === 1) return "md:rounded-none";
    return "md:rounded-r-full md:rounded-l-none";
  };
  const getFeaturedTextAlign = (index: number) => {
    if (index === 0) return "md:text-right";
    if (index === 1) return "md:text-center";
    return "text-left";
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 px-6 lg:px-16 text-gray-900"
      style={{
        backgroundImage:
          "linear-gradient(140deg, rgba(236,236,242,0.9) 0%, rgba(232,232,238,0.86) 45%, rgba(247,220,234,0.72) 100%), url('/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <span className="absolute top-8 right-10 hidden h-24 w-60 rotate-6 rounded-2xl border border-pink-300/35 bg-pink-300/10 lg:block" />
        <span className="absolute bottom-10 left-10 hidden h-36 w-36 -rotate-12 rounded-3xl border border-fuchsia-300/30 bg-fuchsia-300/10 lg:block" />
        <span
          className="absolute top-16 left-[7%] hidden h-44 w-44 border border-pink-300/35 bg-gradient-to-br from-pink-300/30 to-fuchsia-400/20 lg:block"
          style={{
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          }}
        />
        <span
          className="absolute bottom-14 right-[10%] hidden h-56 w-56 border border-fuchsia-300/35 bg-gradient-to-br from-fuchsia-300/25 to-pink-500/20 lg:block"
          style={{
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
          }}
        />
      </div>
      <motion.div
        className="relative z-10 text-center mb-12 max-w-7xl mx-auto"
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
          I am a passionate Frontend Developer with expertise in modern web technologies.
        </p>
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {featuredProjects.map((project, index) => (
          <div
            key={project.title}
            className={`group relative overflow-hidden rounded-lg ${getFeaturedCardRadius(
              index
            )} ${getFeaturedTextAlign(
              index
            )} border border-fuchsia-300/40 bg-[linear-gradient(155deg,#180f1c_0%,#2a1430_56%,#14101a_100%)] p-5 shadow-[0_16px_35px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(217,70,239,0.28)]`}
          >
            <span className="absolute -top-8 -right-8 h-24 w-24 rounded-2xl rotate-12 bg-fuchsia-400/20 blur-2xl" />
            <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-pink-300/70 to-transparent" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.15em] text-pink-200 mb-2">
              Featured
            </p>
            <h3 className="relative text-xl font-extrabold text-white mb-2">{project.title}</h3>
            <p className="relative text-sm text-gray-50 mb-3">{project.description}</p>
            <p className="relative text-sm text-gray-50 mb-2">
              <span className="font-semibold text-pink-200">Stack:</span> {project.tech}
            </p>
            <p className="relative text-sm text-white font-medium">
              Result: <span className="font-normal">{project.outcome}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
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
              {project.link === "#" ? (
                <div className="group relative rounded-2xl overflow-hidden border border-fuchsia-300/35 bg-[linear-gradient(160deg,#1b1320_0%,#26152f_58%,#120d18_100%)] shadow-xl h-full flex flex-col opacity-95 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(217,70,239,0.3)]">
                  <div className="relative overflow-hidden">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview image`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center rounded-xl shadow-md transition-transform duration-500 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 border border-fuchsia-300/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-pink-100">
                      Project Preview
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-pink-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-50 mb-2 text-sm sm:text-base min-h-[72px]">
                      {project.description}
                    </p>
                    <p className="text-gray-100 text-xs sm:text-sm">
                      Tech: {project.tech}
                    </p>
                    {project.title === "Ethereum Explorer" && (
                      <p className="mt-2 text-xs sm:text-sm font-semibold text-pink-200">
                        Built with shadcn/ui and Axios.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo for ${project.title}`}
                  className="group relative rounded-2xl overflow-hidden border border-fuchsia-300/35 bg-[linear-gradient(160deg,#1f1525_0%,#2d1735_58%,#150f1d_100%)] shadow-xl transform transition-all hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(217,70,239,0.32)] h-full flex flex-col"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: index * 0.03 }}
                  onMouseEnter={() => swiperInstance?.autoplay?.stop()}
                  onMouseLeave={() => swiperInstance?.autoplay?.start()}
                >
                  <div className="relative overflow-hidden">
                    <div className="relative w-full aspect-[4/3]">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview image`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center rounded-xl shadow-md transition-transform duration-500 group-hover:scale-[1.06]"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/60 border border-fuchsia-300/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-pink-100">
                      Live Demo
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-pink-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-50 mb-2 text-sm sm:text-base min-h-[72px]">
                      {project.description}
                    </p>
                    <p className="text-gray-100 text-xs sm:text-sm">
                      Tech: {project.tech}
                    </p>
                    {project.title === "Ethereum Explorer" && (
                      <p className="mt-2 text-xs sm:text-sm font-semibold text-pink-200">
                        Built with shadcn/ui and Axios.
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center rounded-full border border-fuchsia-300/45 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-pink-100">
                      View Project
                    </span>
                  </div>
                </motion.a>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative z-10 mobile-pagination mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <button
          onClick={handlePrevSet}
          aria-label="Previous"
          className="h-10 w-10 sm:h-11 sm:min-w-11 sm:w-auto sm:px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          disabled={currentPageSet === 0}
        >
          <span className="sm:hidden text-lg leading-none">&lt;</span>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {visibleNumbers.map((_, idx) => {
            const slideIndex = currentPageSet * buttonsPerSet + idx;
            const isActive = slideIndex === activeIndex;
            return (
              <button
                key={slideIndex}
                onClick={() => goTo(slideIndex)}
                aria-label={`Go to project ${slideIndex + 1}`}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all border ${
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
          className="h-10 w-10 sm:h-11 sm:min-w-11 sm:w-auto sm:px-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          disabled={currentPageSet === totalSets - 1}
        >
          <span className="sm:hidden text-lg leading-none">&gt;</span>
          <span className="hidden sm:inline">Next</span>
        </button>
      </div>

    </section>
  );
};

export default MyProjects;





