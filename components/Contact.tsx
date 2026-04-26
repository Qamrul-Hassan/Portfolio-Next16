"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import SectionBg from "./SectionBg";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaAt, FaComment } from "react-icons/fa";
import Image from "next/image";
import ContactImage from "../public/Contact.webp";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

/* ─── Toast Types ────────────────────────────────────────────────────── */
type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
  createdAt: number;
}

/* ─── Toast Context ──────────────────────────────────────────────────── */
interface ToastContextValue {
  add: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/* ─── Toast Config ───────────────────────────────────────────────────── */
const TOAST_CONFIG = {
  success: {
    label: "Delivered",
    accent: "#10b981",
    glow: "rgba(16,185,129,0.25)",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.3)",
    icon: "✓",
  },
  error: {
    label: "Failed",
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.25)",
    bg: "rgba(244,63,94,0.08)",
    border: "rgba(244,63,94,0.3)",
    icon: "✕",
  },
  info: {
    label: "Notice",
    accent: "#38bdf8",
    glow: "rgba(56,189,248,0.25)",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.3)",
    icon: "i",
  },
} as const;

/* ─── Single Toast ───────────────────────────────────────────────────── */
const DURATION_MS = 4500;

const SingleToast: React.FC<{
  item: ToastItem;
  onRemove: (id: number) => void;
}> = ({ item, onRemove }) => {
  const cfg = TOAST_CONFIG[item.type];
  const [progress, setProgress] = useState(100);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const remove = useCallback(() => onRemove(item.id), [item.id, onRemove]);

  // RAF-based progress bar — no layout jank
  useEffect(() => {
    startRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / DURATION_MS) * 100);
      setProgress(pct);
      if (pct > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        remove();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [remove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.85, rotateY: 15 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
      exit={{
        opacity: 0,
        x: 90,
        scale: 0.88,
        transition: { duration: 0.3, ease: "easeIn" },
      }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      onClick={remove}
      role="alert"
      aria-live="polite"
      style={
        {
          "--accent": cfg.accent,
          "--glow": cfg.glow,
          "--bg": cfg.bg,
          "--border": cfg.border,
          position: "relative",
          width: 340,
          maxWidth: "calc(100vw - 32px)",
          borderRadius: 16,
          background:
            "linear-gradient(135deg, rgba(8,12,24,0.97) 0%, rgba(12,20,36,0.97) 100%)",
          border: `1px solid ${cfg.border}`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04) inset, 0 4px 24px rgba(0,0,0,0.5), 0 0 20px ${cfg.glow}`,
          backdropFilter: "blur(20px)",
          cursor: "pointer",
          overflow: "hidden",
          userSelect: "none",
        } as React.CSSProperties
      }
    >
      {/* Shimmer scan line */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "60%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
          pointerEvents: "none",
        }}
        animate={{ left: ["−100%", "200%"] }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
      />

      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)`,
        }}
      />

      {/* Content row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          padding: "14px 16px 18px",
        }}
      >
        {/* Animated icon badge */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.08 }}
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: 10,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            fontWeight: 800,
            color: cfg.accent,
            boxShadow: `0 0 12px ${cfg.glow}`,
            fontFamily: "monospace",
          }}
        >
          {cfg.icon}
        </motion.div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: cfg.accent,
            }}
          >
            {cfg.label}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              margin: "3px 0 0",
              fontSize: 13,
              color: "rgba(226,232,240,0.9)",
              lineHeight: 1.45,
              wordBreak: "break-word",
            }}
          >
            {item.message}
          </motion.p>
        </div>

        {/* Close */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            remove();
          }}
          aria-label="Dismiss"
          style={{
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(148,163,184,0.5)",
            fontSize: 18,
            lineHeight: 1,
            padding: "0 2px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(226,232,240,0.9)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color =
              "rgba(148,163,184,0.5)")
          }
        >
          ×
        </button>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(255,255,255,0.06)",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${cfg.accent}88, ${cfg.accent})`,
            borderRadius: "0 0 16px 16px",
            boxShadow: `0 0 8px ${cfg.glow}`,
            transition: "none", // driven by RAF, no CSS transition needed
          }}
        />
      </div>
    </motion.div>
  );
};

