import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Play, Clock, Globe, X, Orbit, Volume2, VolumeX, ShieldAlert, Send } from "lucide-react";

interface HeroProps {
  onStartVoyage: () => void;
}

export default function Hero({ onStartVoyage }: HeroProps) {
  const [isPlayingLiftoff, setIsPlayingLiftoff] = useState(false);
  const [liftoffStage, setLiftoffStage] = useState<"idle" | "countdown" | "engine" | "launched">("idle");
  const [countdown, setCountdown] = useState(5);
  const [telemetry, setTelemetry] = useState({
    velocity: 0,
    altitude: 0,
    fuel: 100,
  });

  const headlineText = "Shop the latest smartphones and laptops";
  const words = headlineText.split(" ");

  // Staggered text animations
  const containerVars = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVars = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  // Liftoff simulation timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingLiftoff && liftoffStage === "countdown") {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setLiftoffStage("engine");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingLiftoff, liftoffStage]);

  // Engines ignition & actual flight telemetry loop
  useEffect(() => {
    let frame: number;
    if (liftoffStage === "engine") {
      const ignitionTimer = setTimeout(() => {
        setLiftoffStage("launched");
      }, 2000);
      return () => clearTimeout(ignitionTimer);
    }

    if (liftoffStage === "launched") {
      const updateTelemetry = () => {
        setTelemetry((prev) => {
          const nextFuel = Math.max(0, Number((prev.fuel - 0.18).toFixed(2)));
          if (nextFuel === 0) return prev;
          return {
            velocity: Math.floor(prev.velocity + 148 + Math.random() * 25),
            altitude: Number((prev.altitude + 0.42 + Math.random() * 0.1).toFixed(2)),
            fuel: nextFuel,
          };
        });
        frame = requestAnimationFrame(updateTelemetry);
      };
      frame = requestAnimationFrame(updateTelemetry);
    }

    return () => cancelAnimationFrame(frame);
  }, [liftoffStage]);

  const handleStartLiftoff = () => {
    setCountdown(5);
    setTelemetry({ velocity: 0, altitude: 0, fuel: 100 });
    setLiftoffStage("countdown");
    setIsPlayingLiftoff(true);
  };

  const handleCloseLiftoff = () => {
    setIsPlayingLiftoff(false);
    setLiftoffStage("idle");
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between items-center text-center overflow-hidden bg-black text-white px-8 lg:px-16 pt-32 pb-10">
      
      {/* Background Video with 25% shade */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 -mt-12 sm:-mt-9"
      >
        <source src="https://res.cloudinary.com/dzh81sk25/video/upload/v1779533970/Final_iphone_jkptxn.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/25 pointer-events-none z-0" />

      {/* Top Center Atmospheric focal glow light source (Monochrome Space Fog) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full filter blur-[120px] pointer-events-none mix-blend-screen z-0" />
      
      {/* Subtle floating starmap dust particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,rgba(0,0,0,0)_80%)] pointer-events-none z-0" />

      {/* Hero Core Stack */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto z-10 py-12">
        {/* Badge: New | Maiden Crewed Voyage... */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2 px-1.5 py-1.5 rounded-full liquid-glass border-none mb-8 select-none"
        >
  
          <span className="text-xs text-white/90 font-body tracking-wide pr-3 pl-1 font-medium">
            Nate-tech Hub a place only original and best devices found.
          </span>
        </motion.div>

        {/* Headline: Word-by-word staggered entrance */}
        <motion.h1
          variants={containerVars}
          initial="initial"
          animate="animate"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.80] tracking-[-3px] lg:tracking-[-4px] max-w-3xl text-center"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVars}
              className="inline-block mr-[0.25em] whitespace-nowrap"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-sm md:text-base text-white/70 max-w-xl font-body font-light leading-relaxed mt-8 text-center"
        >
          Discover all the leatest and gratest phones from Apple, Samsung, Google, and many more brands as soons they announced. And Trade-in or sale your used phones and laptops with greate value.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-row flex-wrap justify-center items-center gap-6 mt-10"
        >
          {/* Primary button with dynamic corner radius */}
          <button
            onClick={onStartVoyage}
            className="px-6 py-3 rounded-full text-sm font-semibold text-white liquid-glass-strong cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center gap-2 group/btn"
          >
            Check Our Catalog
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex items-center justify-center"
            >
              <ArrowDown className="w-4 h-4 text-white" />
            </motion.div>
          </button>

          {/* Telegram Action Button */}
          <a
            href="https://t.me/natetech"
            target="_blank"
            rel="noreferrer"
            className="text-white text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group select-none"
          >
            <span>check our Telegram</span>
            <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-105 transition-transform">
              <Send className="w-3 h-3 fill-black text-black pl-[0.5px]" />
            </div>
          </a>
        </motion.div>

        {/* Live Telemetry Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-16"
        >
          {/* Card 1: Clock */}
          <div className="p-5 w-[220px] rounded-[1.25rem] liquid-glass flex flex-col justify-between items-start text-left select-none leading-none group hover:border-white/10 transition-all cursor-help">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 mb-4 group-hover:bg-white/10 group-hover:text-white transition-colors">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-4xl font-heading italic tracking-[-1px] leading-none text-white font-normal block">
                4+ years
              </span>
              <span className="text-xs text-white/60 font-body font-light mt-2.5 block leading-tight">
                Providing the absolute best
              </span>
            </div>
          </div>

          {/* Card 2: Globe */}
          <div className="p-5 w-[220px] rounded-[1.25rem] liquid-glass flex flex-col justify-between items-start text-left select-none leading-none group hover:border-white/10 transition-all cursor-help">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 mb-4 group-hover:bg-white/10 group-hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-4xl font-heading italic tracking-[-1px] leading-none text-white font-normal block">
                Count less
              </span>
              <span className="text-xs text-white/60 font-body font-light mt-2.5 block leading-tight">
                satisfied customers of every kind
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enterprise Integration Panel (Placed near baseline) */}
      <div className="w-full relative z-10 pt-10 pb-4 flex flex-col items-center gap-5">
        {/* Context Tag */}
        <div className="px-4 py-1.5 rounded-full liquid-glass border-none select-none text-[11px] font-semibold text-white/75 tracking-wider uppercase font-body">
          We have all the best and awsome phones and laptops from global brands
        </div>

        {/* Looping sliding Partner logo marquee */}
        <div className="w-full max-w-4xl overflow-hidden relative py-2 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <motion.div 
            className="flex gap-16 md:gap-24 whitespace-nowrap w-max text-white/60 lg:text-white/80 font-heading italic text-2xl md:text-3xl tracking-tight select-none py-1"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity
            }}
          >
            {[
              "Apple", "Samsung", "Google", "Xiaomi", "Oppo", "OnePlus",
              "Apple", "Samsung", "Google", "Xiaomi", "Oppo", "OnePlus"
            ].map((p, idx) => (
              <span key={`${p}-${idx}`} className="hover:text-white transition-colors duration-300 px-2 cursor-default">
                {p}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* VIEW LIFTOFF SIMULATION modal OVERLAY */}
      <AnimatePresence>
        {isPlayingLiftoff && (
          <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleCloseLiftoff}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-[1.25rem] liquid-glass-strong bg-black p-8 md:p-10 border border-white/5 overflow-hidden text-left"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLiftoff}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-10"
                aria-label="Close Simulation"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>

              <div className="mb-6">
                <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-mono">
                  Active Mission Deck // Astro-Dynamics
                </span>
                <h3 className="text-3xl font-heading italic text-white mt-1">
                  Artemis Heavy VII Propulsion Test
                </h3>
              </div>

              {/* Simulation Stage Container */}
              <div className="relative aspect-video rounded-[1.25rem] bg-[#050505] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                
                {/* Background Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Subtitle / Telemetry labels */}
                {liftoffStage === " countdown" || liftoffStage === "countdown" && (
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-white/40">
                    TERMINAL COMMAND: IGNITION_SEQ_START
                  </div>
                )}

                {/* Simulated Sound Waves or Sparkles particles */}
                {liftoffStage === "engine" && (
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 0.15 }}
                    className="absolute inset-0 bg-white/[0.02] filter blur-xl"
                  />
                )}

                <AnimatePresence mode="wait">
                  {liftoffStage === "countdown" && (
                    <motion.div
                      key="countdown"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.2, opacity: 0 }}
                      className="space-y-4"
                    >
                      <span className="text-8xl font-heading italic font-bold leading-none tracking-tight text-white block">
                        T - {countdown}
                      </span>
                      <p className="text-xs font-mono text-white/60 uppercase tracking-widest">
                        System Diagnostics: Complete // Engine Pre-Chill Active
                      </p>
                    </motion.div>
                  )}

                  {liftoffStage === "engine" && (
                    <motion.div
                      key="engine"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      <span className="text-5xl font-heading italic text-white block animate-pulse">
                        IGNITION SEQ DETECTED
                      </span>
                      <div className="flex gap-1 justify-center h-8 items-end">
                        <span className="w-1.5 h-12 bg-white animate-[bounce_0.2s_infinite]"></span>
                        <span className="w-1.5 h-16 bg-white animate-[bounce_0.15s_infinite_0.05s]"></span>
                        <span className="w-1.5 h-14 bg-white animate-[bounce_0.3s_infinite_0.1s]"></span>
                        <span className="w-1.5 h-10 bg-white/80 animate-[bounce_0.25s_infinite_0.02s]"></span>
                        <span className="w-1.5 h-16 bg-white/90 animate-[bounce_0.1s_infinite_0.12s]"></span>
                      </div>
                      <p className="text-xs font-mono text-white/60 uppercase">
                        Thruster Coils Stable // Solid Booster Fuel Cells Armed
                      </p>
                    </motion.div>
                  )}

                  {liftoffStage === "launched" && (
                    <motion.div
                      key="launched"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full space-y-6 px-10 text-left font-mono"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-white/15">
                        <span className="text-xs text-white uppercase font-bold tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          LIFTOFF CONFIRMED
                        </span>
                        <span className="text-[10px] text-white/50">SECTOR_MARS_09B</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 py-2">
                        <div className="bg-white/5 p-4 rounded-[0.75rem] border border-white/5">
                          <span className="text-[10px] text-white/40 uppercase block">VELOCITY</span>
                          <span className="text-lg font-bold text-white mt-1 block">
                            {telemetry.velocity} km/h
                          </span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-[0.75rem] border border-white/5">
                          <span className="text-[10px] text-white/40 uppercase block">ALTITUDE</span>
                          <span className="text-lg font-bold text-white mt-1 block">
                            {telemetry.altitude} km
                          </span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-[0.75rem] border border-white/5">
                          <span className="text-[10px] text-white/40 uppercase block">SOLID FUEL</span>
                          <span className="text-lg font-bold text-white mt-1 block">
                            {telemetry.fuel}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-white h-full transition-all duration-300"
                          style={{ width: `${telemetry.fuel}%` }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {liftoffStage === "idle" && (
                    <motion.div key="idle" className="space-y-4">
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-2 text-white/80">
                        <Orbit className="w-8 h-8 animate-[spin_10s_linear_infinite]" />
                      </div>
                      <h4 className="text-xl font-body font-medium">Ready for Propulsion Sequence</h4>
                      <p className="text-xs font-body font-light text-white/60 max-w-sm mx-auto">
                        Simulate the dynamic engine pressure curves and thruster velocities of our maiden crew orbital booster.
                      </p>
                      <button
                        onClick={handleStartLiftoff}
                        className="mt-2 px-5 py-2.5 bg-white text-black text-xs font-bold rounded-full cursor-pointer hover:bg-neutral-150 transition-colors"
                      >
                        Initiate Launch Procedure
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Console logs */}
              {liftoffStage === "launched" && (
                <div className="mt-4 p-3 rounded-[0.75rem] border border-white/10 bg-white/[0.015] font-mono text-[9px] text-white/40 flex justify-between items-center select-none">
                  <span>DOCK_LINK: ONLINE // ENCRYPT_SESS_SECURE</span>
                  <span>MAX_Q_VELOCITY_APPROACHING_40S</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
