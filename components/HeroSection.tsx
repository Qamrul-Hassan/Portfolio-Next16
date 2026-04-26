"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

const HeroBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Skip hero canvas on mobile — saves ~1-2s of main-thread work during LCP.
    // The banner image is still fully visible without it.
    if (isTouchDevice()) return;

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const R = 30;
    const HH = Math.sqrt(3) * R;
    const CW = R * 1.5;

    const COLS_LEFT: [number, number, number][] = [
      [30, 110, 148],
      [8, 95, 133],
      [18, 120, 138],
      [4, 105, 122],
      [10, 105, 96],
    ];
    const COLS_RIGHT: [number, number, number][] = [
      [140, 60, 105],
      [136, 40, 88],
      [145, 58, 76],
      [144, 90, 122],
      [146, 88, 100],
    ];

    type Hex = {
      cx: number; cy: number;
      scale: number; alpha: number;
      phase: "idle" | "grow" | "hold" | "fade";
      t: number; holdMax: number;
      color: [number, number, number];
    };

    const hexes: Hex[] = [];
    let spawnT = 0;

    const buildHexes = () => {
      hexes.length = 0;
      const cols = Math.ceil(W / CW) + 2;
      const rows = Math.ceil(H / HH) + 2;
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          hexes.push({
            cx: c * CW,
            cy: r * HH + (c % 2 === 0 ? 0 : HH / 2),
            scale: 1, alpha: 0, phase: "idle", t: 0, holdMax: 40,
            color: COLS_LEFT[0],
          });
        }
      }
    };
    buildHexes();

    const drawHex = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        i === 0
          ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
          : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    };

    let raf: number;
    let lastTime = 0;
    const FRAME_MS = 1000 / 30; // cap hero canvas at 30fps

    const draw = (timestamp: number) => {
      raf = requestAnimationFrame(draw);
      if (timestamp - lastTime < FRAME_MS) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, W, H);
      spawnT++;

      if (spawnT >= 20) {
        spawnT = 0;
        const idle = hexes.filter((h) => h.phase === "idle");
        if (idle.length) {
          const h = idle[Math.floor(Math.random() * idle.length)];
          h.phase = "grow";
          h.scale = 0;
          h.alpha = 0;
          h.t = 0;
          h.holdMax = Math.floor(Math.random() * 50 + 25);
          const isRightSide = h.cx >= W * 0.5;
          const palette = isRightSide ? COLS_RIGHT : COLS_LEFT;
          h.color = palette[Math.floor(Math.random() * palette.length)];
        }
      }

      hexes.forEach((h) => {
        drawHex(h.cx, h.cy, R - 1);
        ctx.strokeStyle = "rgba(56,189,248,0.05)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        if (h.phase === "idle") return;
        h.t++;

        if (h.phase === "grow") {
          h.scale += (1 - h.scale) * 0.15;
          h.alpha += (0.5 - h.alpha) * 0.15;
          if (h.scale > 0.96) { h.phase = "hold"; h.t = 0; }
        } else if (h.phase === "hold") {
          if (h.t > h.holdMax) { h.phase = "fade"; h.t = 0; }
        } else {
          h.alpha -= 0.015;
          h.scale += (1.12 - h.scale) * 0.06;
          if (h.alpha <= 0) {
            h.phase = "idle"; h.alpha = 0; h.scale = 1; return;
          }
        }

        const [r, g, b] = h.color;

        drawHex(h.cx, h.cy, (R - 1) * h.scale);
        ctx.fillStyle = `rgba(${r},${g},${b},${(h.alpha * 0.45).toFixed(3)})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(${r},${g},${b},${(h.alpha * 0.7).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        drawHex(h.cx, h.cy, (R - 1) * h.scale * 0.55);
        ctx.strokeStyle = `rgba(${r},${g},${b},${(h.alpha * 0.4).toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 1 }}
    />
  );
};