/* ─── Toast Provider ─────────────────────────────────────────────────── */
let _toastCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const add = useCallback((type: ToastType, message: string) => {
    const id = ++_toastCounter;
    setToasts((prev) => [{ id, type, message, createdAt: Date.now() }, ...prev].slice(0, 5));
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const portal =
    mounted &&
    createPortal(
      <div
        aria-live="polite"
        aria-atomic="false"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {toasts.map((item) => (
            <div key={item.id} style={{ pointerEvents: "auto" }}>
              <SingleToast item={item} onRemove={remove} />
            </div>
          ))}
        </AnimatePresence>
      </div>,
      document.body
    );

  return (
    <ToastContext.Provider value={{ add }}>
      {children}
      {portal}
    </ToastContext.Provider>
  );
};

/* ─── useToast hook ──────────────────────────────────────────────────── */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return useMemo(
    () => ({
      success: (msg: string) => ctx.add("success", msg),
      error: (msg: string) => ctx.add("error", msg),
      info: (msg: string) => ctx.add("info", msg),
    }),
    [ctx]
  );
};

/* ─── Icon Actions Config ────────────────────────────────────────────── */
const ICON_ACTIONS = [
  {
    icon: FaPhone,
    label: "Call phone",
    href: "tel:+8801711844948",
    target: "_self",
  },
  {
    icon: FaEnvelope,
    label: "Send email",
    href: "mailto:mdqamrul74@gmail.com",
    target: "_blank",
  },
  {
    icon: FaAt,
    label: "Portfolio",
    href: "https://portfolio-next16.vercel.app/",
    target: "_blank",
  },
  {
    icon: FaComment,
    label: "Chat",
    href: "#",
    target: "_self",
  },
] as const;

