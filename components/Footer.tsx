"use client";

import { FaLinkedin, FaGithub, FaXTwitter, FaWhatsapp, FaTelegram, FaEnvelope, FaPhone, FaLocationDot , FaArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";

/* ── Starfield + Rising Particles Background ── */
const FooterBg: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);

    // Static stars
    type Star = { x: number; y: number; r: number; alpha: number; blink: number };
    const stars: Star[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 300,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      blink: Math.random() * Math.PI * 2,
    }));

    // Rising particles (like embers going up)
    type Ember = { x: number; y: number; r: number; speed: number; alpha: number; color: string };
    const embers: Ember[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 300,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 0.6 + 0.2,
      alpha: Math.random() * 0.4 + 0.05,
      color: Math.random() > 0.5 ? "rgba(14,165,233," : "rgba(20,184,166,",
    }));

    // Shooting star
    type Shoot = { x: number; y: number; len: number; speed: number; active: boolean; timer: number };
    const shoot: Shoot = { x: 0, y: 0, len: 0, speed: 0, active: false, timer: 0 };

    let frame = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Stars
      stars.forEach(s => {
        const a = s.alpha + Math.sin(frame * 0.02 + s.blink) * 0.12;
        ctx.beginPath();
        ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${Math.max(0, a)})`;
        ctx.fill();
      });

      // Shooting star logic
      shoot.timer++;
      if (!shoot.active && shoot.timer > 180) {
        shoot.active = true;
        shoot.x = Math.random() * W * 0.6 + W * 0.2;
        shoot.y = Math.random() * H * 0.4;
        shoot.len = 0;
        shoot.speed = 8;
        shoot.timer = 0;
      }
      if (shoot.active) {
        shoot.len += shoot.speed;
        shoot.x += shoot.speed * 2;
        shoot.y += shoot.speed * 0.5;
        const tailGrad = ctx.createLinearGradient(shoot.x - shoot.len * 2, shoot.y - shoot.len * 0.5, shoot.x, shoot.y);
        tailGrad.addColorStop(0, "rgba(14,165,233,0)");
        tailGrad.addColorStop(1, "rgba(200,230,255,0.6)");
        ctx.beginPath();
        ctx.moveTo(shoot.x - shoot.len * 2, shoot.y - shoot.len * 0.5);
        ctx.lineTo(shoot.x, shoot.y);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        if (shoot.len > 80) { shoot.active = false; shoot.timer = 0; }
      }

      // Rising embers
      embers.forEach(e => {
        e.y -= e.speed;
        e.x += Math.sin(frame * 0.02 + e.y) * 0.3;
        if (e.y < -10) { e.y = H + 5; e.x = Math.random() * W; }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = e.color + e.alpha + ")";
        ctx.shadowColor = e.color + "0.6)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Horizon glow (bottom)
      const horizGrad = ctx.createLinearGradient(0, H * 0.7, 0, H);
      horizGrad.addColorStop(0, "rgba(14,165,233,0)");
      horizGrad.addColorStop(1, "rgba(14,165,233,0.06)");
      ctx.fillStyle = horizGrad;
      ctx.fillRect(0, H * 0.7, W, H * 0.3);

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
};

const socialLinks = [
  { href: "https://www.linkedin.com/in/md-qamrul-hassan-a44b3835b/", label: "LinkedIn profile", icon: <FaLinkedin className="w-5 h-5" />, color: "#0A66C2" },
  { href: "https://x.com/Shajal1", label: "X profile", icon: <FaXTwitter  className="w-5 h-5" />, color: "#1DA1F2" },
  { href: "https://github.com/Qamrul-Hassan", label: "GitHub profile", icon: <FaGithub className="w-5 h-5" />, color: "#1DA1F2" },
  { href: "https://wa.me/8801712345678", label: "WhatsApp", icon: <FaWhatsapp className="w-5 h-5" />, color: "#25D366" },
  { href: "https://t.me/QHS73", label: "Telegram", icon: <FaTelegram className="w-5 h-5" />, color: "#0088cc" },
];
const quickLinks = ["Home", "About", "Services", "Projects", "Contact"];
const skills = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Bootstrap", "shadcn/UI", "Axios", "Redux", "Zustand", "State mgmt", "Firebase", "Figma", "GIT", "GitHub"];
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white"
      style={{ background: "linear-gradient(160deg, #040b18 0%, #060f20 50%, #040a17 100%)" }}>
      <FooterBg />

      {/* Top blend — merges with Contact section above */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-24 z-10"
        style={{ background: "linear-gradient(to bottom, #050c18, transparent)" }}
        aria-hidden="true"
      />
      {/* Thin accent line below the blend */}
      <div className="h-[1px] w-full relative z-20 mt-24" style={{ background: "linear-gradient(to right, transparent, rgba(14,165,233,0.4) 30%, rgba(20,184,166,0.4) 70%, transparent)" }} />

      {/* Scroll-to-top */}
      <div className="relative z-10 flex justify-center pt-8 pb-0">
        <motion.button onClick={scrollToTop} aria-label="Scroll to top"
          className="group flex flex-col items-center gap-1 text-xs tracking-widest uppercase text-slate-400 hover:text-white transition-colors"
          whileHover={{ y: -2 }}>
          <span className="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 group-hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #0EA5E9, #14B8A6)", boxShadow: "0 0 20px rgba(14,165,233,0.3)" }}>
            <FaArrowUp className="w-4 h-4 text-white" />
          </span>
          Back to top
        </motion.button>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">

          {/* Brand */}
          <motion.div className="lg:col-span-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-sky-400 shadow-lg shadow-sky-500/20">
                <Image src="/Logo-4.webp" alt="QHS Logo" fill className="object-cover" />
              </div>
              <div>
                <div className="font-bold text-base text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Qamrul Hassan</div>
                <div className="text-xs text-sky-400 tracking-wider">Web Developer</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">Crafting modern, responsive web experiences with a passion for clean code and beautiful interfaces. Open to collaborations and new opportunities.</p>
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map(social => (
                <motion.a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                  whileHover={{ scale: 1.1, y: -2, background: "rgba(14,165,233,0.2)", borderColor: "rgba(14,165,233,0.4)" }}
                  whileTap={{ scale: 0.95 }}>
                  <span style={{ color: social.color }}>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <motion.li key={link} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}>
                  <a href={`#${link.toLowerCase()}`} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm justify-center md:justify-start">
                    <span className="w-4 h-[1px] rounded transition-all duration-300 group-hover:w-6" style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }} />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Expertise */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-5">Expertise</h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {skills.map((skill, index) => (
                <motion.span key={skill} className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 transition-all duration-300 hover:text-white cursor-default"
                  style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.3 + index * 0.06 }}
                  whileHover={{ background: "rgba(14,165,233,0.18)", borderColor: "rgba(14,165,233,0.4)" }}>
                  {skill}
                </motion.span>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-3">Availability</h3>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "#14B8A6" }} />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "#14B8A6" }} />
                </span>
                <span className="text-sm text-teal-300 font-medium">Available for freelance work</span>
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 mb-5">Get In Touch</h3>
            <div className="space-y-5">
              {/* Row: [icon] Label — centered, then address below */}
              <a href="mailto:mdqamrul74@gmail.com" className="group flex flex-col items-center md:items-start gap-1 text-slate-400 hover:text-white transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)" }}>
                    <FaEnvelope className="w-3 h-3 text-sky-400" />
                  </div>
                  <span className="text-xs text-slate-500">Email</span>
                </div>
                <span className="text-sm group-hover:text-sky-400 transition-colors">mdqamrul74@gmail.com</span>
              </a>

              <a href="tel:+8801711844948" className="group flex flex-col items-center md:items-start gap-1 text-slate-400 hover:text-white transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.2)" }}>
                    <FaPhone className="w-3 h-3 text-teal-400" />
                  </div>
                  <span className="text-xs text-slate-500">Phone</span>
                </div>
                <span className="text-sm group-hover:text-teal-400 transition-colors">+880 1711-844948</span>
              </a>

              <div className="flex flex-col items-center md:items-start gap-1 text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)" }}>
                    <FaLocationDot className="w-3 h-3 text-sky-400" />
                  </div>
                  <span className="text-xs text-slate-500">Location</span>
                </div>
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 w-full" style={{ borderTop: "1px solid rgba(14,165,233,0.1)" }}>
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-sm text-slate-500 text-center">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            &copy; {new Date().getFullYear()}{" "}<span className="text-slate-300 font-medium">Qamrul Hassan Shajal</span>. All Rights Reserved.
          </motion.span>
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <span>Crafted with</span><span className="text-red-400">♥</span><span>using</span>
            <span style={{ background: "linear-gradient(135deg, #38BDF8, #14B8A6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 600 }}>Next.js & Tailwind</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