const HeroSection: React.FC = () => {
  const welcomeText = "WELCOME TO MY PORTFOLIO";
  const typingTexts = [
    "Passionate Web Developer.",
    "React Expert with a Focus on UI/UX.",
    "Creative Problem Solver.",
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-[74svh] items-center justify-center overflow-hidden py-8 sm:min-h-[88svh] sm:py-14 lg:min-h-[84svh] lg:py-10"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(2,10,20,0.5), rgba(0,0,0,0.75)), url('/banner.webp')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      <HeroBg />
      {/* Gradient orbs — CSS only, no JS, no forced reflow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)" }} />
        <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #14B8A6 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:gap-10 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-16">
        {/* Profile image — priority + explicit dimensions prevents layout shift (CLS fix) */}
        <motion.div className="flex w-full justify-center lg:w-1/2 lg:justify-start" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1 }}>
          <motion.div className="relative h-[min(64vw,16rem)] w-[min(64vw,16rem)] sm:h-[24rem] sm:w-[24rem] md:h-[27rem] md:w-[27rem] lg:h-[29rem] lg:w-[29rem]" whileHover={{ y: -4 }} transition={{ duration: 0.25, ease: "easeOut" }}>
            <span className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-50" style={{ background: "rgba(14,165,233,0.25)" }} />
            <span className="absolute -inset-2 rounded-[1.7rem] border border-white/20 bg-white/5 backdrop-blur-sm" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-sky-400/30 shadow-[0_14px_48px_rgba(14,165,233,0.25)]">
              <Image
                src="/Portfolio-9.webp"
                alt="Qamrul Hassan"
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(min-width: 1024px) 464px, (min-width: 768px) 432px, (min-width: 640px) 384px, 64vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5" />
            </div>
          </motion.div>
        </motion.div>

        <div className="flex w-full max-w-2xl flex-col justify-center space-y-2 text-center sm:space-y-5 lg:w-1/2 lg:max-w-none lg:text-left">
          <motion.p className="mb-1 text-[11px] font-semibold tracking-[0.22em] text-sky-300/80 uppercase sm:text-sm" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
            {welcomeText}
          </motion.p>
          <motion.h1 className="mb-1 text-[1.95rem] leading-[1.12] font-extrabold text-white sm:mb-2 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl" style={{ fontFamily: "'Playfair Display', serif" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
            Hi, I&apos;m{" "}
            <span className="whitespace-nowrap" style={{ background: "linear-gradient(135deg, #38BDF8 0%, #14B8A6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Qamrul Hassan
            </span>,
          </motion.h1>
          <div className="flex min-h-12 items-center justify-center text-sm font-medium text-sky-100 sm:min-h-16 sm:text-lg md:text-xl lg:justify-start lg:text-2xl">
            <Typewriter words={typingTexts} loop cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={2000} />
          </div>
          <motion.p className="mx-auto mb-2 max-w-[34ch] px-1 text-[0.95rem] leading-relaxed text-gray-300 sm:mb-3 sm:max-w-xl sm:px-0 sm:text-base lg:mx-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
            I specialize in creating modern, responsive, and visually stunning websites. With expertise in HTML, CSS, Tailwind CSS, React, and Next.js, I turn creative ideas into functional, professional web solutions.
          </motion.p>
          <motion.div className="mt-2 flex justify-center gap-5 lg:justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
            {[
              { href: "https://www.linkedin.com/in/md-qamrul-hassan-a44b3835b/", label: "LinkedIn", icon: <FaLinkedin />, hover: "hover:text-sky-400" },
              { href: "https://github.com/Qamrul-Hassan", label: "GitHub", icon: <FaGithub />, hover: "hover:text-teal-400" },
              { href: "https://x.com/Shajal1", label: "X", icon: <FaXTwitter />, hover: "hover:text-sky-400" },
            ].map((s) => (
              <motion.a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`text-white ${s.hover} text-2xl md:text-3xl transition-colors`} whileHover={{ y: -5, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
          {/* Floating hexagons — CSS animation, off JS thread entirely */}
          <div className="relative mt-3 flex justify-center gap-2 sm:mt-8 sm:gap-6 lg:justify-start">
            {[{ colors: "from-sky-400 to-teal-500", delay: "0s" }, { colors: "from-teal-500 to-cyan-400", delay: "0.5s" }, { colors: "from-blue-500 to-sky-400", delay: "1s" }].map((item, index) => (
              <div
                key={index}
                className={`h-7 w-7 sm:h-16 sm:w-16 rounded-xl bg-gradient-to-r ${item.colors} hero-float`}
                style={{
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  animationDelay: item.delay,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
