import { ArrowUpRight, Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onClaimSpot: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export default function Navbar({ onClaimSpot, onNavigateSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Products", id: "voyages" },
    { name: "Inspection", id: "worlds" },
    // { name: "Innovation", id: "innovation" },
    { name: "Contac Us", id: "launch" },
  ];

  const handleLinkClick = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 w-full px-8 lg:px-16 z-50 flex justify-between items-center pointer-events-none select-none">
        {/* Left Branding Circular Wrapper (48x48px) */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full liquid-glass pointer-events-auto cursor-pointer" onClick={() => handleLinkClick("home")}>
          <span className="text-2xl font-heading italic lowercase text-white select-none">Nate</span>
        </div>

        {/* Center Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-2 rounded-full liquid-glass px-1.5 py-1.5 pointer-events-auto">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.id)}
              className="text-xs font-semibold text-white/70 font-body px-3.5 py-2 hover:text-white transition-all duration-300 relative rounded-full cursor-pointer hover:bg-white/5 active:scale-95"
            >
              {link.name}
            </button>
          ))}
          {/* Action Tag Button inside nav pill */}
          <button
            onClick={onClaimSpot}
            className="bg-white text-black text-xs font-bold px-4 py-2 hover:bg-neutral-150 transition-all duration-300 flex items-center gap-1.5 cursor-pointer rounded-full active:scale-95 whitespace-nowrap shadow-md"
          >
            Get the best deal, Call Now
            <Phone className="w-3.5 h-3.5 fill-black" />
          </button>
        </div>

        {/* Right Anchor (48x48px Invisible Structural Spacer) + Mobile toggle */}
        <div className="w-12 h-12 flex items-center justify-center pointer-events-auto">
          {/* Menu triggers for smaller screens */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-white cursor-pointer hover:bg-white/10 active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          
          {/* Invisible desktop spacer to center middle menu */}
          <div className="hidden md:block w-12 h-12"></div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-x-4 top-20 z-40 md:hidden p-6 rounded-[1.25rem] bg-black/95 border border-white/10 backdrop-blur-lg flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.id)}
                  className="w-full text-left font-body text-sm font-medium text-white/80 py-2 border-b border-white/5 hover:text-white"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onClaimSpot();
              }}
              className="w-full py-3 bg-white text-black font-body font-bold rounded-full text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
            >
              Get the best deal, Call Now
              <Phone className="w-4 h-4 fill-black" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
