"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import HexGridBg from "./HexGridBg";


import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Autoplay, EffectCoverflow } from "swiper/modules";

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
    title: "Stack Store — E-Commerce",
    description:
      "A full-stack e-commerce application built with Next.js 16, Prisma, NextAuth, Stripe, and Cloudinary with product management, secure authentication, and checkout flow.",
    link: "https://stack-store.vercel.app/",
    tech: "Next.js 16, React 19, TypeScript, Prisma, NextAuth v5, Stripe, Cloudinary, Zod, Tailwind CSS",
    image: "/StactStore.webp",
    featured: true,
    outcome: "Implemented secure auth, database-backed catalog, image handling, and payment-ready checkout architecture.",
  },
  {
    title: "Ethereum Explorer",
    description:
      "Built with Next.js, shadcn/ui, and Axios, this feature-rich crypto explorer shows wallet balances, transactions, NFTs, and live prices using Alchemy, Etherscan, and CoinGecko APIs.",
    link: "https://ethereum-explorer-sepia.vercel.app/",
    tech: "Next.js, TypeScript, Tailwind CSS, shadcn/ui, Axios, Alchemy API, Etherscan API, CoinGecko API",
    image: "/etherium-explorer.webp",
    featured: true,
    outcome: "Built with shadcn/ui and Axios to aggregate balances, transfers, NFTs, and live pricing in one dashboard.",
  },
  {
    title: "Countries Dashboard",
    description:
      "A modern countries dashboard built with Next.js 16, React 19, Axios, Radix Slot, CVA, and Tailwind CSS v4 for fast searching, filtering, sorting, and accessible UI patterns.",
    link: "https://countries-dashboard-gamma.vercel.app/",
    tech: "Next.js 16, React 19, TypeScript 5, Axios, Radix UI, Tailwind CSS v4",
    image: "/countries-dashboard.webp",
    featured: true,
    outcome: "Delivers fast country search/filter UX with a typed, reusable component architecture.",
  },
  {
    title: "Job Board",
    description:
      "A responsive job board using public REST APIs, built with modern Next.js tooling and a clean UI.",
    link: "https://job-board-liart-two.vercel.app/",
    tech: "Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, Axios",
    image: "/Job-board.webp",
    featured: true,
    outcome: "Search-driven job discovery flow with responsive, accessible UI patterns.",
  },
  {
    title: "Dictionary",
    description:
      "Discover word meanings, pronunciations, and examples instantly with our sleek and responsive Dictionary App. Built with Next.js and Tailwind CSS for a fast and seamless experience.",
    link: "https://dictionary-app-nine-ruby.vercel.app/",
    tech: "Next.js, Tailwind CSS",
    image: "/Dictionary.webp",
    featured: true,
  },
  {
    title: "Movie Hub",
    description:
      "A responsive movie discovery app to browse trending films, search titles, and explore detailed movie information with a clean UI.",
    link: "https://movie-hub-kappa-five.vercel.app/",
    tech: "Next.js, TypeScript, Tailwind CSS, API integration",
    image: "/Movie-Hub.webp",
  },
  {
    title: "Weather App",
    description:
      "A dynamic weather app powered by Next.js and Framer Motion, delivering real-time weather updates with smooth, interactive animations.",
    link: "https://weather-app-zeta-seven-71.vercel.app/",
    tech: "React, Tailwind CSS, Weather API",
    image: "/Weather.webp",
    featured: true,
  },
  {
    title: "Flash News",
    description:
      "Get real-time news updates with this sleek app built with Next.js and Tailwind CSS. Features live API news fetching and smooth Framer Motion animations.",
    link: "https://flash-news-app.vercel.app/",
    tech: "Next.js, Tailwind CSS, Framer Motion, Swiper",
    image: "/News.webp",
  },
  {
    title: "Recipe Finder",
    description:
      "A dynamic and responsive web app that helps users discover meals and cocktails in real-time. Fetches live data from public APIs and adapts cleanly across devices.",
    link: "https://recipe-finder-theta-five.vercel.app/",
    tech: "Next.js, Tailwind CSS, Framer Motion, TypeScript",
    image: "/Recipe-Finder.webp",
    featured: true,
  },
  {
    title: "E-Commerce Website — Hektto",
    description:
      "A modern e-commerce platform built with React and Tailwind CSS, featuring seamless payment integration and a responsive design.",
    link: "https://hektto.vercel.app/",
    tech: "React, Tailwind CSS, Firebase",
    image: "/hektto.webp",
    featured: true,
  },
  {
    title: "Small E-Commerce Landing Page",
    description:
      "A compact, conversion-focused e-commerce landing page built with HTML and CSS.",
    link: "https://small-e-commerce-page.vercel.app/",
    tech: "HTML, CSS",
    image: "/small-e-commerce-page.webp",
  },
  {
    title: "Justice Law Firm Landing",
    description:
      "A responsive law-firm landing page crafted with Tailwind CSS v4 and a professional layout.",
    link: "https://justice-pi-liart.vercel.app/",
    tech: "Tailwind CSS v4, HTML",
    image: "/justice.webp",
  },
  {
    title: "AgriCulture Template",
    description:
      "A fully responsive agriculture template built with HTML, CSS, and Bootstrap.",
    link: "https://agri-culture-template.vercel.app/",
    tech: "HTML, CSS, Bootstrap",
    image: "/Agriculture.webp",
  },
  {
    title: "Woddy Page",
    description:
      "A visually captivating wood-related website showcasing fine craftsmanship, woodwork projects, and premium wooden products with a sleek design aesthetic.",
    link: "https://woody-two.vercel.app/",
    tech: "HTML, CSS, Tailwind CSS",
    image: "/Woddy.webp",
  },
  {
    title: "Logistica",
    description:
      "An innovative logistics webpage showcasing streamlined layouts and adaptive designs for modern transportation solutions.",
    link: "https://logisticia.netlify.app/",
    tech: "HTML, Tailwind CSS",
    image: "/Logistica.webp",
  },
  {
    title: "Oreby E-Commerce",
    description:
      "A modern and feature-rich e-commerce platform built with React and Tailwind CSS, including user authentication and secure checkout.",
    link: "https://oreby-ecommerce-five.vercel.app/",
    tech: "React, Tailwind CSS, Firebase",
    image: "/Oreby.webp",
  },
  {
    title: "Photography Page",
    description:
      "A sleek photography portfolio built with Next.js, Tailwind CSS, and Framer Motion for smooth animations and optimized performance.",
    link: "https://qhs-photography-page.vercel.app/",
    tech: "Next.js, Tailwind CSS, Motion",
    image: "/Photography.webp",
  },
  {
    title: "Consult",
    description:
      "A dynamic portfolio website featuring personalized showcases, elegant animations, and a professional touch.",
    link: "#",
    tech: "React, Tailwind CSS",
    image: "/Consult.webp",
  },
];

