import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import DeferredHomeSections, {
  DeferredFooterAndChat,
} from "../components/DeferredHomeSections";

export default function Page() {
  return (
    <>
      <Topbar />
      <Navbar />
      {/*
       * id="main-content" matches the skip-link in layout.tsx
       * Wrapping all sections in one <main> gives screen readers a landmark
       * and improves Accessibility score.
       */}
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <HeroSection />
        <DeferredHomeSections />
      </main>
      <DeferredFooterAndChat />
    </>
  );
}
