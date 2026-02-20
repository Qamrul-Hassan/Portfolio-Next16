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
