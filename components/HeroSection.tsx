"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaXTwitter  } from "react-icons/fa6";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";


const HeroBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Perf: delay canvas start until after LCP / first paint ──────────
    // requestIdleCallback gives the browser time to paint the LCP image first.
    // Falls back to a 300ms timeout on Safari which lacks rIC support.
    const startCanvas = () => {
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      // ── Perf: batch all DOM reads before any writes ──────────────────
      // Reading offsetWidth/Height forces layout. Do it once here, not
      // inside the draw loop, to avoid repeated forced reflows.
      let W = canvas.offsetWidth;
      let H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        // Debounce resize to avoid thrashing layout on every pixel
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          // Batch read then write
          W = canvas.offsetWidth;
          H = canvas.offsetHeight;
          canvas.width = W;
          canvas.height = H;
          buildHexes();
        }, 150);
      };
      window.addEventListener("resize", onResize, { passive: true });

      const R = 30;
      const HH = Math.sqrt(3) * R;
      const CW = R * 1.5;

      const COLS_LEFT: [number, number, number][] = [
        [56,  189, 248],
        [14,  165, 233],
        [34,  211, 238],
        [6,   182, 212],
        [20,  184, 166],
        [168,  85, 247],
        [99,  102, 241],
      ];
      const COLS_RIGHT: [number, number, number][] = [
        [244, 114, 182],
        [236,  72, 153],
        [251, 113, 133],
        [249, 168, 212],
        [253, 164, 175],
        [232, 121, 249],
        [217,  70, 239],
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

      // Adaptive frame-skip: ~20fps mobile, ~30fps tablet, 60fps desktop
      const getSkip = () => {
        const w = window.innerWidth;
        if (w < 640)  return 3;
        if (w < 1024) return 2;
        return 1;
      };
      let frameSkip = getSkip();
      window.addEventListener("resize", () => { frameSkip = getSkip(); }, { passive: true });

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
      let frameCount = 0;

      // Cache W/H half values to avoid division in hot loop
      let halfW = W / 2;
      window.addEventListener("resize", () => { halfW = W / 2; }, { passive: true });

      const draw = () => {
        raf = requestAnimationFrame(draw);
        frameCount++;
        if (frameCount % frameSkip !== 0) return;
        ctx.clearRect(0, 0, W, H);
        spawnT++;

        if (spawnT >= 15) {
          spawnT = 0;
          const idle = hexes.filter((h) => h.phase === "idle");
          if (idle.length) {
            const h = idle[Math.floor(Math.random() * idle.length)];
            h.phase = "grow";
            h.scale = 0;
            h.alpha = 0;
            h.t = 0;
            h.holdMax = Math.floor(Math.random() * 50 + 25);
            const isRightSide = h.cx >= halfW;
            const palette = isRightSide ? COLS_RIGHT : COLS_LEFT;
            h.color = palette[Math.floor(Math.random() * palette.length)];
          }
        }

        hexes.forEach((h) => {
          drawHex(h.cx, h.cy, R - 1);
          ctx.strokeStyle = "rgba(56,189,248,0.08)";
          ctx.lineWidth = 0.8;
          ctx.stroke();

          if (h.phase === "idle") return;
          h.t++;

          if (h.phase === "grow") {
            h.scale += (1 - h.scale) * 0.15;
            h.alpha += (0.85 - h.alpha) * 0.15;
            if (h.scale > 0.96) { h.phase = "hold"; h.t = 0; }
          } else if (h.phase === "hold") {
            if (h.t > h.holdMax) { h.phase = "fade"; h.t = 0; }
          } else {
            h.alpha -= 0.020;
            h.scale += (1.12 - h.scale) * 0.06;
            if (h.alpha <= 0) {
              h.phase = "idle"; h.alpha = 0; h.scale = 1; return;
            }
          }

          const [r, g, b] = h.color;

          drawHex(h.cx, h.cy, (R - 1) * h.scale);
          ctx.fillStyle = `rgba(${r},${g},${b},${(h.alpha * 0.65).toFixed(3)})`;
          ctx.fill();

          ctx.strokeStyle = `rgba(${r},${g},${b},${h.alpha.toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          drawHex(h.cx, h.cy, (R - 1) * h.scale * 0.55);
          ctx.strokeStyle = `rgba(${r},${g},${b},${(h.alpha * 0.6).toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });
      };

      draw();
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
      };
    };

    // Defer canvas until browser is idle (after LCP paints)
    let cleanup: (() => void) | undefined;
    let handle: number;
    if ("requestIdleCallback" in window) {
      handle = window.requestIdleCallback(() => { cleanup = startCanvas(); });
    } else {
      const t = setTimeout(() => { cleanup = startCanvas(); }, 300);
      return () => clearTimeout(t);
    }
    return () => {
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(handle);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
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
          "linear-gradient(160deg, rgba(5,12,24,0.82) 0%, rgba(10,5,30,0.70) 50%, rgba(5,12,24,0.85) 100%), url('/banner.webp')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      <HeroBg />
      {/* Bottom blend — fades hero into next section seamlessly */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-20"
        style={{ background: "linear-gradient(to bottom, transparent, #050c18)" }}
        aria-hidden="true"
      />
      {/* Background atmosphere — layered colour orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Left side — large sky/cyan bloom */}
        <div className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.28) 0%, transparent 70%)", opacity: 1 }} />
        {/* Right-side top — fuchsia/violet glow behind text */}
        <div className="absolute right-0 top-0 h-[26rem] w-[38rem] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse at top right, rgba(168,85,247,0.22) 0%, rgba(236,72,153,0.14) 40%, transparent 70%)" }} />
        {/* Right-side mid — warm rose accent */}
        <div className="absolute right-[-4rem] top-[30%] h-72 w-72 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(244,114,182,0.20) 0%, transparent 65%)" }} />
        {/* Bottom-right teal */}
        <div className="absolute -right-16 bottom-[15%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)" }} />
        {/* Centre diagonal shimmer */}
        <div className="absolute left-1/2 top-0 h-full w-px opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, #38BDF8 40%, #A855F7 60%, transparent)" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:gap-10 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-16">
        {/* Profile Image */}
        <motion.div
          className="flex w-full justify-center lg:w-1/2 lg:justify-start"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="relative h-[min(64vw,16rem)] w-[min(64vw,16rem)] sm:h-[24rem] sm:w-[24rem] md:h-[27rem] md:w-[27rem] lg:h-[29rem] lg:w-[29rem]"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Teal glow */}
            <span
              className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-50"
              style={{ background: "rgba(14,165,233,0.25)" }}
            />
            {/* Glass border */}
            <span className="absolute -inset-2 rounded-[1.7rem] border border-white/20 bg-white/5 backdrop-blur-sm" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-sky-400/30 shadow-[0_14px_48px_rgba(14,165,233,0.25)]">
              <Image
                src="/Portfolio-9.webp"
                alt="Qamrul Hassan"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 464px, (min-width: 768px) 432px, (min-width: 640px) 384px, 64vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/5" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text Section — right column with decorative panel */}
        <div className="relative flex w-full max-w-2xl flex-col justify-center space-y-2 text-center sm:space-y-5 lg:w-1/2 lg:max-w-none lg:text-left">

          {/* Decorative glow panel — visible on desktop, subtle on mobile */}
          <div className="pointer-events-none absolute inset-0 -m-8 hidden lg:block" style={{ zIndex: 0 }} aria-hidden="true">
            {/* Decorative border glow — no backdropFilter so text stays sharp */}
            <div className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.04) 0%, rgba(236,72,153,0.03) 40%, rgba(14,165,233,0.02) 100%)",
                border: "1px solid rgba(168,85,247,0.14)",
              }} />
            {/* Top-right corner accent */}
            <div className="absolute -top-3 -right-3 h-24 w-24 rounded-full blur-xl"
              style={{ background: "radial-gradient(circle, rgba(232,121,249,0.35) 0%, transparent 70%)" }} />
            {/* Bottom-left corner accent */}
            <div className="absolute -bottom-3 -left-3 h-20 w-20 rounded-full blur-xl"
              style={{ background: "radial-gradient(circle, rgba(56,189,248,0.30) 0%, transparent 70%)" }} />
            {/* Animated top border line */}
            <div className="absolute top-0 left-[10%] right-[10%] h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.6) 30%, rgba(236,72,153,0.6) 70%, transparent)" }} />
            {/* Animated bottom border line */}
            <div className="absolute bottom-0 left-[10%] right-[10%] h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(14,165,233,0.5) 50%, transparent)" }} />
          </div>
          <motion.p
            className="mb-1 text-[11px] font-semibold tracking-[0.22em] text-sky-300/80 uppercase sm:text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {welcomeText}
          </motion.p>

          <motion.h1
            className="mb-1 text-[1.95rem] leading-[1.12] font-extrabold text-white sm:mb-2 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Hi, I&apos;m{" "}
            <span
              className="whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #38BDF8 0%, #14B8A6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Qamrul Hassan
            </span>
            ,
          </motion.h1>

          <div className="flex min-h-12 items-center justify-center text-sm font-medium text-sky-100 sm:min-h-16 sm:text-lg md:text-xl lg:justify-start lg:text-2xl">
            <Typewriter
              words={typingTexts}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>

          <motion.p
            className="mx-auto mb-2 max-w-[34ch] px-1 text-[0.95rem] leading-relaxed text-gray-300 sm:mb-3 sm:max-w-xl sm:px-0 sm:text-base lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            I specialize in creating modern, responsive, and visually stunning
            websites. With expertise in HTML, CSS, Tailwind CSS, React, and
            Next.js, I turn creative ideas into functional, professional web
            solutions.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            className="mt-2 flex justify-center gap-5 lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {[
              { href: "https://www.linkedin.com/in/md-qamrul-hassan-a44b3835b/", label: "LinkedIn", icon: <FaLinkedin />, hover: "hover:text-sky-400" },
              { href: "https://github.com/Qamrul-Hassan", label: "GitHub", icon: <FaGithub />, hover: "hover:text-teal-400" },
              { href: "https://x.com/Shajal1", label: "X", icon: <FaXTwitter  />, hover: "hover:text-sky-400" },
            ].map((s) => (
              <motion.a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`text-white ${s.hover} text-2xl md:text-3xl transition-colors`}
                whileHover={{ y: -5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Bouncing gradient hexagons */}
          <div className="relative mt-3 flex justify-center gap-5 sm:mt-8 sm:gap-8 lg:justify-start">
            {[
              {
                gradient: "linear-gradient(135deg, #38BDF8 0%, #6366F1 50%, #A855F7 100%)",
                delay: 0,
              },
              {
                gradient: "linear-gradient(135deg, #F472B6 0%, #EC4899 40%, #A855F7 100%)",
                delay: 0.4,
              },
              {
                gradient: "linear-gradient(135deg, #2DD4BF 0%, #06B6D4 50%, #38BDF8 100%)",
                delay: 0.8,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                style={{
                  width: 52,
                  height: 52,
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background: item.gradient,
                  willChange: "transform",
                }}
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                  delay: item.delay,
                  ease: [0.45, 0, 0.55, 1],
                }}
              />
            ))}
          </div>
          {/* end decorative panel */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