/* ─── Contact Form Inner (consumes toast) ────────────────────────────── */
const ContactForm: React.FC = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Stable change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCaptcha = useCallback((token: string | null) => setCaptchaToken(token), []);
  const handleCaptchaExpired = useCallback(() => setCaptchaToken(null), []);

  // Show captcha only when all fields filled — memoized
  const showCaptcha = useMemo(
    () => Boolean(formData.name && formData.email && formData.message),
    [formData.name, formData.email, formData.message]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) {
        toast.error("All fields are required.");
        return;
      }
      if (!captchaToken) {
        toast.error("Please complete the reCAPTCHA.");
        return;
      }
      if (isSubmitting) return;

      setIsSubmitting(true);

      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const ownerTemplateID = process.env.NEXT_PUBLIC_EMAILJS_OWNER_TEMPLATE_ID!;
      const userTemplateID = process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        reply_to: formData.email,
        "g-recaptcha-response": captchaToken,
      };

      try {
        await emailjs.send(serviceID, ownerTemplateID, templateParams, publicKey);
        await emailjs.send(
          serviceID,
          userTemplateID,
          { ...templateParams, to_email: formData.email },
          publicKey
        );
        toast.success("Message sent successfully!");
        setShowSuccessAnim(true);
        setTimeout(() => setShowSuccessAnim(false), 10000);
        setFormData({ name: "", email: "", message: "" });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      } catch (err) {
        console.error("EmailJS Error:", err);
        toast.error("Failed to send. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, captchaToken, isSubmitting, toast]
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative z-10 w-full lg:w-2/5 p-5 sm:p-7 md:p-9 flex flex-col gap-4 text-left lg:text-right"
      style={{
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.9) 100%)",
        borderRight: "1px solid rgba(14,165,233,0.15)",
      }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {(["name", "email"] as const).map((field) => (
        <div key={field}>
          <label
            htmlFor={field}
            className="block text-sm font-semibold mb-1 transition-colors duration-200"
            style={{
              color: formData[field] ? "#38BDF8" : "#94a3b8",
            }}
          >
            {field === "name" ? "Your Name" : "Your Email"}
          </label>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            id={field}
            autoComplete={field}
            value={formData[field]}
            onChange={handleChange}
            className="
              w-full p-3 rounded-lg text-sm text-gray-100 outline-none
              transition-[border-color,box-shadow] duration-200
              placeholder-slate-500 text-left lg:text-right
              bg-white/5 border border-[rgba(14,165,233,0.2)]
              focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)]
            "
            placeholder={field === "name" ? "Enter your full name" : "Enter your email"}
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold mb-1 transition-colors duration-200"
          style={{ color: formData.message ? "#38BDF8" : "#94a3b8" }}
        >
          Your Message
        </label>
        <textarea
          name="message"
          id="message"
          autoComplete="off"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="
            w-full p-3 rounded-lg text-sm text-gray-100 outline-none
            transition-[border-color,box-shadow] duration-200
            placeholder-slate-500 resize-none text-left lg:text-right
            bg-white/5 border border-[rgba(14,165,233,0.2)]
            focus:border-[#0EA5E9] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)]
          "
          placeholder="Write your message here"
        />
      </div>

      {/* reCAPTCHA — reserved height prevents CLS */}
      <div style={{ minHeight: showCaptcha ? "auto" : 0, overflow: "hidden" }}>
        {showCaptcha && (
          <div className="flex justify-center mb-1">
            <div className="w-full flex justify-center max-[390px]:scale-[0.78] max-[390px]:origin-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                onChange={handleCaptcha}
                onExpired={handleCaptchaExpired}
                size="normal"
              />
            </div>
          </div>
        )}
      </div>

      {captchaToken && (
        <p className="text-xs text-slate-400 text-center px-4">
          Protected by reCAPTCHA —{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#38BDF8" }}
          >
            Privacy
          </a>{" "}
          &amp;{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "#38BDF8" }}
          >
            Terms
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={!captchaToken || isSubmitting}
        className="w-full py-3 px-6 font-semibold rounded-xl transition-[opacity,background] duration-300 text-white"
        style={{
          background:
            captchaToken && !isSubmitting
              ? "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)"
              : "rgba(14,165,233,0.3)",
          cursor: captchaToken && !isSubmitting ? "pointer" : "not-allowed",
          opacity: captchaToken && !isSubmitting ? 1 : 0.6,
        }}
      >
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>

      {/* Van animation */}
      {showSuccessAnim && <VanAnimation />}
    </motion.form>
  );
};

/* ─── Van Animation (extracted to avoid re-render on form state change) */
const VanAnimation: React.FC = () => (
  <div
    className="relative w-full mt-3 overflow-hidden rounded-2xl"
    style={{
      background: "linear-gradient(135deg, #020a14 0%, #071525 100%)",
      border: "1px solid rgba(14,165,233,0.2)",
      height: 130,
    }}
  >
    {/* Stars */}
    {([
      { x: "6%", y: "10%" },
      { x: "18%", y: "6%" },
      { x: "33%", y: "14%" },
      { x: "48%", y: "7%" },
      { x: "61%", y: "12%" },
      { x: "74%", y: "5%" },
      { x: "85%", y: "15%" },
      { x: "93%", y: "8%" },
    ] as const).map((s, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white"
        style={{ left: s.x, top: s.y, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2 }}
        animate={{ opacity: [0.1, 0.8, 0.1] }}
        transition={{ duration: 2 + i * 0.3, delay: i * 0.2, repeat: Infinity }}
      />
    ))}

    {/* Road */}
    <div
      className="absolute bottom-0 left-0 right-0 h-[30px]"
      style={{ background: "linear-gradient(to bottom, #1a2a3a, #0f1e2e)" }}
    />
    <motion.div
      className="absolute bottom-[13px] left-0 flex gap-[18px]"
      animate={{ x: [0, -72] }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          className="h-[3px] w-[36px] rounded-full flex-shrink-0"
          style={{ background: "rgba(14,165,233,0.3)" }}
        />
      ))}
    </motion.div>
    <div
      className="absolute bottom-[28px] left-0 right-0 h-px"
      style={{ background: "rgba(14,165,233,0.15)" }}
    />

    {/* Status badge */}
    <motion.div
      className="absolute top-2 left-0 right-0 flex justify-center z-10"
      animate={{ opacity: [0, 0, 1, 1, 0] }}
      transition={{ duration: 10, times: [0, 0.28, 0.38, 0.62, 0.72], repeat: Infinity }}
    >
      <span
        className="text-[11px] font-bold tracking-widest px-3 py-1 rounded-full uppercase"
        style={{
          color: "#38BDF8",
          background: "rgba(14,165,233,0.1)",
          border: "1px solid rgba(14,165,233,0.3)",
        }}
      >
        ✓ Mail loaded — on its way!
      </span>
    </motion.div>

    {/* Van */}
    <motion.div
      className="absolute bottom-[28px]"
      animate={{
        x: ["-130px", "calc(45% - 55px)", "calc(45% - 55px)", "calc(100% + 160px)"],
      }}
      transition={{
        duration: 10,
        times: [0, 0.3, 0.62, 1],
        ease: ["easeOut", "linear", "easeIn", "easeIn"],
        repeat: Infinity,
      }}
    >
      <svg
        width="120"
        height="62"
        viewBox="0 0 120 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#b0bec5" />
          </linearGradient>
          <linearGradient id="mCab" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <linearGradient id="mBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#78350f" stopOpacity="0.0" />
            <stop offset="30%" stopColor="#92400e" stopOpacity="0.3" />
            <stop offset="65%" stopColor="#fbbf24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fef9c3" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="mBeam2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#78350f" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#b45309" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#fcd34d" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fefce8" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="mBeam3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#92400e" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#d97706" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="mHLens" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        <ellipse cx="58" cy="61" rx="50" ry="3" fill="rgba(0,0,0,0.4)" />
        <rect x="4" y="12" width="72" height="36" rx="3" fill="url(#mBody)" />
        <rect x="4" y="12" width="72" height="4" rx="2" fill="rgba(255,255,255,0.6)" />
        <rect x="4" y="44" width="72" height="4" rx="0" fill="rgba(0,0,0,0.1)" />
        <line x1="40" y1="12" x2="40" y2="48" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
        <line x1="4" y1="30" x2="76" y2="30" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        <rect x="36" y="27" width="8" height="2.5" rx="1.2" fill="rgba(0,0,0,0.25)" />
        <rect x="4" y="20" width="72" height="18" rx="0" fill="none" stroke="rgba(14,165,233,0.35)" strokeWidth="0.6" />
        <rect x="16" y="21" width="20" height="13" rx="1.5" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.5)" strokeWidth="0.8" />
        <path d="M16 23 L26 29 L36 23" stroke="rgba(14,165,233,0.8)" strokeWidth="1" fill="none" strokeLinecap="round" />
        <rect x="3" y="16" width="4" height="10" rx="1.5" fill="#ef4444" opacity="0.9" />
        <rect x="3" y="28" width="4" height="5" rx="1" fill="#f97316" opacity="0.7" />
        <path d="M76 12 Q82 6 92 6 L108 8 L112 12 Z" fill="#4b5563" />
        <rect x="76" y="12" width="36" height="36" rx="3" fill="url(#mCab)" />
        <path d="M108 12 Q116 14 118 24 L118 42 Q116 48 108 48 L108 12 Z" fill="#2d3748" />
        <path d="M79 13 L106 13 L108 30 L79 30 Z" fill="#60a5fa" opacity="0.45" />
        <path d="M81 14 L98 14 L99 20 L81 20 Z" fill="white" opacity="0.15" />
        <line x1="93" y1="13" x2="93" y2="30" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
        <rect x="79" y="32" width="28" height="10" rx="1.5" fill="#1e3a4a" opacity="0.7" />
        <rect x="108" y="44" width="10" height="5" rx="2" fill="#111827" />
        <line x1="110" y1="46" x2="117" y2="46" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="110" y1="48" x2="117" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        <motion.ellipse cx="114" cy="38" rx="4" ry="3" fill="url(#mHLens)"
          animate={{ opacity: [0, 0, 0.2, 1, 1] }}
          transition={{ duration: 10, times: [0, 0.28, 0.33, 0.4, 1], repeat: Infinity }} />

        <motion.path d="M114 36 L114 40 L160 43 L160 35 Z" fill="url(#mBeam2)"
          animate={{ opacity: [0, 0, 0, 1, 1] }}
          transition={{ duration: 10, times: [0, 0.28, 0.38, 0.44, 1], repeat: Infinity }} />
        <motion.path d="M114 36 L116 36 L158 26 L156 28 Z" fill="url(#mBeam)"
          animate={{ opacity: [0, 0, 0, 0.85, 0.85] }}
          transition={{ duration: 10, times: [0, 0.28, 0.38, 0.44, 1], repeat: Infinity }} />
        <motion.path d="M114 40 L116 40 L158 52 L156 50 Z" fill="url(#mBeam)"
          animate={{ opacity: [0, 0, 0, 0.85, 0.85] }}
          transition={{ duration: 10, times: [0, 0.28, 0.38, 0.44, 1], repeat: Infinity }} />
        <motion.path d="M114 35 L115 34 L152 18 L151 20 Z" fill="url(#mBeam3)"
          animate={{ opacity: [0, 0, 0, 0.5, 0.5] }}
          transition={{ duration: 10, times: [0, 0.28, 0.38, 0.44, 1], repeat: Infinity }} />
        <motion.path d="M114 41 L115 42 L152 58 L151 56 Z" fill="url(#mBeam3)"
          animate={{ opacity: [0, 0, 0, 0.5, 0.5] }}
          transition={{ duration: 10, times: [0, 0.28, 0.38, 0.44, 1], repeat: Infinity }} />

        {/* Front wheel */}
        <circle cx="96" cy="52" r="9" fill="#0f172a" />
        <circle cx="96" cy="52" r="6" fill="#1e293b" />
        <circle cx="96" cy="52" r="3.5" fill="#334155" />
        <circle cx="96" cy="52" r="1.5" fill="#64748b" />
        <motion.g animate={{ rotate: 360 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "96px 52px" }}>
          <line x1="96" y1="45" x2="96" y2="49" stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="96" y1="55" x2="96" y2="59" stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="89" y1="52" x2="93" y2="52" stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="99" y1="52" x2="103" y2="52" stroke="#94a3b8" strokeWidth="1.4" />
        </motion.g>

        {/* Rear wheel */}
        <circle cx="22" cy="52" r="9" fill="#0f172a" />
        <circle cx="22" cy="52" r="6" fill="#1e293b" />
        <circle cx="22" cy="52" r="3.5" fill="#334155" />
        <circle cx="22" cy="52" r="1.5" fill="#64748b" />
        <motion.g animate={{ rotate: 360 }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "22px 52px" }}>
          <line x1="22" y1="45" x2="22" y2="49" stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="22" y1="55" x2="22" y2="59" stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="15" y1="52" x2="19" y2="52" stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="25" y1="52" x2="29" y2="52" stroke="#94a3b8" strokeWidth="1.4" />
        </motion.g>

        {/* Exhaust */}
        <motion.circle cx="4" cy="45" r="2.5" fill="rgba(148,163,184,0.5)"
          animate={{ opacity: [0, 0.5, 0], cx: [4, -4, -14], cy: [45, 42, 38], r: [2.5, 4, 6] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }} />
      </svg>
    </motion.div>
  </div>
);

