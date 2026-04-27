"use client";
import React, { useState } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaBootstrap, FaEnvelope, FaDownload,
} from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiFirebase, SiAxios, SiRedux, SiRadixui, SiTypescript, SiFigma, SiVite,
} from "react-icons/si";
import { motion } from "framer-motion";
import HexGridBg from "./HexGridBg";

const AboutMe = () => {
  const skills = [
    { Icon: FaHtml5,    label: "HTML",       color: "text-orange-400" },
    { Icon: FaCss3Alt,  label: "CSS",        color: "text-blue-400" },
    { Icon: FaJs,       label: "JavaScript", color: "text-yellow-400" },
    { Icon: FaReact,    label: "React",      color: "text-sky-400" },
    { Icon: SiTypescript, label: "TypeScript", color: "text-blue-400" },
    { Icon: SiNextdotjs,  label: "Next.js",    color: "text-gray-300" },
    { Icon: FaBootstrap,  label: "Bootstrap",  color: "text-purple-400" },
    { Icon: SiTailwindcss,label: "Tailwind CSS",color: "text-teal-500" },
    { Icon: SiRadixui,    label: "shadcn/ui",  color: "text-zinc-400" },
    { Icon: SiAxios,      label: "Axios",      color: "text-purple-400" },
    { Icon: SiRedux,      label: "Redux",      color: "text-purple-500" },
    { Icon: FaReact,      label: "Zustand",    color: "text-cyan-400" },
    { Icon: FaReact,      label: "State Mgmt", color: "text-cyan-400" },
    { Icon: FaEnvelope,   label: "EmailJS",    color: "text-sky-500" },
    { Icon: SiFirebase,   label: "Firebase",   color: "text-yellow-500" },
    { Icon: SiFigma,      label: "Figma",      color: "text-teal-500" },
    { Icon: SiVite,       label: "Vite",       color: "text-yellow-400" },
    { Icon: FaGithub,     label: "GitHub",     color: "text-gray-300" },
  ];

  const [showResumeForm, setShowResumeForm] = useState(false);
  const [email, setEmail]       = useState("");
  const [otp, setOtp]           = useState("");
  const [requestId, setRequestId] = useState("");
  const [otpSent, setOtpSent]   = useState(false);
  const [cvUrl, setCvUrl]       = useState("");
  const [requestState, setRequestState] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [requestMessage, setRequestMessage] = useState("");

  const resetForm = () => {
    setOtp(""); setRequestId(""); setOtpSent(false); setCvUrl("");
    setRequestState("idle"); setRequestMessage("");
  };

  const handleRequestResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("loading"); setRequestMessage("");
    try {
      const res  = await fetch("/api/cv/request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = (await res.json()) as { requestId?: string; error?: string; expiresInSeconds?: number; delivery?: { accepted?: string[] } };
      if (!res.ok || !data.requestId) { setRequestState("error"); setRequestMessage(data.error || "Could not send verification code."); return; }
      setRequestId(data.requestId); setOtpSent(true); setCvUrl(""); setRequestState("success");
      const mins = Math.floor((data.expiresInSeconds ?? 600) / 60);
      setRequestMessage(data.delivery?.accepted?.[0] ? `Code sent to ${data.delivery.accepted[0]}. Expires in ${mins} min.` : `Code sent. Expires in ${mins} min.`);
    } catch { setRequestState("error"); setRequestMessage("Request failed. Please try again."); }
  };

  const handleVerifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("loading"); setRequestMessage("");
    try {
      const res  = await fetch("/api/cv/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ requestId, otp }) });
      const data = (await res.json()) as { cvUrl?: string; error?: string };
      if (!res.ok || !data.cvUrl) { setRequestState("error"); setRequestMessage(data.error || "Invalid or expired code."); return; }
      setCvUrl(data.cvUrl); setRequestState("success"); setRequestMessage("Verified! Your CV is ready below.");
    } catch { setRequestState("error"); setRequestMessage("Verification failed. Please try again."); }
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 px-6 lg:px-16 text-gray-100"
    >
      {/* Shared hex + scan-line background — slightly smaller cell for variety */}
      <HexGridBg hexSize={30} />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">

        {/* ── Left: bio + resume ──────────────────────────────────── */}
        <motion.div className="lg:w-1/2"
          initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>

          <motion.span
            className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: "#0EA5E9", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.25)" }}
            initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Profile
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-black mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
            About{" "}
            <span style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Me</span>
          </h2>

          <motion.div className="h-1 w-28 rounded-full mb-6" style={{ background: "linear-gradient(to right, #0EA5E9, #14B8A6)" }}
            initial={{ width: 0, opacity: 0 }} whileInView={{ width: 112, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} />

          <p className="text-lg leading-relaxed mb-5 text-gray-300">
            I am{" "}<span className="font-semibold text-sky-400">Qamrul Hassan</span>, a Web developer with a passion for crafting visually appealing and responsive web interfaces. With hands-on experience in modern tools and technologies, I specialise in transforming ideas into functional web solutions. I have a strong foundation in frontend development, focusing on creating user-friendly designs and maintaining performance.
          </p>

          <motion.p className="italic text-xl font-semibold mb-8" style={{ color: "#0EA5E9" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 1 }}>
            &ldquo;Building engaging and accessible digital experiences.&rdquo;
          </motion.p>

          <motion.button type="button"
            onClick={() => { setShowResumeForm(p => !p); resetForm(); }}
            className="relative inline-flex items-center gap-2 px-8 py-3.5 text-white font-bold rounded-xl overflow-visible shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)", boxShadow: "0 8px 24px rgba(14,165,233,0.3)" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }} whileTap={{ scale: 0.97 }}>
            <FaDownload /><span>Request Resume Access</span>
          </motion.button>

          {showResumeForm && (
            <motion.form
              onSubmit={otpSent ? handleVerifyOtp : handleRequestResume}
              className="mt-5 w-full max-w-md rounded-2xl border border-sky-100 bg-white p-5 shadow-lg"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <label className="mb-2 block text-sm font-semibold text-gray-800" htmlFor="resume-email">Enter your email to view resume</label>
              <input id="resume-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" disabled={otpSent} />
              {otpSent && (<>
                <label className="mb-2 mt-3 block text-sm font-semibold text-gray-800" htmlFor="resume-otp">Enter 6-digit code sent to your email</label>
                <input id="resume-otp" type="text" inputMode="numeric" pattern="[0-9]{6}" required value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="123456"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
              </>)}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button type="submit" disabled={requestState === "loading"}
                  className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)" }}>
                  {requestState === "loading" ? (otpSent ? "Verifying…" : "Sending…") : (otpSent ? "Verify & Open CV" : "Send Code")}
                </button>
                {otpSent && (
                  <button type="button" onClick={() => { setOtpSent(false); resetForm(); }}
                    className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Change Email
                  </button>
                )}
                <button type="button" onClick={() => { setShowResumeForm(false); resetForm(); }}
                  className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  Close
                </button>
              </div>
              {cvUrl && (
                <a href={cvUrl} target="_blank" rel="noopener noreferrer"
                  className="mt-3 inline-flex w-fit items-center rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700 hover:bg-sky-100">
                  Open CV
                </a>
              )}
              {requestMessage && (
                <p className={`mt-3 text-sm ${requestState === "error" ? "text-red-600" : "text-emerald-600"}`}>{requestMessage}</p>
              )}
            </motion.form>
          )}
        </motion.div>

        {/* ── Right: Skills — hexagon card grid ───────────────────── */}
        <motion.div
          className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {skills.map(({ Icon, label, color }, index) => {
            // Hexagon shapes matching the same pattern as Services
            const mobileShape  = index % 2 === 0 ? "rounded-l-full rounded-r-none" : "rounded-r-full rounded-l-none";
            const desktopShape = index % 3 === 0 ? "md:rounded-l-full md:rounded-r-none" : index % 3 === 2 ? "md:rounded-r-full md:rounded-l-none" : "md:rounded-none";
            return (
              <motion.div key={index}
                className={`group relative overflow-hidden flex items-center gap-3 px-4 py-3 ${mobileShape} ${desktopShape} text-white min-h-[54px] min-w-0 shadow-md`}
                style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2027 100%)", border: "1px solid rgba(14,165,233,0.15)" }}
                whileHover={{ y: -4, scale: 1.02, boxShadow: "0 12px 28px rgba(14,165,233,0.18)" }}
                transition={{ duration: 0.22, ease: "easeOut" }}>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle at top right, rgba(14,165,233,0.12), transparent 60%)" }} />
                <div className="relative z-10 h-9 w-9 rounded-full flex items-center justify-center ring-1 ring-sky-300/30 group-hover:ring-sky-400/50 transition flex-shrink-0"
                  style={{ background: "rgba(14,165,233,0.1)" }}>
                  <Icon className={`${color} flex-shrink-0`} size={20} />
                </div>
                <span className="text-sm leading-tight break-words whitespace-normal min-w-0 max-w-full text-gray-100">{label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
