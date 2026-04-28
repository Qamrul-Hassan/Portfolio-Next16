"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaAt, FaComment } from "react-icons/fa";
import Image from "next/image";
import ContactImage from "../public/Contact.webp";
import HexGridBg from "./HexGridBg";

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: false,
});

/* ─── Custom Toast System ─────────────────────────────────────────────── */
type ToastType = "success" | "error" | "info";
type ToastItem = { id: number; type: ToastType; message: string };

let toastIdCounter = 0;
let globalAddToast: ((type: ToastType, message: string) => void) | null = null;

const toast = {
  success: (msg: string) => globalAddToast?.("success", msg),
  error:   (msg: string) => globalAddToast?.("error",   msg),
  info:    (msg: string) => globalAddToast?.("info",    msg),
};

const ICONS: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10" stroke="#14B8A6" strokeWidth="1.5" fill="rgba(20,184,166,0.12)" />
      <motion.path d="M6.5 11.2l3 3 6-6" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.1 }} />
    </svg>
  ),
  error: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10" stroke="#F87171" strokeWidth="1.5" fill="rgba(248,113,113,0.12)" />
      <motion.path d="M7.5 7.5l7 7M14.5 7.5l-7 7" stroke="#F87171" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }} />
    </svg>
  ),
  info: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10" stroke="#38BDF8" strokeWidth="1.5" fill="rgba(56,189,248,0.12)" />
      <motion.path d="M11 8v2M11 12v3" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
      <circle cx="11" cy="7" r="0.8" fill="#38BDF8" />
    </svg>
  ),
};

const COLORS: Record<ToastType, { border: string; glow: string; bar: string; text: string }> = {
  success: { border: "rgba(20,184,166,0.35)",  glow: "rgba(20,184,166,0.12)",  bar: "linear-gradient(to right,#14B8A6,#0EA5E9)", text: "#5eead4" },
  error:   { border: "rgba(248,113,113,0.35)", glow: "rgba(248,113,113,0.1)",  bar: "linear-gradient(to right,#F87171,#fb923c)", text: "#fca5a5" },
  info:    { border: "rgba(56,189,248,0.35)",  glow: "rgba(56,189,248,0.1)",   bar: "linear-gradient(to right,#38BDF8,#818cf8)", text: "#7dd3fc" },
};

