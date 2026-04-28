import React from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutMe from "../components/AboutMe";
import Services from "../components/Services";
import MyProjects from "../components/MyProjects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Chat from "../components/Chat";

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
        <AboutMe />
        <Services />
        <MyProjects />
        <Contact />
      </main>
      <Footer />
      <Chat />
    </>
  );
}