const getSlides = (projectsList: Project[], slidesPerView: number) => {
  return projectsList.length < slidesPerView * 2
    ? [...projectsList, ...projectsList]
    : projectsList;
};

const exclusiveFeaturedTitles = [
  "Stack Store — E-Commerce",
  "Ethereum Explorer",
  "Job Board",
  "Dictionary",
  "Weather App",
  "Recipe Finder",
  "E-Commerce Website — Hektto",
];

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

  const exclusiveFeaturedProjects = exclusiveFeaturedTitles
    .map((title) => projects.find((p) => p.title === title))
    .filter((p): p is Project => Boolean(p));

  const leftFeatured = exclusiveFeaturedProjects[0];
  const rightFeatured = exclusiveFeaturedProjects[1];
  const rotatingFeatured = exclusiveFeaturedProjects.slice(2);
  const [middleIndex, setMiddleIndex] = useState(0);
  const [isMiddlePaused, setIsMiddlePaused] = useState(false);

  useEffect(() => {
    if (rotatingFeatured.length <= 1 || isMiddlePaused) return;
    const intervalId = window.setInterval(() => {
      setMiddleIndex((prev) => (prev + 1) % rotatingFeatured.length);
    }, 3400);
    return () => window.clearInterval(intervalId);
  }, [rotatingFeatured.length, isMiddlePaused]);

  const middleFeatured =
    rotatingFeatured[middleIndex] ?? rightFeatured ?? leftFeatured ?? projects[0];

  const renderFeaturedCard = (
    project: Project,
    shape: "left-pill" | "square" | "right-pill",
    textAlign: string
  ) => {
    // Border radius — pill uses 9999px on the pill side for authentic look
    const radiusMap = {
      "left-pill":  "9999px 16px 16px 9999px",
      "square":     "16px",
      "right-pill": "16px 9999px 9999px 16px",
    };
    const borderRadius = radiusMap[shape];

    // A pill with border-radius 9999px on a card ~300px wide means the curve
    // intrudes ~(height/2) px into the content. For a ~280px tall card that's
    // ~140px but visually the safe text zone starts much sooner.
    // We compensate with generous padding on the curved side.
    // left-pill: extra padding-left so text clears the left curve
    // right-pill: extra padding-right so text clears the right curve
    const ptb = "1.25rem"; // top/bottom padding
    const pFlat = "1.5rem"; // padding on the flat (non-curved) side
    const pCurve = "3.5rem"; // padding on the curved side — clears the pill intrusion

    const paddingStyle: React.CSSProperties =
      shape === "left-pill"
        ? { paddingTop: ptb, paddingBottom: ptb, paddingLeft: pCurve, paddingRight: pFlat }
        : shape === "right-pill"
        ? { paddingTop: ptb, paddingBottom: ptb, paddingLeft: pFlat, paddingRight: pCurve }
        : { padding: "1.25rem 1.5rem" };

    // Accent line: full width on square; on pills anchor to the flat edge
    // so it doesn't visually bleed into the curved void
    const accentLine = shape === "square"
      ? { top: 0, left: 0, right: 0, width: "100%" }
      : shape === "left-pill"
      ? { top: 0, right: 0, width: "65%", left: "auto" }
      : { top: 0, left: 0, width: "65%", right: "auto" };

    const cardContent = (
      <>
        {/* Top glow blob */}
        <span className="absolute -top-8 -right-8 h-24 w-24 rounded-2xl rotate-12 blur-2xl pointer-events-none"
          style={{ background: "rgba(14,165,233,0.25)" }} />

        {/* Top accent line */}
        <span className="absolute h-[2px] pointer-events-none"
          style={{ ...accentLine, background: "linear-gradient(to right, transparent, #0EA5E9, #14B8A6, transparent)" }} />

        <p className="relative text-xs font-semibold uppercase tracking-[0.15em] mb-2"
          style={{ color: "#38BDF8" }}>
          Featured
        </p>
        <h3 className="relative text-base sm:text-lg font-extrabold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="relative text-xs sm:text-sm mb-3 leading-relaxed" style={{ color: "#cbd5e1" }}>{project.description}</p>
        <p className="relative text-xs mb-2 leading-relaxed" style={{ color: "#94a3b8" }}>
          <span className="font-semibold" style={{ color: "#38BDF8" }}>Stack:</span>{" "}
          {project.tech}
        </p>
        {project.outcome && (
          <p className="relative text-xs font-medium text-white leading-relaxed">
            Result: <span className="font-normal" style={{ color: "#cbd5e1" }}>{project.outcome}</span>
          </p>
        )}

        {/* Bottom hover line */}
        <span className="absolute bottom-0 left-1/2 h-[2px] w-0 group-hover:w-2/5 -translate-x-1/2 rounded-full transition-all duration-500 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }} />
      </>
    );

    const sharedStyle: React.CSSProperties = {
      background: "linear-gradient(155deg, #0c1827 0%, #0f2235 56%, #0a1520 100%)",
      border: "1px solid rgba(14,165,233,0.2)",
      boxShadow: "0 16px 35px rgba(0,0,0,0.35)",
      borderRadius,
      overflow: "hidden",
      ...paddingStyle,
    };

    const sharedClass = `group relative block w-full h-full min-h-[260px] transition duration-300 hover:-translate-y-1 ${textAlign}`;

    if (project.link === "#") {
      return (
        <div className={sharedClass} style={sharedStyle}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 22px 46px rgba(14,165,233,0.25)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 35px rgba(0,0,0,0.35)"}>
          {cardContent}
        </div>
      );
    }

    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer"
        aria-label={`Open featured project ${project.title}`}
        className={sharedClass} style={sharedStyle}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 22px 46px rgba(14,165,233,0.25)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 35px rgba(0,0,0,0.35)"}>
        {cardContent}
      </a>
    );
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 px-6 lg:px-16 text-gray-100"
    >
      <HexGridBg hexSize={30} />
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center mb-12">
        {/* Badge */}
        <motion.span
          className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#38BDF8", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)" }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Portfolio Work
        </motion.span>

        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span style={{
            background: "linear-gradient(135deg, #38BDF8 0%, #14B8A6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            My
          </span>{" "}
          <span className="text-white">Projects</span>
        </motion.h2>

        {/* Gradient divider line */}
        <motion.div
          className="h-1 w-28 mx-auto rounded-full mb-10"
          style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }}
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 112, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

        <motion.p
          className="text-base sm:text-lg mb-10 max-w-3xl mx-auto"
          style={{ color: "#94a3b8" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          A selection of projects built with modern web technologies — focused on performance, clean UX, and maintainable code.
        </motion.p>
      </div>

      {/* Featured cards row */}
      <div className="relative z-10 w-full max-w-7xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {leftFeatured && renderFeaturedCard(leftFeatured, "left-pill", "text-right")}

        <div
          className="relative [perspective:1400px] h-full"
          onMouseEnter={() => setIsMiddlePaused(true)}
          onMouseLeave={() => setIsMiddlePaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={middleFeatured.title}
              className="h-full"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderFeaturedCard(middleFeatured, "square", "text-center")}
            </motion.div>
          </AnimatePresence>
        </div>

        {rightFeatured && renderFeaturedCard(rightFeatured, "right-pill", "text-left")}
      </div>

      {/* Swiper carousel */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
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
          {getSlides(projects, 2.3).map((project, index) => {
            const cardStyle: React.CSSProperties = {
              background: "linear-gradient(160deg, #0c1827 0%, #10233a 58%, #091520 100%)",
              border: "1px solid rgba(14,165,233,0.2)",
              boxShadow: "0 0 0 transparent",
              transition: "box-shadow 0.3s, transform 0.3s",
            };

            const cardContent = (
              <>
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
                  {/* Badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide"
                    style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(14,165,233,0.45)", color: "#7dd3fc" }}>
                    {project.link === "#" ? "Project Preview" : "Live Demo"}
                  </div>
                  {/* Top accent line on image */}
                  <span className="absolute top-0 left-0 h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }} />
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "#38BDF8" }}>
                    {project.title}
                  </h3>
                  <p className="mb-2 text-sm sm:text-base min-h-[72px]" style={{ color: "#e2e8f0" }}>
                    {project.description}
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: "#94a3b8" }}>
                    Tech: {project.tech}
                  </p>
                  {project.link !== "#" && (
                    <span className="mt-3 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                      style={{ border: "1px solid rgba(14,165,233,0.45)", background: "rgba(14,165,233,0.08)", color: "#7dd3fc" }}>
                      View Project
                    </span>
                  )}
                </div>
                {/* Radial hover glow */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(circle at top right, rgba(14,165,233,0.15), transparent 60%)" }} />
              </>
            );

            return (
              <SwiperSlide key={index} className="h-full">
                {project.link === "#" ? (
                  <div
                    className="group relative rounded-2xl overflow-hidden shadow-xl h-full flex flex-col"
                    style={cardStyle}
                  >
                    {cardContent}
                  </div>
                ) : (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo for ${project.title}`}
                    className="group relative rounded-2xl overflow-hidden shadow-xl h-full flex flex-col"
                    style={cardStyle}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: index * 0.03 }}
                    onMouseEnter={() => swiperInstance?.autoplay?.stop()}
                    onMouseLeave={() => swiperInstance?.autoplay?.start()}
                  >
                    {cardContent}
                  </motion.a>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Pagination */}
      <div className="relative z-10 mt-6 flex w-full items-center justify-center gap-1 px-2 py-1 sm:px-0 sm:gap-2 flex-nowrap">
        <button
          onClick={handlePrevSet}
          aria-label="Previous"
          disabled={currentPageSet === 0}
          className="h-9 w-9 shrink-0 sm:h-11 sm:min-w-11 sm:w-auto sm:px-4 rounded-full text-white font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)", boxShadow: "0 4px 14px rgba(14,165,233,0.35)" }}
        >
          <span className="sm:hidden text-lg leading-none">&lt;</span>
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="inline-flex items-center gap-1 sm:gap-2 overflow-x-auto px-1" style={{ scrollbarWidth: "none" }}>
          {visibleNumbers.map((_, idx) => {
            const slideIndex = currentPageSet * buttonsPerSet + idx;
            const isActive = slideIndex === activeIndex;
            return (
              <button
                key={slideIndex}
                onClick={() => goTo(slideIndex)}
                aria-label={`Go to project ${slideIndex + 1}`}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-sm font-bold transition-all"
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  WebkitClipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: isActive
                    ? "linear-gradient(135deg, #0EA5E9, #14B8A6)"
                    : "rgba(14,165,233,0.15)",
                  color: isActive ? "#ffffff" : "#7dd3fc",
                  border: "none",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                  boxShadow: isActive ? "0 0 18px rgba(14,165,233,0.5)" : "0 0 6px rgba(14,165,233,0.15)",
                  transition: "all 0.2s ease",
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
          disabled={currentPageSet === totalSets - 1}
          className="h-9 w-9 shrink-0 sm:h-11 sm:min-w-11 sm:w-auto sm:px-4 rounded-full text-white font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)", boxShadow: "0 4px 14px rgba(14,165,233,0.35)" }}
        >
          <span className="sm:hidden text-lg leading-none">&gt;</span>
          <span className="hidden sm:inline">Next</span>
        </button>
      </div>
    </section>
  );
};

export default MyProjects;
