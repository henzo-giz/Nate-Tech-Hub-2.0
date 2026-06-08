/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import ClaimSpotModal from "./components/ClaimSpotModal";

export default function App() {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Smooth scroll routing handle
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === "launch") {
      setIsClaimModalOpen(true);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen text-white font-body selection:bg-white selection:text-black overflow-x-hidden">
      {/* Real base black background layer to prevent blocking the video */}
      <div className="fixed inset-0 bg-black -z-20 pointer-events-none" />

      {/* Looping Slow-motion Background Video */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source 
            src="https://res.cloudinary.com/dzh81sk25/video/upload/v1779542979/Slow-mo_background_01_hxvyoy.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Soft subtle vignette gradient overlay with a 20% blur filter (approx. 5px) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 backdrop-blur-[5px] pointer-events-none" />
      </div>

      {/* Absolute space dust star background layers */}
      <div className="absolute inset-x-0 top-0 h-[200vh] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.015)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-10" />

      {/* Navigation */}
      <Navbar
        onClaimSpot={() => setIsClaimModalOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Sections */}
      <main className="relative w-full z-10">
        {/* Section 1: Hero Experience */}
        <Hero onStartVoyage={() => handleNavigateSection("voyages")} />

        {/* Section 2: Fleet Capabilities & Simulation Deck */}
        <Capabilities />
      </main>

      {/* Clean, minimalist, monochrome footer */}
      <footer className="border-t border-white/5 py-12 px-8 md:px-16 lg:px-20 bg-black/40 backdrop-blur-sm relative z-10 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/50 font-body">
          <div className="flex items-center gap-3">
            <span className="font-heading italic text-lg text-white font-normal lowercase tracking-tight">Nate-tech</span>
            <span className="text-white/20">|</span>
            <span>Nate-tech, Phones& PC salses, Computer maintainance.</span>
          </div>
          
          <div className="flex gap-6 mt-4 md:mt-0 font-mono text-[10px] uppercase tracking-wider text-white/40">
            <span>© 2026 Natael</span>
            <span>All Rights reversed</span>
            <span>Addis Ababa, ethiopia</span>
          </div>
        </div>
      </footer>

      {/* Global Interactive Manifest Portal */}
      <ClaimSpotModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      />
    </div>
  );
}
