"use client";

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
      <main>
        <HeroSection />   {/* id="home" */}
        <AboutMe />       {/* id="about" */}
        <Services />      {/* id="services" */}
        <MyProjects />    {/* id="projects" */}
        <Contact />       {/* id="contact" */}
      </main>
      <Footer />
      <Chat />
    </>
  );
}
