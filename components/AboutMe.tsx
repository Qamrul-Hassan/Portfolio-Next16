"use client";
import React, { useState } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGithub,
  FaBootstrap,
  FaEnvelope,
  FaDownload,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiAxios,
  SiRedux,
  SiRadixui,
  SiTypescript,
  SiFigma,
  SiVite,
} from "react-icons/si";
import { motion } from "framer-motion";

const AboutMe = () => {
  const skills = [
    { Icon: FaHtml5, label: "HTML", color: "text-orange-500" },
    { Icon: FaCss3Alt, label: "CSS", color: "text-blue-500" },
    { Icon: FaJs, label: "JavaScript", color: "text-yellow-500" },
    { Icon: FaReact, label: "React", color: "text-blue-400" },
    { Icon: SiTypescript, label: "TypeScript", color: "text-blue-500" },
    { Icon: SiNextdotjs, label: "Next.js", color: "text-gray-900" },
    { Icon: FaBootstrap, label: "Bootstrap", color: "text-purple-600" },
    { Icon: SiTailwindcss, label: "Tailwind CSS", color: "text-blue-300" },
    { Icon: SiRadixui, label: "shadcn/ui", color: "text-zinc-200" },
    { Icon: SiAxios, label: "Axios", color: "text-purple-400" },
    { Icon: SiRedux, label: "Redux", color: "text-purple-500" },
    { Icon: FaReact, label: "Zustand", color: "text-cyan-300" },
    { Icon: FaReact, label: "State Management", color: "text-cyan-300" },
    { Icon: FaEnvelope, label: "EmailJS", color: "text-pink-400" },
    { Icon: SiFirebase, label: "Firebase", color: "text-yellow-500" },
    { Icon: SiFigma, label: "Figma", color: "text-pink-500" },
    { Icon: SiVite, label: "Vite", color: "text-yellow-400" },
    { Icon: FaGithub, label: "GitHub", color: "text-white" },
  ];

  const [showResumeForm, setShowResumeForm] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [requestId, setRequestId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [cvUrl, setCvUrl] = useState("");
  const [requestState, setRequestState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [requestMessage, setRequestMessage] = useState("");

  const handleRequestResume = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("loading");
    setRequestMessage("");

    try {
      const response = await fetch("/api/cv/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as {
        requestId?: string;
        error?: string;
        expiresInSeconds?: number;
        delivery?: { accepted?: string[]; rejected?: string[]; response?: string; messageId?: string };
      };

      if (!response.ok || !data.requestId) {
        setRequestState("error");
        setRequestMessage(data.error || "Could not send verification code.");
        return;
      }

      setRequestId(data.requestId);
      setOtpSent(true);
      setCvUrl("");
      setRequestState("success");
      const minutes = Math.floor((data.expiresInSeconds ?? 600) / 60);
      const acceptedTo = data.delivery?.accepted?.[0];
      setRequestMessage(
        acceptedTo
          ? `Verification code sent to ${acceptedTo}. It expires in ${minutes} minutes.`
          : `Verification code sent. It expires in ${minutes} minutes.`
      );
    } catch {
      setRequestState("error");
      setRequestMessage("Request failed. Please try again.");
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestState("loading");
    setRequestMessage("");

    try {
      const response = await fetch("/api/cv/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, requestId, otp }),
      });

      const data = (await response.json()) as {
        url?: string;
        error?: string;
        expiresInSeconds?: number;
      };

      if (!response.ok || !data.url) {
        setRequestState("error");
        setRequestMessage(data.error || "Verification failed.");
        return;
      }

      setRequestState("success");
      const minutes = Math.floor((data.expiresInSeconds ?? 900) / 60);
      setCvUrl(data.url);
      setRequestMessage(
        `Verified. Click "Open CV" below (${minutes} min link).`
      );
    } catch {
      setRequestState("error");
      setRequestMessage("Verification failed. Please try again.");
    }
  };

  return (
    <section
      className="relative overflow-hidden py-16 px-6 lg:px-16 text-gray-900"
      id="about"
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(229,231,235,0.92) 0%, rgba(243,244,246,0.88) 45%, rgba(251,207,232,0.56) 100%), url('/bg-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.span
          className="absolute -top-12 right-8 hidden h-44 w-44 rotate-12 rounded-3xl border border-white/35 bg-white/18 supports-[backdrop-filter:blur(0px)]:bg-white/12 supports-[backdrop-filter:blur(0px)]:backdrop-blur-[1px] lg:block"
          initial={{ opacity: 0, y: -20, rotate: 18 }}
          whileInView={{ opacity: 1, y: 0, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />
        <motion.span
          className="absolute top-1/2 right-6 hidden h-28 w-28 -translate-y-1/2 rounded-full border-2 border-pink-300/45 lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        />
      </div>
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-pink-600 bg-pink-100/70 border border-pink-200"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Profile
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black mb-3 text-gray-900">
            About <span className="text-pink-500">Me</span>
          </h2>
          <motion.div
            className="h-1 w-28 mx-auto lg:mx-0 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 112, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <p className="text-xl leading-relaxed mb-6 text-gray-900 font-medium">
            I am{" "}
            <span className="text-pink-500 font-semibold">Qamrul Hassan</span>, a
            frontend developer with a passion for crafting visually appealing
            and responsive web interfaces. With hands-on experience in modern
            tools and technologies, I specialize in transforming ideas into
            functional web solutions. I have a strong foundation in frontend
            development, focusing on creating user-friendly designs and
            maintaining performance. I am eager to grow and embrace challenges
            that enhance my skills and creativity.
          </p>
          <motion.p
            className="text-pink-500 italic text-2xl font-semibold mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            "Building engaging and accessible digital experiences."
          </motion.p>
          <motion.button
            type="button"
            onClick={() => {
              setShowResumeForm((prev) => !prev);
              setRequestState("idle");
              setRequestMessage("");
              setOtp("");
              setRequestId("");
              setOtpSent(false);
              setCvUrl("");
            }}
            className="relative inline-flex items-center gap-2 px-9 py-3.5 text-white font-bold rounded-xl overflow-visible border border-pink-300/60 bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/30 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaDownload className="relative z-10" />
            <span className="relative z-10">Request Resume Access</span>
          </motion.button>
          {showResumeForm ? (
            <motion.form
              onSubmit={otpSent ? handleVerifyOtp : handleRequestResume}
              className="mt-4 w-full max-w-md rounded-2xl border border-pink-200 bg-white/85 p-4 shadow-lg"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <label className="mb-2 block text-sm font-semibold text-gray-800" htmlFor="resume-email">
                Enter your email to view resume
              </label>
              <input
                id="resume-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-pink-400"
                disabled={otpSent}
              />
              {otpSent ? (
                <>
                  <label className="mb-2 mt-3 block text-sm font-semibold text-gray-800" htmlFor="resume-otp">
                    Enter 6-digit code sent to your email
                  </label>
                  <input
                    id="resume-otp"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="123456"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-pink-400"
                  />
                </>
              ) : null}
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="submit"
                  disabled={requestState === "loading"}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                >
                  {requestState === "loading"
                    ? otpSent
                      ? "Verifying..."
                      : "Sending..."
                    : otpSent
                    ? "Verify & Open CV"
                    : "Send Verification Code"}
                </button>
                {otpSent ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                      setRequestId("");
                      setCvUrl("");
                      setRequestState("idle");
                      setRequestMessage("");
                    }}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                  >
                    Change Email
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    setShowResumeForm(false);
                    setOtp("");
                    setRequestId("");
                    setOtpSent(false);
                    setCvUrl("");
                  }}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  Close
                </button>
              </div>
              {cvUrl ? (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-fit items-center rounded-lg border border-pink-300 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700 hover:bg-pink-100"
                >
                  Open CV
                </a>
              ) : null}
              {requestMessage ? (
                <p
                  className={`mt-3 text-sm ${
                    requestState === "error" ? "text-red-600" : "text-emerald-700"
                  }`}
                >
                  {requestMessage}
                </p>
              ) : null}
            </motion.form>
          ) : null}
        </motion.div>
        <motion.div
          className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {skills.map(({ Icon, label, color }, index) =>
            (() => {
              const mobileShape =
                index % 2 === 0
                  ? "rounded-l-full rounded-r-none"
                  : "rounded-r-full rounded-l-none";
              const desktopShape =
                index % 3 === 0
                  ? "md:rounded-l-full md:rounded-r-none"
                  : index % 3 === 2
                  ? "md:rounded-r-full md:rounded-l-none"
                  : "md:rounded-none";

              return (
                <motion.div
                  key={index}
                  className={`group relative overflow-hidden flex items-center gap-3 px-4 py-3 ${mobileShape} ${desktopShape} border border-white/10 text-white min-h-[54px] min-w-0 bg-gradient-to-br from-[#222226] via-[#2d2d31] to-[#18181b] shadow-lg`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="relative z-10 h-9 w-9 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/15 group-hover:bg-white/15 transition">
                    <Icon className={`${color} flex-shrink-0`} size={20} />
                  </div>
                  <span className="text-sm sm:text-base leading-tight break-words whitespace-normal min-w-0 max-w-full">
                    {label}
                  </span>
                </motion.div>
              );
            })()
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