const SingleToast: React.FC<{ item: ToastItem; onDone: (id: number) => void }> = ({ item, onDone }) => {
  const c = COLORS[item.type];
  useEffect(() => {
    const t = setTimeout(() => onDone(item.id), 4200);
    return () => clearTimeout(t);
  }, [item.id, onDone]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -28, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="relative overflow-hidden flex items-start gap-3 px-4 py-3 rounded-2xl shadow-2xl w-[320px] max-w-[90vw] cursor-pointer select-none"
      style={{
        background: "linear-gradient(135deg, rgba(10,15,30,0.97) 0%, rgba(15,25,45,0.97) 100%)",
        border: `1px solid ${c.border}`,
        boxShadow: `0 8px 32px ${c.glow}, 0 2px 8px rgba(0,0,0,0.5)`,
        backdropFilter: "blur(16px)",
      }}
      onClick={() => onDone(item.id)}
    >
      {/* Shimmer top line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl" style={{ background: c.bar }} />

      {/* Glow blob */}
      <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full blur-2xl pointer-events-none"
        style={{ background: c.glow }} />

      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">{ICONS[item.type]}</div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold leading-snug" style={{ color: c.text }}>
          {item.type === "success" ? "Success" : item.type === "error" ? "Error" : "Info"}
        </p>
        <p className="text-[12px] text-slate-300 leading-snug mt-0.5 break-words">{item.message}</p>
      </div>

      {/* Close × */}
      <button
        className="flex-shrink-0 text-slate-500 hover:text-slate-300 transition-colors text-base leading-none mt-0.5"
        onClick={(e) => { e.stopPropagation(); onDone(item.id); }}
        aria-label="Close">×</button>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ background: c.bar }}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 4, ease: "linear" }}
      />
    </motion.div>
  );
};

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((type: ToastType, message: string) => {
    const id = ++toastIdCounter;
    setToasts(prev => [{ id, type, message }, ...prev].slice(0, 5));
  }, []);

  useEffect(() => { globalAddToast = add; return () => { globalAddToast = null; }; }, [add]);

  const remove = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(item => (
          <div key={item.id} className="pointer-events-auto">
            <SingleToast item={item} onDone={remove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCaptcha = (token: string | null) => setCaptchaToken(token);
  const handleCaptchaExpired = () => setCaptchaToken(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required.");
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const ownerTemplateID = process.env.NEXT_PUBLIC_EMAILJS_OWNER_TEMPLATE_ID!;
    const userTemplateID = process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
      to_email: process.env.OWNER_EMAIL!,
      "g-recaptcha-response": captchaToken,
    };

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(serviceID, ownerTemplateID, templateParams, publicKey);
      await emailjs.send(serviceID, userTemplateID, { ...templateParams, to_email: formData.email }, publicKey);
      toast.success("Message sent successfully!");
      setShowSuccessAnim(true);
      setTimeout(() => setShowSuccessAnim(false), 5000);
      setFormData({ name: "", email: "", message: "" });
      setCaptchaToken(null);
      setCaptchaKey((key) => key + 1);
    } catch (err) {
      console.error("EmailJS Error:", err);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  const iconActions = [
    { icon: FaPhone, label: "Call phone", onClick: () => window.open("tel:+8801711844948", "_self") },
    { icon: FaEnvelope, label: "Send email", onClick: () => window.open("mailto:mdqamrul74@gmail.com") },
    { icon: FaAt, label: "Open portfolio profile", onClick: () => window.open("https://portfolio-next16.vercel.app/", "_blank") },
    { icon: FaComment, label: "Open chat info", onClick: () => alert("Chat feature coming soon!") },
  ];

  const iconVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } };
  const showCaptcha = formData.name && formData.email && formData.message;

  return (
    <section
      id="contact"
      className="relative py-16 px-6 lg:px-16 text-gray-100 overflow-hidden"
    >
      {/* Custom toast portal */}
      <ToastContainer />

      {/* Decorative shapes */}
      <span className="pointer-events-none absolute z-[1] -top-8 right-10 h-32 w-32 lg:h-44 lg:w-44 rounded-3xl rotate-12" style={{ border: "2px solid rgba(14,165,233,0.3)", background: "rgba(14,165,233,0.06)", boxShadow: "0 0 28px rgba(14,165,233,0.15)" }} />
      <span className="pointer-events-none absolute z-[1] bottom-10 left-10 h-20 w-20 lg:h-28 lg:w-28 rounded-full" style={{ border: "2px solid rgba(20,184,166,0.4)", background: "rgba(20,184,166,0.08)", boxShadow: "0 0 24px rgba(20,184,166,0.15)" }} />
      <span className="pointer-events-none absolute z-[1] top-1/2 left-8 h-20 w-20 lg:h-28 lg:w-28 -translate-y-1/2 rotate-12" style={{ border: "2px solid rgba(14,165,233,0.25)", background: "rgba(14,165,233,0.06)" }} />

      <motion.div
        className="relative z-10 text-center mb-12 px-2"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      >
        <motion.span
          className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#0EA5E9", background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.3)" }}
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          Let&apos;s Connect
        </motion.span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Get</span>{" "}
          <span className="text-white">In Touch</span>
        </h2>
        <motion.div className="h-1 w-28 mx-auto rounded-full mb-4" style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }}
          initial={{ width: 0, opacity: 0 }} whileInView={{ width: 112, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />
        <motion.p className="text-base sm:text-lg md:text-xl text-gray-400"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }}>
          Have a project or question? Let&apos;s make something amazing together!
        </motion.p>
      </motion.div>

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center rounded-2xl shadow-xl border overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 60%, #0a1628 100%)", borderColor: "rgba(14,165,233,0.15)" }}
      >
        <HexGridBg hexSize={30} />
        <span className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 45%)" }} />

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative z-10 w-full lg:w-2/5 p-5 sm:p-7 md:p-9 flex flex-col gap-4 text-center lg:text-right"
          style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.9) 100%)", borderRight: "1px solid rgba(14,165,233,0.15)" }}
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
        >
          {["name", "email"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-semibold mb-1"
                style={{ color: formData[field as keyof typeof formData] ? "#38BDF8" : "#94a3b8" }}>
                {field === "name" ? "Your Name" : "Your Email"}
              </label>
              <input
                type={field === "email" ? "email" : "text"} name={field} id={field} autoComplete={field}
                value={formData[field as keyof typeof formData]} onChange={handleChange}
                className="w-full p-3 rounded-lg text-sm text-gray-100 outline-none transition placeholder-slate-500 text-left"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(14,165,233,0.2)" }}
                onFocus={(e) => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.2)"; e.target.style.boxShadow = "none"; }}
                placeholder={field === "name" ? "Enter your full name" : "Enter your email"}
              />
            </div>
          ))}

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-1"
              style={{ color: formData.message ? "#38BDF8" : "#94a3b8" }}>Your Message</label>
            <textarea name="message" id="message" autoComplete="off" rows={4}
              value={formData.message} onChange={handleChange}
              className="w-full p-3 rounded-lg text-sm text-gray-100 outline-none transition placeholder-slate-500 resize-none text-left"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(14,165,233,0.2)" }}
              onFocus={(e) => { e.target.style.borderColor = "#0EA5E9"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.2)"; e.target.style.boxShadow = "none"; }}
              placeholder="Write your message here" />
          </div>

          {showCaptcha && (
            <div className="flex justify-center mb-1">
              <div className="w-full flex justify-center max-[390px]:scale-[0.78] max-[390px]:origin-center">
                <ReCAPTCHA key={captchaKey} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleCaptcha} onExpired={handleCaptchaExpired} size="normal" />
              </div>
            </div>
          )}

          {captchaToken && (
            <div className="text-center mb-1">
              <p className="text-xs text-slate-400 px-4">
                Protected by reCAPTCHA —{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#38BDF8" }}>Privacy</a>{" "}&amp;{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#38BDF8" }}>Terms</a>
              </p>
            </div>
          )}

          <button type="submit"
            className="w-full py-3 px-6 font-semibold rounded-xl transition duration-300 text-white"
            style={{ background: captchaToken ? "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)" : "rgba(14,165,233,0.3)", cursor: captchaToken ? "pointer" : "not-allowed", opacity: captchaToken ? 1 : 0.6 }}
            disabled={!captchaToken}>
            Send Message
          </button>

          {/* Van animation */}
          {showSuccessAnim && (
            <div className="relative w-full mt-3 overflow-hidden rounded-2xl" style={{ background: "linear-gradient(135deg, #050e1c 0%, #0d1f35 100%)", border: "1px solid rgba(14,165,233,0.25)", height: "110px" }}>
              <div className="absolute bottom-0 left-0 right-0 h-[28px]" style={{ background: "linear-gradient(to bottom, #1a2744, #111d33)" }} />
              <motion.div className="absolute bottom-[10px] left-0 flex gap-3"
                animate={{ x: [0, -80] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="h-[3px] w-10 rounded-full flex-shrink-0" style={{ background: "rgba(14,165,233,0.4)" }} />
                ))}
              </motion.div>
              {[{ x: "12%", y: "16%" }, { x: "32%", y: "10%" }, { x: "58%", y: "18%" }, { x: "78%", y: "11%" }, { x: "91%", y: "20%" }].map((s, i) => (
                <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white" style={{ left: s.x, top: s.y }}
                  animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }} />
              ))}
              <motion.div className="absolute bottom-[24px]"
                initial={{ x: -140 }}
                animate={{ x: ["-140px", "28%", "28%", "110%"] }}
                transition={{ duration: 4.8, times: [0, 0.35, 0.62, 1], ease: ["easeOut", "linear", "easeIn", "easeIn"] }}>
                <svg width="110" height="56" viewBox="0 0 110 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="14" width="92" height="32" rx="5" fill="#0EA5E9"/>
                  <path d="M62 14 L62 5 Q71 1 83 5 L97 14 Z" fill="#0284C7"/>
                  <path d="M65 13 L65 7 Q72 4 81 7 L93 13 Z" fill="#BAE6FD" opacity="0.85"/>
                  <rect x="28" y="18" width="30" height="13" rx="2" fill="#BAE6FD" opacity="0.6"/>
                  <text x="33" y="30" fontSize="9" fill="white" fontWeight="bold" opacity="0.95">✉ MAIL</text>
                  <rect x="94" y="36" width="8" height="5" rx="1" fill="#0369A1"/>
                  <rect x="5" y="36" width="6" height="5" rx="1" fill="#0369A1"/>
                  <motion.ellipse cx="101" cy="28" rx="4" ry="3" fill="#FDE68A"
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.6, repeat: Infinity }}/>
                  <motion.path d="M104 26 L118 20 M104 28 L120 28 M104 30 L118 36"
                    stroke="#FDE68A" strokeWidth="1.5" strokeOpacity="0.5"
                    animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 0.6, repeat: Infinity }}/>
                  <rect x="5" y="26" width="4" height="8" rx="1" fill="#F87171" opacity="0.9"/>
                  <circle cx="24" cy="46" r="9" fill="#1e293b"/><circle cx="24" cy="46" r="5" fill="#334155"/><circle cx="24" cy="46" r="2" fill="#64748b"/>
                  <circle cx="82" cy="46" r="9" fill="#1e293b"/><circle cx="82" cy="46" r="5" fill="#334155"/><circle cx="82" cy="46" r="2" fill="#64748b"/>
                  <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "24px 46px" }}>
                    <line x1="24" y1="41" x2="24" y2="44" stroke="#94a3b8" strokeWidth="1.2"/>
                    <line x1="24" y1="48" x2="24" y2="51" stroke="#94a3b8" strokeWidth="1.2"/>
                    <line x1="19" y1="46" x2="22" y2="46" stroke="#94a3b8" strokeWidth="1.2"/>
                    <line x1="26" y1="46" x2="29" y2="46" stroke="#94a3b8" strokeWidth="1.2"/>
                  </motion.g>
                  <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "82px 46px" }}>
                    <line x1="82" y1="41" x2="82" y2="44" stroke="#94a3b8" strokeWidth="1.2"/>
                    <line x1="82" y1="48" x2="82" y2="51" stroke="#94a3b8" strokeWidth="1.2"/>
                    <line x1="77" y1="46" x2="80" y2="46" stroke="#94a3b8" strokeWidth="1.2"/>
                    <line x1="84" y1="46" x2="87" y2="46" stroke="#94a3b8" strokeWidth="1.2"/>
                  </motion.g>
                  <motion.rect x="6" y="14" width="17" height="32" rx="3" fill="#0EA5E9"
                    animate={{ scaleX: [1, 1, 0.08, 0.08, 1] }}
                    style={{ transformOrigin: "6px 30px" }}
                    transition={{ duration: 4.8, times: [0, 0.32, 0.4, 0.6, 0.68] }}/>
                  <circle cx="19" cy="30" r="1.5" fill="#7dd3fc"/>
                </svg>
              </motion.div>
              <motion.div className="absolute top-2 left-0 right-0 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{ duration: 4.8, times: [0, 0.3, 0.44, 0.6, 0.72] }}>
                <span className="text-xs font-bold tracking-wide px-3 py-1 rounded-full" style={{ color: "#38BDF8", background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)" }}>
                  ✓ Mail loaded! Message on its way.
                </span>
              </motion.div>
            </div>
          )}
        </motion.form>

        {/* Image */}
        <motion.div
          className="relative z-10 w-full lg:w-3/5 min-h-[280px] sm:min-h-[380px]"
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
        >
          <Image src={ContactImage} alt="Contact Us" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 50%)" }} />
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex space-x-4 sm:space-x-6 z-10">
            {iconActions.map(({ icon: Icon, label, onClick }, index) => (
              <motion.button type="button" aria-label={label} key={index} onClick={onClick}
                className="cursor-pointer w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
                style={{ background: "rgba(10,15,30,0.6)", border: "1px solid rgba(14,165,233,0.3)" }}
                variants={iconVariants} initial="hidden" animate="visible"
                transition={{ delay: index * 0.5, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                whileHover={{ scale: 1.15, y: -2, backgroundColor: "rgba(14,165,233,0.3)" }}>
                <Icon size={22} className="text-white" aria-hidden="true" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
