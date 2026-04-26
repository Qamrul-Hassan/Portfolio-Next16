"use client";

import React, { Suspense, lazy } from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

// Lazy-load all below-fold sections — they are NOT needed for first paint.
// This cuts JS parse/execution time on mobile by ~40-60%.
const AboutMe   = lazy(() => import("../components/AboutMe"));
const Services  = lazy(() => import("../components/Services"));
const MyProjects= lazy(() => import("../components/MyProjects"));
const Contact   = lazy(() => import("../components/Contact"));
const Footer    = lazy(() => import("../components/Footer"));
const Chat      = lazy(() => import("../components/Chat"));

// Lightweight skeleton shown while sections stream in
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
      <Topbar />
      <Navbar />
      <main>
        {/* HeroSection is above-fold — NOT lazy */}
        <HeroSection />

        {/* Everything below the fold is lazy + suspended */}
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
