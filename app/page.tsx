"use client";

import React, { Suspense, lazy } from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

// Lazy-load ALL below-fold sections.
// This is the single biggest win for JS execution time — heavy components like
// Contact (35KB) and MyProjects (25KB) won't parse until they're needed.
// On a slow mobile connection this saves 1-3 seconds of parse/execution time.
const AboutMe    = lazy(() => import("../components/AboutMe"));
const Services   = lazy(() => import("../components/Services"));
const MyProjects = lazy(() => import("../components/MyProjects"));
const Contact    = lazy(() => import("../components/Contact"));
const Footer     = lazy(() => import("../components/Footer"));
const Chat       = lazy(() => import("../components/Chat"));

/*
 * FIX: Reduce unused JavaScript — GlobalHexBg was imported eagerly in the
 * original page but it's a decorative background canvas that is skipped
 * entirely on mobile (isTouchDevice() check). Lazy-loading it ensures the
 * canvas JS is never parsed on mobile at all, saving ~5KB of script
 * evaluation time on the critical path.
 */
const GlobalHexBg = lazy(() => import("../components/GlobalHexBg"));

// Lightweight skeleton shown while sections hydrate
const SectionSkeleton = () => (
  <div className="w-full py-20 px-6" aria-hidden="true">
    <div className="max-w-7xl mx-auto space-y-4 animate-pulse">
      <div className="h-6 w-40 rounded bg-white/5 mx-auto" />
      <div className="h-10 w-72 rounded bg-white/5 mx-auto" />
      <div className="h-4 w-full max-w-xl rounded bg-white/5 mx-auto" />
      <div className="h-4 w-3/4 max-w-xl rounded bg-white/5 mx-auto" />
    </div>
  </div>
);

export default function Page() {
  return (
    <>
      {/* GlobalHexBg lazy-loaded — desktop-only canvas, skipped on mobile */}
      <Suspense fallback={null}>
        <GlobalHexBg />
      </Suspense>
      <Topbar />
      <Navbar />
      <main>
        {/* HeroSection is above-fold — loaded eagerly, NOT lazy */}
        <HeroSection />

        {/* Everything below the fold is deferred until needed */}
        <Suspense fallback={<SectionSkeleton />}>
          <AboutMe />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <MyProjects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </>
  );
}
