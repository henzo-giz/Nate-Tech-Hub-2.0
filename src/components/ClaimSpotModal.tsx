import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Mail, MapPin, User, Copy, Check, Sparkles, PhoneCall, QrCode, Instagram, Send } from "lucide-react";

interface ClaimSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClaimSpotModal({ isOpen, onClose }: ClaimSpotModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactInfo = {
    name: "Natnael",
    phone: "+251934613210",
    phoneDisplay: "+251 934 613 210",
    email: "nathantadele09@gmail.com",
    address: "Bole, Sheger House, Ground floor",
    telegram: "@natetech",
    instagram: "@natty_tad",
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg rounded-[1.5rem] liquid-glass-strong bg-[#030303]/60 backdrop-blur-xl border border-white/10 text-white p-5 md:p-6.5 overflow-hidden"
          >
            {/* Looping Slow-motion Video background for the Contact Card */}
            <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 select-none overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
              >
                <source 
                  src="https://res.cloudinary.com/dzh81sk25/video/upload/v1779542979/Slow-mo_background_01_hxvyoy.mp4" 
                  type="video/mp4" 
                />
              </video>
              {/* Soft dark tinted overlay so the white text remains easily readable and has high contrast */}
              <div className="absolute inset-0 bg-black/45 pointer-events-none" />
            </div>

            {/* Background Aesthetic Light Blur */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white/60 hover:text-white" />
            </button>

            {/* Header */}
            <div className="mb-4">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-white/50 flex items-center gap-1.5 select-none">
                <Sparkles className="w-3" /> Authorized Sales Hub
              </span>
              <h2 className="text-2xl font-heading italic text-white mt-1 select-none">
                Direct Contact Card
              </h2>
              <p className="text-xs font-body font-light text-white/60 mt-1 leading-relaxed select-none">
                Connect directly with our elite devices representative to ask questions, check real-time stock, or secure special partner deals.
              </p>
            </div>

            {/* Core Contact Card */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01] backdrop-blur-sm shadow-xl space-y-px">
              {/* Card Title Bar */}
              <div className="p-3 bg-white/[0.03] border-b border-white/5 flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-widest select-none">
                <span>Direct Representative</span>
                <span className="text-green-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                </span>
              </div>

              {/* Contact Data Items */}
              <div className="p-4 space-y-2.5 font-body">
                {/* REPRESENTATIVE NAME */}
                <div 
                  onClick={() => handleCopy(contactInfo.name, "name")}
                  className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 border border-white/5 group-hover:text-white transition-colors">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-wider text-white/30 block mb-0.5">Contact Person</span>
                      <span className="text-xs font-semibold text-white group-hover:text-white transition-colors">
                        {contactInfo.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-white/35 group-hover:text-white/70 transition-colors text-xs flex items-center gap-1.5">
                    {copiedField === "name" ? (
                      <span className="text-[10px] text-green-400 flex items-center gap-1 font-mono uppercase bg-green-500/10 px-2 py-0.5 rounded-md">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>

                {/* NUMBER */}
                <div className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 border border-white/5 group-hover:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-white/30 block mb-0.5">Phone Number</span>
                      <a 
                        href={`tel:${contactInfo.phone}`}
                        className="text-xs font-semibold text-white hover:text-amber-400 transition-colors block font-mono"
                      >
                        {contactInfo.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(contactInfo.phone, "phone")}
                      className="p-1 px-1.5 rounded bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-[9px] font-mono uppercase"
                    >
                      {copiedField === "phone" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 border border-white/5 group-hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-white/30 block mb-0.5">Direct Email</span>
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="text-xs font-semibold text-white hover:text-amber-400 transition-colors block truncate font-mono"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(contactInfo.email, "email")}
                      className="p-1 px-1.5 rounded bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-[9px] font-mono uppercase"
                    >
                      {copiedField === "email" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* PHYSICAL ADDRESS */}
                <div className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 border border-white/5 group-hover:text-white transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-white/30 block mb-0.5">Physical Address</span>
                      <span className="text-xs font-light text-white block">
                        {contactInfo.address}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(contactInfo.address, "address")}
                      className="p-1 px-1.5 rounded bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-[9px] font-mono uppercase"
                    >
                      {copiedField === "address" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* TELEGRAM */}
                <div className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 border border-white/5 group-hover:text-white transition-colors">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-white/30 block mb-0.5">Telegram</span>
                      <a 
                        href="https://t.me/natetech"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-white hover:text-amber-400 transition-colors block font-mono"
                      >
                        {contactInfo.telegram}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(contactInfo.telegram, "telegram")}
                      className="p-1 px-1.5 rounded bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-[9px] font-mono uppercase"
                    >
                      {copiedField === "telegram" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* INSTAGRAM */}
                <div className="flex items-center justify-between group p-2 -mx-2 rounded-xl hover:bg-white/[0.03] transition-colors">
                  <div className="flex items-center gap-2.5 flex-1">
                    <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60 border border-white/5 group-hover:text-white transition-colors">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-mono tracking-wider text-white/30 block mb-0.5">Instagram</span>
                      <a 
                        href="https://instagram.com/natty_tad"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-white hover:text-amber-400 transition-colors block font-mono"
                      >
                        {contactInfo.instagram}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(contactInfo.instagram, "instagram")}
                      className="p-1 px-1.5 rounded bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-[9px] font-mono uppercase"
                    >
                      {copiedField === "instagram" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Lower scan or barcode design segment */}
              <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between gap-4 select-none">
                <div className="flex flex-col font-mono text-[9px] text-white/30 tracking-wider">
                  <span>AETHER DEVICE MATRICES</span>
                  <span>LOCAL OFFICE ID: BOLE-ETH_90</span>
                </div>
                {/* Visual QR Code placeholder */}
                <div className="p-1 bg-white rounded-lg flex items-center justify-center shrink-0">
                  <QrCode className="w-7 h-7 text-[#030303]" />
                </div>
              </div>
            </div>

            {/* CTA Promo Action Button */}
            <div className="mt-4 flex flex-col gap-1.5">
              <a
                href={`tel:${contactInfo.phone}`}
                className="w-full py-3 bg-white text-black text-center text-xs font-mono uppercase tracking-widest font-extrabold hover:bg-neutral-100 transition-colors rounded-full flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-98"
              >
                <PhoneCall className="w-4 h-4 fill-black text-black" />
                Get the best deal, Call Now
              </a>
              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-white/40 hover:text-white/75 transition-colors font-mono uppercase tracking-wider bg-transparent border border-white/5 hover:border-white/10 rounded-full cursor-pointer mt-1"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