/* ─── Icon button (stable — no inline handler recreated every render) ── */
const IconButton: React.FC<{
  icon: React.ElementType;
  label: string;
  href: string;
  target: string;
  index: number;
}> = ({ icon: Icon, label, href, target, index }) => (
  <motion.a
    href={href}
    target={target}
    rel={target === "_blank" ? "noopener noreferrer" : undefined}
    aria-label={label}
    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
    style={{
      background: "rgba(10,15,30,0.6)",
      border: "1px solid rgba(14,165,233,0.3)",
    }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: index * 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1.5,
    }}
    whileHover={{
      scale: 1.15,
      y: -2,
      backgroundColor: "rgba(14,165,233,0.3)",
    }}
  >
    <Icon size={22} className="text-white" aria-hidden="true" />
  </motion.a>
);

/* ─── Main Contact Component ─────────────────────────────────────────── */
const Contact = () => (
  <ToastProvider>
    <section
      id="contact"
      className="relative py-16 px-6 lg:px-16 text-white overflow-hidden"
      style={{ background: "rgba(10,15,30,0.88)" }}
    >
      <SectionBg />

      {/* Decorative shapes */}
      <span
        className="pointer-events-none absolute z-[1] -top-8 right-10 h-32 w-32 lg:h-44 lg:w-44 rounded-3xl rotate-12"
        style={{
          border: "2px solid rgba(14,165,233,0.3)",
          background: "rgba(14,165,233,0.06)",
          boxShadow: "0 0 28px rgba(14,165,233,0.15)",
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute z-[1] bottom-10 left-10 h-20 w-20 lg:h-28 lg:w-28 rounded-full"
        style={{
          border: "2px solid rgba(20,184,166,0.4)",
          background: "rgba(20,184,166,0.08)",
          boxShadow: "0 0 24px rgba(20,184,166,0.15)",
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute z-[1] top-1/2 left-8 h-20 w-20 lg:h-28 lg:w-28 -translate-y-1/2 rotate-12"
        style={{
          border: "2px solid rgba(14,165,233,0.25)",
          background: "rgba(14,165,233,0.06)",
        }}
        aria-hidden="true"
      />

      {/* Heading */}
      <motion.div
        className="relative z-10 text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
          style={{
            color: "#0EA5E9",
            background: "rgba(14,165,233,0.1)",
            border: "1px solid rgba(14,165,233,0.3)",
          }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Let&apos;s Connect
        </motion.span>

        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Get
          </span>{" "}
          <span className="text-white">In Touch</span>
        </h2>

        <motion.div
          className="h-1 mx-auto rounded-full mb-4"
          style={{
            background: "linear-gradient(to right, #0EA5E9, #14B8A6)",
            width: 0,
          }}
          whileInView={{ width: 112 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Have a project or question? Let&apos;s make something amazing together!
        </motion.p>
      </motion.div>

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch justify-center rounded-2xl shadow-xl border overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 60%, #0a1628 100%)",
          borderColor: "rgba(14,165,233,0.15)",
        }}
      >
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 45%)",
          }}
          aria-hidden="true"
        />

        {/* Form */}
        <ContactForm />

        {/* Image */}
        <motion.div
          className="relative z-10 w-full lg:w-3/5 min-h-[280px] sm:min-h-[380px]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Image
            src={ContactImage}
            alt="Contact Us"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,15,30,0.7) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />

          {/* Icon buttons — using <a> tags to avoid JS alert for href="#" */}
          <div className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex space-x-4 sm:space-x-6 z-10">
            {ICON_ACTIONS.map((action, index) => (
              <IconButton key={action.label} {...action} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  </ToastProvider>
);

export default Contact;