"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* ── Terminal Grid + Scan Line Background ── */
const ServicesBg: React.FC = () => {
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

    const CELL = 48;
    let frame = 0;
    let scanY = 0;
    let raf: number;

    // Random node flash data
    type FlashNode = { col: number; row: number; life: number; maxLife: number };
    const flashes: FlashNode[] = [];
    let flashTimer = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;
      scanY = (scanY + 1.2) % H;
      flashTimer++;

      // Spawn a random flash every ~30 frames
      if (flashTimer > 30) {
        flashTimer = 0;
        const cols = Math.floor(W / CELL);
        const rows = Math.floor(H / CELL);
        flashes.push({ col: Math.floor(Math.random() * cols), row: Math.floor(Math.random() * rows), life: 0, maxLife: 50 });
        if (flashes.length > 12) flashes.shift();
      }

      // Grid lines
      ctx.strokeStyle = "rgba(14,165,233,0.07)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y <= H; y += CELL) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Grid node dots at intersections
      for (let x = 0; x <= W; x += CELL) {
        for (let y = 0; y <= H; y += CELL) {
          const dist = Math.abs(y - scanY);
          const glow = Math.max(0, 1 - dist / 80);
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14,165,233,${0.12 + glow * 0.3})`;
          ctx.fill();
        }
      }

      // Flashing nodes (highlighted cells)
      flashes.forEach(f => {
        f.life++;
        const progress = f.life / f.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.45;
        const cx = f.col * CELL + CELL / 2;
        const cy = f.row * CELL + CELL / 2;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, CELL * 0.7);
        grad.addColorStop(0, `rgba(20,184,166,${alpha})`);
        grad.addColorStop(1, "rgba(20,184,166,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(f.col * CELL, f.row * CELL, CELL, CELL);

        // Dot at center
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${alpha * 1.5})`;
        ctx.shadowColor = "rgba(14,165,233,0.8)";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Horizontal scan line
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, "rgba(14,165,233,0)");
      scanGrad.addColorStop(0.5, "rgba(14,165,233,0.06)");
      scanGrad.addColorStop(1, "rgba(14,165,233,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, W, 80);

      // Bright scan line edge
      ctx.beginPath();
      ctx.moveTo(0, scanY); ctx.lineTo(W, scanY);
      ctx.strokeStyle = "rgba(14,165,233,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
};

const services = [
  { title: "Web Development", description: "Developing modern and responsive websites using HTML, CSS, JavaScript, React, and Next.js. Ensuring cross-browser compatibility and smooth user experiences.", icon: "🌐" },
  { title: "Responsive Design", description: "Crafting adaptive and mobile-first websites with Tailwind CSS and Bootstrap. Ensuring optimal viewing experiences across all devices and screen sizes.", icon: "📱" },
  { title: "React Development", description: "Building dynamic web applications with React, ensuring scalability, reusability, and efficient state management for a smooth user experience.", icon: "⚡" },
  { title: "Next.js Development", description: "Creating server-side rendered applications and static websites using Next.js, ensuring fast loading times, SEO optimization, and improved user experience.", icon: "🚀" },
  { title: "Figma to HTML Conversion", description: "Transforming Figma designs into pixel-perfect, responsive, and semantic HTML, ensuring accurate implementation of design elements.", icon: "🎨" },
  { title: "Website Customization", description: "Customizing websites to meet specific client requirements, including design tweaks, feature additions, and layout adjustments.", icon: "🛠️" },
  { title: "Debugging & Testing", description: "Identifying and resolving issues across various browsers and devices. Ensuring smooth functionality through rigorous testing and debugging.", icon: "🧪" },
  { title: "Maintenance & Support", description: "Providing ongoing website maintenance, updates, and support to ensure performance and security after deployment.", icon: "🔧" },
  { title: "Firebase Authentication", description: "Implementing secure user authentication systems with Firebase, including email, social login, and phone authentication.", icon: "🔒" },
];

const MyServices = () => {
  const getCardRadius = (i: number) => i % 3 === 0 ? "md:rounded-l-full md:rounded-r-none" : i % 3 === 2 ? "md:rounded-r-full md:rounded-l-none" : "md:rounded-none";
  const getCardTextAlign = (i: number) => i % 3 === 0 ? "md:text-right" : i % 3 === 1 ? "md:text-center" : "md:text-left";

  return (
    <section id="services" className="relative overflow-hidden py-20 px-6 lg:px-16 text-gray-100"
      style={{ background: "linear-gradient(160deg, #070d1c 0%, #0b1525 50%, #07111f 100%)" }}>
      <ServicesBg />

      {/* Corner accent blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)" }} />
        <div className="absolute -bottom-16 -right-16 h-60 w-60 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(20,184,166,0.1), transparent 70%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        <motion.span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#38BDF8", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.25)" }}
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          What I Offer
        </motion.span>
        <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}
          initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span style={{ background: "linear-gradient(135deg, #38BDF8 0%, #14B8A6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>My</span>{" "}
          <span className="text-white">Services</span>
        </motion.h2>
        <motion.div className="h-1 w-28 mx-auto rounded-full mb-10" style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }}
          initial={{ width: 0, opacity: 0 }} whileInView={{ width: 112, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
        <motion.p className="text-base sm:text-lg text-gray-300 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          Practical web services focused on speed, clean UI, and maintainable code.
        </motion.p>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {services.map((service, index) => (
            <motion.div key={index}
              className={`group relative overflow-hidden p-6 rounded-lg ${getCardRadius(index)} ${getCardTextAlign(index)} shadow-lg`}
              style={{ background: "linear-gradient(135deg, rgba(15,28,46,0.95) 0%, rgba(20,34,51,0.95) 60%, rgba(13,24,32,0.95) 100%)", border: "1px solid rgba(14,165,233,0.15)", backdropFilter: "blur(6px)" }}
              variants={{ hidden: { opacity: 0, y: 24, scale: 0.96 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.03, boxShadow: "0 20px 45px rgba(14,165,233,0.2)" }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at top right, rgba(14,165,233,0.2), transparent 50%)" }} />
              <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl mb-4 group-hover:scale-110 transition-transform"
                style={{ background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.25)" }}>
                {service.icon}
              </div>
              <h3 className="relative z-10 text-lg font-semibold text-white mb-3 leading-snug">{service.title}</h3>
              <p className="relative z-10 text-gray-400 text-sm leading-relaxed">{service.description}</p>
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 group-hover:w-1/2 -translate-x-1/2 rounded-full transition-all duration-500"
                style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MyServices;
